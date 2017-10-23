import React from 'react';

const BLOCK_TAGS = {
    p: 'paragraph',
    blockquote: 'quote',
    pre: 'code',
}

const MARK_TAGS = {
    i: 'italic',
    strong: 'bold'
}

export default [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (!type) return
            switch (el.tagName.toLowerCase()) {
                case 'p':
                    return {
                        kind: 'block',
                        type,
                        nodes: next(el.childNodes)
                    }
                case 'quote':
                    return {
                        kind: 'block',
                        type,
                        nodes: next(el.childNodes)
                    }
                case 'code':
                    return {
                        kind: 'block',
                        type,
                        nodes: next(el.children)
                    }
                default:
                    return;
            }
        },
        serialize(object, children) {
            if (object.kind != 'block') return
            switch (object.type) {
                case 'paragraph': return <p>{children}</p>
                case 'quote': return <blockquote>{children}</blockquote>
                case 'code': return <pre><code>{children}</code></pre>
            }
            if (object.kind == 'block' && object.type == 'paragraph') {
                return <p>{children}</p>
            }
        }
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (!type) return
            return {
                kind: 'mark',
                type: 'type',
                nodes: next(el.childNodes)
            }
        },
        serialize(object, children) {
            if (object.kind != 'mark') return
            switch (object.type) {
                case 'bold': return <strong>{children}</strong>
                case 'italic': return <i>{children}</i>
            }
        }
    }
]