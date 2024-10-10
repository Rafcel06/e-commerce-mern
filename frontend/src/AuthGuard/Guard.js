import React  from 'react'
import { useAuth } from './Auth'
import { Navigate} from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import '../App.css'


export const Guard = ({children}) => {
  const {user} = useAuth();
  const locaStorage =  secureLocalStorage.getItem('authenticate') ? JSON.parse(secureLocalStorage.getItem('authenticate')).session : null
  
 if(!user && !locaStorage) {
    return <Navigate to='/'/>
 }  

 else {
    return children

}
}

