import React from "react";
import { Link } from "react-router-dom";
import "../styles/account1.css";
import "../styles/EditProfile.css";
const user = "https://storage.googleapis.com/aodour_v1/website/user-img1.png";
const EditProfile = () => {
  return (
    <div className="wapper">
      <section className="bg-gray">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <form className="profile_pic">
                <input type="file" id="upload_pic" />
                <label htmlFor="upload_pic">
                  <img src={user} alt="user image here" />
                  <span>Upload a photo</span>
                </label>
              </form>
              <div className="signout">
                <h6>Welcome!</h6>
                <Link to="/">Sign Out</Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
              <div className="provided_services">
                <ul>
                  <li>
                    <Link to="/">
                      <i className="fa fa-tint" aria-hidden="true"></i>My Purchases
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-file-text-o" aria-hidden="true"></i>
                      Consultations
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-heart" aria-hidden="true"></i>Lists &
                      Favorites
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link to="/">
                      <i className="fa fa-archive" aria-hidden="true"></i>Shipping &
                      Billing
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-calendar" aria-hidden="true"></i>Auto-Ship
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-trophy" aria-hidden="true"></i>Clinique
                      Smart Rewards
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link to="/">
                      <i className="fa fa-cog" aria-hidden="true"></i>Account
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-comments-o" aria-hidden="true"></i>Live
                      Chat
                    </Link>
                  </li>
                  <li>
                    <Link to="/">Connected Accounts: None</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="inner-banner">
        <div className="container-fluid">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/">My Account</Link>
            </li>
            <li>
              <span>Shipping & Billing</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="box_heading">
        <div className="container-fluid">
          <div className="column_model">
            <h4>Address Book</h4>
            <p>
              Please review your information below and add any missing inform
            </p>
          </div>

          <div className="column_model">
            <h4>Personal Information</h4>
            <form>
              <div className="text-felid">
                <input type="text" placeholder="First name" />
              </div>
              <div className="text-felid">
                <input type="text" placeholder="Email Address" />
              </div>
              <div className="text-felid">
                <input type="text" placeholder="Verify Email Addresss" />
              </div>
              <div className="text-felid">
                <input type="text" placeholder="Enter Password" />
              </div>
              <div className="text-felid">
                <input type="text" placeholder="Verify Password" />
              </div>
            </form>
          </div>

          <div className="column_model">
            <h4>About You</h4>
            <p>When is your birthday?</p>
            <div className="fwidth">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="text-felid">
                    <select>
                      <option value="">Volvo</option>
                      <option value="">Saab</option>
                      <option value="">Mercedes</option>
                      <option value="">Audi</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="text-felid">
                    <select>
                      <option value="">Volvo</option>
                      <option value="">Saab</option>
                      <option value="">Mercedes</option>
                      <option value="">Audi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column_model">
            <h4>Royal Emails & Special Offers</h4>
            <div className="checkbox">
              <input id="chk" type="checkbox" name="ag" value="" />
              <label htmlFor="chk">
                <span></span>Yes, email me special offers, product previews and
                the latest n
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
