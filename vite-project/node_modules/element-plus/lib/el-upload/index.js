'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var form = require('../el-form');
var locale = require('../locale');
var ElProgress = require('../el-progress');
var isEqual = require('lodash/isEqual');
var cloneDeep = require('lodash/cloneDeep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElProgress__default = /*#__PURE__*/_interopDefaultLegacy(ElProgress);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

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
const NOOP = () => { };
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = "post";
  err.url = action;
  return err;
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
function upload(option) {
  if (typeof XMLHttpRequest === "undefined") {
    return;
  }
  const xhr = new XMLHttpRequest();
  const action = option.action;
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }
  const formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  }
  formData.append(option.filename, option.file, option.file.name);
  xhr.onerror = function error() {
    option.onError(getError(action, option, xhr));
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  };
  xhr.open("post", action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  for (const item in headers) {
    if (hasOwn(headers, item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}

var script = vue.defineComponent({
  name: "ElUploadList",
  components: { ElProgress: ElProgress__default['default'] },
  props: {
    files: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: {
      type: Function,
      default: () => NOOP
    },
    listType: {
      type: String,
      default: "text"
    }
  },
  emits: ["remove"],
  setup(props, { emit }) {
    const parsePercentage = (val) => {
      return parseInt(val, 10);
    };
    const handleClick = (file) => {
      props.handlePreview(file);
    };
    const onFileClicked = (e) => {
      e.target.focus();
    };
    const handleRemove = (e, file) => {
      emit("remove", file);
    };
    return {
      focusing: vue.ref(false),
      parsePercentage,
      handleClick,
      handleRemove,
      onFileClicked,
      t: locale.t
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createVNode("i", { class: "el-icon-document" }, null, -1);
const _hoisted_2 = { class: "el-upload-list__item-status-label" };
const _hoisted_3 = {
  key: 2,
  class: "el-icon-close-tip"
};
const _hoisted_4 = {
  key: 4,
  class: "el-upload-list__item-actions"
};
const _hoisted_5 = /* @__PURE__ */ vue.createVNode("i", { class: "el-icon-zoom-in" }, null, -1);
const _hoisted_6 = /* @__PURE__ */ vue.createVNode("i", { class: "el-icon-delete" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_progress = vue.resolveComponent("el-progress");
  return vue.openBlock(), vue.createBlock(vue.TransitionGroup, {
    tag: "ul",
    class: [
      "el-upload-list",
      "el-upload-list--" + _ctx.listType,
      { "is-disabled": _ctx.disabled }
    ],
    name: "el-list"
  }, {
    default: vue.withCtx(() => [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.files, (file) => {
        return vue.openBlock(), vue.createBlock("li", {
          key: file,
          class: ["el-upload-list__item", "is-" + file.status, _ctx.focusing ? "focusing" : ""],
          tabindex: "0",
          onKeydown: vue.withKeys(($event) => !_ctx.disabled && _ctx.handleRemove($event, file), ["delete"]),
          onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.focusing = true),
          onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.focusing = false),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onFileClicked && _ctx.onFileClicked(...args))
        }, [
          vue.renderSlot(_ctx.$slots, "default", { file }, () => [
            file.status !== "uploading" && ["picture-card", "picture"].includes(_ctx.listType) ? (vue.openBlock(), vue.createBlock("img", {
              key: 0,
              class: "el-upload-list__item-thumbnail",
              src: file.url,
              alt: ""
            }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode("a", {
              class: "el-upload-list__item-name",
              onClick: ($event) => _ctx.handleClick(file)
            }, [
              _hoisted_1,
              vue.createTextVNode(vue.toDisplayString(file.name), 1)
            ], 8, ["onClick"]),
            vue.createVNode("label", _hoisted_2, [
              vue.createVNode("i", {
                class: {
                  "el-icon-upload-success": true,
                  "el-icon-circle-check": _ctx.listType === "text",
                  "el-icon-check": ["picture-card", "picture"].includes(_ctx.listType)
                }
              }, null, 2)
            ]),
            !_ctx.disabled ? (vue.openBlock(), vue.createBlock("i", {
              key: 1,
              class: "el-icon-close",
              onClick: ($event) => _ctx.handleRemove($event, file)
            }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),
            vue.createCommentVNode(" This is a bug which needs to be fixed "),
            vue.createCommentVNode(" TODO: Fix the incorrect navigation interaction "),
            !_ctx.disabled ? (vue.openBlock(), vue.createBlock("i", _hoisted_3, vue.toDisplayString(_ctx.t("el.upload.deleteTip")), 1)) : vue.createCommentVNode("v-if", true),
            file.status === "uploading" ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
              key: 3,
              type: _ctx.listType === "picture-card" ? "circle" : "line",
              "stroke-width": _ctx.listType === "picture-card" ? 6 : 2,
              percentage: _ctx.parsePercentage(file.percentage)
            }, null, 8, ["type", "stroke-width", "percentage"])) : vue.createCommentVNode("v-if", true),
            _ctx.listType === "picture-card" ? (vue.openBlock(), vue.createBlock("span", _hoisted_4, [
              vue.createVNode("span", {
                class: "el-upload-list__item-preview",
                onClick: ($event) => _ctx.handlePreview(file)
              }, [
                _hoisted_5
              ], 8, ["onClick"]),
              !_ctx.disabled ? (vue.openBlock(), vue.createBlock("span", {
                key: 0,
                class: "el-upload-list__item-delete",
                onClick: ($event) => _ctx.handleRemove($event, file)
              }, [
                _hoisted_6
              ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ], 42, ["onKeydown"]);
      }), 128))
    ]),
    _: 3
  }, 8, ["class"]);
}

script.render = render;
script.__file = "packages/upload/src/upload-list.vue";

var script$1 = vue.defineComponent({
  name: "ElUploadDrag",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["file"],
  setup(props, { emit }) {
    const uploader = vue.inject("uploader", {});
    const dragover = vue.ref(false);
    function onDrop(e) {
      if (props.disabled || !uploader)
        return;
      const accept = uploader.accept;
      dragover.value = false;
      if (!accept) {
        emit("file", e.dataTransfer.files);
        return;
      }
      emit("file", Array.from(e.dataTransfer.files).filter((file) => {
        const { type, name } = file;
        const extension = name.indexOf(".") > -1 ? `.${name.split(".").pop()}` : "";
        const baseType = type.replace(/\/.*$/, "");
        return accept.split(",").map((type2) => type2.trim()).filter((type2) => type2).some((acceptedType) => {
          if (acceptedType.startsWith(".")) {
            return extension === acceptedType;
          }
          if (/\/\*$/.test(acceptedType)) {
            return baseType === acceptedType.replace(/\/\*$/, "");
          }
          if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
            return type === acceptedType;
          }
          return false;
        });
      }));
    }
    function onDragover() {
      if (!props.disabled)
        dragover.value = true;
    }
    return {
      dragover,
      onDrop,
      onDragover
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: {
      "el-upload-dragger": true,
      "is-dragover": _ctx.dragover
    },
    onDrop: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.onDrop && _ctx.onDrop(...args), ["prevent"])),
    onDragover: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.onDragover && _ctx.onDragover(...args), ["prevent"])),
    onDragleave: _cache[3] || (_cache[3] = vue.withModifiers(($event) => _ctx.dragover = false, ["prevent"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 34);
}

script$1.render = render$1;
script$1.__file = "packages/upload/src/upload-dragger.vue";

var script$2 = vue.defineComponent({
  components: {
    UploadDragger: script$1
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: "file"
    },
    data: {
      type: Object,
      default: () => null
    },
    headers: {
      type: Object,
      default: () => null
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: null
    },
    accept: {
      type: String,
      default: ""
    },
    onStart: {
      type: Function,
      default: NOOP
    },
    onProgress: {
      type: Function,
      default: NOOP
    },
    onSuccess: {
      type: Function,
      default: NOOP
    },
    onError: {
      type: Function,
      default: NOOP
    },
    beforeUpload: {
      type: Function,
      default: NOOP
    },
    drag: {
      type: Boolean,
      default: false
    },
    onPreview: {
      type: Function,
      default: NOOP
    },
    onRemove: {
      type: Function,
      default: NOOP
    },
    fileList: {
      type: Array,
      default: () => []
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: "text"
    },
    httpRequest: {
      type: Function,
      default: () => upload
    },
    disabled: Boolean,
    limit: {
      type: Number,
      default: null
    },
    onExceed: {
      type: Function,
      default: NOOP
    }
  },
  setup(props) {
    const reqs = vue.ref({});
    const mouseover = vue.ref(false);
    const inputRef = vue.ref(null);
    function uploadFiles(files) {
      if (props.limit && props.fileList.length + files.length > props.limit) {
        props.onExceed(files, props.fileList);
        return;
      }
      let postFiles = Array.from(files);
      if (!props.multiple) {
        postFiles = postFiles.slice(0, 1);
      }
      if (postFiles.length === 0) {
        return;
      }
      postFiles.forEach((rawFile) => {
        props.onStart(rawFile);
        if (props.autoUpload)
          upload(rawFile);
      });
    }
    function upload(rawFile) {
      inputRef.value.value = null;
      if (!props.beforeUpload) {
        return post(rawFile);
      }
      const before = props.beforeUpload(rawFile);
      if (before instanceof Promise) {
        before.then((processedFile) => {
          const fileType = Object.prototype.toString.call(processedFile);
          if (fileType === "[object File]" || fileType === "[object Blob]") {
            if (fileType === "[object Blob]") {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (hasOwn(rawFile, p)) {
                processedFile[p] = rawFile[p];
              }
            }
            post(processedFile);
          } else {
            post(rawFile);
          }
        }).catch(() => {
          props.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        post(rawFile);
      } else {
        props.onRemove(null, rawFile);
      }
    }
    function abort(file) {
      const _reqs = reqs.value;
      if (file) {
        let uid = file;
        if (file.uid)
          uid = file.uid;
        if (_reqs[uid]) {
          _reqs[uid].abort();
        }
      } else {
        Object.keys(_reqs).forEach((uid) => {
          if (_reqs[uid])
            _reqs[uid].abort();
          delete _reqs[uid];
        });
      }
    }
    function post(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: props.headers,
        withCredentials: props.withCredentials,
        file: rawFile,
        data: props.data,
        filename: props.name,
        action: props.action,
        onProgress: (e) => {
          props.onProgress(e, rawFile);
        },
        onSuccess: (res) => {
          props.onSuccess(res, rawFile);
          delete reqs.value[uid];
        },
        onError: (err) => {
          props.onError(err, rawFile);
          delete reqs.value[uid];
        }
      };
      const req = props.httpRequest(options);
      reqs.value[uid] = req;
      if (req instanceof Promise) {
        req.then(options.onSuccess, options.onError);
      }
    }
    function handleChange(e) {
      const files = e.target.files;
      if (!files)
        return;
      uploadFiles(files);
    }
    function handleClick() {
      if (!props.disabled) {
        inputRef.value.value = null;
        inputRef.value.click();
      }
    }
    function handleKeydown() {
      handleClick();
    }
    return {
      reqs,
      mouseover,
      inputRef,
      abort,
      post,
      handleChange,
      handleClick,
      handleKeydown,
      upload,
      uploadFiles
    };
  }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_upload_dragger = vue.resolveComponent("upload-dragger");
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-upload", `el-upload--${_ctx.listType}`],
    tabindex: "0",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleClick && _ctx.handleClick(...args)),
    onKeydown: _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"]), ["enter", "space"]))
  }, [
    _ctx.drag ? (vue.openBlock(), vue.createBlock(_component_upload_dragger, {
      key: 0,
      disabled: _ctx.disabled,
      onFile: _ctx.uploadFiles
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["disabled", "onFile"])) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }),
    vue.createVNode("input", {
      ref: "inputRef",
      class: "el-upload__input",
      type: "file",
      name: _ctx.name,
      multiple: _ctx.multiple,
      accept: _ctx.accept,
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
    }, null, 40, ["name", "multiple", "accept"])
  ], 34);
}

script$2.render = render$2;
script$2.__file = "packages/upload/src/upload.vue";

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
function getFile(rawFile, uploadFiles) {
  return uploadFiles.find((file) => file.uid === rawFile.uid);
}
function genUid(seed) {
  return Date.now() + seed;
}
var useHandlers = (props) => {
  let cachedFiles = [];
  const uploadFiles = vue.ref([]);
  const uploadRef = vue.ref(null);
  let tempIndex = 1;
  function abort(file) {
    uploadRef.value.abort(file);
  }
  function clearFiles() {
    uploadFiles.value = [];
  }
  function handleError(err, rawFile) {
    const file = getFile(rawFile, uploadFiles.value);
    file.status = "fail";
    uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
    props.onError(err, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  }
  function handleProgress(ev, rawFile) {
    const file = getFile(rawFile, uploadFiles.value);
    props.onProgress(ev, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = ev.percent || 0;
  }
  function handleSuccess(res, rawFile) {
    const file = getFile(rawFile, uploadFiles.value);
    if (file) {
      file.status = "success";
      file.response = res;
      props.onSuccess(res, file, uploadFiles.value);
      props.onChange(file, uploadFiles.value);
    }
  }
  function handleStart(rawFile) {
    const uid = genUid(tempIndex++);
    rawFile.uid = uid;
    const file = {
      name: rawFile.name,
      percentage: 0,
      status: "ready",
      size: rawFile.size,
      raw: rawFile,
      uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.error("[Element Error][Upload]", err);
        props.onError(err, file, uploadFiles.value);
      }
    }
    uploadFiles.value.push(file);
    props.onChange(file, uploadFiles.value);
  }
  function handleRemove(file, raw) {
    if (raw) {
      file = getFile(raw, uploadFiles.value);
    }
    const doRemove = () => {
      abort(file);
      const fileList = uploadFiles.value;
      fileList.splice(fileList.indexOf(file), 1);
      props.onRemove(file, fileList);
    };
    if (!props.beforeRemove) {
      doRemove();
    } else if (typeof props.beforeRemove === "function") {
      const before = props.beforeRemove(file, uploadFiles.value);
      if (before instanceof Promise) {
        before.then(() => {
          doRemove();
        }).catch(NOOP);
      } else if (before !== false) {
        doRemove();
      }
    }
  }
  function submit() {
    uploadFiles.value.filter((file) => file.status === "ready").forEach((file) => {
      uploadRef.value.upload(file.raw);
    });
  }
  vue.watch(() => props.listType, (val) => {
    if (val === "picture-card" || val === "picture") {
      uploadFiles.value = uploadFiles.value.map((file) => {
        if (!file.url && file.raw) {
          try {
            file.url = URL.createObjectURL(file.raw);
          } catch (err) {
            props.onError(err, file, uploadFiles.value);
          }
        }
        return file;
      });
    }
  });
  vue.watch(() => props.fileList, (fileList) => {
    if (!isEqual__default['default'](cachedFiles, fileList)) {
      cachedFiles = [];
      uploadFiles.value = fileList.map((file) => {
        const cloneFile = cloneDeep__default['default'](file);
        cachedFiles.push(cloneFile);
        return __spreadProps(__spreadValues({}, cloneFile), {
          uid: file.uid || genUid(tempIndex++),
          status: file.status || "success"
        });
      });
    }
  }, {
    immediate: true,
    deep: true
  });
  return {
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    uploadFiles,
    uploadRef
  };
};

var script$3 = vue.defineComponent({
  name: "ElUpload",
  components: {
    Upload: script$2,
    UploadList: script
  },
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "file"
    },
    drag: {
      type: Boolean,
      default: false
    },
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "select"
    },
    beforeUpload: {
      type: Function,
      default: NOOP
    },
    beforeRemove: {
      type: Function,
      default: NOOP
    },
    onRemove: {
      type: Function,
      default: NOOP
    },
    onChange: {
      type: Function,
      default: NOOP
    },
    onPreview: {
      type: Function,
      default: NOOP
    },
    onSuccess: {
      type: Function,
      default: NOOP
    },
    onProgress: {
      type: Function,
      default: NOOP
    },
    onError: {
      type: Function,
      default: NOOP
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: "text"
    },
    httpRequest: {
      type: Function,
      default: upload
    },
    disabled: Boolean,
    limit: {
      type: Number,
      default: null
    },
    onExceed: {
      type: Function,
      default: () => NOOP
    }
  },
  setup(props) {
    const elForm = vue.inject(form.elFormKey, {});
    const uploadDisabled = vue.computed(() => {
      return props.disabled || elForm.disabled;
    });
    const {
      abort,
      clearFiles,
      handleError,
      handleProgress,
      handleStart,
      handleSuccess,
      handleRemove,
      submit,
      uploadRef,
      uploadFiles
    } = useHandlers(props);
    vue.provide("uploader", vue.getCurrentInstance());
    vue.onBeforeUnmount(() => {
      uploadFiles.value.forEach((file) => {
        if (file.url && file.url.indexOf("blob:") === 0) {
          URL.revokeObjectURL(file.url);
        }
      });
    });
    return {
      abort,
      dragOver: vue.ref(false),
      draging: vue.ref(false),
      handleError,
      handleProgress,
      handleRemove,
      handleStart,
      handleSuccess,
      uploadDisabled,
      uploadFiles,
      uploadRef,
      submit,
      clearFiles
    };
  },
  render() {
    var _a, _b;
    let uploadList;
    if (this.showFileList) {
      uploadList = vue.h(script, {
        disabled: this.uploadDisabled,
        listType: this.listType,
        files: this.uploadFiles,
        onRemove: this.handleRemove,
        handlePreview: this.onPreview
      }, this.$slots.file ? {
        default: (props) => {
          return this.$slots.file({
            file: props.file
          });
        }
      } : null);
    } else {
      uploadList = null;
    }
    const uploadData = {
      type: this.type,
      drag: this.drag,
      action: this.action,
      multiple: this.multiple,
      "before-upload": this.beforeUpload,
      "with-credentials": this.withCredentials,
      headers: this.headers,
      name: this.name,
      data: this.data,
      accept: this.accept,
      fileList: this.uploadFiles,
      autoUpload: this.autoUpload,
      listType: this.listType,
      disabled: this.uploadDisabled,
      limit: this.limit,
      "on-exceed": this.onExceed,
      "on-start": this.handleStart,
      "on-progress": this.handleProgress,
      "on-success": this.handleSuccess,
      "on-error": this.handleError,
      "on-preview": this.onPreview,
      "on-remove": this.handleRemove,
      "http-request": this.httpRequest,
      ref: "uploadRef"
    };
    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = vue.h(script$2, uploadData, {
      default: () => trigger == null ? void 0 : trigger()
    });
    return vue.h("div", [
      this.listType === "picture-card" ? uploadList : null,
      this.$slots.trigger ? [uploadComponent, this.$slots.default()] : uploadComponent,
      (_b = (_a = this.$slots).tip) == null ? void 0 : _b.call(_a),
      this.listType !== "picture-card" ? uploadList : null
    ]);
  }
});

script$3.__file = "packages/upload/src/index.vue";

script$3.install = (app) => {
  app.component(script$3.name, script$3);
};
const _Upload = script$3;

exports.default = _Upload;
