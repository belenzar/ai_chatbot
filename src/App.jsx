import { useEffect, useRef } from 'react'
import { useChat } from './hooks/useChat'
import Message from './components/Message'
import ChatInput from './components/ChatInput'
import styles from './App.module.css'

const SYSTEM_PROMPT = `You are a helpful, friendly, and knowledgeable AI assistant.
You respond clearly and concisely. You use markdown formatting when helpful (code blocks, lists, etc).
Always respond in the same language the user writes in.`

export default function App() {
  const { messages, loading, error, sendMessage, clearMessages } = useChat(SYSTEM_PROMPT)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span className={styles.logoText}>AI Chat</span>
          </div>
          <button
            className={styles.clearBtn}
            onClick={clearMessages}
            disabled={messages.length === 0}
            title="Limpiar conversación"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            </svg>
            Nueva conversación
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {messages.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>✦</div>
            <h2 className={styles.emptyTitle}>¿En qué puedo ayudarte?</h2>
            <p className={styles.emptySubtitle}>Hacé una pregunta, pedí que te explique algo, o simplemente conversá.</p>
            <div className={styles.suggestions}>
              {[
                '¿Qué es React y para qué sirve?',
                'Explicame cómo funciona una API REST',
                'Ayudame a escribir un email profesional',
              ].map(s => (
                <button key={s} className={styles.suggestionBtn} onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div className={styles.thinking}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            )}
            {error && (
              <div className={styles.error}>
                <span>⚠ {error}</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <ChatInput onSend={sendMessage} disabled={loading} />
      </footer>
    </div>
  )
}
