export default function (field) {
    const {errors, customRules} = field;

    return Object.assign({}, errors, customRules && customRules.errors || {});
}