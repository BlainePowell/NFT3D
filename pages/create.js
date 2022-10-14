import styles from '/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import { useRouter } from 'next/router';
import { BiArrowToBottom } from 'react-icons/bi';
import { create } from 'ipfs-http-client';

function Create() {
    const [formula, setFormula] = useState({ asset: '', description: '', price: '', blockchain: '', urlpath: ''});
    const [urlArr, setUrlArr] = useState([]);
    const router = useRouter();

    const projectId = "2FyNf6ETrzZpWu27WPZS68oEIMD";
    const projectSecret = "c5932463b2373c4cc5970c3b83412abb";
    const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

    const ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers:{
          authorization
        }
      })

    // api route api/create

    const createModel = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/create', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formula)
            })
          router.push("/Explore")
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFormula({
            ...formula,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        const form = e.target;
        const files = (form).files;
    
        if (!files || files.length === 0) {
          return alert("No files selected");
        }
    
        const file = files[0];
        // upload files
        const result = await ipfs.add(file);
        const Url = result.path;
        setFormula({
            ...formula,
            "urlpath": "https://nft3d.infura-ipfs.io/ipfs/" + Url,
        })
        setUrlArr([
          ...urlArr,
          {
            cid: result.cid,
            path: result.path,
          },
        ]);
    }

    const submitForm = (e) => {
        e.preventDefault();
        createModel();
    }

    useEffect(() => {
        console.log(formula)
    }, [formula])

    return (
        <div className={styles.background2}>
            <div className={styles.central}>
            <Nav/>
            <form onSubmit={submitForm}>
            <div className={styles.glb}>
                <input type="file" name="file" onChange={handleSubmit}/>
                <BiArrowToBottom className={styles.glbicon} />
            </div>
            <div className={styles.glbinput}>
                <h1>Create an asset.</h1>
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
                <button>Mint</button>
            </div>
            </form>
            
            </div>
            
        </div>
    )
}

export default Create;
