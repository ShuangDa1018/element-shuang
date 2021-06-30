'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var ElCheckbox = require('../el-checkbox');
require('../utils/dom');
require('@popperjs/core');
require('../utils/popup-manager');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElCheckbox__default = /*#__PURE__*/_interopDefaultLegacy(ElCheckbox);

const cellStarts = {
  default: {
    order: ""
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: "",
    className: "el-table-column--selection"
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  }
};
const cellForced = {
  selection: {
    renderHeader: function({ store }) {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return vue.h(ElCheckbox__default['default'], {
        disabled: isDisabled(),
        indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
        "onUpdate:modelValue": store.toggleAllSelection,
        modelValue: store.states.isAllSelected.value
      });
    },
    renderCell: function({
      row,
      column,
      store,
      $index
    }) {
      return vue.h(ElCheckbox__default['default'], {
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
        onChange: () => {
          store.commit("rowSelectedChanged", row);
        },
        onClick: (event) => event.stopPropagation(),
        modelValue: store.isSelected(row)
      });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function({ column }) {
      return column.label || "#";
    },
    renderCell: function({
      column,
      $index
    }) {
      let i = $index + 1;
      const index = column.index;
      if (typeof index === "number") {
        i = $index + index;
      } else if (typeof index === "function") {
        i = index($index);
      }
      return vue.h("div", {}, [i]);
    },
    sortable: false
  },
  expand: {
    renderHeader: function({ column }) {
      return column.label || "";
    },
    renderCell: function({ row, store }) {
      const classes = ["el-table__expand-icon"];
      if (store.states.expandRows.value.indexOf(row) > -1) {
        classes.push("el-table__expand-icon--expanded");
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return vue.h("div", {
        class: classes,
        onClick: callback
      }, [
        vue.h("i", {
          class: "el-icon el-icon-arrow-right"
        })
      ]);
    },
    sortable: false,
    resizable: false,
    className: "el-table__expand-column"
  }
};
function defaultRenderCell({
  row,
  column,
  $index
}) {
  var _a;
  const property = column.property;
  const value = property && util.getPropByPath(row, property, false).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return ((_a = value == null ? void 0 : value.toString) == null ? void 0 : _a.call(value)) || "";
}
function treeCellPrefix({
  row,
  treeNode,
  store
}) {
  if (!treeNode)
    return null;
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(vue.h("span", {
      class: "el-table__indent",
      style: { "padding-left": treeNode.indent + "px" }
    }));
  }
  if (typeof treeNode.expanded === "boolean" && !treeNode.noLazyChildren) {
    const expandClasses = [
      "el-table__expand-icon",
      treeNode.expanded ? "el-table__expand-icon--expanded" : ""
    ];
    let iconClasses = ["el-icon-arrow-right"];
    if (treeNode.loading) {
      iconClasses = ["el-icon-loading"];
    }
    ele.push(vue.h("div", {
      class: expandClasses,
      onClick: callback
    }, [
      vue.h("i", {
        class: iconClasses
      })
    ]));
  } else {
    ele.push(vue.h("span", {
      class: "el-table__placeholder"
    }));
  }
  return ele;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

function mergeOptions(defaults, config) {
  const options = {};
  let key;
  for (key in defaults) {
    options[key] = defaults[key];
  }
  for (key in config) {
    if (hasOwn(config, key)) {
      const value = config[key];
      if (typeof value !== "undefined") {
        options[key] = value;
      }
    }
  }
  return options;
}
function parseWidth(width) {
  if (width !== void 0) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return +width;
}
function parseMinWidth(minWidth) {
  if (typeof minWidth !== "undefined") {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
}
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function useWatcher(owner, props_) {
  const instance = vue.getCurrentInstance();
  const registerComplexWatchers = () => {
    const props = ["fixed"];
    const aliases = {
      realWidth: "width",
      realMinWidth: "minWidth"
    };
    const allAliases = props.reduce((prev, cur) => {
      prev[cur] = cur;
      return prev;
    }, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (hasOwn(props_, columnKey)) {
        vue.watch(() => props_[columnKey], (newVal) => {
          instance.columnConfig.value[columnKey] = newVal;
          instance.columnConfig.value[key] = newVal;
          const updateColumns = columnKey === "fixed";
          owner.value.store.scheduleLayout(updateColumns);
        });
      }
    });
  };
  const registerNormalWatchers = () => {
    const props = [
      "label",
      "filters",
      "filterMultiple",
      "sortable",
      "index",
      "formatter",
      "className",
      "labelClassName",
      "showOverflowTooltip"
    ];
    const aliases = {
      property: "prop",
      align: "realAlign",
      headerAlign: "realHeaderAlign"
    };
    const allAliases = props.reduce((prev, cur) => {
      prev[cur] = cur;
      return prev;
    }, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (hasOwn(props_, columnKey)) {
        vue.watch(() => props_[columnKey], (newVal) => {
          instance.columnConfig.value[key] = newVal;
        });
      }
    });
  };
  return {
    registerComplexWatchers,
    registerNormalWatchers
  };
}

function useRender(props, slots, owner) {
  const instance = vue.getCurrentInstance();
  const columnId = vue.ref("");
  const isSubColumn = vue.ref(false);
  const realAlign = vue.ref();
  const realHeaderAlign = vue.ref();
  vue.watchEffect(() => {
    realAlign.value = !!props.align ? "is-" + props.align : null;
    realAlign.value;
  });
  vue.watchEffect(() => {
    realHeaderAlign.value = !!props.headerAlign ? "is-" + props.headerAlign : realAlign.value;
    realHeaderAlign.value;
  });
  const columnOrTableParent = vue.computed(() => {
    let parent = instance.vnode.vParent || instance.parent;
    while (parent && !parent.tableId && !parent.columnId) {
      parent = parent.vnode.vParent || parent.parent;
    }
    return parent;
  });
  const realWidth = vue.ref(parseWidth(props.width));
  const realMinWidth = vue.ref(parseMinWidth(props.minWidth));
  const setColumnWidth = (column) => {
    if (realWidth.value)
      column.width = realWidth.value;
    if (realMinWidth.value) {
      column.minWidth = realMinWidth.value;
    }
    if (!column.minWidth) {
      column.minWidth = 80;
    }
    column.realWidth = Number(column.width === void 0 ? column.minWidth : column.width);
    return column;
  };
  const setColumnForcedProps = (column) => {
    const type = column.type;
    const source = cellForced[type] || {};
    Object.keys(source).forEach((prop) => {
      const value = source[prop];
      if (value !== void 0) {
        column[prop] = prop === "className" ? `${column[prop]} ${value}` : value;
      }
    });
    return column;
  };
  const checkSubColumn = (children) => {
    if (children instanceof Array) {
      children.forEach((child) => check(child));
    } else {
      check(children);
    }
    function check(item) {
      var _a;
      if (((_a = item == null ? void 0 : item.type) == null ? void 0 : _a.name) === "ElTableColumn") {
        item.vParent = instance;
      }
    }
  };
  const setColumnRenders = (column) => {
    if (props.renderHeader) {
      console.warn("[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.");
    } else if (column.type !== "selection") {
      column.renderHeader = (scope) => {
        instance.columnConfig.value["label"];
        const renderHeader = slots.header;
        return renderHeader ? renderHeader(scope) : column.label;
      };
    }
    let originRenderCell = column.renderCell;
    if (column.type === "expand") {
      column.renderCell = (data) => vue.h("div", {
        class: "cell"
      }, [originRenderCell(data)]);
      owner.value.renderExpanded = (data) => {
        return slots.default ? slots.default(data) : slots.default;
      };
    } else {
      originRenderCell = originRenderCell || defaultRenderCell;
      column.renderCell = (data) => {
        let children = null;
        if (slots.default) {
          children = slots.default(data);
        } else {
          children = originRenderCell(data);
        }
        const prefix = treeCellPrefix(data);
        const props2 = {
          class: "cell",
          style: {}
        };
        if (column.showOverflowTooltip) {
          props2.class += " el-tooltip";
          props2.style = {
            width: (data.column.realWidth || Number(data.column.width)) - 1 + "px"
          };
        }
        checkSubColumn(children);
        return vue.h("div", props2, [prefix, children]);
      };
    }
    return column;
  };
  const getPropsData = (...propsKey) => {
    return propsKey.reduce((prev, cur) => {
      if (Array.isArray(cur)) {
        cur.forEach((key) => {
          prev[key] = props[key];
        });
      }
      return prev;
    }, {});
  };
  const getColumnElIndex = (children, child) => {
    return [].indexOf.call(children, child);
  };
  return {
    columnId,
    realAlign,
    isSubColumn,
    realHeaderAlign,
    columnOrTableParent,
    setColumnWidth,
    setColumnForcedProps,
    setColumnRenders,
    getPropsData,
    getColumnElIndex
  };
}

var defaultProps = {
  type: {
    type: String,
    default: "default"
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: ""
  },
  minWidth: {
    type: [String, Number],
    default: ""
  },
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: false
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: true
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => {
      return ["ascending", "descending", null];
    },
    validator: (val) => {
      return val.every((order) => ["ascending", "descending", null].indexOf(order) > -1);
    }
  }
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
let columnIdSeed = 1;
var ElTableColumn = vue.defineComponent({
  name: "ElTableColumn",
  components: {
    ElCheckbox: ElCheckbox__default['default']
  },
  props: defaultProps,
  setup(props, { slots }) {
    const instance = vue.getCurrentInstance();
    const columnConfig = vue.ref({});
    const owner = vue.computed(() => {
      let parent2 = instance.parent;
      while (parent2 && !parent2.tableId) {
        parent2 = parent2.parent;
      }
      return parent2;
    });
    const { registerNormalWatchers, registerComplexWatchers } = useWatcher(owner, props);
    const {
      columnId,
      isSubColumn,
      realHeaderAlign,
      columnOrTableParent,
      setColumnWidth,
      setColumnForcedProps,
      setColumnRenders,
      getPropsData,
      getColumnElIndex,
      realAlign
    } = useRender(props, slots, owner);
    const parent = columnOrTableParent.value;
    columnId.value = (parent.tableId || parent.columnId) + "_column_" + columnIdSeed++;
    vue.onBeforeMount(() => {
      isSubColumn.value = owner.value !== parent;
      const type = props.type || "default";
      const sortable = props.sortable === "" ? true : props.sortable;
      const defaults = __spreadProps(__spreadValues({}, cellStarts[type]), {
        id: columnId.value,
        type,
        property: props.prop || props.property,
        align: realAlign,
        headerAlign: realHeaderAlign,
        showOverflowTooltip: props.showOverflowTooltip || props.showTooltipWhenOverflow,
        filterable: props.filters || props.filterMethod,
        filteredValue: [],
        filterPlacement: "",
        isColumnGroup: false,
        filterOpened: false,
        sortable,
        index: props.index,
        rawColumnKey: instance.vnode.key
      });
      const basicProps = [
        "columnKey",
        "label",
        "className",
        "labelClassName",
        "type",
        "renderHeader",
        "formatter",
        "fixed",
        "resizable"
      ];
      const sortProps = ["sortMethod", "sortBy", "sortOrders"];
      const selectProps = ["selectable", "reserveSelection"];
      const filterProps = [
        "filterMethod",
        "filters",
        "filterMultiple",
        "filterOpened",
        "filteredValue",
        "filterPlacement"
      ];
      let column = getPropsData(basicProps, sortProps, selectProps, filterProps);
      column = mergeOptions(defaults, column);
      const chains = compose(setColumnRenders, setColumnWidth, setColumnForcedProps);
      column = chains(column);
      columnConfig.value = column;
      registerNormalWatchers();
      registerComplexWatchers();
    });
    vue.onMounted(() => {
      var _a;
      const parent2 = columnOrTableParent.value;
      const children = isSubColumn.value ? parent2.vnode.el.children : (_a = parent2.refs.hiddenColumns) == null ? void 0 : _a.children;
      const getColumnIndex = () => getColumnElIndex(children || [], instance.vnode.el);
      columnConfig.value.getColumnIndex = getColumnIndex;
      const columnIndex = getColumnIndex();
      columnIndex > -1 && owner.value.store.commit("insertColumn", columnConfig.value, isSubColumn.value ? parent2.columnConfig.value : null);
    });
    vue.onBeforeUnmount(() => {
      owner.value.store.commit("removeColumn", columnConfig.value, isSubColumn.value ? parent.columnConfig.value : null);
    });
    instance.columnId = columnId.value;
    instance.columnConfig = columnConfig;
    return;
  },
  render() {
    var _a, _b, _c;
    let children = [];
    try {
      const renderDefault = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, {
        row: {},
        column: {},
        $index: -1
      });
      if (renderDefault instanceof Array) {
        for (const childNode of renderDefault) {
          if (((_c = childNode.type) == null ? void 0 : _c.name) === "ElTableColumn" || childNode.shapeFlag !== 36) {
            children.push(childNode);
          } else if (childNode.type === vue.Fragment && childNode.children instanceof Array) {
            renderDefault.push(...childNode.children);
          }
        }
      }
    } catch (e) {
      children = [];
    }
    return vue.h("div", children);
  }
});

const _TableColumn = ElTableColumn;
_TableColumn.install = (app) => {
  app.component(_TableColumn.name, _TableColumn);
};

exports.default = _TableColumn;
