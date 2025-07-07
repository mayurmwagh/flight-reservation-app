import { Link } from "react-router-dom";
import { signOut } from "../Redux-config/UserSlice";

export default function CheckInDone(){
    return <>
        <div className="checkin-done ">
            <div className="">
            <h1 className="display-2">
                Checkin Successfull
            </h1>
            </div>
            <center>
            <button onClick={() => dispatch(signOut())}  className="btn btn-outline-primary">Home</button>
            {/* <Link to={'/'} ><button className="btn btn-outline-primary">Home</button></Link> */}
            </center>
        </div>
    </>
}