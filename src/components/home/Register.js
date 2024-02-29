import styles from './register.module.css'
import PhoneInput from 'react-phone-number-input'
import { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import { registerValidation } from '@/validation/registervalidation'
import UploadLicence from '../myprofile/UploadLicence'
import { LoadingButton } from '@mui/lab'
import { fetchData } from '@/utils/functions'

const Register = ({chengeStat}) => {
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
    color:""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  console.log(details)

  const registerUser = async () => {
    setLoading(true)
    const res = await fetchData('/test','POST');
    if(res.success){

    }else{
      alert(res.error)
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
                  <h2>Registration</h2>
                  <p>Please fill form to register</p>
                </div>
                <span 
                onClick={chengeStat}
                className={styles.goLogin}>Login</span>
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.first_name?true:false}
              id={`${error.first_name?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.first_name && error.first_name}
              label="FirstName" 
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
              label="Last Name" 
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
              label="User Name" 
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
              label="Email" 
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
              label="Password" 
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
              label="Re Password" 
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
              placeholder="Enter phone number"
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
                label="Transport Type"
                size='small'
                onChange={(e) => setDetails({...details,transport_type_id:e.target.value})}
              >
                <MenuItem value={"car"}>Car</MenuItem>
                <MenuItem value={"motor"}>Motor</MenuItem>
              </Select>
            </FormControl>
            </div>

            <div className={styles.item}>
              <TextField 
              error={error.licence_plate?true:false}
              id={`${error.licence_plate?"outlined-error-helper-text":"outlined-basic"}`}
              helperText={error.licence_plate && error.licence_plate}
              label="Licence Plate" 
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
              label="Color" 
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
                <span>Register</span>
              </LoadingButton>
              <Button 
              onClick={chengeStat}
              variant="outlined">Login</Button>
             

            </div>

        </form>   
  )
}

export default Register