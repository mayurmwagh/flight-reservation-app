import { useNavigate } from "react-router-dom"

export default function Flights() {
    const navigate = useNavigate();

    return <>
        <div className="admin">
            <div className="row">
                <div className="col-md-6">
                    <div className="admin-panel">
                       <center> <i className='bx bxs-plane-alt'></i> </center>
                        <button className="form-control btn btn-primary mt-5" onClick={()=> navigate('/add-flight')}>Add Flight</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="admin-panel">
                        <center><i className='bx bx-list-ol'></i></center>
                        <button className="form-control btn btn-dark mt-5" onClick={()=> navigate('/view-flightlist')}>View All Flights</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}