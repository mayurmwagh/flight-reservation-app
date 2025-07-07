import { useNavigate } from "react-router-dom"

export default function Admin() {
    const navigate = useNavigate();

    const addAdmin=()=>{
        navigate("/add-admin");
    }
    const viewAdmins=()=>{
        navigate("/view-admins");
    }

    return <>
        <div className="admin">
            <div className="row">
                <div className="col-md-6">
                    <div className="admin-panel">
                       <center> <i className='bx bxs-user-plus'></i> </center>
                        <button className="form-control btn btn-primary mt-5" onClick={addAdmin}>Add Admin</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="admin-panel">
                        <center><i className='bx bxs-user-detail'></i></center>
                        <button className="form-control btn btn-dark mt-5" onClick={viewAdmins}>View Admins</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}