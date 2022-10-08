import styles from '/styles/Home.module.css';
import Nav from './components/Nav'

function Explore() {
    return (
        <div className={styles.background}>
            <Nav/>
            <div className={styles.break}/>
        </div>
    )
}

export default Explore;