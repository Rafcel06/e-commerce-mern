import { createContext, useState,useContext} from "react";
import '../App.css'

const Authcontext = createContext(null)

export const Auth = ({children}) => {

   const [user,setuser] = useState()

   const login = (user) => {
     setuser(user)
   }

   const logout = () => {
     setuser(null)
   }

  return   ( 
     <Authcontext.Provider value={{user,login,logout}}>
        {children}
    </ Authcontext.Provider>
  )
}


export const useAuth = () => {
     return useContext(Authcontext)
}


