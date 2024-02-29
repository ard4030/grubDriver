import localFont from "next/font/local"

export const poppins = localFont({
    src: [
        //  Number Light
      {
        path: '../../public/fonts/Poppins-Light.ttf',
        weight: '100',
      },
        //   Number Regular
      {
        path: '../../public/fonts/Poppins-Medium.ttf',
        weight: '200',
      },
      {
        path: '../../public/fonts/Poppins-Regular.ttf',
        weight: '300',
      },
      {
        path: '../../public/fonts/Poppins-Bold.ttf',
        weight: '400',
      },
      {
        path: '../../public/fonts/Poppins-Regular.ttf',
        weight: '500',
      },
    ],
  })