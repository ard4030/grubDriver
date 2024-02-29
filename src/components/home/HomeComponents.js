"use client"
import { useState } from 'react'
import styles from './homecomponents.module.css'
import Login from './Login'
import Register from './Register'

const HomeComponents = () => {
  const [status, setStatus] = useState(true);
  return (
    <div className={`${styles.homeComp} ${!status && styles.active}`}>
      <div className={`${styles.content}`}>
        {/* <button onClick={() => setStatus(!status)}>test</button> */}
        {
          status?<Login chengeStat={() => setStatus(!status)} />:<Register chengeStat={() => setStatus(!status)} />
        }
        
      </div>
      <div className={`${styles.rightImage} `}></div>
    </div>
  )
}

export default HomeComponents