import { useEffect } from 'react'

/**
 * 自定义 Hook：管理页面滚动位置的保存和恢复
 * @param key - 存储滚动位置的唯一标识符
 */
export function useScrollRestoration(key: string) {
  // 恢复滚动位置
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(key)
    if (savedScrollPosition) {
      // 使用 setTimeout 确保 DOM 已完全渲染
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'instant' as ScrollBehavior,
        })
        // 恢复后清除保存的位置
        sessionStorage.removeItem(key)
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [key])

  // 返回保存滚动位置的函数
  const saveScrollPosition = () => {
    sessionStorage.setItem(key, window.scrollY.toString())
  }

  return { saveScrollPosition }
}





