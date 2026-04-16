import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './CategoryCard.module.css'

interface Props {
  title: string
  href: string
  bgUrl: string
  index?: number
}

export default function CategoryCard({ title, href, bgUrl, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.45, ease: 'easeOut' }}
    >
      <Link to={href} className={styles.card}>
        <motion.div
          className={styles.bg}
          style={{ backgroundImage: `url(${bgUrl})` }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.link}>Mehr erfahren →</span>
        </div>
      </Link>
    </motion.div>
  )
}
