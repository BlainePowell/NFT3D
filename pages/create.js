import styles from '/styles/Home.module.css';
import { useState } from 'react';
import Nav from './components/Nav';
import { useRouter } from 'next/router';


function Create() {
    const [form, setForm] = useState({ asset: '', description: '', price: '', blockchain: ''});

    const createModel = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/create', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
          router.push("/Explore");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createModel();
    }

    return (
        <div className={styles.background2}>
            <div className={styles.central}>
            <Nav/>
            <div className={styles.glb}>
                <input type="file"/>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Asset Name"
                name="asset"/>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Description"
                name="description"/>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Starting Price"
                name="price"/>
                <input
                onChange={handleChange}
                type="text"
                placeholder="Ethereum"
                name="blockchain"/>
                </form>
                <button />
            </div>
            </div>
        </div>
    )
}

export default Create;
