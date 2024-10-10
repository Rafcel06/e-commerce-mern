import React, { useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "../AuthGuard/Auth";
import '../App.css'




const Dashboard = () => {

  const { user, login } = useAuth();



  useEffect(() => {
    login(JSON.parse(secureLocalStorage.getItem("authenticate")).session); 
  }, []);


  return (
    <div>
      <h2>
        Login as {user?.firstName + " "}
        {user?.lastName}
      </h2>
      Overview is under development
    </div>
  );
};

export default Dashboard;
