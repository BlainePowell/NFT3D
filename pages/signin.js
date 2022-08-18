import styles from '/styles/Home.module.css';
import Link from 'next/link'
import { useState, useEffect } from 'react';

function Sign() {
    const [ currentAccount, setCurrentAccount ] = useState(null)
    const checkWallet = () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("MetaMask not installed");
            return;
        } else {
            console.log("wallet exists")
        }
     }

    const connectWallet = () => { 
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please Install MetaMask");
        }

        try {
            const accounts = ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            setCurrentAccount(accounts[0])
        } catch (err) {
            console.log(err)
        }
    } 

    const mintNFT = () => { }

    const connectWalletButton = () => {
        return (
             <button onClick={connectWallet} className={styles.connect}>
                Connect Wallet
             </button>
        )
    }

    useEffect(() => {
        checkWallet();
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
            <Link href='/signin'>
            <h1 className={styles.signup}>SIGN IN</h1>
            </Link>
        </div>
        <div>
            {connectWalletButton()}
        </div>
        </div>
    )
}

export default Sign;

/*

junk snake rain circle change else utility exercise success piece seat rough

*/