export default function (name, form) {
    return _getLevelError(name.split('.'), form.errors, form.touched);
}

/**
 * @param {string[]} name - result of name.split('.')
 * @param {object} errors
 * @param {object} touched
 * @private
 */
function _getLevelError(name, errors, touched) {
    const nameSlug = name[0];

    if (!errors[nameSlug] || !touched[nameSlug]) {
        return false;
    }

    const errorsSlug = errors[nameSlug];

    let output = '';

    switch (typeof errorsSlug) {
        case 'object':
            output = _getLevelError(name.slice(1), errorsSlug, touched[nameSlug]);
            break;
        case 'string':
            output = touched[nameSlug] ? errorsSlug : '';
            break;
    }

    return output;
}