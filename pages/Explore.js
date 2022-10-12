import styles from '/styles/Home.module.css';
import Nav from './components/Nav'

function Explore({ assets }) {
    return (
        <div className={styles.background}>
            <Nav/>
            <div className={styles.break}/>
                <div className={styles.displayasset}>
                    {assets?.map(asset => {
                        return (
                            <div className={styles.asset} key={asset._id}>
                            <img src={asset.urlpath}/>
                            <h1>{asset.asset}</h1>
                            <p className={styles.owner}>{asset.description}</p>
                            <p className={styles.price}>Price</p>
                            <p className={styles.priceactual}>{asset.price}</p>
                        </div>
                        )
                    })}
                </div>
        </div>
    )
}

Explore.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/create');
    const { data } = await res.json();
  
    return { assets: data }
  }

export default Explore;