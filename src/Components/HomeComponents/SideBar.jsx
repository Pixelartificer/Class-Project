// import React from "react";
// import { FaRegBell } from "react-icons/fa";
// import { FaGears } from "react-icons/fa6";
// import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
// import { MdLogout } from "react-icons/md";
// import { TiMessages } from "react-icons/ti";
// import { Link, useLocation, useNavigate } from "react-router";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navigationIcons = [
//     {
//       id: 1,
//       path: "/",
//       icon: <IoHomeOutline />,
//     },

//     {
//       id: 2,
//       path: "/message",
//       icon: <TiMessages />,
//     },

//     {
//       id: 3,
//       path: "/notifecation",
//       icon: <FaRegBell />,
//     },

//     {
//       id: 4,
//       path: "/setting",
//       icon: <FaGears />,
//     },

//     {
//       id: 5,
//       icon: <MdLogout />,
//     },
//   ];

  

//   // handleNavigationItem

//   const handleNavigationItem = (path = "/")=>{
//     navigate(path)
//   }


//   return (
//     <div className="w-[140px] bg-mainColor h-[95vh] rounded-2xl">
//       <div className="flex justify-center">
//         <div className="w-[80px] h-[80px] mt-6 rounded-b-full relative cursor-pointer group border-[4px] border-white rounded-full">
//           <picture>
//             <img
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="ProfilePicture"
//               className="w-full h-full object-cover rounded-full"
//             />
//           </picture>
//           <span className="absolute hidden group-hover:block left-1/2 top-1/2 text-white text-3xl -translate-1/2">
//             <IoCloudUploadOutline />
//           </span>
//         </div>
//       </div>

//       {/* Navigation Icon */}

//       <div className="flex flex-col items-center justify-center mt-[80px] gap-y-[64px] ">
//         {navigationIcons?.map((item, index)=>(
//             navigationIcons.length -1 == index ? (<div className="text-[36px] text-white mt-[120px] cursor-pointer"  key={item.id} >
//                 {item.icon}
//               </div>) : (<div className={location.pathname == item.path ? "text-[36px] text-white active cursor-pointer" : "text-[36px]  text-white cursor-pointer"} key={item.id} onClick={()=>handleNavigationItem(item.path)}>
//             {item.icon}
//           </div>)
            
//         ))}
        
      
          
        
//       </div>
//       {/* Navigation Icon */}
//     </div>
//   );
// };

// export default SideBar;
import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigationIcons = [
    {
      id: 1,
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      path: "/message",
      icon: <TiMessages />,
    },
    {
      id: 3,
      path: "/notifecation",
      icon: <FaRegBell />,
    },
    {
      id: 4,
      path: "/setting",
      icon: <FaGears />,
    },
    {
      id: 5,
      icon: <MdLogout />,
    },
  ];

  return (
    <div className="w-[140px] bg-mainColor h-[100vh] rounded-2xl overflow-hidden">
      <div className="flex justify-center">
        <div className="w-[80px] h-[80px] mt-6 rounded-b-full relative cursor-pointer group border-[4px] border-white rounded-full">
          <picture>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ProfilePicture"
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <span className="absolute hidden group-hover:block left-1/2 top-1/2 text-white text-3xl -translate-1/2">
            <IoCloudUploadOutline />
          </span>
        </div>
      </div>

      {/* Navigation Icon */}

      <div className="flex flex-col items-center justify-center mt-[80px] gap-y-[64px] ">
        {navigationIcons?.map((item, index) =>
          navigationIcons.length - 1 === index ? (
            <div
              className="text-[36px] text-white mt-[120px] cursor-pointer"
              key={item.id}
            >
              {item.icon}
            </div>
          ) : (
            <Link
              to={item.path}
              className={
                location.pathname === item.path
                  ? "text-[36px] text-white active cursor-pointer"
                  : "text-[36px] text-white cursor-pointer"
              }
              key={item.id}
            >
              {item.icon}
            </Link>
          )
        )}
      </div>
      {/* Navigation Icon */}
    </div>
  );
};

export default SideBar;