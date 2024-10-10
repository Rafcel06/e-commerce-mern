import React from "react";
import { Link } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routeConfig } from "../Routing/routeConfig";



const Subnavigation = () => {

  return (
    <>
     {
       routeConfig[3]?.children.map((subRoute,index) => {
        return subRoute?.subnavigation ? <Link to={subRoute?.path} key={index} className="navigation-sub-path"><FontAwesomeIcon icon={subRoute.icons} className="navigation-icons-sub" />{subRoute?.path}</Link> : null
       })
     }
    </>
  );
};

export default Subnavigation;
