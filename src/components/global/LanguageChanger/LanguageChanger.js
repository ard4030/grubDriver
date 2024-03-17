'use client';

import i18nConfig from 'i18nConfig';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from "./languagechanger.module.css"
import enFlag from "@/public/Images/ukFlag.png"
import itFlag from "@/public/Images/italyFlag.png"
import chFlag from "@/public/Images/chinFlag.png"
import { IoIosArrowUp } from "react-icons/io";
import { useState } from 'react';


export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [open,setOpen] = useState(false)

  const handleChange = e => {
    const newLocale = e;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const reternItem = (data) => {
    switch (data) {
      case "en":
        return (
          <>
            <Image width={25} height={15} alt='en' src={enFlag} />
            <IoIosArrowUp />
          </>
        )

      case "it":
          return (
            <>
              <Image width={25} height={15} alt='it' src={itFlag} />
              <IoIosArrowUp />
            </>
      )  

      case "zh":
          return (
            <>
              <Image width={25} height={15} alt='zh' src={chFlag} />
              <IoIosArrowUp />
            </>
      )  

      default:
        return (
          <>
            <Image width={25} height={15} alt='en' src={enFlag} />
            <IoIosArrowUp />
          </>
        )
    }
  }

  return (
    // <select 
    // className={styles.selecting}
    // onChange={handleChange} value={currentLocale}>
    //   <option value="en">
    //     <img src={enFlag} />
    //   </option>
    //   <option value="it">Italian</option>
    //   <option value="fr">French</option>
    //   <option value="fa">Farsi</option>
    // </select>

    <div 
    className={styles.customSel}>
      <div 
      onClick={() => setOpen(!open)}
      className={styles.head}>
        {reternItem(currentLocale)}
      </div>

      <div className={`${styles.contentSel} ${!open && styles.dnone}`}>
        <div 
        onClick={() => handleChange("en")}
        className={styles.item}>
          <Image width={25} height={15} alt='en' src={enFlag} />
        </div>

        <div 
        onClick={() => handleChange("it")}
        className={styles.item}>
          <Image width={25} height={15} alt='it' src={itFlag} />
        </div>

        <div 
        onClick={() => handleChange("zh")}
        className={styles.item}>
          <Image width={25} height={15} alt='zh' src={chFlag} />
        </div>
      </div>
      
    </div>



    // <div className={styles.langChang}>
    //   <FormControl fullWidth size='small'>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select1"
    //       style={{display:"flex",alignItems:"center",justifyContent:"center"}}
    //       value={currentLocale}
    //       onChange={handleChange}
    //     >

    //       <MenuItem
    //       style={{display:"flex",alignItems:"center",justifyContent:"center"}}
    //       value={"en"}>
    //           <Image width={25} height={15} alt='en' src={enFlag} />
    //       </MenuItem>

    //       <MenuItem 
    //       style={{display:"flex",alignItems:"center",justifyContent:"center"}}
    //       value={"it"}>
    //           <Image width={25} height={15} alt='it' src={itFlag} />
    //       </MenuItem>

    //       <MenuItem 
    //       style={{display:"flex",alignItems:"center",justifyContent:"center"}}
    //       value={"zh"}>
    //         <div className={styles.contImage}>
    //           <Image width={25} height={15} alt='zh' src={chFlag} />
    //           {/* <span>Chinese</span> */}
    //         </div>
    //       </MenuItem>
    //     </Select>
    //   </FormControl>
    // </div>
  );
}