import MapLocation from './MapLocation'
import styles from './mapmodal.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";

const MapModal = ({setClose}) => {
  return (
    <div className={styles.mapModal}>
        <div className={styles.mapModalContent}>
            <MapLocation />
            <span 
            onClick={() => setClose(false)}
            className={styles.cls}><IoIosCloseCircleOutline /></span>
        </div>
    </div>
  )
}

export default MapModal