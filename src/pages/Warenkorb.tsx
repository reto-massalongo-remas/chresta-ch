import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'

const INITIAL_ITEMS = [
  { id: 1, name: 'Fahrstunde Auto Kat. B', detail: 'Mo 09.06.2026 · 09:00 · Marco Chresta', price: 98.00, qty: 1 },
  { id: 2, name: 'Nothelfer-Kurs Teil 1', detail: 'Sa 06.12.2025 · 16:30 Uhr', price: 25.00, qty: 1 },
]

export default function Warenkorb() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id))
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const vat = total * 0.077

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 600 }}>🛒 Warenkorb</h1>
            <span style={{ fontSize: 13, color: 'var(--hint)' }}>{items.length} Artikel</span>
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <FadeIn>
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Dein Warenkorb ist leer</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Füge Kurse oder Fahrstunden hinzu.</p>
              <Link to="/fahrschule" className="btn btn-teal">Kurse entdecken →</Link>
            </div>
          </FadeIn>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--border-lt)' }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--hint)' }}>{item.detail}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>CHF {item.price.toFixed(2)}</span>
                      <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', color: 'var(--hint)', cursor: 'pointer', fontSize: 18 }}>×</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div style={{ marginTop: 20 }}>
                <Link to="/fahrschule" style={{ fontSize: 13, color: 'var(--teal)' }}>+ Weiteren Kurs hinzufügen</Link>
              </div>
            </div>

            {/* Summary */}
            <FadeIn delay={0.1}>
              <div className="card">
                <div className="card-header">Bestellübersicht</div>
                <div className="card-body">
                  {items.map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border-lt)' }}>
                      <span>{i.name}</span>
                      <span>CHF {i.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border-lt)', color: 'var(--muted)' }}>
                    <span>Zwischensumme</span>
                    <span>CHF {total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border-lt)', color: 'var(--muted)' }}>
                    <span>MwSt. 7.7%</span>
                    <span>CHF {vat.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, padding: '14px 0' }}>
                    <span>Total inkl. MwSt.</span>
                    <span>CHF {(total + vat).toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="btn btn-teal btn-full btn-lg">Zur Kasse →</Link>
                  <Link to="/fahrschule" className="btn btn-ghost btn-full" style={{ marginTop: 10 }}>Weiter einkaufen</Link>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  )
}
