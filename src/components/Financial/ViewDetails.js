import styles from './viewdetails.module.css'

const ViewDetails = ({details}) => {
  return (

    <>
    {
        details && 
    <div>
        <span className={styles.bName}>{details.bank_name}</span>
        <span className={styles.bBranch}>{details.bank_branch}</span>
        <div className={styles.number}>
            <span>{details.bank_account_number.substring(0,4)}</span>
            <span>{details.bank_account_number.substring(4,8)}</span>
            <span>{details.bank_account_number.substring(8,12)}</span>
        </div>
        <div className={styles.aName}>
            <span>{details.account_name}</span>
            <span>{details.swift_code}</span>
        </div>
        <div className={styles.balancing}>
            <div>
                <span className={styles.sp1}>Opening Balance</span>
                <span>£{parseFloat(details.open_balance).toFixed(2)}</span>
            </div>

            <div>
                <span className={styles.sp1}>Close Balance</span>
                <span>£{parseFloat(details.current_balance).toFixed(2)}</span>
            </div>
        </div>
    </div>

    }
    </>
  )
}

export default ViewDetails