import styles from '/styles/Home.module.css';

export default function Side() {


    return (
        <div className={styles.side}>   
            <img className={styles.logo} src="reactlogo.png" />
            <div className={styles.tabhome}>
            <h1>HOME</h1>
            </div>
            <div className={styles.tabex}>
            <h1>EXPLORE</h1>
            </div>
            <div className={styles.tabcon}>
            <h1>CONNECT</h1>
            </div>
            <div>
            <h1></h1>
            </div>
            <div>
            <h1></h1>
            </div>
            </div>
    )
}