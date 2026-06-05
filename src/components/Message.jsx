import ReactMarkdown from 'react-markdown'
import styles from './Message.module.css'

export default function Message({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.assistant}`}>
      <div className={styles.avatar}>
        {isUser ? 'Tú' : 'AI'}
      </div>
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {isUser ? (
          <p className={styles.text}>{content}</p>
        ) : (
          <ReactMarkdown className={styles.markdown}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  )
}
