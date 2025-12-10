import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { marked } from 'marked'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 将 Markdown 字符串转换为 HTML
 * @param markdown - Markdown 格式的字符串
 * @returns HTML 字符串
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) {
    return ''
  }

  try {
    // 配置 marked 选项，确保安全性和格式
    marked.setOptions({
      breaks: true, // 支持换行符
      gfm: true, // GitHub Flavored Markdown
    })

    return marked.parse(markdown) as string
  } catch (error) {
    console.error('Failed to parse markdown:', error)
    // 如果解析失败，返回原始文本（转义 HTML）
    return markdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
}
