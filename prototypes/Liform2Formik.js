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
 * @property {boolean} required
 * @property {string} type
 * @property {string|boolean} value
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
    email: 'email',
    'choice-expanded': 'radio',
    password: 'password',
    date: 'date',
};

const mapLiformTypesToFormTypes = {
    string: 'text',
    boolean: 'checkbox',
};

const mapLiformRulesToYupRules = {
    required: 'required',
    maxLength: 'max',
    minLength: 'min',
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
    let validationRules = Yup;

    rules.forEach(rule => {
        const params = [];

        if (['undefined', 'boolean'].indexOf(typeof rule.value) < 0) {
            params.push(rule.value);
        }
        if (typeof rule.error !== 'undefined') {
            params.push(rule.error);
        }

        if (validationRules[rule.method]) {
            validationRules = validationRules[rule.method].apply(validationRules, params);
        }
    });

    return validationRules;
}

/**
 * Returns schema for formik initialValues parameter
 * @param {object} properties
 * @return {Yup}
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
            contents = _assembleValidationRules(_getValidationRules(slug));
        }

        Object.assign(schema, {
            [name]: contents,
        });
    }

    return Yup.object().shape(schema);
}

/**
 * @param {object} field
 * @return {FieldRules}
 * @private
 */
function _getValidationRules(field) {
    let rules = [];

    if ('type' in field) {
        rules.push({method: field.type === 'boolean' ? 'bool' : field.type});
    }
    if ('attr' in field) {
        rules = rules.concat(_getValidationRules(field.attr));
    }

    Object.keys(field).map(type => {
        if (type in mapLiformRulesToYupRules && !!mapLiformRulesToYupRules[type]) {
            rules.push({
                method: mapLiformRulesToYupRules[type],
                value: field[type],
                error: `${mapLiformRulesToYupRules[type]} '${field[type]}' error`,  // TODO: once error messages are part of schema, show them here
            });
        }
    });

    return rules;
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
        label: field.title,
        name: levels.length > 0 ? `${levels.join('.')}.${name}` : name,
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
 * Checks if current slug has nested fields or not
 * @param {Slug} slug
 * @return {boolean}
 * @private
 */
function _isGroup(slug) {
    return slug.type && slug.type === 'object' && slug.properties && typeof slug.properties === 'object';
}

export default Liform2Formik;