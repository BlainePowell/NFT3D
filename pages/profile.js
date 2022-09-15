import styles from '/styles/Home.module.css';
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import { getSession, signOut } from 'next-auth/react';
import { useWeb3React } from '@web3-react/core';
import { Indexed } from 'ethers/lib/utils';

function Profile({ user, notes }) {
    const [ activeAccount, setAccount ] = useState('')
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false);

    const callInput = () => {
        document.getElementById("Input").click();
    }

    /*
    async function isConnected() {
        const accounts = await ethereum.request({method: 'eth_accounts'});       
        if (accounts.length) {
           console.log(`You're connected to: ${accounts[0]}`);
            setAccount(accounts[0]);
        } else {
           window.location.href='/wallet'
        }
     }

          useEffect(() => {
        isConnected();
     }, [])
     */

    return (
        <div className={styles.background}>
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
        <div>
            <h1 className={styles.name}>{activeAccount}</h1>
            <div className={styles.hide} onClick={callInput}/>
            <div className={styles.profile}>
                <input id="Input" type="file"/>
            </div>
            <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: '/wallet' })} className={styles.what}>Sign out</button>
            </div>
        </div>
        </div>
    )
}

/*
Profile.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();

    return { notes: data }
}
*/


export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    if (!session) {
        return {
            redirect: {
                destination: '/wallet',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default Profile;

/* 
                {notes.map((note) => {
                    return (
                        <div key={note._id} className={styles.card} >
                            <Link href={'/${note._id}'} >
                            <a>{note.title}</a>
                            </Link>
                            <Link href={'/$note._id'}>
                                <a>{note.description}</a>
                            </Link>
                            <Link href={'/${note._id}'}>
                                <button>View</button>
                            </Link>
                            <Link href={'/${note._id}/edit'}>
                                <button>Edit</button>
                            </Link>
                        </div>
                    )
                })}
*/