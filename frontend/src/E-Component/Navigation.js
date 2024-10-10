// import React from "react";
// import {
//   faBell,
//   faCircleQuestion,
//   faRightToBracket,
//   faUserPlus,
//   faEye,
//   faEyeSlash,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Navigation = ({goToForm,goToRegister}) => {
//   const { Modal, openModal, closeModal, isOpen } = useModal();
//   return (
//     <>
//       <nav id="landing-page-navigation">
//         <ul id="landing-page-navigation-list">
//           <li className="page-navigation">
//             <FontAwesomeIcon icon={faBell} /> Notification{" "}
//           </li>
//           <li className="page-navigation">
//             <FontAwesomeIcon icon={faCircleQuestion} /> Help{" "}
//           </li>
//           <li className="page-navigation" onClick={goToForm}>
//             <FontAwesomeIcon icon={faRightToBracket} /> Login{" "}
//           </li>
//           <li className="page-navigation" onClick={goToRegister}>
//             <FontAwesomeIcon icon={faUserPlus} />
//             Signup{" "}
//           </li>
//         </ul>
//       </nav>


//       <Modal
//         content={
//           <>
//             <div id="login-exit">
//               <FontAwesomeIcon
//                 icon={faXmark}
//                 className="page-navigation"
//                 onClick={closeLogin}
//               />
//             </div>

//             {authState.login ? (
//               <Login
//                 goToForgot={goToForgot}
//                 toSubmit={submit}
//                 className={authState.register ? "active" : null}
//               />
//             ) : null}
//             {authState.forgot ? (
//               <Forgot
//                 goToLogin={goToLogin}
//                 toSubmit={submit}
//                 className={authState.register ? "active" : null}
//               />
//             ) : null}
//             {authState.register ? <Register toSubmit={submit} /> : null}
//           </>
//         }
    
//       />
//     </>
//   );
// };

// export default Navigation;
