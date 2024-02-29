import styles from './taskimages.module.css'
import uploadImg from "@/public/Images/upload.png"
import Image from 'next/image'

const TaskImages = ({images}) => {
  return (
    <>
    {
            images && images.length > 0 && images[0] !== "" &&  
            <div className={styles.photos}>
                {
                    images.map((item,index) => 
                    <div key={index} className={styles.contImage}>
                        <Image src={item} fill alt='photo' />
                    </div>

                    )
                }
                
             </div>
            
        }
    </>

  )
}

export default TaskImages