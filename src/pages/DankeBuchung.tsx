import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DankeBuchung() {
  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 32px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: 480 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 72, marginBottom: 24 }}
        >
          ✅
        </motion.div>
        <h1 style={{ fontSize: 34, fontWeight: 600, marginBottom: 12 }}>Buchung bestätigt!</h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 8 }}>
          Vielen Dank für deine Buchung. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
        </p>
        <p style={{ fontSize: 14, color: 'var(--hint)', marginBottom: 36 }}>Buchungsnummer: #CH-2026-04523</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/konto" className="btn btn-teal btn-lg">Meine Buchungen →</Link>
          <Link to="/" className="btn btn-ghost btn-lg">Zur Startseite</Link>
        </div>
      </motion.div>
    </section>
  )
}
