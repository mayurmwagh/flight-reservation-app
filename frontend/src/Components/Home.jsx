import { useState } from "react";
import api from "../api";
import { Link, Navigate } from "react-router-dom";
import Hero from "../image/hero img 11 4 png.png";

export default function Home() {
  return (
    <>
      <main>
        <div className="row">
          <div className="Banner col-md-6">
            <img src={Hero} className="hero" />
            <div className=""></div>
          </div>
          <div className="col-md-6 banner-2">
            <h1 className="display-1">Go further,</h1>
            <h1 className="display-1 mb-5">get closer</h1>
            <p>Millions of cheap flights. One simple search.</p>
            <Link to={"/login"}>
              <button className="btn btn-outline-warning mt-3">
                Search Flights
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={"/check-in"}>
              <button className="btn btn-secondary mt-3">Check In</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}




