import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

export default function KontaktTemplate() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/danke/kontakt')
  }

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--teal-dark), var(--teal))', padding: '52px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 38, fontWeight: 500, color: '#fff', marginBottom: 10 }}>✉️ Kontakt</h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15 }}>
              Haben Sie Fragen? Wir melden uns innert 1–2 Werktagen.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">chresta.ch</Link>
          <span className="sep">›</span>
          <strong>Kontakt</strong>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48 }}>

            {/* Form */}
            <FadeIn>
              <h2 className="section-title" style={{ marginBottom: 24 }}>Nachricht senden</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Vorname *</label>
                    <input className="form-input" placeholder="Max" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nachname *</label>
                    <input className="form-input" placeholder="Muster" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">E-Mail *</label>
                  <input className="form-input" type="email" placeholder="max@muster.ch" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input className="form-input" type="tel" placeholder="+41 79 123 45 67" />
                </div>
                <div className="form-group">
                  <label className="form-label">Betreff *</label>
                  <div className="form-select-wrap">
                    <select className="form-select" required>
                      <option value="">Betreff wählen ▾</option>
                      <option>Frage zu einem Kurs</option>
                      <option>Fahrstunde buchen</option>
                      <option>Firmen-Weiterbildung</option>
                      <option>Boot-Kurs Anfrage</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Nachricht *</label>
                  <textarea className="form-textarea" placeholder="Ihre Nachricht..." rows={5} required />
                </div>
                <label className="checkbox-row">
                  <input type="checkbox" required />
                  <span>Ich akzeptiere die <a href="#" style={{ color: 'var(--teal)' }}>Datenschutzerklärung</a></span>
                </label>
                <div>
                  <button type="submit" className="btn btn-teal btn-lg">Nachricht senden →</button>
                </div>
              </form>
            </FadeIn>

            {/* Contact info sidebar */}
            <FadeIn delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card">
                  <div className="card-header">📍 Unsere Adresse</div>
                  <div className="card-body">
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--muted)' }}>
                      Chresta GmbH<br />
                      Industriestrasse 17<br />
                      8910 Affoltern am Albis
                    </p>
                    <div style={{ height: 120, background: 'var(--bg)', borderRadius: 'var(--radius)', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                      🗺
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">📞 Direkt erreichen</div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a href="tel:0447615958" className="btn btn-teal btn-full">📞 044 761 59 58</a>
                    <a href="mailto:info@chresta.ch" className="btn btn-ghost btn-full">✉ info@chresta.ch</a>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">🕐 Öffnungszeiten</div>
                  <div className="card-body">
                    {[['Mo – Fr', '08:00 – 18:00'], ['Samstag', '09:00 – 14:00'], ['Sonntag', 'Geschlossen']].map(([d, t]) => (
                      <div key={d} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '7px 0', borderBottom: '1px solid var(--border-lt)' }}>
                        <span style={{ color: 'var(--muted)' }}>{d}</span>
                        <span style={{ fontWeight: 500 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
