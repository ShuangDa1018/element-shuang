'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var DescriptionsItem = vue.defineComponent({
  name: "ElDescriptionsItem"
});

DescriptionsItem.install = (app) => {
  app.component(DescriptionsItem.name, DescriptionsItem);
};
const _DescriptionsItem = DescriptionsItem;

exports.default = _DescriptionsItem;
