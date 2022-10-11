import styles from '/styles/Home.module.css';
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';
import { useRouter } from 'next/router';

function Wallet() {
    const [form, setForm] = useState({ address: '', signature: '' })
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const router = useRouter();
    const [ user, setUser ] = useState({signature: '', account: ''})
    const [userAccount, setAccount] = useState('')
    const [ connected, setConnected ] = useState(false);
    const [ accountSignature, setAccountSignature ] = useState('')
    const [newU, setNewU] = useState("");
    const [newS, setNewS] = useState("");

    const web3 = new Web3(Web3.givenProvider)


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
          router.push("/");
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
        console.log("Found an account! Address: ", account);
    } catch (err) {
        console.log(err)
    }
} 

const authenticateUser = async () => {
    const user = await web3.eth.getAccounts();
    const signature = await web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), user[0])
    const testing = { address: user[0], signature: signature}
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

useEffect(() => {
    setForm({
        ...form,
        'address' : newU,
        'signature' : newS
    })
    console.log(form)
}, [newS])


    const checkWallet = () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("No wallet found. Please add a wallet.");
            return;
        } else {
            console.log("wallet found.")
        }
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

     useEffect((e) => {
        const interval = setInterval((e) => {
             isConnect();
        }, 100);
        return () => clearInterval(interval);
     }, [])

     const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
     })
     walletform.form.submit();
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
   <form onSubmit={createAccount} id="walletform">
       <input 
       onChange={handleChange}
       name="title"
       value={accountSignature}
       />
        <input 
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

export default Wallet;