import React, { useEffect, useState} from 'react'
import EscapeNavigate from './EscapeNavigate'
import { useOutletContext } from "react-router-dom";

const Notification = () => {

  const context = useOutletContext();
  const { setMobileUI, mobileUI } = context;
  const [mobileView,setMobileView] = useState(false)

    useEffect(() => {

    if(window.screen.availWidth <= 720) {
      setMobileView(true)
      return
    }
   })


  return (
    <>
      {mobileView ?  <EscapeNavigate setMobileUIRoute={setMobileUI} mobileUI={mobileUI}/> : null}
        <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px'}}>Notification is under development</div>
    </>

  )
}

export default Notification