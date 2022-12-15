import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import markDownStyle from './markdown-styles.module.css'

export const Markdown = ({ text }: { text: string }) => {

    return (
        <ReactMarkdown
            className={markDownStyle.reactMarkDown}
            remarkPlugins={[gfm, remarkBreaks]}
        >
            {text}
        </ReactMarkdown>
    )
}
export default Markdown
