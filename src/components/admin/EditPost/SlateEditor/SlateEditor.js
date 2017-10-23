import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { State } from 'slate';
import Html from 'slate-html-serializer';
import rules from './html-rules';
import axios from 'axios';



const html = new Html({ rules })

const existingState = '<p>Hello</p>'

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

class SlateEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            state: html.deserialize(existingState),
            schema: {
                nodes: {
                    code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
                    paragraph: props => <p {...props.attributes}>{props.children}</p>,
                    quote: props => <blockquote {...props.attributes}>{props.children}</blockquote>
                },
                marks: {
                    bold: props => <strong>{props.children}</strong>,
                    italic: props => <i>{props.children}</i>
                }
            }
        }
        this.ctrl = false
    }
    onChange = ({ state }) => {
        if (state.document != this.state.document) {
            let string = html.serialize(state)
            console.log(string)
            localStorage.setItem('content', string)
        }
        this.setState({ state })
    }
    onKeyDown = (event, change) => {
        // console.log(change.state)
        // SETS CONTROL TO TRUE WHEN PRESSED
        if (event.key == 'Control') {
            this.ctrl = true
        }
        // RETURN IF CONTROL IS NOT PRESSED
        if (!this.ctrl) return
        else switch (event.key) {
            // CHANGE BLOCK BETWEEN CODE AND PARAGRAPH ON '`'
            case '`':
                console.log('code command')
                let isCode = change.state.blocks.some(block => block.type == 'code')
                event.preventDefault();
                change.setBlock(isCode ? 'paragraph' : 'code')
                return true;
            case 'b':
                console.log('bold command')
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            case 'i':
                console.log('italic command')
                event.preventDefault();
                change.toggleMark('italic')
            default:
                return;
        }
    }
    onKeyUp = (event, change) => {
        // SETS CONTROL BACK TO FALSE WHEN RELEASED
        if (event.key == 'Control') {
            this.ctrl = false
        }
    }
    save() {

    }
    render() {
        return (
            <div className='text-box'>
                <Editor
                    schema={this.state.schema}
                    state={this.state.state}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                />
                {/* <button onClick={this.save}>Save</button> */}
            </div>
        )
    }
}

export default SlateEditor
