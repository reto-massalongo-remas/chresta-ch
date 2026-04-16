import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

export default function NewsDetail() {
  return (
    <>
      <div style={{ height: 320, backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&auto=format&fit=crop&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="breadcrumb">
            <Link to="/">chresta.ch</Link><span className="sep">›</span>
            <Link to="/news">News</Link><span className="sep">›</span>
            <strong>Artikel</strong>
          </div>

          <FadeIn>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <span className="badge badge-teal">Kurse</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--hint)' }}>12. April 2026</span>
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 600, color: 'var(--text)', marginBottom: 20, lineHeight: 1.25 }}>
              Neue Motorrad-Kursdaten für Sommer 2026
            </h1>
            <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>Ab sofort sind alle Motorrad-Grundkurse und Schnupperkurse für die Sommersaison 2026 buchbar. Die Plätze sind begrenzt – wir empfehlen eine frühzeitige Buchung.</p>
              <p style={{ marginBottom: 16 }}>Unser Angebot umfasst Schnupperkurse für Einsteiger, die obligatorischen PGS-Grundkurse sowie weiterführende Kurse wie das Kurventraining für Fortgeschrittene.</p>
              <p style={{ marginBottom: 16 }}>Alle Kurse können direkt online mit Sofortbestätigung gebucht werden. Bei Fragen steht Ihnen unser Team gerne telefonisch oder per E-Mail zur Verfügung.</p>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', margin: '32px 0 12px' }}>Verfügbare Kursdaten</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20 }}>
                <li>PGS 1 – Grundkurs: Sa 25.01.2026, 08:00–17:00 Uhr</li>
                <li>Schnupperkurs: Sa 18.01.2026, 09:00–12:00 Uhr</li>
                <li>Kurventraining: So 22.03.2026 (ausgebucht)</li>
              </ul>
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
              <Link to="/fahrschule/motorrad" className="btn btn-teal">Jetzt buchen →</Link>
              <Link to="/news" className="btn btn-ghost">← Alle News</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
