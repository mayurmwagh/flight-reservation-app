import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

export default function Payment() {
    const { token } = useSelector((store) => store.user);
    const location = useLocation();
    const { flightId, flightPrice } = location.state;
    const navigate = useNavigate();
    console.log( "id payment page "+flightId);
    const handleBooking = async () => {
        try {
            const response = await api.post('/bookings/book',
                {},
                {
                    params: {
                        flightId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });

            navigate("/my-bookings")
        } catch (error) {
            console.log('Error booking flights:', error);
            toast.error("Something went wrong, booking failed!!!")
        }
    };

    return <>
        <ToastContainer />
        <div className="payment">
            <div className="row payment-form width-50">

                <div className="col-md-4 left">
                    <h3>Total Amount</h3>
                    <h1 className="display-4">Rs. {flightPrice} </h1>
                </div>
                <div className="col-md-4 right">
                    <h4 className="text-center">Payment Page</h4>
                    <form>
                    <input type="text" className="form-control mt-3 mb-3" placeholder="Name on card" required />
                    <div className="card mb-3">
                        <p>Card Info</p>
                        <input type="text" className="form-control mb-2" placeholder="2343 **** **** 2134" required />
                        <div className="row">
                            <div className="col-md-4 ">
                                <input type="text" className="form-control" placeholder="23/28" required />
                            </div>
                            <div className=" col-md-4">
                                <input type="text" className="form-control" placeholder="***" required />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={handleBooking}>Pay Now</button>
                    </form>
                </div>
            </div>

        </div>
    </>
}