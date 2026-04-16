import { Link, useLocation } from 'react-router-dom'
import styles from './ProtoNav.module.css'

const screens = [
  { path: '/',                         label: '🏠 Home' },
  { path: '/fahrschule',               label: '📂 Fahrschule' },
  { path: '/fahrschule/motorrad',      label: '🏍 Kurs' },
  { path: '/kurs/nothelfer-1',         label: '📋 Kurs Detail' },
  { path: '/fahrstunden-buchen',       label: '📅 Fahrstunden' },
  { path: '/mieten/motorrad',          label: '🔑 Mieten' },
  { path: '/shop',                     label: '🛍 Shop' },
  { path: '/kontakt',                  label: '✉️ Kontakt' },
  { path: '/ueber-uns',                label: '👥 Über Uns' },
  { path: '/news',                     label: '📰 News' },
  { path: '/warenkorb',                label: '🛒 Warenkorb' },
  { path: '/checkout',                 label: '💳 Checkout' },
  { path: '/danke/buchung',            label: '✅ Danke' },
  { path: '/konto',                    label: '👤 Konto' },
  { path: '/login',                    label: '🔐 Login' },
  { path: '/admin',                    label: '⚙️ Admin' },
  { path: '/admin/kurse',              label: '📚 Admin Kurse' },
]

export default function ProtoNav() {
  const { pathname } = useLocation()
  return (
    <div className={styles.nav}>
      <span className={styles.label}>PROTO:</span>
      {screens.map(s => (
        <Link
          key={s.path}
          to={s.path}
          className={`${styles.btn} ${pathname === s.path ? styles.active : ''}`}
        >
          {s.label}
        </Link>
      ))}
    </div>
  )
}
