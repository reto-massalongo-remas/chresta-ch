import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'login' | 'register'>('login')

  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 40, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-md)' }}
      >
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 40, textAlign: 'center', marginBottom: 4 }}>Chresta</div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-lt)', marginBottom: 28 }}>
          {(['login', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--teal)' : 'transparent'}`, color: tab === t ? 'var(--teal)' : 'var(--muted)', fontWeight: tab === t ? 600 : 400, cursor: 'pointer', fontSize: 15, marginBottom: -1, transition: 'all .15s' }}
            >
              {t === 'login' ? 'Anmelden' : 'Registrieren'}
            </button>
          ))}
        </div>

        {tab === 'login' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Willkommen zurück</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 4 }}>Melde dich an für deine Buchungen</p>
            <div className="form-group">
              <label className="form-label">E-Mail</label>
              <input className="form-input" type="email" placeholder="max@muster.ch" />
            </div>
            <div className="form-group">
              <label className="form-label">Passwort</label>
              <input className="form-input" type="password" placeholder="••••••••" />
            </div>
            <div style={{ textAlign: 'right' }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--teal)' }}>Passwort vergessen?</a>
            </div>
            <button className="btn btn-teal btn-lg btn-full" onClick={() => navigate('/konto')}>Anmelden →</button>
            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
              Noch kein Konto?{' '}
              <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: 'var(--teal)', cursor: 'pointer', fontWeight: 600 }}>Registrieren →</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Konto erstellen</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" placeholder="Max" /></div>
              <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" placeholder="Muster" /></div>
            </div>
            <div className="form-group"><label className="form-label">E-Mail</label><input className="form-input" type="email" placeholder="max@muster.ch" /></div>
            <div className="form-group"><label className="form-label">Passwort</label><input className="form-input" type="password" placeholder="Mindestens 8 Zeichen" /></div>
            <label className="checkbox-row">
              <input type="checkbox" />
              <span style={{ fontSize: 13 }}>Ich akzeptiere die <a href="#" style={{ color: 'var(--teal)' }}>AGB</a></span>
            </label>
            <button className="btn btn-teal btn-lg btn-full" onClick={() => navigate('/konto')}>Konto erstellen →</button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
