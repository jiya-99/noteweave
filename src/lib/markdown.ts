import { marked } from 'marked'
import DOMPurify from 'dompurify'
marked.setOptions({ gfm: true, breaks: true })
export function renderMarkdown(source: string): string { return DOMPurify.sanitize(marked.parse(source) as string) }
export function extractWikiLinks(source: string): string[] { return [...source.matchAll(/\[\[([^\]]+)\]\]/g)].map(m => m[1].trim()) }
export function replaceWikiLinks(source: string, notes: {title:string}[]): string {
  return source.replace(/\[\[([^\]]+)\]\]/g, (_m, name: string) => {
    const found = notes.find(n => n.title.toLowerCase() === name.toLowerCase())
    return found ? `[${name}](#wiki:${encodeURIComponent(name)})` : `**${name}**`
  })
}
