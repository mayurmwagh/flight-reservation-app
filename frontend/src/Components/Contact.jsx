import { toast, ToastContainer } from "react-toastify";

export default function Contact() {

    const mailSent = (e) => {
        e.preventDefault();
        toast("Email sent")
    };
    return <>
        <ToastContainer />
        <div className="contact">
            <div className="row">
                <div className="col-md-5">
                    <h2>Contact Us</h2>
                    <br />
                    <p><i className='bx bxs-map'></i>&nbsp;&nbsp;Vidhya Nagar, Shivganga Tower, fourth floor</p>
                    <p><i className='bx bxs-phone'></i>&nbsp;&nbsp;9754947747</p>
                    <p><i className='bx bxs-envelope'></i>&nbsp;&nbsp;shivamlowanshi@gmail.com</p>
                </div>
                <div className="col-md-6">
                    <h2>Stay In Touch</h2>
                    <br />
                    <input type="text" placeholder="Enter Your Email Address" />
                    <button onClick={mailSent}><i className='bx bx-right-arrow-alt'></i></button>&nbsp;
                    <br /><br />
                    <p>Enter your email address for promotions, news and updates.</p>
                    <p></p>
                </div>
            </div>
        </div>
    </>
}