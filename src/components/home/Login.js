"use client"
import { useContext, useState } from 'react'
import styles from './login.module.css'
import { LoadingButton } from '@mui/lab'
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import { fetchData } from '@/utils/functions'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'
import { useTranslation } from 'react-i18next'

const Login = ({chengeStat}) => {
  const [details, setDetails] = useState({
    uname:"",
    pass:"",
  })
  const [loading,setLoading] = useState(false);
  const {loginUser,user} = useContext(AuthContext)
  const { t } = useTranslation();

  const loginUserContext = async () => {
    setLoading(true)
    await loginUser(details);
    setLoading(false)
  }

  return (
    <form className={styles.register}>
            <div className={styles.title}>
                <div>
                  <h2>{t("Login")}</h2>
                  <p>{t("Please fill form to register")}</p>
                </div>
            </div>

            <div className={styles.item}>
              <TextField 
              id={`"outlined-basic`}
              label={t("User Name")} 
              size='small'
              fullWidth
              value={details.uname}
              onChange={(e) => setDetails({...details,uname:e.target.value})}
              variant="outlined" />
            </div>
            
            <div className={styles.item}>
              <TextField 
              id={`outlined-basic`}
              label={t("Password")}  
              size='small'
              type={"password"}
              fullWidth
              value={details.pass}
              onChange={(e) => setDetails({...details,pass:e.target.value})}
              variant="outlined" />
            </div>

            <div className={styles.footerBotton}>
              <LoadingButton 
              onClick={loginUserContext}
              loading={loading} 
              variant="contained">
                <span>{t("Login")}</span>
              </LoadingButton>
              <Button 
              onClick={chengeStat}
              variant="outlined">{t("Register")}</Button>
            </div>

            {/* <div className={`${styles.item} ${styles.w97}`}>
              <textarea 
              placeholder='Transport description ...'
              className={styles.myTextArea}
              ></textarea>
            </div> */}
        </form>
  )
}

export default Login