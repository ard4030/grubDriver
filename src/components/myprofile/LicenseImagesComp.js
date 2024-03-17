import { useTranslation } from 'react-i18next'
import styles from './allcont.module.css'

import UploadBackLicence from './UploadBackLicence'
import UploadLicence from './UploadLicence'

const LicenseImagesComp = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contLicence}>      
        <div className={styles.licenceImage}>
            <div className={styles.hl1}>
                <h3>{t("Licence Images")}</h3>
            </div>
            <UploadLicence />
            <UploadBackLicence />
            {/* <UploadLicence /> */}
        </div>
    </div>
  )
}

export default LicenseImagesComp