import React from 'react';
import Html from 'slate-html-serializer';

const BLOCK_TAGS = {
    h1: 'section',
    h2: 'subsection',
    h3: 'title',
    h4: 'subtitle',
    p: 'paragraph',
    img: 'image',
    blockquote: 'quote',
    pre: 'code',
}

const MARK_TAGS = {
    i: 'italic',
    strong: 'bold'
}

const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (!type) return
            return {
                kind: 'block',
                type,
                nodes: next(el.childNodes)
            }
        },
        serialize(object, children) {
            if (object.kind != 'block') return
            switch (object.type) {
                case 'section': return <h1>{children}</h1>
                case 'subsection': return <h2>{children}</h2>
                case 'title': return <h3>{children}</h3>
                case 'subtitle': return <h4>{children}</h4>    
                case 'paragraph': return <p>{children}</p>
                case 'img': return <img />    
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

export default new Html({ rules })

export const schema = {
    nodes: {
        // section: props => <h1 {...props.attributes}>{props.children}</h1>,
        // subsection: props => <h2>{...props.attributes}>{props.children}</h2>,
        // title: props => <h3 {...props.attributes}>{props.children}</h3>,
        // subtitle: props => <h4 {...props.attriutes}>{props.children}</h4>,
        code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
        paragraph: props => <p {...props.attributes}>{props.children}</p>,
        quote: props => <blockquote {...props.attributes}>{props.children}</blockquote>
    },
    marks: {
        bold: props => <strong>{props.children}</strong>,
        italic: props => <i>{props.children}</i>
    }
}

// const initialState = State.fromJSON(existingState  ||
// {
//     document: {
//         nodes: [
//             {
//                 kind: 'block',
//                 type: 'paragraph',
//                 nodes: [
//                     {
//                         kind: 'text',
//                         ranges: [
//                             {
//                                 text: 'This is my paragraph.  '
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// }
// )
