import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminAuthenticate({children}){
    const {isLoggedIn, roles} = useSelector((store)=>store.user); 
    if(isLoggedIn && roles?.includes("ROLE_ADMIN"))
      return children;
    else
      return <Navigate to={"/"} />
}