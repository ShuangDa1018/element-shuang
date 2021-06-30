import type { SFCWithInstall } from '../utils/types';
import Popper from './src/index.vue';
declare const _Popper: SFCWithInstall<typeof Popper>;
export default _Popper;
export { default as defaultProps, Effect } from './src/use-popper/defaults';
export type { Placement, Options } from '@popperjs/core';
export type { TriggerType, IPopperOptions, PopperInstance } from './src/use-popper/defaults';
export { default as usePopper } from './src/use-popper/index';
export * from './src/renderers/index';
