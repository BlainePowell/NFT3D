import styles from '/styles/Home.module.css';
import fetch from 'isomorphic-unfetch'
import { ethers } from 'ethers';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';

export default function Wallet() {
    const [ form, setForm ] = useState({ title: '' })
    const { push } = useRouter();
    const [account, setAccount] = useState('')
    const {isAuthenticated, user, isAuthenticating, authenticate, logout, isLoggingOut} = useMoralis();
    const [ connected, setConnected ] = useState(false);
    const [ auth, setAuth ] = useState(false);

const Coinbase = new WalletLinkConnector({
    url: 'https://mainnet.infura.io/v3/${process.env.INFURA_KEY}',
    appName:'NFT3D',
    supportedChainIds:[1,3,4,5,42],
})

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337]
})

useEffect((e) => {
        if (isAuthenticated) {
            setForm({
                ...form,
                [e.target.name]: user
            })
        }
    }
)

async function connect() {
    try {
        await activate(Injected);
        window.location.href='/profile';
    } catch (err) {
        console.log(err)
    }
}

    const checkWallet = () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("No wallet found. Please add a wallet.");
            return;
        } else {
            console.log("wallet found.")
        }
     }

    const connectWalletButton = () => {
        return (
            <div>
                {connected ? (
             <button className={styles.connect} onClick={() => authenticate({
                signingMessage: "Sign in required"
             })} disabled={isAuthenticating}>
                Login
             </button>
                  )  :  (
                    <button className={styles.connect} onClick={() => authenticate({
                        signingMessage: "Sign in required"
                     })} disabled={isAuthenticating} >
                        Connect Wallet
                     </button>
                )}
             </div>
        )
    }

    const onceConnect = () => {
        return (
            <h1 className={styles.name}></h1>
        )
    }

    async function isConnect() {
        const accounts = await ethereum.request({method: 'eth_accounts'});       
        if (accounts.length) {
            console.log(`You're connected to: ${accounts[0]}`);
            setAccount(accounts[0]);
            setConnected(true);
            onceConnect();
        } else {
           console.log("Metamask is not connected");
        }
     }

     useEffect(() => {
        const interval = setInterval(() => {
            isConnect();
        }, 100);
        return () => clearInterval(interval);
     }, [])
     
if (!isAuthenticated) {
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
            <h1 className={styles.signup}>WALLET</h1>
            </Link>
        </div>
        <div>
            {connectWalletButton()}
            {onceConnect()}
        </div>
        </div>
    )
}

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
       <h1 className={styles.signup}>WALLET</h1>
       </Link>
   </div>
   <div>
       <h1 className={styles.name}>{user.getUsername()}</h1>
       <button className={styles.connect} onClick={logout} disable={isLoggingOut}>Logout</button>
   </div>
   </div>
)
}