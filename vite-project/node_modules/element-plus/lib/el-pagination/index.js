'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ElSelect = require('../el-select');
var ElOption = require('../el-option');
var locale = require('../locale');
var isEqual = require('lodash/isEqual');
var ElInput = require('../el-input');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElSelect__default = /*#__PURE__*/_interopDefaultLegacy(ElSelect);
var ElOption__default = /*#__PURE__*/_interopDefaultLegacy(ElOption);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var ElInput__default = /*#__PURE__*/_interopDefaultLegacy(ElInput);

var script = vue.defineComponent({
  name: "Prev",
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage <= 1);
    return {
      internalDisabled
    };
  }
});

const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
  key: 1,
  class: "el-icon el-icon-arrow-left"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("button", {
    type: "button",
    class: "btn-prev",
    disabled: _ctx.internalDisabled,
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
    }, ["self", "prevent"]))
  }, [
    _ctx.prevText ? (vue.openBlock(), vue.createBlock("span", _hoisted_1, vue.toDisplayString(_ctx.prevText), 1)) : (vue.openBlock(), vue.createBlock("i", _hoisted_2))
  ], 8, ["disabled"]);
}

script.render = render;
script.__file = "packages/pagination/src/prev.vue";

var script$1 = vue.defineComponent({
  name: "Next",
  props: {
    disabled: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      default: 50
    },
    nextText: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const internalDisabled = vue.computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
    return {
      internalDisabled
    };
  }
});

const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = {
  key: 1,
  class: "el-icon el-icon-arrow-right"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("button", {
    type: "button",
    class: "btn-next",
    disabled: _ctx.internalDisabled,
    onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
    }, ["self", "prevent"]))
  }, [
    _ctx.nextText ? (vue.openBlock(), vue.createBlock("span", _hoisted_1$1, vue.toDisplayString(_ctx.nextText), 1)) : (vue.openBlock(), vue.createBlock("i", _hoisted_2$1))
  ], 8, ["disabled"]);
}

script$1.render = render$1;
script$1.__file = "packages/pagination/src/next.vue";

const usePagination = () => {
  const pagination = vue.inject("pagination", {});
  return {
    pagination,
    pageCount: pagination.pageCount,
    disabled: pagination.disabled,
    currentPage: pagination.currentPage
  };
};

var script$2 = vue.defineComponent({
  name: "Sizes",
  components: {
    ElSelect: ElSelect__default['default'],
    ElOption: ElOption__default['default']
  },
  props: {
    pageSize: Number,
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    popperClass: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  emits: ["page-size-change"],
  setup(props, { emit }) {
    const { pagination } = usePagination();
    const innerPageSize = vue.ref(props.pageSize);
    vue.watch(() => props.pageSizes, (newVal, oldVal) => {
      if (isEqual__default['default'](newVal, oldVal))
        return;
      if (Array.isArray(newVal)) {
        const pageSize = newVal.indexOf(props.pageSize) > -1 ? props.pageSize : props.pageSizes[0];
        emit("page-size-change", pageSize);
      }
    });
    vue.watch(() => props.pageSize, (newVal) => {
      innerPageSize.value = newVal;
    });
    const innerPagesizes = vue.computed(() => props.pageSizes);
    function handleChange(val) {
      if (val !== innerPageSize.value) {
        innerPageSize.value = val;
        pagination == null ? void 0 : pagination.handleSizesChange(Number(val));
      }
    }
    return {
      t: locale.t,
      innerPagesizes,
      innerPageSize,
      handleChange
    };
  }
});

const _hoisted_1$2 = { class: "el-pagination__sizes" };
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = vue.resolveComponent("el-option");
  const _component_el_select = vue.resolveComponent("el-select");
  return vue.openBlock(), vue.createBlock("span", _hoisted_1$2, [
    vue.createVNode(_component_el_select, {
      "model-value": _ctx.innerPageSize,
      disabled: _ctx.disabled,
      "popper-class": _ctx.popperClass,
      size: "mini",
      onChange: _ctx.handleChange
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.innerPagesizes, (item) => {
          return vue.openBlock(), vue.createBlock(_component_el_option, {
            key: item,
            value: item,
            label: item + _ctx.t("el.pagination.pagesize")
          }, null, 8, ["value", "label"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["model-value", "disabled", "popper-class", "onChange"])
  ]);
}

script$2.render = render$2;
script$2.__file = "packages/pagination/src/sizes.vue";

var script$3 = vue.defineComponent({
  components: {
    ElInput: ElInput__default['default']
  },
  setup() {
    const { pagination, pageCount, disabled, currentPage } = usePagination();
    const userInput = vue.ref(null);
    const innerValue = vue.computed(() => {
      var _a;
      return (_a = userInput.value) != null ? _a : currentPage.value;
    });
    function handleInput(val) {
      userInput.value = Number(val);
    }
    function handleChange(val) {
      pagination == null ? void 0 : pagination.changeEvent(Number(val));
      userInput.value = null;
    }
    return {
      t: locale.t,
      userInput,
      pageCount,
      disabled,
      handleInput,
      handleChange,
      innerValue
    };
  }
});

const _hoisted_1$3 = { class: "el-pagination__jump" };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  return vue.openBlock(), vue.createBlock("span", _hoisted_1$3, [
    vue.createTextVNode(vue.toDisplayString(_ctx.t("el.pagination.goto")) + " ", 1),
    vue.createVNode(_component_el_input, {
      size: "mini",
      class: "el-pagination__editor is-in-pagination",
      min: 1,
      max: _ctx.pageCount,
      disabled: _ctx.disabled,
      "model-value": _ctx.innerValue,
      type: "number",
      "onUpdate:modelValue": _ctx.handleInput,
      onChange: _ctx.handleChange
    }, null, 8, ["max", "disabled", "model-value", "onUpdate:modelValue", "onChange"]),
    vue.createTextVNode(" " + vue.toDisplayString(_ctx.t("el.pagination.pageClassifier")), 1)
  ]);
}

script$3.render = render$3;
script$3.__file = "packages/pagination/src/jumper.vue";

var script$4 = vue.defineComponent({
  name: "Total",
  props: {
    total: {
      type: Number,
      default: 1e3
    }
  },
  setup() {
    return {
      t: locale.t
    };
  }
});

const _hoisted_1$4 = { class: "el-pagination__total" };
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("span", _hoisted_1$4, vue.toDisplayString(_ctx.t("el.pagination.total", {
    total: _ctx.total
  })), 1);
}

script$4.render = render$4;
script$4.__file = "packages/pagination/src/total.vue";

var script$5 = vue.defineComponent({
  name: "ElPager",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    disabled: Boolean
  },
  emits: ["change"],
  setup(props, { emit }) {
    const showPrevMore = vue.ref(false);
    const showNextMore = vue.ref(false);
    const quicknextIconClass = vue.ref("el-icon-more");
    const quickprevIconClass = vue.ref("el-icon-more");
    const pagers = vue.computed(() => {
      const pagerCount = props.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;
      const currentPage = Number(props.currentPage);
      const pageCount = Number(props.pageCount);
      let showPrevMore2 = false;
      let showNextMore2 = false;
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore2 = true;
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore2 = true;
        }
      }
      const array = [];
      if (showPrevMore2 && !showNextMore2) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore2 && showNextMore2) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore2 && showNextMore2) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      return array;
    });
    vue.watchEffect(() => {
      const halfPagerCount = (props.pagerCount - 1) / 2;
      showPrevMore.value = false;
      showNextMore.value = false;
      if (props.pageCount > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
          showPrevMore.value = true;
        }
        if (props.currentPage < props.pageCount - halfPagerCount) {
          showNextMore.value = true;
        }
      }
    });
    vue.watchEffect(() => {
      if (!showPrevMore.value)
        quickprevIconClass.value = "el-icon-more";
    });
    vue.watchEffect(() => {
      if (!showNextMore.value)
        quicknextIconClass.value = "el-icon-more";
    });
    function onMouseenter(direction) {
      if (props.disabled)
        return;
      if (direction === "left") {
        quickprevIconClass.value = "el-icon-d-arrow-left";
      } else {
        quicknextIconClass.value = "el-icon-d-arrow-right";
      }
    }
    function onPagerClick(event) {
      const target = event.target;
      if (target.tagName.toLowerCase() === "ul" || props.disabled) {
        return;
      }
      let newPage = Number(target.textContent);
      const pageCount = props.pageCount;
      const currentPage = props.currentPage;
      const pagerCountOffset = props.pagerCount - 2;
      if (target.className.includes("more")) {
        if (target.className.includes("quickprev")) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.includes("quicknext")) {
          newPage = currentPage + pagerCountOffset;
        }
      }
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      if (newPage !== currentPage) {
        emit("change", newPage);
      }
    }
    return {
      showPrevMore,
      showNextMore,
      quicknextIconClass,
      quickprevIconClass,
      pagers,
      onMouseenter,
      onPagerClick
    };
  }
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("ul", {
    class: "el-pager",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.onPagerClick && _ctx.onPagerClick(...args))
  }, [
    _ctx.pageCount > 0 ? (vue.openBlock(), vue.createBlock("li", {
      key: 0,
      class: [{ active: _ctx.currentPage === 1, disabled: _ctx.disabled }, "number"]
    }, " 1 ", 2)) : vue.createCommentVNode("v-if", true),
    _ctx.showPrevMore ? (vue.openBlock(), vue.createBlock("li", {
      key: 1,
      class: ["el-icon more btn-quickprev", [_ctx.quickprevIconClass, { disabled: _ctx.disabled }]],
      onMouseenter: _cache[1] || (_cache[1] = ($event) => _ctx.onMouseenter("left")),
      onMouseleave: _cache[2] || (_cache[2] = ($event) => _ctx.quickprevIconClass = "el-icon-more")
    }, null, 34)) : vue.createCommentVNode("v-if", true),
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.pagers, (pager) => {
      return vue.openBlock(), vue.createBlock("li", {
        key: pager,
        class: [{ active: _ctx.currentPage === pager, disabled: _ctx.disabled }, "number"]
      }, vue.toDisplayString(pager), 3);
    }), 128)),
    _ctx.showNextMore ? (vue.openBlock(), vue.createBlock("li", {
      key: 2,
      class: ["el-icon more btn-quicknext", [_ctx.quicknextIconClass, { disabled: _ctx.disabled }]],
      onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.onMouseenter("right")),
      onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.quicknextIconClass = "el-icon-more")
    }, null, 34)) : vue.createCommentVNode("v-if", true),
    _ctx.pageCount > 1 ? (vue.openBlock(), vue.createBlock("li", {
      key: 3,
      class: [{ active: _ctx.currentPage === _ctx.pageCount, disabled: _ctx.disabled }, "number"]
    }, vue.toDisplayString(_ctx.pageCount), 3)) : vue.createCommentVNode("v-if", true)
  ]);
}

script$5.render = render$5;
script$5.__file = "packages/pagination/src/pager.vue";

const getValidPageSize = (val) => Number.isNaN(val) ? 10 : val;
var Pagination = vue.defineComponent({
  name: "ElPagination",
  components: {
    Prev: script,
    Next: script$1,
    Sizes: script$2,
    Jumper: script$3,
    Total: script$4,
    Pager: script$5
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    small: Boolean,
    total: {
      type: Number
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      validator: (value) => {
        return (value | 0) === value && value > 4 && value < 22 && value % 2 === 1;
      },
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: "prev, pager, next, jumper, ->, total"
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    popperClass: {
      type: String,
      default: ""
    },
    prevText: {
      type: String,
      default: ""
    },
    nextText: {
      type: String,
      default: ""
    },
    background: Boolean,
    disabled: Boolean,
    hideOnSinglePage: Boolean
  },
  emits: [
    "size-change",
    "current-change",
    "prev-click",
    "next-click",
    "update:currentPage",
    "update:pageSize"
  ],
  setup(props, { emit }) {
    const lastEmittedPage = vue.ref(-1);
    const userChangePageSize = vue.ref(false);
    const internalPageSize = vue.ref(getValidPageSize(props.pageSize));
    const internalPageCount = vue.computed(() => {
      if (typeof props.total === "number") {
        return Math.max(1, Math.ceil(props.total / internalPageSize.value));
      } else if (typeof props.pageCount === "number") {
        return Math.max(1, props.pageCount);
      }
      return null;
    });
    const internalCurrentPage = vue.ref(getValidCurrentPage(props.currentPage));
    function emitChange() {
      if (internalCurrentPage.value !== lastEmittedPage.value || userChangePageSize.value) {
        lastEmittedPage.value = internalCurrentPage.value;
        userChangePageSize.value = false;
        emit("update:currentPage", internalCurrentPage.value);
        emit("current-change", internalCurrentPage.value);
      }
    }
    function handleCurrentChange(val) {
      internalCurrentPage.value = getValidCurrentPage(val);
      userChangePageSize.value = true;
      emitChange();
    }
    function handleSizesChange(val) {
      userChangePageSize.value = true;
      internalPageSize.value = val;
      emit("update:pageSize", val);
      emit("size-change", val);
    }
    function prev() {
      if (props.disabled)
        return;
      const newVal = internalCurrentPage.value - 1;
      internalCurrentPage.value = getValidCurrentPage(newVal);
      emit("prev-click", internalCurrentPage.value);
      emitChange();
    }
    function next() {
      if (props.disabled)
        return;
      const newVal = internalCurrentPage.value + 1;
      internalCurrentPage.value = getValidCurrentPage(newVal);
      emit("next-click", internalCurrentPage.value);
      emitChange();
    }
    function getValidCurrentPage(value) {
      if (typeof value === "string") {
        value = parseInt(value, 10);
      }
      let resetValue;
      if (isNaN(value) || value < 1) {
        resetValue = 1;
      } else if (internalPageCount.value < value) {
        resetValue = internalPageCount.value;
      }
      return resetValue != null ? resetValue : value;
    }
    vue.watch(() => props.currentPage, (val) => {
      internalCurrentPage.value = getValidCurrentPage(val);
      lastEmittedPage.value = internalCurrentPage.value;
    });
    vue.watch(() => props.pageSize, (val) => {
      internalPageSize.value = getValidPageSize(val);
    });
    vue.watch(() => internalPageCount.value, (val) => {
      const oldPage = internalCurrentPage.value;
      if (val > 0 && oldPage === 0) {
        internalCurrentPage.value = 1;
      } else if (oldPage > val) {
        internalCurrentPage.value = val === 0 ? 1 : val;
        emitChange();
      }
    });
    vue.provide("pagination", {
      pageCount: vue.computed(() => props.pageCount),
      disabled: vue.computed(() => props.disabled),
      currentPage: vue.computed(() => internalCurrentPage.value),
      changeEvent: handleCurrentChange,
      handleSizesChange
    });
    return {
      internalCurrentPage,
      internalPageSize,
      lastEmittedPage,
      userChangePageSize,
      internalPageCount,
      getValidCurrentPage,
      emitChange,
      handleCurrentChange,
      prev,
      next
    };
  },
  render() {
    var _a, _b, _c;
    const layout = this.layout;
    if (!layout)
      return null;
    if (this.hideOnSinglePage && this.internalPageCount <= 1)
      return null;
    const rootNode = vue.h("div", {
      class: [
        "el-pagination",
        {
          "is-background": this.background,
          "el-pagination--small": this.small
        }
      ]
    });
    const rootChildren = [];
    const rightWrapperChildren = [];
    const rightWrapperRoot = vue.h("div", { class: "el-pagination__rightwrapper" }, rightWrapperChildren);
    const TEMPLATE_MAP = {
      prev: vue.h(script, {
        disabled: this.disabled,
        currentPage: this.internalCurrentPage,
        prevText: this.prevText,
        onClick: this.prev
      }),
      jumper: vue.h(script$3),
      pager: vue.h(script$5, {
        currentPage: this.internalCurrentPage,
        pageCount: this.internalPageCount,
        pagerCount: this.pagerCount,
        onChange: this.handleCurrentChange,
        disabled: this.disabled
      }),
      next: vue.h(script$1, {
        disabled: this.disabled,
        currentPage: this.internalCurrentPage,
        pageCount: this.internalPageCount,
        nextText: this.nextText,
        onClick: this.next
      }),
      sizes: vue.h(script$2, {
        pageSize: this.pageSize,
        pageSizes: this.pageSizes,
        popperClass: this.popperClass,
        disabled: this.disabled
      }),
      slot: (_c = (_b = (_a = this.$slots) == null ? void 0 : _a.default) == null ? void 0 : _b.call(_a)) != null ? _c : null,
      total: vue.h(script$4, { total: this.total })
    };
    const components = layout.split(",").map((item) => item.trim());
    let haveRightWrapper = false;
    components.forEach((c) => {
      if (c === "->") {
        haveRightWrapper = true;
        return;
      }
      if (!haveRightWrapper) {
        rootChildren.push(TEMPLATE_MAP[c]);
      } else {
        rightWrapperChildren.push(TEMPLATE_MAP[c]);
      }
    });
    if (haveRightWrapper && rightWrapperChildren.length > 0) {
      rootChildren.unshift(rightWrapperRoot);
    }
    return vue.h(rootNode, {}, rootChildren);
  }
});

const _Pagination = Pagination;
_Pagination.install = (app) => {
  app.component(_Pagination.name, _Pagination);
};

exports.default = _Pagination;
