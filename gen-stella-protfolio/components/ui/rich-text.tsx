'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Trash } from 'lucide-react'

type Props = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value = '', onChange, placeholder, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isUnordered, setIsUnordered] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)

  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) ref.current.innerHTML = value
  }, [value])

  function exec(command: string, arg?: string) {
    document.execCommand(command, false, arg)
    onChange && onChange(ref.current?.innerHTML || '')
    // update toolbar active state after executing a command
    updateActiveState()
    ref.current?.focus()
  }

  function insertLink() {
    const url = window.prompt('Enter URL (https://...)')
    if (url) exec('createLink', url)
  }

  function updateActiveState() {
    try {
      // Use DOM inspection of the current selection to determine active formats
      const sel = document.getSelection()
      if (!sel || !ref.current) return

      function ancestorHas(node: Node | null, predicate: (el: HTMLElement) => boolean) {
        let n: Node | null = node
        while (n && n !== ref.current) {
          if (n.nodeType === 1) {
            const el = n as HTMLElement
            if (predicate(el)) return true
          }
          n = n.parentNode
        }
        return false
      }

      const anchor = sel.anchorNode || sel.focusNode

      const boldActive = ancestorHas(anchor, (el) => {
        const t = el.tagName.toLowerCase()
        if (t === 'b' || t === 'strong') return true
        const w = window.getComputedStyle(el).fontWeight
        return w === 'bold' || Number(w) >= 600
      })

      const italicActive = ancestorHas(anchor, (el) => {
        const t = el.tagName.toLowerCase()
        if (t === 'i' || t === 'em') return true
        return window.getComputedStyle(el).fontStyle === 'italic'
      })

      const underlineActive = ancestorHas(anchor, (el) => {
        const t = el.tagName.toLowerCase()
        if (t === 'u') return true
        return window.getComputedStyle(el).textDecorationLine?.includes('underline')
      })

      const unorderedActive = ancestorHas(anchor, (el) => el.tagName.toLowerCase() === 'ul')
      const orderedActive = ancestorHas(anchor, (el) => el.tagName.toLowerCase() === 'ol')

      setIsBold(!!boldActive)
      setIsItalic(!!italicActive)
      setIsUnderline(!!underlineActive)
      setIsUnordered(!!unorderedActive)
      setIsOrdered(!!orderedActive)
    } catch (e) {
      // ignore if unsupported
    }
  }

  function setCaretAtPoint(e: React.MouseEvent<HTMLDivElement>) {
    try {
      const x = e.clientX
      const y = e.clientY
      const sel = window.getSelection()
      if (!sel) return

      // If the user has an active selection (not collapsed), don't override it.
      if (!sel.isCollapsed && (sel.toString && sel.toString().length > 0)) return

      let range: Range | null = null
      if ((document as any).caretRangeFromPoint) {
        range = (document as any).caretRangeFromPoint(x, y)
      } else if ((document as any).caretPositionFromPoint) {
        const pos = (document as any).caretPositionFromPoint(x, y)
        range = document.createRange()
        range.setStart(pos.offsetNode, pos.offset)
        range.collapse(true)
      }

      if (range) {
        sel.removeAllRanges()
        sel.addRange(range)
      }
    } catch (err) {
      // ignore
    }
  }

  // keep toolbar in sync when selection changes
  React.useEffect(() => {
    document.addEventListener('selectionchange', updateActiveState)
    return () => document.removeEventListener('selectionchange', updateActiveState)
  }, [])

  return (
    <div className={className}>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => exec('bold')}
          aria-label="Bold"
          title="Bold"
          aria-pressed={isBold}
          className={`p-2 rounded-md text-sm ${isBold ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => exec('italic')}
          aria-label="Italic"
          title="Italic"
          aria-pressed={isItalic}
          className={`p-2 rounded-md text-sm ${isItalic ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => exec('underline')}
          aria-label="Underline"
          title="Underline"
          aria-pressed={isUnderline}
          className={`p-2 rounded-md text-sm ${isUnderline ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
          <Underline size={16} />
        </button>

        <button
          type="button"
          onClick={() => exec('insertUnorderedList')}
          aria-label="Unordered list"
          title="Bullet list"
          aria-pressed={isUnordered}
          className={`p-2 rounded-md text-sm ${isUnordered ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => exec('insertOrderedList')}
          aria-label="Ordered list"
          title="Numbered list"
          aria-pressed={isOrdered}
          className={`p-2 rounded-md text-sm ${isOrdered ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-gray-100 dark:bg-slate-800'}`}
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={insertLink}
          aria-label="Insert link"
          title="Insert link"
          className="p-2 rounded-md bg-gray-100 dark:bg-slate-800 text-sm"
        >
          <LinkIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (ref.current) {
              ref.current.innerHTML = ''
              onChange && onChange('')
              updateActiveState()
            }
          }}
          aria-label="Clear content"
          title="Clear"
          className="p-2 rounded-md bg-gray-100 dark:bg-slate-800 text-sm"
        >
          <Trash size={16} />
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          onChange && onChange(ref.current?.innerHTML || '')
          updateActiveState()
        }}
        onBlur={() => {
          onChange && onChange(ref.current?.innerHTML || '')
          updateActiveState()
        }}
        onMouseUp={(e) => setCaretAtPoint(e)}
        data-rich-text-editor="true"
        className="min-h-[140px] rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-3 text-sm bg-white dark:bg-slate-950 focus:outline-none"
        data-placeholder={placeholder}
        style={{ whiteSpace: 'pre-wrap' }}
      />
    </div>
  )
}
