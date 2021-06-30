import type { StrictModifiers, Placement } from '@popperjs/core';
interface ModifierProps {
    offset?: number;
    arrow?: HTMLElement;
    arrowOffset?: number;
    gpuAcceleration?: boolean;
    fallbackPlacements?: Array<Placement>;
}
export default function buildModifier(props: ModifierProps, externalModifiers?: StrictModifiers[]): StrictModifiers[];
export {};
