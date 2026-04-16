import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

interface Props {
  title: string
  icon: string
  color: string
}

export default function CategoryStub({ title, icon, color }: Props) {
  return (
    <>
      <div style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, padding: '64px 0', backdropFilter: 'blur(4px)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{icon}</div>
            <h1 style={{ fontSize: 42, fontWeight: 500, color: '#fff', marginBottom: 12 }}>{title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16 }}>
              Wähle aus unserem Angebot und buche direkt online.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {['Kurs 1', 'Kurs 2', 'Kurs 3'].map(k => (
                <div key={k} className="card">
                  <div className="card-header">{icon} {k}</div>
                  <div className="card-body">
                    <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>Detailierte Kursinformationen und Buchungsmöglichkeit.</p>
                    <Link to="/fahrstunden-buchen" className="btn btn-teal btn-sm">Buchen →</Link>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Fragen? Wir beraten Sie gerne.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link to="/kontakt" className="btn btn-teal">Kontakt aufnehmen</Link>
                <Link to="/" className="btn btn-ghost">← Zurück</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
