import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const BOOKINGS = [
  { id: 1, name: 'Fahrstunde Auto Kat. B', detail: 'Mo 09.06.2026 · 09:00 · Marco Chresta', status: 'Bestätigt',    price: 'CHF 98.00' },
  { id: 2, name: 'Nothelfer-Kurs Teil 1',  detail: 'Sa 06.12.2025 · 16:30 Uhr',             status: 'Abgeschlossen', price: 'CHF 25.00' },
  { id: 3, name: 'PGS 1 Motorrad',         detail: 'Sa 25.01.2026 · 08:00 Uhr',             status: 'Bestätigt',    price: 'CHF 290.00' },
]

const STATUS_BADGE: Record<string, string> = {
  'Bestätigt': 'badge-green',
  'Abgeschlossen': 'badge-gray',
  'Ausstehend': 'badge-orange',
}

const NAV_ITEMS = [
  { id: 'buchungen', icon: '📅', label: 'Buchungen' },
  { id: 'bestellungen', icon: '🛍', label: 'Bestellungen' },
  { id: 'profil', icon: '👤', label: 'Profil' },
]

export default function Konto() {
  const [activeNav, setActiveNav] = useState('buchungen')

  return (
    <section className="section section-bg">
      <div className="container" style={{ maxWidth: 900 }}>
        <FadeIn>
          <div className="card" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: 'var(--teal-dark)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 16 }}>MM</div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 16 }}>Max Muster</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>max@muster.ch</div>
              </div>
              <Link to="/" className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>Abmelden</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr' }}>
              {/* Sidebar Nav */}
              <div style={{ borderRight: '1px solid var(--border-lt)' }}>
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '14px 20px', background: activeNav === item.id ? 'var(--teal-pale)' : 'transparent',
                      border: 'none', borderBottom: '1px solid var(--border-lt)', textAlign: 'left',
                      color: activeNav === item.id ? 'var(--teal)' : 'var(--muted)',
                      fontWeight: activeNav === item.id ? 600 : 400, fontSize: 14, cursor: 'pointer',
                      transition: 'all .12s',
                    }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </button>
                ))}
                <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '14px 20px', background: 'transparent', border: 'none', color: 'var(--error)', fontSize: 14, cursor: 'pointer' }}>
                  🚪 Abmelden
                </button>
              </div>

              {/* Content */}
              <div style={{ padding: 28 }}>
                {activeNav === 'buchungen' && (
                  <motion.div key="buchungen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Nächste Buchungen</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {BOOKINGS.map(b => (
                        <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-lt)' }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{b.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--hint)' }}>{b.detail}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>{b.price}</span>
                            <span className={`badge ${STATUS_BADGE[b.status]}`}>{b.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 24 }}>
                      <Link to="/fahrstunden-buchen" className="btn btn-teal">+ Neue Buchung</Link>
                    </div>
                  </motion.div>
                )}
                {activeNav === 'bestellungen' && (
                  <motion.div key="bestellungen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Bestellungen</h2>
                    <p style={{ color: 'var(--muted)' }}>Keine Bestellungen vorhanden.</p>
                    <Link to="/shop" className="btn btn-teal" style={{ marginTop: 16 }}>Shop besuchen →</Link>
                  </motion.div>
                )}
                {activeNav === 'profil' && (
                  <motion.div key="profil" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Mein Profil</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 380 }}>
                      <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" defaultValue="Max" /></div>
                      <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" defaultValue="Muster" /></div>
                      <div className="form-group"><label className="form-label">E-Mail</label><input className="form-input" type="email" defaultValue="max@muster.ch" /></div>
                      <div className="form-group"><label className="form-label">Telefon</label><input className="form-input" type="tel" defaultValue="+41 79 123 45 67" /></div>
                      <button className="btn btn-teal">Änderungen speichern</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
