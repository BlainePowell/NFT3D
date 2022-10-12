import styles from '/styles/Home.module.css';
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Router } from 'react-router';

export default function Wallet() {
    const [ form, setForm ] = useState({ address: '', signature: '' })
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const router = useRouter();
    const [userAccount, setAccount] = useState('')
    const [ connected, setConnected ] = useState(false);

    const web3 = new Web3(Web3.givenProvider)


    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createAccount();
            } else {
                setIsSubmitting(false)
            }
        }
    }, [errors])


    const createAccount = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
          router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

const connectWallet = () => { 
    const { ethereum } = window;

    if (!ethereum) {
        alert("Please Install a wallet from a provider.");
    }
    try {
        const accounts = ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
        console.log("Found an account! Address: ", account);
    } catch (err) {
        console.log(err)
    }
} 

const authenticateUser = async () => {
    const user = await web3.eth.getAccounts();
    console.log(user)
    const signature = await web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), user[0])
    console.log(signature)
    const testing = { address: user[0], signature: signature}
    console.log(testing)
    try {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(testing)
        })
      router.push("/");
    } catch (error) {
        console.log(error);
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

    function connectWalletButton() {
        return (
            <div>
                {connected ? (
             <button className={styles.connect} onClick={authenticateUser}>
                Login
             </button>
                  )  :  (
                    <button className={styles.connect} onClick={connectWallet}>
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
            setConnected(true);
            onceConnect();
        } else {
            setConnected(false)
        }
     }

     useEffect(() => {
        console.log(userAccount)
     })

     useEffect(() => {
        const interval = setInterval(() => {
            isConnect();
        }, 100);
        return () => clearInterval(interval);
     }, [])

     const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
     })
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
   <div className={styles.test} >
   <form onSubmit={createAccount}>
       <input 
       onChange={handleChange}
       name="title"
       />
        <input 
       onChange={handleChange}
       name="description"
       />
       <button />
   </form>
   </div>
   <div>
                {connected ? (
             <button className={styles.connect} onClick={authenticateUser}>
                Login
             </button>
                  )  :  (
                    <button className={styles.connect} onClick={connectWallet}>
                        Connect Wallet
                     </button>
                )}
             </div>
   </div>
)
}