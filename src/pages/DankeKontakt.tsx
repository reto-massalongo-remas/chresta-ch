import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DankeKontakt() {
  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 32px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: 440 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 72, marginBottom: 24 }}
        >
          ✉️
        </motion.div>
        <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 12 }}>Nachricht gesendet!</h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 36 }}>
          Vielen Dank für deine Nachricht. Wir melden uns innert 1–2 Werktagen bei dir.
        </p>
        <Link to="/" className="btn btn-teal btn-lg">Zurück zur Startseite →</Link>
      </motion.div>
    </section>
  )
}
