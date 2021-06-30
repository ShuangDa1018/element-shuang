import { defineComponent } from 'vue';

var DescriptionsItem = defineComponent({
  name: "ElDescriptionsItem"
});

DescriptionsItem.install = (app) => {
  app.component(DescriptionsItem.name, DescriptionsItem);
};
const _DescriptionsItem = DescriptionsItem;

export default _DescriptionsItem;
