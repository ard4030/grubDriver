import { LoadingButton } from '@mui/lab'
import styles from './mymodal.module.css'

const MyModal = ({children,open,onClose,onOpen,onOk,title,width,okBtn,okText,loadingBtn,loadingBtnText,
loadingBtnClick,loadingBtnLoading=false,showHeader=true,showFooter=true
}) => {
  return (
      <div 
      style={{display:open?"flex":"none"}}
      className={styles.myModal}>
          <div 
          style={{width:width?width:"30%"}}
          className={styles.contModal}>
              {showHeader && <header>
                  {title}
              </header>}
              <div>
              {children}
              </div>
  
              {
                showFooter && <footer>
                {loadingBtn && 
                <LoadingButton 
                variant='contained'
                size='small'
                loading={loadingBtnLoading}
                onClick={() => loadingBtnClick()}>
                  {loadingBtnText && loadingBtnText}
                </LoadingButton>}
                {okBtn && <button onClick={() => onOk()}>{okText && okText}</button>}
                <button onClick={() => onClose()}>Close</button>
            </footer>
              }
          </div>
          <div 
          onClick={() => onClose()}
          className={styles.closing}></div>
      </div>
  )
}

export default MyModal