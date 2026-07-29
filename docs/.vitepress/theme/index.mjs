import DefaultTheme from 'vitepress/theme'
import './mermaid-zoom.css'

function toggleZoom(e) {
  const container = e.target.closest('.mermaid')
  if (!container) return
  container.classList.toggle('mermaid-zoomed')
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof document === 'undefined') return
    document.addEventListener('click', toggleZoom)
    router.onAfterRouteChange = () => {
      document.querySelectorAll('.mermaid.mermaid-zoomed').forEach((el) => {
        el.classList.remove('mermaid-zoomed')
      })
    }
  },
}
