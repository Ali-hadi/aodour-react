import React from "react";
import { Link } from "react-router-dom";
import "../styles/account1.css";
const reward = "https://storage.googleapis.com/aodour_v1/website/reward_img.jpg";
const user = "https://storage.googleapis.com/aodour_v1/website/user-img1.png";
const UserProfile = () => {
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

      <section className="pf_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="profile_section">
                <div className="pf_top_row">
                  <h5>Profile</h5>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="bulets dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="#">
                        Link 1
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Link 2
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Link 3
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="profile_grid">
                  <figure>
                    <img src={user} alt="show img" />
                  </figure>
                  <div className="profile_content">
                    <h6>Loram Impus</h6>
                    <small>Customer</small>
                    <ul className="pf_icons">
                      <li>
                        <span>
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </span>
                      </li>
                    </ul>
                    <p>
                      Profile data is any type of additional information that
                      you want to track,such as the person to contact .
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="pf_list">
                    <span>
                      <i className="fa fa-tint" aria-hidden="true"></i>
                    </span>
                    <div className="pf_list_content">
                      <h4>159</h4>
                      <span>My Purchases</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="pf_list">
                    <span>
                      <i className="fa fa-file-text-o" aria-hidden="true"></i>
                    </span>
                    <div className="pf_list_content">
                      <h4>12</h4>
                      <span>Consultations</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="pf_list">
                    <span>
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </span>
                    <div className="pf_list_content">
                      <h4>35</h4>
                      <span>Lists & Favorites</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="pf_list">
                    <span>
                      <i className="fa fa-trophy" aria-hidden="true"></i>
                    </span>
                    <div className="pf_list_content">
                      <h4>253 pt</h4>
                      <span>Royal Smart Awards</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="pf_list res_width">
                    <span>
                      <i className="fa fa-archive" aria-hidden="true"></i>
                    </span>
                    <div className="pf_list_content">
                      <p>
                        Eply dummy text of the printing pessetting industry
                        leorem Impus has been iply dummy the printing and
                        typest.
                      </p>
                      <span>Shippin & Billing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sprator_line"></div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
              <div className="pf_reviews">
                <div className="side_heading">
                  <h3>Royal Smart Rewards</h3>
                  <h4>Current Status</h4>
                </div>
                <ul className="pf_grid">
                  <li>
                    <div className="pf_listing">
                      <h5>5</h5>
                      <div className="pf_sm_col">
                        <span>
                          Points to
                          <br />
                          Redeem
                        </span>
                      </div>
                    </div>
                    <div className="progress_bar">
                      <div className="progress step1"></div>
                    </div>
                    <h4>Smart</h4>
                  </li>
                  <li>
                    <div className="pf_listing margin2">
                      <div className="pf_sm_col">
                        <span>
                          Tier 1<br />
                          SMART
                        </span>
                      </div>
                    </div>
                    <div className="progress_bar">
                      <div className="progress step2"></div>
                    </div>
                    <h4>Brilliant</h4>
                  </li>
                  <li>
                    <div className="margin3"></div>
                    <div className="progress_bar">
                      <div className="progress step3"></div>
                    </div>
                    <h4>Genius</h4>
                  </li>
                </ul>
                <div className="pf_offers">
                  <p>
                    You're 245 points away from the next level—and more Smart
                    Rewards.
                  </p>
                  <p>Anniversary Date: 07/08/2020</p>
                </div>
                <Link to="/" className="btn-normal  at_bg2">
                  See My Rewards
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-7 col-xs-12">
              <div className="heading_style3">
                <h4>Reward Yourself.</h4>
                <p>
                  Shop with your points and enjoy more Clinique greats. Redeem
                  with any purchase.
                </p>
              </div>
              <div className="group_reward_cols">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="reward_cols">
                      <div className="reward_img">
                        <figure>
                          <img src={reward} alt="show images" />
                        </figure>
                      </div>
                      <div className="reward_content">
                        <h6>
                          Art Deco Angel Eyes Mascare <br />
                          (01 black)
                        </h6>
                        <span>250 Points</span>
                        <Link className="btn-normal  at_bg2" to="/">
                          REDEEM NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="reward_cols">
                      <div className="reward_img">
                        <figure>
                          <img src={reward} alt="show images" />
                        </figure>
                      </div>
                      <div className="reward_content">
                        <h6>
                          Art Deco Angel Eyes Mascare <br />
                          (01 black)
                        </h6>
                        <span>250 Points</span>
                        <Link className="btn-normal  at_bg2" to="/">
                          REDEEM NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="reward_cols">
                      <div className="reward_img">
                        <figure>
                          <img src={reward} alt="show images" />
                        </figure>
                      </div>
                      <div className="reward_content">
                        <h6>
                          Art Deco Angel Eyes Mascare <br />
                          (01 black)
                        </h6>
                        <span>250 Points</span>
                        <Link className="btn-normal  at_bg2" to="/">
                          REDEEM NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sprator_line"></div>

      <section>
        <div className="container-fluid">
          <div className="side_heading">
            <h3>Earn More Points</h3>
            <h4>Just By Doing These Pretty Little Things.</h4>
          </div>
          <div className="group_points">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="points_content">
                  <p>
                    Complete Our <br />
                    Skin Care Diagnostic.
                  </p>
                  <span>15 points</span>
                  <Link to="/" className="btn-small  at_bg2">
                    start now
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="points_content">
                  <p>
                    Complete Our <br />
                    Skin Care Diagnostic.
                  </p>
                  <span>15 points</span>
                  <Link to="/" className="btn-small  at_bg2">
                    Start NOW
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="points_content">
                  <p>
                    Complete Our <br />
                    Skin Care Diagnostic.
                  </p>
                  <span>15 points</span>
                  <Link to="/" className="btn-small  at_bg2">
                    start now
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                <div className="points_content">
                  <p>
                    Complete Our <br />
                    Skin Care Diagnostic.
                  </p>
                  <span>15 points</span>
                  <Link to="/" className="btn-small  at_bg2">
                    start now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="float_div">
        <div className="container-fluid">
          <div className="site_info">
            <h3>Here are some easy steps:</h3>
            <p>
              Shop for Rs 3000 or above to be elgible for Royalty Program.
              <br />
              If you already are a Royal Customer, log on to www.aodour.pk
              <br />
              You are now a Royal Customer. Enjoy Royalty Pricing, Discounts,
              Gifts by Point Redemption every month and so much more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
