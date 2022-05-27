import React from "react";
import '../styles/Delivery.css'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
const img = "https://storage.googleapis.com/aodour_v1/website/policy_bg.png";
export default function Policy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
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
                <span>Privacy Policy</span>
              </li>
            </ul>
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

          <div className="fixed-blog rtl-column mb20">
            <div className="container-fluid">
              <div className="bg_blog">
                <img src={img} alt="img here"/>
                <div className="term-content heading">
                  <h3>Privacy Policy</h3>
                  <p>This Privacy Policy governs the manner in which Aodour Pakistan collects, uses, maintains and discloses information collected from users (each, a "User") of the aodour.com or aodour.pk website ("Site"). This privacy policy applies to the Site and all products and services offered by Aodour Pakistan.</p>
                </div>
              </div>    
            </div>
          </div>

          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="blockqoute_content">
                    <h4 className="mb20"><span className="fa fa-hand-o-right clr1"></span>Personal identification information</h4>
                    <p>
                      We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site ,place an order, fill out a form ,respond to a survey, subscribe to the newsletter and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information,
                      Users may, however, can visit our Site anonymously.
                      We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
                    </p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className="mb20"><span className="fa fa-hand-o-right clr1"></span>Non-personal identification information</h4>
                    <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className="mb20"><span className="fa fa-hand-o-right clr1"></span>Web browser cookies</h4>
                    <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className="mb20">
                      <span className="fa fa-hand-o-right clr1"></span>How we use collected information
                    </h4>
                    <span>Aodour Pakistan collects and uses Users personal information for the following purposes:</span>
                    <ol>
                      <li>
                        To improve customer service
                        Your information helps us to more effectively respond to your customer service requests and support needs.</li>
                      <li>
                        To personalize user experience
                        We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                      <li>
                        To improve our Site
                        We continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
                      <li>
                        To process transactions
                        We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.
                      </li>
                      <li>
                       To administer a content, promotion, survey or other Site feature
                        To send Users information they agreed to receive about topics we think will be of interest to them.
                      </li>
                      <li>
                        To send periodic emails
                      </li>
                      <li>
                        The email address Users provide for order processing, will only be used to send them information and updates pertaining to their order. It may also be used to respond to their inquiries, and/or other requests or questions. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site.
                      </li>
                    </ol>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className=""><span className="fa fa-hand-o-right clr1"></span>How we protect your information</h4>
                    <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>
                    <p>Aodour Pakistan don’t keep and store any type of financial data like credit or debit card information, all processing is done through our online payment gateway processor, currently Bank-Alfalah
                    Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.
                    </p>
                    <p><span>Third party websites</span>Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website\'s own terms and policies.</p>
                    <p><span>Advertising</span>Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non personal identification information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This privacy policy does not cover the use of cookies by any advertisers.</p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className=""><span className="fa fa-hand-o-right clr1"></span>Changes to this privacy policy</h4>
                    <p>Aodour Pakistan has the discretion to update this privacy policy at any time without any notice, We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className=""><span className="fa fa-hand-o-right clr1"></span>Your acceptance of these terms</h4>
                    <p><span>By using this Site, you signify your acceptance of this policy and terms of service. If you do not agree to this policy, please do not use our Site. Your continued use </span>of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
                  </div>
                  <div className="blockqoute_content">
                    <h4 className=""><span className="fa fa-hand-o-right clr1"></span>Contacting us</h4>
                    <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
                    <p>Aodour Pakistan.</p>
                    <p>www.aodour.pk</p>
                    <p>387 L Phase-5 Lahore Pakistan</p>
                    <p>webmaster@aodour.pk</p>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  
                </div>
              </div>
            </div>
          </div>
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
