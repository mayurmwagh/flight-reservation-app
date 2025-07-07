import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../Redux-config/UserSlice";
import Logo from "../image/combined logo.png";

export default function Header() {
  const { isLoggedIn, roles } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  let navLinks;

  if (isLoggedIn) {
    if (roles?.includes("ROLE_ADMIN")) {
      // Logged in and Admin
      navLinks = (
        <ul>
          <li>
            <Link to={"/admin-profile"}>
              Your Profile <i className="bx bxs-user-detail"></i>
            </Link>
          </li>
          <li>
            <Link to={"/Flight"}>Flights</Link>
          </li>
          <li>
            <Link to={"/admin"}>Admin</Link>
          </li>
          <li>
            <Link to={"/my-bookings"}>
              Your Booking <i className="bx bx-receipt"></i>
            </Link>
          </li>
          <li>
            <Link onClick={() => dispatch(signOut())}>
              Log Out <i className="bx bx-log-out"></i>
            </Link>
          </li>
        </ul>
      );
    } else {
      // Logged in and not Admin
      navLinks = (
        <ul>
          <li>
            <Link to={"/profile"}>
              Your Profile <i className="bx bxs-user-detail"></i>
            </Link>
          </li>
          <li>
            <Link to={"/search-flights"}>
              Search Flights <i className="bx bx-search"></i>
            </Link>
          </li>
          <li>
            <Link to={"/my-bookings"}>
              Your Booking <i className="bx bx-receipt"></i>
            </Link>
          </li>
          <li>
            <Link onClick={() => dispatch(signOut())}>
              Log Out <i className="bx bx-log-out"></i>
            </Link>
          </li>
        </ul>
      );
    }
  } else {
    // Not logged in
    navLinks = (
      <ul>
        <li>
          <Link to={"/"}>
            Home <i className="bx bx-home-alt"></i>
          </Link>
        </li>
        <li>
          <Link to={"/login"}>
            Login <i className="bx bx-log-in"></i>
          </Link>
        </li>
        <li>
          <Link to={"/register"}>
            Register <i className="bx bxs-contact"></i>
          </Link>
        </li>
        <li>
          <Link to={"/contact"}>
            Contact <i className="bx bx-phone"></i>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>
            <img src={Logo} alt="" className="logo" /> Cloudblitz Flight
            Reservation System
          </h1>
          <nav>
            {/* {isLoggedIn ? (<ul>
                        {
                            roles?.includes("ROLE_ADMIN") && (
                                <li><Link to={"/admin-profile"}>Admin<i className="bx bxs-cog"></i></Link></li>
                            )
                        }
                        <li><Link to={"/profile"}>Your Profile <i className='bx bxs-user-detail'></i></Link></li>
                        <li><Link to={"/search-flights"}>Search flights <i className='bx bx-search'></i></Link></li>
                        <li><Link to={"/my-bookings"}>Your Booking <i className='bx bx-receipt'></i></Link></li>
                        {/* <li><Link>Contact <i className='bx bx-phone'></i></Link></li> */}
            {/* <li><Link onClick={() => dispatch(signOut())}>Log out <i className='bx bx-log-out'></i></Link></li>
                    </ul>) : (<ul>
                        <li><Link to={"/"}>Home <i className='bx bx-home-alt'></i></Link></li>
                        <li><Link to={"/login"}>Login <i className='bx bx-log-in'></i></Link></li>
                        <li><Link to={"/register"}>Register <i className='bx bxs-contact'></i></Link></li>
                        <li><Link to={"/contact"}>Contact <i className='bx bx-phone'></i></Link></li>
                    </ul>)} */}
            {navLinks}
          </nav>
        </div>
      </header>
    </>
  );
}
