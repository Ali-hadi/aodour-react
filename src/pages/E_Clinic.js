import React from "react";
import "../styles/E_Clinic.css";
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
const img1 = "https://storage.googleapis.com/aodour_v1/website/aobanner-bg.jpg";
const img2 = "https://storage.googleapis.com/aodour_v1/website/appointment-1.png";
export default function E_Clinic() {
  return (
    <>
      <Helmet>
        <title> Determatology</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>
      <div className="wapper">
        {/*
		=========================================
			BANNER STARTS 
		=========================================
  		*/}
        <div className="inner-banner">
          <div className="container-fluid">
            <ul className="breadcrumbs">
              <li>
                <Link to='/' >home</Link>
              </li>
              <li>
                <span>determatology</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="aodour_banner">
          <div className="slide">
            <img src={img1} alt="bg images" />
            <div className="banner-contents">
              <h4>free skin</h4>
              <br />
              <h4>consultation</h4>
              <h2>Determatology</h2>
              <span>is the right answer to healthy looking skin</span>
              <p>your best outcome starts withan easy free appointment</p>
              <Link to='/'  className="btn-normal-arrow">
                Book Now<i className="fa fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="services_table">
          <div className="column-4x">
            <span>01</span>
            <div className="service_caps">
              <h6>book your appointment</h6>
              <p>
                Book your appointments with our expert online by filling up the
                form
              </p>
            </div>
          </div>
          <div className="column-4x">
            <span>02</span>
            <div className="service_caps">
              <h6>Expert consultation</h6>
              <p>
                Our expert will get in touch with you through:Phone Call: The
                expert will give you a call and discuss your concern in a call.
                whatsapp Video Call: You will get a video call on whatsapp from
                our expert
              </p>
            </div>
          </div>
          <div className="column-4x">
            <span>03</span>
            <div className="service_caps">
              <h6>Result</h6>
              <p>
                Receive your detailed consultation result through email or SMS
                All the correspondence with our specialist will be confidential
                and wil not be shared with anyone.
              </p>
            </div>
          </div>
        </div>
        {/*
		=========================================
			BANNER ENDS 
		=========================================
  		*/}

        {/*
		=========================================
			CONTENT STARTS 
		=========================================
  		*/}
        <div className="content">
          <div className="bg-gary">
            <div className="container-fluid custom-responsive">
              <figure className="doctor-pix">
                <img src={img2} alt="img here" />
              </figure>
              <div className="doctor-details">
                <h4>we offer free</h4>
                <h3>skin consultation</h3>
                <span>
                  <b>Meet</b> Our Expert
                </span>
                <span>
                  <b>Dr. Rehana Abdul Qadir</b>
                  <small>Pharmactist (RPh.)</small>
                </span>
                <p>
                  On the other hand we denounce with righteous of pleasure
                  indignation and dislike men who are so beguiled and
                  demoralized by the charms of pleasure of the trouble that
                  moment so blinded by desire that they cannot foresee the pain
                  and trouble that are bound.
                </p>
                <Link to='/'  className="btn-normal at_bg2 ">
                  Appointment Now
                </Link>
              </div>
            </div>
          </div>
          <section>
            <div className="container-fluid custom-responsive">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="edit-form">
                    <form>
                      <h6 className="titie_widget">
                        Your Personal Details (New User)
                      </h6>
                      <div className="input-feild">
                        <input type="text" placeholder="Enter Name" />
                      </div>
                      <div className="input-feild">
                        <input type="email" placeholder="Enter Email" />
                      </div>
                      <div className="input-feild">
                        <input
                          type="text"
                          placeholder="Password Minimum 6 Characters"
                        />
                      </div>
                      <div className="input-feild">
                        <input
                          type="text"
                          placeholder="Phone No (Ex. 0320 1234567)"
                        />
                      </div>
                      <div className="input-feild">
                        <input type="date" placeholder="mm/dd/yyyy" />
                      </div>
                      <div className="btn-submit">
                        <Link to='/'  className="btn-normal at_bg2 ">
                          Sign Up
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="edit-form">
                    <form>
                      <h6 className="titie_widget">Login (Existing User)</h6>
                      <div className="input-feild">
                        <input
                          type="text"
                          placeholder="Enter User Name / Email"
                        />
                      </div>
                      <div className="input-feild mb0">
                        <input type="password" placeholder="Enter Password" />
                      </div>
                      <Link to='/'  className="btn-small">
                        Forgotten Password
                      </Link>
                      <div className="btn-submit">
                        <Link to='/'  className="btn-normal at_bg2 ">
                          Login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="date-filter">
                    <h6>Book a Reservation</h6>
                    <div className="date-calender"></div>
                    <h6>Choose Time</h6>
                    <div className="date-time">
                      <Link to='/'  className="at_bg2 ">
                        10:00 AM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        10:30 AM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        11:00 AM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        11:30 AM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        12:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        12:30 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        01:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        01:30 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        02:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        02:30 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        03:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        03:30 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        04:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        05:00 PM
                      </Link>
                      <Link to='/'  className="at_bg2 ">
                        06:00 PM
                      </Link>
                    </div>
                    <div className="btn-80 ">
                      <Link to='/'  className="at_bg2  ">
                        Show More Times
                      </Link>
                      <div className="mb30"></div>
                    </div>
                    <div className="btn-100">
                      <Link to='/'  className="btn-normal at_bg2 ">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*
		=========================================
			CONTENT ENDS 
		=========================================
  		*/}
      </div>
    </>
  );
}
