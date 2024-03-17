import styles from './register.module.css'
import PhoneInput from 'react-phone-number-input'
import { useContext, useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import { registerValidation } from '@/validation/registervalidation'
import UploadLicence from '../myprofile/UploadLicence'
import { LoadingButton } from '@mui/lab'
import { fetchData } from '@/utils/functions'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'

const Register = ({chengeStat}) => {
  const { t } = useTranslation();
  const {loginUser} = useContext(AuthContext)

  const [details, setDetails] = useState({
    phone:"",
    transport_type_id:"car",
    first_name:"",
    last_name:"",
    username:"",
    email:"",
    password:"",
    repassword:"",
    licence_plate:"",
    color:"",
    transport_description:""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});


  const registerUser = async () => {
    setLoading(true)
    let x = details;
    const res = await fetchData('/registerDriver','POST',x);
    if(res.success){
      if(res.data.code === 1){
        console.log(res.data)
        await loginUser({uname:details.username,pass:details.password})
      }else{
        toast.error(res.data.msg)
      }
    }else{
      alert(t(res.error))
    }
    setLoading(false)
  }

  useEffect(() => {
    setError(registerValidation(details))
  }, [details])


  return (
        <form className={styles.register}>
            <div className={styles.title}>
                <div>
                  <h2>{t("Registration")}</h2>
                  <p>{t("Please fill form to register")}</p>
                </div>
                <span 
                onClick={chengeStat}
                className={styles.goLogin}>{t("Login")}</span>
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.first_name?true:false}
              id={`${error.first_name?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.first_name && error.first_name}
              label={t("First Name")} 
              size='small'
              fullWidth
              value={details.first_name}
              onChange={(e) => setDetails({...details,first_name:e.target.value})}
              variant="outlined" />
              
            </div>

            <div className={styles.item}>
            <TextField 
              error={error.last_name?true:false}
              id={`${error.last_name?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.last_name && error.last_name}
              label={t("Last Name")} 
              size='small'
              fullWidth
              value={details.last_name}
              onChange={(e) => setDetails({...details,last_name:e.target.value})}
              variant="outlined" />
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.username?true:false}
              id={`${error.username?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.username && error.username}
              label={t("User Name")} 
              size='small'
              fullWidth
              value={details.username}
              onChange={(e) => setDetails({...details,username:e.target.value})}
              variant="outlined" />
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.email?true:false}
              id={`${error.email?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.email && error.email}
              label={t("Email")} 
              size='small'
              fullWidth
              value={details.email}
              onChange={(e) => setDetails({...details,email:e.target.value})}
              variant="outlined" />
            </div>
            
            <div className={styles.item}>
              <TextField 
              error={error.password?true:false}
              id={`${error.password?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.password && error.password}
              label={t("Password")}
              size='small'
              type={"password"}
              fullWidth
              value={details.password}
              onChange={(e) => setDetails({...details,password:e.target.value})}
              variant="outlined" />
            </div>
            
            <div className={styles.item}>
              <TextField 
              error={error.repassword?true:false}
              id={`${error.repassword?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.repassword && error.repassword}
              label={t("Re Password")} 
              size='small'
              type={"password"}
              fullWidth
              value={details.repassword}
              onChange={(e) => setDetails({...details,repassword:e.target.value})}
              variant="outlined" />
            </div>

            <div className={styles.item}>
              <PhoneInput
              defaultCountry="GB"
              className={`phoneInpute ${error.phone && "errMes"}`}
              placeholder={t("Enter phone number")}
              value={details.phone}
              onChange={(e)=>setDetails({...details,phone:e})}/>
              {error.phone && <span className={styles.errMessage}>{error.phone}</span> }
            </div>

            <div className={styles.item}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Transport Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={details.transport_type_id}
                label={t("Transport Type")}
                size='small'
                onChange={(e) => setDetails({...details,transport_type_id:e.target.value})}
              >
                <MenuItem value={"car"}>{t("Car")}</MenuItem>
                <MenuItem value={"motor"}>{t("Motor")}</MenuItem>
              </Select>
            </FormControl>
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.licence_plate?true:false}
              id={`${error.licence_plate?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.licence_plate && error.licence_plate}
              label={t("Licence Plate")} 
              size='small'
              fullWidth
              value={details.licence_plate}
              onChange={(e) => setDetails({...details,licence_plate:e.target.value})}
              variant="outlined" />
            </div>
            
            <div className={styles.item}>
              <TextField 
              error={error.color?true:false}
              id={`${error.color?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.color && error.color}
              label={t("Color")} 
              size='small'
              fullWidth
              value={details.color}
              onChange={(e) => setDetails({...details,color:e.target.value})}
              variant="outlined" />
            </div>

            <div className={styles.footerBotton}>
              <LoadingButton 
              onClick={registerUser}
              loading={loading} 
              variant="contained">
                <span>{t("Register")}</span>
              </LoadingButton>
              <Button 
              onClick={chengeStat}
              variant="outlined">{t("Login")}</Button>
             

            </div>

        </form>   
  )
}

export default Register