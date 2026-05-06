import hljs from 'highlight.js'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'ts'
      return hljs.highlight(code, { language }).value
    }
  })
)

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown) as string
}
