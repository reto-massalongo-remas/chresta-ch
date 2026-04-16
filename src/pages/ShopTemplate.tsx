import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const PRODUCTS = [
  { name: 'Theorie-App Kat. B', desc: '1 Jahr Vollzugang zur offiziellen Lern-App', price: 'CHF 39.00', badge: 'Bestseller', icon: '📱' },
  { name: 'Theoriebuch Kat. B', desc: 'Aktuellste Ausgabe, 200+ Fragen mit Lösungen', price: 'CHF 28.00', badge: null, icon: '📘' },
  { name: 'Fahrstunden-Paket 5×', desc: '5 Fahrstunden Kat. B, 15% Rabatt', price: 'CHF 416.50', badge: '15% Rabatt', icon: '🗓' },
  { name: 'Fahrstunden-Paket 10×', desc: '10 Fahrstunden Kat. B, 20% Rabatt', price: 'CHF 784.00', badge: '20% Rabatt', icon: '🗓' },
  { name: 'Gutschein CHF 100', desc: 'Für alle Kurse und Fahrstunden einlösbar', price: 'CHF 100.00', badge: 'Geschenk-Tipp', icon: '🎁' },
  { name: 'Gutschein CHF 250', desc: 'Perfektes Geschenk für Führerschein-Anwärter', price: 'CHF 250.00', badge: null, icon: '🎁' },
]

export default function ShopTemplate() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--navy), #1a1f4a)', padding: '52px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 38, fontWeight: 500, color: '#fff', marginBottom: 10 }}>🛍 Shop</h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, maxWidth: 500 }}>
              Lehrmittel, Fahrstunden-Pakete und Gutscheine – alles direkt online bestellen.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">chresta.ch</Link>
          <span className="sep">›</span>
          <Link to="/fahrschule">Fahrschule</Link>
          <span className="sep">›</span>
          <strong>Shop</strong>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 100, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                    {p.icon}
                  </div>
                  <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{p.name}</h3>
                      {p.badge && <span className="badge badge-teal">{p.badge}</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, flex: 1, marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 18, fontWeight: 700 }}>{p.price}</span>
                      <Link to="/warenkorb" className="btn btn-teal btn-sm">In den Warenkorb</Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
