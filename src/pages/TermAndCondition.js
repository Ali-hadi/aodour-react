import React from "react";
import '../styles/Delivery.css'
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
const img = "https://storage.googleapis.com/aodour_v1/website/terms_img.png";
export default function TermAndCondition() {
  return (
    <>

    <Helmet>
        <title>Terms & Conditions</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>  <div className="wapper">
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
                <span>Terms & Conditions</span>
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
          <div className="fixed-blog rtl-column">
            <div className="container-fluid">
              <div className="bg_blog">
                <img src={img} alt="img here"/>
                <div className="term-content heading">
                  <h3>Terms & Conditions</h3>
                </div>
              </div>    
            </div>
          </div> 

          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>Terms of
                      Use
                    </h4>
                    <p>
                      Tehse Terms of use (”Terms of Use”) administrate your
                      access to and use of this website at www.aodour.pk (the
                      “Site”). The site is operated by the team of Aodour. We
                      proide the site, including all information, tools and
                      services available through the site, to you, the
                      user,conditioned upon your acceptance of thes Terms of
                      Use.
                    </p>
                    <blockquote>
                      <p>
                        <b>PLEASE READ THESE TERMS OF USE CAREFULLY. BY ACCESSING
                        OR USING THE SITE, YOU ARE ACCEPTING AND AGREEING TO BE
                        BOUND BY THESE TERMS OF USE. IF YOU DO NOT ACCEPT AND
                        AGREE TO THESE TERMS OF USE, PLEASE DO NOT USE THE SITE.</b>
                      </p>
                    </blockquote>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>Return & Replacement Policy
                    </h4>
                    <p className="mb0">
                      If you are not satisfied with the purchase of products,
                      you may return it in 7 days from delivery date
                    </p>
                    <ol>
                      <li>
                        The item must include all the packaging along with
                        accessories including warranty cards, manuals,
                        certificates of authenticity, tags etc.
                      </li>
                      <li>
                        Money can be refunded and order can be altered after the
                        verification from the team of Aodour.
                      </li>
                      <li>
                        Order will be cancelled automatically if the provided
                        information is insuffcient
                      </li>
                      <li>
                        Item can be returned if it is damaged in any way eg
                        expired, broken etc.
                      </li>
                    </ol>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>Privacy
                      Notice
                    </h4>
                    <p>
                      We respect your concerns about privacy so this notice will
                      explain everything about privacy ie what type of
                      information will be obtained from you and how we will use
                      that information.
                    </p>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>
                      Information We Obtain
                    </h4>
                    <ol>
                      <li>
                        Contact information (such as name, postal address, email
                        address and telephone number);
                      </li>
                      <li>
                        Purchase and transaction information, such as payment
                        card details, billing and shipping address,and
                        information about the products, courses and other items
                        you purchase;
                      </li>
                      <li>Login credentials</li>
                      <li>
                        Demographic information, including age and gender.
                      </li>
                    </ol>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>How We
                      Will Use It
                    </h4>
                    <ol>
                      <li>
                        Communicate with you or confirmation of your order
                      </li>
                      <li>
                        Send your alerts about upcoming products, special offers
                        and deals via email and sms if you request to receive
                        them
                      </li>
                      <li>
                        Operate evaluate and improve our business (including
                        developing new products and services; managing, and
                        performing accounting, auditing and other internal
                        functions)
                      </li>
                      <li>
                        Protect against, identify and prevent fraud and other
                        unlawful activity, clains and other liabilities.
                      </li>
                    </ol>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>
                      Copyrights
                    </h4>
                    <p>
                      The entire contents of the Site also are protected by
                      copyright as a collective work under Pakistani copyright
                      laws and international converntions. All rights are
                      reserved
                    </p>
                  </div>
                  <div className="blockqoute_content">
                    <h4>
                      <span className="fa fa-hand-o-right clr1"></span>
                      Termination
                    </h4>
                    <p>
                      You furtermore agree that the Site shall not be liable to
                      you or to any other person as a result of any such
                      suspension or termination.If you are dissatisfied with the
                      Site or with any terms, conditions, rules, policies,
                      guidelines or practices in operating the Site, your sole
                      and exclusive remedy is to idscontinue using the site.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="rounded-column">
                    <h4>Conditions for Returns</h4>
                    <ol>
                      <li>
                        The product must be unused, unworn, unwashed and without
                        any flaws. Fashion products can be tried on to see if
                        they fit and will still be considered unworn. If a
                        product is returned to us in an inadequate condition, we
                        reserve the right to send it back to you.
                      </li>
                      <li>
                        The product must include the original tags, user manual,
                        warranty cards, freebies and accessories.
                      </li>
                      <li>
                        The product must be returned in the original and
                        undamaged manufacturer packaging / box. If the product
                        was delivered in a second layer of Aodour packaging, it
                        must be returned in the same condition with return
                        shipping label attached. Do not put tape or stickers on
                        the manufacturers box.
                      </li>
                      <li>
                        The product must be returned in the original and
                        undamaged manufacturer packaging / box. If the product
                        was delivered in a second layer of Aodour packaging, it
                        must be returned in the same condition with return
                        shipping label attached. Do not put tape or stickers on
                        the manufacturers box.
                      </li>
                    </ol>
                    <p>
                      <strong>Note:</strong><b>It is important to print out and
                      paste the return label on your return parcel to avoid any
                      inconvenience/delay in process of your return.</b>
                    </p>
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
