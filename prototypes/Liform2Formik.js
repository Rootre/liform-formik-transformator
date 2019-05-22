import * as Yup from 'yup';

/**
 * Structure type definition of transformed liform schema for formik generator
 * @typedef {object} Structure
 * @property {string} title
 * @property {Children} children
 */

/**
 * Form Group's children
 * @typedef {object[]} Children
 * @property {Field} [field]
 * @property {Group} [group]
 */

/**
 * Form group
 * @typedef {object} Group
 * @property {string} name
 * @property {Children} children
 */

/**
 * Part or whole liform schema
 * @typedef {object} Slug
 * @property {string} type
 * @property {object} [properties]
 * @property {string} [title]
 */

/**
 * Form field
 * @typedef {object} Field
 * @property {object} customRules
 * @property {boolean} disabled
 * @property {string} label
 * @property {string} name
 * @property {string[]} enum_titles
 * @property {string[]} enum_values
 * @property {number} order
 * @property {boolean} required
 * @property {string} type
 * @property {string|boolean} value
 * @property {object} [errors]
 */

/**
 * Field rules for validation
 * @typedef {object[]} FieldRules
 * @property {string} method - one of available Yup methods
 * @property {string} [error]
 * @property {string} [value]
 */


let liformSchema;

const mapLiformWidgetsToFormTypes = {
    choice: 'select',
    'choice-expanded': 'radio',
    'choice-multiple-expanded': 'checkboxes',
    date: 'date',
    email: 'email',
    password: 'password',
};

const mapLiformTypesToFormTypes = {
    boolean: 'checkbox',
    string: 'text',
};

const mapLiformTypesToYupMethods = {
    boolean: 'boolean',
    choice: 'string',
    maxLength: 'max',
    minLength: 'min',
    required: 'required',
    string: 'string',
};


function Liform2Formik(schema) {
    liformSchema = schema;

    return {
        generateDefaultValues,
        generateStructure,
        generateValidationSchema,
    }
}


/**
 * @return {object}
 */
function generateDefaultValues() {
    return _generateDefaultValues(liformSchema.properties);
}

/**
 * @return {Structure}
 */
function generateStructure() {
    return {
        title: liformSchema.title,
        children: _generateGroupChildren(liformSchema.properties, []),
    }
}

/**
 * @return {Yup}
 */
function generateValidationSchema() {
    return _generateValidationSchema(liformSchema.properties);
}


/**
 * Assemble Yup validation rules for single field.
 * Example output: Yup.string().min(5, 'Too short').required('Required field')
 * @param {FieldRules} rules
 * @private
 */
function _assembleValidationRules(rules) {
    if (!Array.isArray(rules) || rules.length < 2) {
        return false;
    }

    let validationRules = Yup;

    rules.forEach(rule => {
        const params = [];

        if (['undefined', 'boolean'].indexOf(typeof rule.value) < 0) {
            params.push(rule.value);
        }
        if (typeof rule.error !== 'undefined') {
            params.push(rule.error);
        }

        if (validationRules[rule.method]) {
            validationRules = validationRules[rule.method].apply(validationRules, params);
        }
    });

    return validationRules;
}

/**
 * Checks whether field represents required checkbox - its because Yup needs a little bit different validation rule for this case
 * @param {object} field
 * @return {boolean}
 * @private
 */
function _isRequiredCheckbox(field) {
    return 'type' in field && field.type === 'boolean' && ('required' in field && field.required || 'attr' in field && 'required' in field.attr && field.attr.required);
}

/**
 * Returns schema for formik initialValues parameter
 * @param {object} properties
 * @return {Yup.schema}
 * @private
 */
function _generateValidationSchema(properties) {
    const schema = new Object();

    for (const name in properties) {
        const slug = properties[name];
        let contents;

        if (_isGroup(slug)) {
            contents = _generateValidationSchema(slug.properties);
        } else {
            contents = _assembleValidationRules(
                _isRequiredCheckbox(slug)
                    ? _getCheckboxValidationRule(slug)
                    : _getValidationRules(slug)
            );
        }

        contents && Object.assign(schema, {
            [name]: contents,
        });
    }

    return Yup.object().shape(schema);
}

/**
 * Returns schema for formik initialValues parameter
 * @param {object} properties
 * @return {object}
 * @private
 */
function _generateDefaultValues(properties) {
    const defaultValues = new Object();

    for (const name in properties) {
        const slug = properties[name];
        let contents;

        if (_isGroup(slug)) {
            contents = _generateDefaultValues(slug.properties);
        } else {
            contents = slug.type === 'boolean' ? !!slug.defaultValue : slug.defaultValue || '';
        }

        Object.assign(defaultValues, {
            [name]: contents,
        });
    }

    return defaultValues;
}

/**
 * Generates JSON representation of form field
 * @param {object} field
 * @param {string} name
 * @param {string[]} levels
 * @return {Field}
 * @private
 */
function _generateField(field, name, levels) {
    return {
        customRules: field.attr,
        disabled: field.disabled,
        enum_titles: field.enum_titles,
        enum_values: field.enum,
        errors: field.errors,
        label: field.title,
        name: levels.length > 0 ? `${levels.join('.')}.${name}` : name,
        order: field.propertyOrder,
        required: field.required,
        type: _getFormType(field),
        value: field.defaultValue,
    }
}

/**
 * Generates form group
 * @param {Slug} slug
 * @param {string[]} levels
 * @return {Group}
 * @private
 */
function _generateGroup(slug, levels) {
    return {
        title: slug.title,
        name: levels[levels.length - 1],
        block: slug.block,
        children: _generateGroupChildren(slug.properties, levels),
    };
}

/**
 * Generates children for form group
 * @param {object} properties
 * @param {string[]} levels
 * @return {Children}
 * @private
 */
function _generateGroupChildren(properties, levels) {
    const children = [];

    for (const name in properties) {
        children.push(_generateChild(properties[name], name, levels));
    }

    return children;
}

/**
 * @param {Slug} slug
 * @param {string} name
 * @param {string[]} levels
 * @return {object}
 * @private
 */
function _generateChild(slug, name, levels) {
    return _isGroup(slug)
        ? {
            group: _generateGroup(slug, [...levels, name]),
        }
        : {
            field: _generateField(slug, name, levels),
        };
}

/**
 * This schema simulates required checkbox, because simple boolean() method pass both true and false
 * @param {object} field
 * @return {object[]}
 * @private
 */
function _getCheckboxValidationRule(field) {
    return [
        {
            method: 'mixed'
        }, {
            method: 'oneOf',
            value: [true],
            error: _getValidationError(field, 'required'),
        }
    ];
}

/**
 * @param {object} field
 * @return {string}
 * @private
 */
function _getFormType(field) {
    return field.widget
        ? mapLiformWidgetsToFormTypes[field.widget] || field.widget
        : mapLiformTypesToFormTypes[field.type] || field.type;
}

/**
 * @param {object} field
 * @param {string} type
 * @return {string}
 * @private
 */
function _getValidationError(field, type) {
    if (field.errors && field.errors[type]) {
        return field.errors[type];
    }
    if ('attr' in field && field.attr.errors && field.attr.errors[type]) {
        return field.attr.errors[type];
    }
    // TODO: once error messages are part of schema, show them here
    return type === 'boolean' ? 'required' : `${mapLiformTypesToYupMethods[type]} '${field[type]}' error`;
}

/**
 * @param {object} field
 * @return {FieldRules}
 * @private
 */
function _getValidationRules(field) {
    let rules = [];

    if (typeof field !== 'object') {
        return [];
    }

    rules.push({method: field.type ? mapLiformTypesToYupMethods[field.type] : 'string'});

    if ('attr' in field) {
        rules = rules.concat(_getValidationRules(field.attr));
    }

    Object.keys(field).map(type => {
        if (type in mapLiformTypesToYupMethods && mapLiformTypesToYupMethods[type] && field[type]) {
            rules.push({
                method: mapLiformTypesToYupMethods[type],
                value: field[type],
                error: _getValidationError(field, type),
            });
        }
    });

    return rules;
}

/**
 * Checks if current slug has nested fields or not
 * @param {Slug} slug
 * @return {boolean}
 * @private
 */
function _isGroup(slug) {
    return slug.type && slug.type === 'object' && slug.properties && typeof slug.properties === 'object';
}

export default Liform2Formik;