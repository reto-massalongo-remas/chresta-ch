import { useNavigate } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'

export default function Checkout() {
  const navigate = useNavigate()

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <FadeIn>
          <h1 style={{ fontSize: 32, fontWeight: 600, marginBottom: 32 }}>💳 Checkout</h1>
          <div className="steps mb-32">
            {['Angaben', 'Zahlung', 'Bestätigung'].map((s, i) => (
              <>
                <div key={s} className={`step ${i === 0 ? 'active' : ''}`}>
                  <div className="step-num">{i + 1}</div>
                  <span className="step-label">{s}</span>
                </div>
                {i < 2 && <div className="step-line" />}
              </>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="card">
                <div className="card-header">Persönliche Angaben</div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" placeholder="Max" /></div>
                    <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" placeholder="Muster" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">E-Mail</label><input className="form-input" type="email" placeholder="max@muster.ch" /></div>
                  <div className="form-group"><label className="form-label">Telefon</label><input className="form-input" type="tel" placeholder="+41 79 123 45 67" /></div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Zahlung</div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['💳 Kreditkarte (Visa / Mastercard)', '🏦 TWINT', '📧 Rechnung (auf Anfrage)'].map(m => (
                    <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid var(--border-lt)', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
                      <input type="radio" name="payment" defaultChecked={m.includes('Kreditkarte')} />
                      <span style={{ fontSize: 14 }}>{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="checkbox-row">
                <input type="checkbox" required />
                <span style={{ fontSize: 13 }}>Ich akzeptiere die <a href="#" style={{ color: 'var(--teal)' }}>AGB</a> und <a href="#" style={{ color: 'var(--teal)' }}>Datenschutzerklärung</a></span>
              </label>

              <button className="btn btn-teal btn-lg" onClick={() => navigate('/danke/buchung')}>
                Jetzt bezahlen & buchen →
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="card">
              <div className="card-header">Bestellung</div>
              <div className="card-body">
                {[['Fahrstunde Auto Kat. B', 'CHF 98.00'], ['Nothelfer-Kurs Teil 1', 'CHF 25.00']].map(([n, p]) => (
                  <div key={n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border-lt)' }}>
                    <span>{n}</span><span>{p}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', color: 'var(--muted)', borderBottom: '1px solid var(--border-lt)' }}>
                  <span>MwSt. 7.7%</span><span>CHF 9.47</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, padding: '14px 0' }}>
                  <span>Total</span><span>CHF 132.47</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
