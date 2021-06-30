import isServer from './isServer';

let rAF = (fn) => setTimeout(fn, 16);
let cAF = (handle) => clearTimeout(handle);
if (!isServer) {
    rAF = (fn) => window.requestAnimationFrame(fn);
    cAF = (handle) => window.cancelAnimationFrame(handle);
}

export { cAF, rAF };
