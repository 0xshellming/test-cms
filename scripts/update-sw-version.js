import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swPath = path.join(__dirname, '../public/sw.js')

try {
  // 获取当前 git commit hash
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
  console.log('Current commit hash:', commitHash)

  if (fs.existsSync(swPath)) {
    let content = fs.readFileSync(swPath, 'utf-8')
    // 替换 CACHE_VERSION 的值
    const newContent = content.replace(
      /const CACHE_VERSION = ['"].*['"]/,
      `const CACHE_VERSION = '${commitHash}'`,
    )

    if (content !== newContent) {
      fs.writeFileSync(swPath, newContent)
      console.log(`Successfully updated public/sw.js CACHE_VERSION to '${commitHash}'`)
    } else {
      console.log('public/sw.js CACHE_VERSION is already up to date.')
    }
  } else {
    console.warn(`Warning: ${swPath} not found.`)
  }
} catch (error) {
  console.warn('Failed to update sw.js version (maybe not a git repo?):', error.message)
}
