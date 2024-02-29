import styles from './allcont.module.css'
import { Alert, Avatar, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { ProfileContext } from '@/context/ProfileContext'
import PhoneInput from 'react-phone-number-input'
import { LoadingButton } from '@mui/lab'


const AccountDetails = () => {
    const {details, setDetails,loading,error,saveData} = useContext(ProfileContext);

  return (
    <div className={styles.contItems}>
        <div className={styles.items}>
            <div className={styles.hl1}>
                <h3>Account</h3>
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

            <div className={`${styles.item} ${styles.last}`}>
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

            <div className={`${styles.item} ${styles.last}`}>
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
        </div>
    </div>
  )
}

export default AccountDetails