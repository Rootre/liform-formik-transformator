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
 * @property {boolean} disabled
 * @property {string} label
 * @property {string} name
 * @property {string[]} radio_titles
 * @property {string[]} radio_values
 * @property {boolean} required
 * @property {string} type
 * @property {string|boolean} value
 */


let liformSchema;

const mapWidgetsToFormTypes = {
    email: 'email',
    'choice-expanded': 'radio',
    password: 'password',
    date: 'date',
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

function _generateDefaultValues(properties) {
    const defaultValues = new Object();

    for (const name in properties) {
        const slug = properties[name];
        let contents;

        if (_isGroup(slug)) {
            contents = _generateDefaultValues(slug.properties);
        } else {
            contents = slug.defaultValue || '';
        }

        Object.assign(defaultValues, {
            [name]: contents,
        });
    }

    return defaultValues;
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

function generateValidationSchema() {

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
        disabled: field.disabled,
        radio_titles: field.enum_titles,
        radio_values: field.enum,
        label: field.title,
        name: levels.length > 0 ? `${levels.join('.')}.${name}` : name,
        required: field.required,
        type: _getFormType(field),
        value: field.defaultValue,
    }
}

/**
 * Generates form group
 * @param {object} properties
 * @param {string[]} levels
 * @return {Group}
 * @private
 */
function _generateGroup(properties, levels) {
    return {
        name: levels[levels.length - 1],
        children: _generateGroupChildren(properties, levels),
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
            group: _generateGroup(slug.properties, [...levels, name]),
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
    if (!field.widget && field.type === 'boolean') {
        return 'checkbox';
    }

    return mapWidgetsToFormTypes[field.widget] || field.widget;
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