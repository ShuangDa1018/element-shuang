let $ELEMENT = {};
const setConfig = (option) => {
    $ELEMENT = option;
};
const getConfig = (key) => {
    return $ELEMENT[key];
};

export { getConfig, setConfig };
