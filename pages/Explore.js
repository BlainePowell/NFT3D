import styles from '/styles/Home.module.css';
import Side from './components/SideBar'

function Explore() {
    return (
        <div className={styles.background}>
            <Side />
        </div>
    )
}

export default Explore;