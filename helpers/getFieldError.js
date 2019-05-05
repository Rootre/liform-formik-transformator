export default function (name, errors) {
    const levels = name.split('.');

    let output = errors[levels.shift()];

    if (typeof output !== 'object') {
        return false;
    }

    levels.map(level => {
        if (output[level]) {
            output = output[level];
        }
    });

    return typeof output === 'string' ? output : false;
}