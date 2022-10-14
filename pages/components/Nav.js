import styles from '/styles/Home.module.css'
import Link from 'next/link';

function Nav() {
    return (
        <div className={styles.nav}>
        <Link href='/'>
            <img className={styles.logo} src='reactlogo.png' />
        </Link>
        <Link href='/Explore'>
        <h1 className={styles.explore}>EXPLORE</h1>
        </Link>
        <Link href='/wallet'>
        <h1 className={styles.signup}>WALLET</h1>
        </Link>
    </div>
    )
}

export default Nav;