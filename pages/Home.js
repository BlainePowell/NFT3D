import styles from '/styles/Home.module.css'
import Nav from './components/Nav';
import Test from './components/test';
import Link from 'next/link'

function Land() {
    return (
        <div className={styles.background}>
            <div className={styles.nav}>
            <Link href='/'>
                <img className={styles.logo} src='reactlogo.png' />
            </Link>
            <Link href='/Explore'>
            <h1 className={styles.explore} onClick={() => {
                console.log('sex')
            }}>EXPLORE</h1>
            </Link>
            <Link href='/signin'>
            <h1 className={styles.signup}>SIGN IN</h1>
            </Link>
        </div>
        </div>
    )
}

export default Land;
