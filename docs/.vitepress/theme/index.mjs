import DefaultTheme from 'vitepress/theme'
import './mermaid-zoom.css'

let svgPanZoom

function initMermaidZoom() {
  document.querySelectorAll('.mermaid svg:not([data-zoom-init])').forEach((svg) => {
    svg.setAttribute('data-zoom-init', 'true')
    const container = svg.closest('.mermaid')

    const instance = svgPanZoom(svg, {
      panEnabled: true,
      zoomEnabled: true,
      dblClickZoomEnabled: false,
      mouseWheelZoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      minZoom: 0.5,
      maxZoom: 15,
    })

    const resetBtn = document.createElement('button')
    resetBtn.type = 'button'
    resetBtn.className = 'mermaid-reset-btn'
    resetBtn.textContent = 'Reset zoom'
    resetBtn.addEventListener('click', () => instance.reset())
    container.appendChild(resetBtn)
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    import('svg-pan-zoom').then((mod) => {
      svgPanZoom = mod.default
      let timer
      const observer = new MutationObserver(() => {
        clearTimeout(timer)
        timer = setTimeout(initMermaidZoom, 150)
      })
      observer.observe(document.body, { childList: true, subtree: true })
      initMermaidZoom()
    })

    router.onAfterRouteChange = () => setTimeout(initMermaidZoom, 150)
  },
}
