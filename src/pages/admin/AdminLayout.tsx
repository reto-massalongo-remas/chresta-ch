import { Outlet, NavLink, Link } from 'react-router-dom'
import styles from './AdminLayout.module.css'

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/kurse', label: 'Kurse', icon: '📚', exact: false },
  { href: '/admin/buchungen', label: 'Buchungen', icon: '📅', exact: false },
  { href: '/admin/kunden', label: 'Kunden', icon: '👥', exact: false },
  { href: '/admin/instruktoren', label: 'Instruktoren', icon: '👨‍🏫', exact: false },
]

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <span className={styles.brandIcon}>⚙️</span>
          <div>
            <div className={styles.brandTitle}>Admin</div>
            <div className={styles.brandSub}>Chresta Fahrschule</div>
          </div>
        </div>
        <nav className={styles.nav}>
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFoot}>
          <Link to="/" className={styles.backLink}>← Zurück zur Website</Link>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>MC</div>
            <div>
              <div className={styles.userName}>Marco Chresta</div>
              <div className={styles.userRole}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
