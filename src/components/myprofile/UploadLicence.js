import styles from './uploadlicence.module.css'
import { VscArrowUp } from "react-icons/vsc";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Fab, LinearProgress } from '@mui/material';
import { ProfileContext } from '@/context/ProfileContext';
import Image from 'next/image';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';

const UploadLicence = () => {
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(null);
  const [prog, setProg] = useState(0);
  const [image, setImage] = useState(null);
  const {details, setDetails,getData} = useContext(ProfileContext)

  useEffect(() => {
    if(file) uploadFile();
  }, [file])
  

  const handleUpload = (e) => {
    setFile(e.target.files?.[0]);
    // setImage(URL.createObjectURL(e.target.files[0]));
  }

  const uploadFile = async () => {
    setloading(true)
    const formData = new FormData();
    formData.set('file_0',file);
    formData.set('filename',"frontlicence");
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
            setImage(response.data.details.url)
            setDetails({...details,documents:
              {...details.documents,
                licence:{
                  name:response.data.details.filename,
                  mode:response.data.details.bucket,
                  hash:"",
                  url:response.data.details.url
                }
              }
            })
          }

        }
      }).catch(err => {
        alert(err.message)
      });
      setloading(false)
  }



  const editImage = () => {
    setFile(null);
    setImage(null);
    setDetails({...details,documents:
      {...details.documents,
        licence:{
          name:null,
          mode:null,
          hash:null,
          url:null
        }
      }
    })
    
  }
  

  return (
    <div className={styles.uploadLicence}>
        <div className={styles.befo}>
          {
          details.documents && details.documents.licence && details.documents.licence.name?
            <div className={styles.showImgLicense}>
              <div className={styles.contImage}>
                <Image 
                src={details.documents.licence.url}
                fill
                alt='licence'
                 />
              </div>
              <div className={styles.footerVi}>
                <span onClick={editImage}>
                  <MdEdit />
                </span>
              </div>
            </div>
          :
          <>
            {
              prog > 0 ?
              <>
              <div className={styles.progres}>
                <span style={{width:`${prog}%`}}></span>
              </div>
              <span>{prog}%</span>
              </>
              :
              <>
                <input 
                onChange={handleUpload}
                type={"file"} />
                <VscArrowUp />
                <span className={styles.spnOut}>Upload Front Licence</span>
              </>
            }
          </>
          }
          
            
        </div>
    </div>
  )
}

export default UploadLicence