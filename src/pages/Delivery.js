import React from 'react'

import '../styles/Delivery.css'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
const img = "https://storage.googleapis.com/aodour_v1/website/terms_img.png";
export default function Delivery() {
	return (
		<>
			<Helmet>
				<title>Delivery</title>
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
							<li><Link to='/' >home</Link></li>
							<li><span>Delivery Services</span></li>
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
					{/* <section className="terms-bg bg_img4" style={{backgroundImage: `url(${img})`}}>
	    		<div className="container-fluid">
	    			<div className="term-content wid50">
	    				<h3>Delivery Services</h3>
	    				<p>Consectetur aliquet a erat per sem nisi leo placerat dui a adipiscing a sagittis vestibulum. Segittis posuere id nam quis vetibulum faucibus a est tristique ridiculus sed. Segittis posuere id nam quis vestibulum vestibulum a facilisi at elit hendreit scelerisque sodales nam dis orci non aliquet enim.</p>
	    			</div>
	    		</div>
	    	</section> */}
					<div className="fixed-blog rtl-column">
						<div className="container-fluid">
							<div className="bg_blog">
								<img src={img} alt="img here" />
								<div className="term-content heading">
									<h3>Delivery Services</h3>
								</div>
							</div>
						</div>
					</div>

					<section>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-xs-12">
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Guarnteed Delivery</h4>
										<p>Average Delivery Time Is 7-10 Days.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Delivery Charges</h4>
										<p className="">200 Delivery charges all across Pakistan. Free Return.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Delivery Notifiction</h4>
										<p>If you chose to have an item delivered, we'll send a Delivery notification email when the item leaves our warehouse. This email includes the carrier name, tracking number, and a delivery date. You can click the tracking number to track your package on the carrier's website.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Right on your Doorstep</h4>
										<p>Too tired to go to a shopping mall? Well, it’s just a few clicks away from you. Click and pick what you like and you will find us knocking at your door with your product soon. Apart from making the payment via cash on delivery, you can also choose to pay through various other payment options that we offer, as per your ease.</p>
									</div>
								</div>
								<div className="col-md-6 col-sm-6 col-xs-12">
									<div className="rounded-column">
										<h4>Conditions for Returns</h4>
										<ol>
											<li>The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.</li>
											<li>The product must include the original tags, user manual, warranty cards, freebies and accessories.</li>
											<li>The product must be returned in the original and undamaged manufacturer packaging / box. If the product was delivered in a second layer of Aodour packaging, it must be returned in the same condition with return shipping label attached. Do not put tape or stickers on the manufacturers box.</li>
										</ol>
										<p><strong>Note:</strong>It is important to print out and paste the return label on your return parcel to avoid any inconvenience/delay in process of your return.</p>
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
	)
}
