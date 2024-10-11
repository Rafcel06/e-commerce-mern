import React from "react";
import { Guard } from "../AuthGuard/Guard";
import {
  faGauge,
  faShop,
  faUsers,
  faUserTie,
  faFile,
  faFileLines,
  faCircle,
  faUserPlus,
  faBell,
  faTruck,
  faCircleQuestion,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";


const LazyFeatured = React.lazy(() => import("../E-Component/Featured"));
const LazyForgot = React.lazy(() => import("../Authenticate/Forgot"));
const LazyReset = React.lazy(() => import("../Authenticate/Register"));
const LazyNotFound = React.lazy(() => import("../E-Component/Notfound"));
const LazyHome = React.lazy(() => import("../E-Component/Home"));
const LazyOverview = React.lazy(() => import("../E-Component/Overview"));
const LazyHiring = React.lazy(() => import("../E-Component/Ordertracking"));
const LazyBlogs = React.lazy(() => import("../E-Component/Blogs"));
const LazyContact = React.lazy(() => import("../E-Component/Contact"));
const LazyShop = React.lazy(() => import("../E-Component/Shop"));
const LazyLandingPage = React.lazy(() => import("../Authenticate/Landing"));
const LazyHelp = React.lazy(() => import("../E-Component/Help"))
const LazyNotification = React.lazy(() => import("../E-Component/Notification"))
const LazyOrderStatus = React.lazy(() => import('../E-Component/OrderStatus'))
const LazyVerify = React.lazy(() => import('../E-Component/VerifyEmail'))







export const routeConfig = [
  {
    path: "/",
    element: <LazyLandingPage />,
    exact: true,
    children: [
      {
        index: true,
        path: "",
        icons: faGauge,
        element: (
            <LazyFeatured />
        ),
      },
      {
       path:"shop",
       element : (
            <LazyShop/>
       )
      },

      {
        path:"feature",
        icons: faGauge,
        parentnavigation: true,
        element : (
           <LazyFeatured />
        )
      },
      {
        path:"notification",
        icons: faBell,
        parentnavigation: true,
        element : (
             <LazyNotification/>
        )
      },
      {
        path:"help",
        icons: faQuestion,
        parentnavigation: true,
        element : (
             <LazyHelp/>
        )
      }

    ]
  },
  {
    path: "/forgot-password",
    element: <LazyForgot />,
  },
  {
    path: "/reset-password",
    element: <LazyReset />,
  },


  {
    path: "/home",
    element: (
      <Guard>
        <LazyHome />
      </Guard>
    ),
    children: [
      {
        index: true,
        path: "",
        icons: faGauge,
        element: (
          <Guard>
            <LazyFeatured />
          </Guard>
        ),
      },
      {
        path: "shop",
        icons: faShop,
        parentnavigation: true,
        element: (
          <Guard>
            <LazyShop />
         </Guard>
        ),
      },

      {
        path: "shop-list",
        icons: faCircle,
        subnavigation: true,
        element: (
          <Guard>
            <LazyShop />
          </Guard>
        ),
      },

      {
        path: "order-tracking",
        icons: faTruck,
        element: (
          <Guard>
            <LazyHiring />
          </Guard>
        ),
      },

      {
        path: "order-status",
        subnavigation: true,
        icons: faCircle,
        element: (
          <Guard>
            <LazyOrderStatus />
          </Guard>
        ),
      },
    ],
  },

  {
    path:"/verify",
    element : (
         <LazyVerify/>
    )
   },

  {
    path: "*",
    element: <LazyNotFound />,
  },
];
