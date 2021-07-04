import { ref } from 'vue'
export default function() {
    const chart = ref()
    const sidebarElm = ref()

    const chartResizeHandler = () => {
        if (chart.value) {
            chart.value.resize()
        }
    }

    const sidebarResizeHandler = (e) => {
        if (e.propertyName === 'width') {
            chartResizeHandler()
        }
    }

    const initResizeEvent = () => {
        window.addEventListener('resize', chartResizeHandler)
    }

    const destroyResizeEvent = () => {
        window.removeEventListener('resize', chartResizeHandler)
    }

    const initSidebarResizeEvent = () => {
        sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
        if (sidebarElm.value) {
            sidebarElm.value.addEventListener('transitionend', sidebarResizeHandler)
        }
    }

    const destroySidebarResizeEvent = () => {
        if (sidebarElm.value) {
            sidebarElm.value.removeEventListener('transitionend', sidebarResizeHandler)
        }
    }

    const mounted = () => {
        initResizeEvent()
        initSidebarResizeEvent()
    }

    const beforeDestroy = () => {
        destroyResizeEvent()
        destroySidebarResizeEvent()
    }

    const activated = () => {
        initResizeEvent()
        initSidebarResizeEvent()
    }

    const deactivated = () => {
        destroyResizeEvent()
        destroySidebarResizeEvent()
    }

    return {
        chart,
        mounted,
        beforeDestroy,
        activated,
        deactivated
    }
}