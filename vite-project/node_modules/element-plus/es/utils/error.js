class ElementPlusError extends Error {
    constructor(m) {
        super(m);
        this.name = 'ElementPlusError';
    }
}
var error = (scope, m) => {
    throw new ElementPlusError(`[${scope}] ${m}`);
};
function warn(scope, m) {
    console.warn(new ElementPlusError(`[${scope}] ${m}`));
}

export default error;
export { warn };
