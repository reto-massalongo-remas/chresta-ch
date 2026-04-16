import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const BIKES = [
  { name: 'Honda CB 500 F', cat: 'Kat. A beschränkt', price: 'CHF 150.00 / Tag', available: true,  img: '🏍' },
  { name: 'Yamaha MT-07',   cat: 'Kat. A',           price: 'CHF 180.00 / Tag', available: true,  img: '🏍' },
  { name: 'BMW R 1250 GS',  cat: 'Kat. A',           price: 'CHF 220.00 / Tag', available: false, img: '🏍' },
  { name: 'Kawasaki Z900',  cat: 'Kat. A',           price: 'CHF 190.00 / Tag', available: true,  img: '🏍' },
]

export default function MietTemplate() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #1a3a3a, #2d5a5a)', padding: '52px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <h1 style={{ fontSize: 38, fontWeight: 500, color: '#fff', marginBottom: 10 }}>🏍 Motorrad Mieten</h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, maxWidth: 520, lineHeight: 1.65, marginBottom: 24 }}>
              Diverse Motorräder für Freizeit, Ausbildung und Touren. Einfach online reservieren.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/fahrstunden-buchen" className="btn btn-teal">Kurs + Miete kombinieren</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">chresta.ch</Link>
          <span className="sep">›</span>
          <Link to="/mieten">Mieten / Reisen</Link>
          <span className="sep">›</span>
          <strong>Motorrad Mieten</strong>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>
            <div>
              <FadeIn>
                <p className="section-eyebrow">Unsere Flotte</p>
                <h2 className="section-title">Verfügbare Motorräder</h2>
              </FadeIn>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                {BIKES.map((b, i) => (
                  <FadeIn key={b.name} delay={i * 0.08}>
                    <div className="card" style={{ opacity: b.available ? 1 : 0.65 }}>
                      <div style={{ height: 140, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                        {b.img}
                      </div>
                      <div className="card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 600 }}>{b.name}</h3>
                          <span className={`badge ${b.available ? 'badge-green' : 'badge-red'}`}>
                            {b.available ? 'Verfügbar' : 'Vergeben'}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--hint)', marginBottom: 6 }}>{b.cat}</p>
                        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>{b.price}</p>
                        {b.available ? (
                          <Link to="/warenkorb" className="btn btn-teal btn-full btn-sm">Reservieren →</Link>
                        ) : (
                          <button className="btn btn-disabled btn-full btn-sm" disabled>Nicht verfügbar</button>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Cross-sell */}
              <div className="cross-sell">
                <div className="cross-sell-title">↔ Auch interessant</div>
                <div className="cross-pills">
                  {['PGS 1 Motorrad', 'Kurventraining', 'Kleidung Mieten', 'Motorrad Touren'].map(l => (
                    <Link key={l} to="/fahrschule" className="cross-pill">{l}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FadeIn>
                <div className="card">
                  <div className="card-header">📅 Verfügbarkeit prüfen</div>
                  <div className="card-body">
                    <div className="form-group mb-16">
                      <label className="form-label">Von</label>
                      <input type="date" className="form-input" />
                    </div>
                    <div className="form-group mb-16">
                      <label className="form-label">Bis</label>
                      <input type="date" className="form-input" />
                    </div>
                    <button className="btn btn-teal btn-full">Verfügbarkeit prüfen</button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="card">
                  <div className="card-header">Inklusive</div>
                  <div className="card-body">
                    {['Helm (auf Anfrage)', 'Pannenhilfe CHF 0', '100 km/Tag frei', 'Vollkasko möglich'].map(i => (
                      <div key={i} style={{ fontSize: 13, color: 'var(--muted)', padding: '6px 0', borderBottom: '1px solid var(--border-lt)', display: 'flex', gap: 8 }}>
                        <span>✓</span>{i}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Fragen zur Miete?</p>
                    <a href="tel:0447615958" className="btn btn-ghost-teal btn-full mb-16">📞 044 761 59 58</a>
                    <Link to="/kontakt" className="btn btn-ghost btn-full">✉️ Anfrage senden</Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
