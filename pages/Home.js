import styles from '/styles/Home.module.css'
import Nav from './components/Nav';
import Link from 'next/link'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

function Land() {
    const { account } = useWeb3React();

    useEffect(() => {
        console.log(account)
    }, [])

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
            <Link href='/wallet'>
            <h1 className={styles.signup}>Wallet</h1>
            </Link>
        </div>
        </div>
    )
}

export default Land;
