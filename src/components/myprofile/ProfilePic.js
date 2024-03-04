import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import styles from './profilepic.module.css'
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import testProf from "@/public/Images/manprof.png"
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileContext } from '@/context/ProfileContext';
import Loading from '../global/Loading/LoadingFull';

const ProfilePic = () => {
    let pic = true;
    const [file, setFile] = useState(null);
    const [loading, setloading] = useState(null);
    const [prog, setProg] = useState(0);
    const {details,setDetails} = useContext(ProfileContext);
    console.log(details);

    const handleUpload = (e) => {
        setFile(e.target.files?.[0]);
        // setImage(URL.createObjectURL(e.target.files[0]));
    }

    const uploadFile = async () => {
        setloading(true)
        const formData = new FormData();
        formData.set('file_0',file);
        formData.set('filename',"driver");
        formData.set('token',localStorage.getItem("driverToken"))
        formData.append("api_key",process.env.NEXT_PUBLIC_API_KEY)
    
    
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/drivers/api/uploadDocument`, formData, {
            onUploadProgress: (progressEvent) => {
              // console.log('progressEvent', progressEvent)
              if (progressEvent.bytes) {
                setProg(Math.round((progressEvent.loaded / progressEvent.total)*100))
              }
            },
          }).then(response => {
            if(response.status === 200){
              if(response.data.code === 1){
                setProg(0)
                setFile(null)
                console.log(response.data)
                setDetails({...details,buget_photo:response.data.details.bucket,profile_photo:response.data.details.filename})
                // setImage(response.data.details.url)
                // setDetails({...details,documents:
                //   {...details.documents,
                //     licence:{
                //       name:response.data.details.filename,
                //       mode:response.data.details.bucket,
                //       hash:"",
                //       url:response.data.details.url
                //     }
                //   }
                // })
              }
    
            }
          }).catch(err => {
            alert(err.message)
          });
          setloading(false)
    }

    useEffect(() => {
      if(file){
        uploadFile()
      }
    }, [file])
    


  return (
    <div className={styles.profPic}>
      <>
      {
        loading ?
          <Loading />
        :
        pic?
        <div className={styles.contImage}>
            <Image fill src={testProf} alt="Profile Picture" /> 
            <span className={styles.badge}><AiOutlineEdit/></span>
            <input 
            onChange={handleUpload}
            className={styles.uploadInput} type={"file"} />
        </div>
        :
        <div className={styles.av}>
            <Avatar sx={{ 
                bgcolor: deepOrange[500] ,
                width:100,
                height:100,
                margin:"auto"
            }}>N</Avatar>
            <span className={styles.badge}><AiOutlineEdit/></span>
        </div>
      }
      </>

      <div className={styles.dtStat}>
        <span>{details.status}</span>
      </div>
        
        <div className={styles.nameProf}>
            <h3>{`${details.first_name} ${details.last_name}`}</h3>
            <span></span>
        </div>
        <p className={styles.ec1}>{`(${details.licence_plate})`}</p>
    </div>
  )
}

export default ProfilePic