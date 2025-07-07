import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import FlightSearch from "./Components/FlightSearch";
import BookingsList from "./Components/BookingList";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Authenticate from "./Components/Authenticate";
import "react-toastify/dist/ReactToastify.css";
import Booking from "./Components/Booking";
import Update from "./Components/Update";
import Contact from "./Components/Contact";
import Payment from "./Components/Payment";
import AdminProfile from "./Components/AdminProfile";
import Admin from "./Components/Admin";
import Flights from "./Components/Flights";
import AddAdmin from "./Components/AddAdmin";
import ViewadminList from "./Components/ViewadminList";
import AddFlight from "./Components/AddFlight";
import ViewFlightsList from "./Components/ViewFlightsList";
import AdminAuthenticate from "./Components/AdminAuthenticate";
import CheckIn from "./Components/CheckIn";
import CheckInDashboard from "./Components/CheckInDashboard";
import CheckInDone from "./Components/CheckInDone";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search-flights"
          element={
            <Authenticate>
              <FlightSearch />
            </Authenticate>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <Authenticate>
              <BookingsList />
            </Authenticate>
          }
        />
        <Route
          path="/profile"
          element={
            <Authenticate>
              <Profile />
            </Authenticate>
          }
        />
        <Route
          path="/booking"
          element={
            <Authenticate>
              <Booking />
            </Authenticate>
          }
        />
        <Route
          path="/update-profile"
          element={
            <Authenticate>
              <Update />
            </Authenticate>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <AdminAuthenticate>
              <AdminProfile />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminAuthenticate>
              <Admin />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/add-admin"
          element={
            <AdminAuthenticate>
              <AddAdmin />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/view-admins"
          element={
            <AdminAuthenticate>
              <ViewadminList />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/flight"
          element={
            <AdminAuthenticate>
              <Flights />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/add-flight"
          element={
            <AdminAuthenticate>
              <AddFlight />
            </AdminAuthenticate>
          }
        />
        <Route
          path="/view-flightlist"
          element={
            <AdminAuthenticate>
              <ViewFlightsList />
            </AdminAuthenticate>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route
          path="/checkin-dashboard"
          element={
            <Authenticate>
              <CheckInDashboard />
            </Authenticate>
          }
        />
        <Route
          path="/checkin-done"
          element={
            <Authenticate>
              <CheckInDone />
            </Authenticate>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
