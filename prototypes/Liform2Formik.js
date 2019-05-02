/**
 * Structure type definition
 * @typedef {Object} Structure
 * @property {string} email
 * @property {string} [nickName]
 */


let liformSchema;

function Liform2Formik(schema) {
    liformSchema = schema;

    return {
        generateStructure,
        generateValidationSchema,
    }
}

function generateValidationSchema() {

}

/**
 * @return {Structure}
 */
function generateStructure() {
    return _generateStructure(liformSchema, liformSchema.title, []);
}

function _generateField(field, name, levels) {
    return {
        name: levels.length > 0 ? `${levels.join('.')}.${name}` : name,
        type: field.type,
    }
}

function _generateGroup(properties, levels) {
    return {
        name: levels[levels.length - 1],
        children: _generateGroupChildren(properties, levels),
    };
}

function _generateGroupChildren(properties, levels) {
    const children = [];

    for (const name in properties) {
        children.push(_generateStructure(properties[name], name, levels));
    }

    return children;
}

function _generateStructure(slug, name, levels) {
    return _isGroup(slug)
        ? {
            group: _generateGroup(slug.properties, [...levels, name]),
        }
        : {
            field: _generateField(slug, name, levels),
        };
}

function _isGroup(slug) {
    if (slug.type && slug.type === 'object' && slug.properties && typeof slug.properties === 'object') {
        return true;
    }

    return false;
}

export default Liform2Formik;