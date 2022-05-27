import React from "react";
import { Link } from "react-router-dom";
import "../styles/account1.css";
import "../styles/ShippingAndBilling.css";
const user = "https://storage.googleapis.com/aodour_v1/website/user-img1.png";
const ShippingAndBilling = () => {
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
      <section>
        <div className="container-fluid">
          <div className="column_model">
            <h4>Address Book</h4>
            <h6>Primary Shipping Address:</h6>
            <p>you have no addresses on file.</p>
            <button
              type="button"
              className="btn-normal  at_bg2"
              data-toggle="modal"
              data-target="#model1"
            >
              new address
            </button>
          </div>

          <div className="column_model">
            <h4>Payment Information</h4>
            <button
              type="button"
              className="btn-normal  at_bg2"
              data-toggle="modal"
              data-target="#model2"
            >
              add new credit card
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Modal --> */}
      <div id="model1" className="modal fade" role="dialog">
        <div className="modal-dialog">
          {/* <!-- Modal content--> */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Address</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input_felid">
                  <input type="text" placeholder="First name" />
                </div>
                <div className="input_felid">
                  <input type="text" placeholder="Address" />
                </div>
                <div className="input_felid">
                  <input type="number" placeholder="Phone" />
                </div>
                <div className="input_felid">
                  <input type="text" placeholder="Email" />
                </div>
                <div className="form_grid">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <select>
                          <option value="">Province</option>
                          <option value="">Saab</option>
                          <option value="">Mercedes</option>
                          <option value="">Audi</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <select>
                          <option value="">City</option>
                          <option value="">Saab</option>
                          <option value="">Mercedes</option>
                          <option value="">Audi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_radio_box">
                  <h6>*This address is a: </h6>
                  <div className="box_radio">
                    <div className="radiolabel">
                      <input id="ab" type="radio" name="ab" value="" />
                      <label htmlFor="ab">
                        <span></span>Residence
                      </label>
                    </div>
                    <div className="radiolabel">
                      <input id="bc" type="radio" name="ab" value="" />
                      <label htmlFor="bc">
                        <span></span>Residence
                      </label>
                    </div>
                  </div>
                </div>
                <div className="checkbox">
                  <input id="chk" type="checkbox" name="ag" value="" />
                  <label htmlFor="chk">
                    <span></span>Make this My Default Shipping addres
                  </label>
                </div>
                <div className="default_btn">
                  <button type="button" className="btn-normal  at_bg2">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div id="model2" className="modal fade" role="dialog">
        <div className="modal-dialog">
          {/* <!-- Modal content--> */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Payment Method</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form_grid">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <select>
                          <option value="">Select Card Type</option>
                          <option value="">Saab</option>
                          <option value="">Mercedes</option>
                          <option value="">Audi</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <input type="text" placeholder="Credit Card Number" />
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="input_felid">
                        <input type="text" placeholder="Security Code" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <select>
                          <option value="">Expiration Month</option>
                          <option value="">Saab</option>
                          <option value="">Mercedes</option>
                          <option value="">Audi</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input_felid">
                        <select>
                          <option value="">Expiration Year</option>
                          <option value="">Saab</option>
                          <option value="">Mercedes</option>
                          <option value="">Audi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="checkbox">
                  <input id="chk" type="checkbox" name="ag" value="" />
                  <label htmlFor="chk">
                    <span></span>Make this My Default Shipping addres
                  </label>
                </div>
                <div className="boxcaptions">
                  <h5>Billing Address</h5>
                  <p>
                    This addres is not on file. Please click on “Make This My
                    Deafault Shipping Address” to designate one, or click on the
                    Add New Address button above”
                  </p>
                </div>
                <div className="default_btn">
                  <button type="button" className="btn-normal  at_bg2">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndBilling;
