import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Authenticate({children}){
    const {isLoggedIn} = useSelector((store)=>store.user); 
    if(isLoggedIn)
      return children;
    else
      return <Navigate to={"/"} />
}