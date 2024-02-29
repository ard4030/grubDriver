import styles from './allcont.module.css'

import UploadBackLicence from './UploadBackLicence'
import UploadLicence from './UploadLicence'

const LicenseImagesComp = () => {
  return (
    <div className={styles.contLicence}>      
        <div className={styles.licenceImage}>
            <div className={styles.hl1}>
                <h3>Licence Images</h3>
            </div>
            <UploadLicence />
            <UploadBackLicence />
            {/* <UploadLicence /> */}
        </div>
    </div>
  )
}

export default LicenseImagesComp