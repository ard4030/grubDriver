import { fetchData } from '@/utils/functions'
import { LoadingButton } from '@mui/lab'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Head from '../global/HeadComp/Head'
import styles from './allcont.module.css'

const AllCont = () => {
    const [first, setfirst] = useState({
        old_pass:"",
        new_pass:"",
        confirm_pass:"",
    })
    const [loading,setLoading] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        setfirst({...first,[e.target.name]:e.target.value})
    }

    const Save = async () => {
        setLoading(true)
        const res = await fetchData('/changePassword','POST',first);
        if(res.success){
            if(res.data.code === 1) {
                toast.success(res.data.msg)
                setfirst({
                    old_pass:"",
                    new_pass:"",
                    confirm_pass:"",
                })
            }else{
                toast.error(res.data.msg)
            }
        }else{

        }
        console.log(res)
        setLoading(false)
    }

  return (
    <div className={styles.allCont}>
        <Head title={"Change Password"} />
        <div className={styles.myContent}>
            <div className={styles.passCont}>
                <div className={styles.item}>
                    <TextField 
                    style={{marginBottom:"15px"}}
                    value={first.old_pass}
                    onChange={handleChange}
                    name="old_pass"
                    id="outlined-basic" 
                    label="Old Password" 
                    variant="outlined" />
                </div>

                <div className={styles.item}>
                    <TextField 
                    style={{marginBottom:"15px"}}
                    value={first.new_pass}
                    onChange={handleChange}
                    name="new_pass"
                    id="outlined-basic" 
                    label="New Password" 
                    variant="outlined" />
                </div>

                <div className={styles.item}>
                    <TextField 
                    style={{marginBottom:"15px"}}
                    value={first.confirm_pass}
                    onChange={handleChange}
                    name="confirm_pass"
                    id="outlined-basic" 
                    label="Confirm Password" 
                    variant="outlined" />
                </div>

                <LoadingButton
                onClick={Save}
                loading={loading}
                variant="contained"
                >
                    Save
                </LoadingButton>


            </div>
        </div>
    </div>
  )
}

export default AllCont