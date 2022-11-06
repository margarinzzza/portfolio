import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <Link href={'/'} >Главная</Link>
        <Link href={'/users'} >Users</Link>
      </div>
      g
    </div>
  )
}
