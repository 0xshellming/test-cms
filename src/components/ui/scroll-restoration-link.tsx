'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'

type ScrollRestorationLinkProps = ComponentProps<typeof Link> & {
  scrollKey: string
}

/**
 * 带滚动位置保存功能的 Link 组件
 * 点击时会自动保存当前页面的滚动位置
 */
export function ScrollRestorationLink({
  scrollKey,
  onClick,
  ...props
}: ScrollRestorationLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 保存滚动位置
    sessionStorage.setItem(scrollKey, window.scrollY.toString())

    // 调用原始的 onClick 处理器（如果有）
    onClick?.(e)
  }

  return <Link {...props} onClick={handleClick} />
}





