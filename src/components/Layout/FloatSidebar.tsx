import { motion } from 'framer-motion'
import styles from './FloatSidebar.module.css'

const buttons = [
  { icon: '📞', label: 'Telefon', href: 'tel:0447615958' },
  { icon: '✉',  label: 'Mail',    href: 'mailto:info@chresta.ch' },
  { icon: '📍', label: 'Standort', href: 'https://maps.google.com/?q=Industriestrasse+17,+8910+Affoltern+am+Albis' },
  { icon: '👤', label: 'Konto',   href: '/konto' },
]

export default function FloatSidebar() {
  return (
    <motion.div
      className={styles.sidebar}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 24 }}
    >
      {buttons.map((btn, i) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          className={styles.btn}
          title={btn.label}
          target={btn.href.startsWith('http') ? '_blank' : undefined}
          rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.07, type: 'spring', stiffness: 220, damping: 26 }}
          whileHover={{ x: -4, transition: { duration: 0.15 } }}
        >
          <span className={styles.icon}>{btn.icon}</span>
          <span className={styles.label}>{btn.label}</span>
        </motion.a>
      ))}
    </motion.div>
  )
}
