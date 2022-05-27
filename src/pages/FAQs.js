import React from 'react'

import '../styles/Delivery.css'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Delivery() {
	return (
		<>
			<Helmet>
				<title>Faqs</title>
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
							<li><span>FAQs</span></li>
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
				<div className="content ">
					<div className="fixed-blog rtl-column mb20">
						<div className="container-fluid">
						<div className="bg_blog">
							<img src="https://storage.googleapis.com/aodour_v1/website/faq_bg.png" alt="img here"/>
						</div>    
						</div>
					</div>
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12 col-sm-12 col-xs-12">
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>How do I check the shipping status of my order?</h4>
										<p>To inquire about the status of your order, please click on Track Your Order link on website.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>What if I want to return or replace my order after I have received it?</h4>
										<p>To return or replace your order you should inform us with a valid reason within 7 days of delivery. You will need to follow the complete process of returns and replace method .To know more about Returns and replace take a brief look at Returns and replace policy of aodour.pk.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>What are your delivery charges?</h4>
										<p>200 Delivery charges all across Pakistan. Free Return.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>What is delivery time?</h4>
										<p>We are trying our best to dispatch the products as soon as possible but average transit days are 2-4 days.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Delivery times same for all parts of the country?</h4>
										<p>To inquire about the status of your order, please click on Track Your Order link on website.
                                    <br /><strong>The time varies from city to city e.g.;</strong>
											<ol>
												<li>Lahore 1 to 2 days</li>
												<li>Islamabad 2 to 4 days</li>
												<li>Karachi 4 to 8 days.</li>
											</ol>
										</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>How reliable is your delivery service method?</h4>
										<p>We deliver through different courier companies to ship all orders safely at your doorstep.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>What if my order is lost or damaged?</h4>
										<p>It is well ensured that your order will not be lost or damaged. However if such instance takes place you will receive a full refund on your order.aodour.pk takes complete responsibility of such matters.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>When will I receive my order?</h4>
										<p>Please note that orders may take up to 3 full business days to process in our warehouse before shipping. Therefore, orders with standard shipping may take from 7 to 10 business days to arrive. For more information visit our delivery services policy.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Do you have limits on how much product I can order?</h4>
										<p>No, there is no limit.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>How can I update my order?</h4>
										<p>Once an order has begun processing, we are unable to make any changes to it. This includes updates to shipping information as well as product selections. Please be sure to carefully review your order before submitting it.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>How can I cancel an order?</h4>
										<p>Call customer service immediately at <b>(042) 37176611, (042) 37176612</b>. Please note we ship orders as quickly as possible and cannot guarantee cancellation.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Do You Ship Internationally?</h4>
										<p>Currently we are shipping in Pakistan only.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>What do I do if tracking says my package was delivered, but I never was received it?</h4>
										<p>Please contact customer service <b>(042) 37176611, (042) 37176612</b>.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Why is my order incomplete?</h4>
										<p>Items missing from your order may have been out of stock. If a product has a price of 0.00 on your final invoice, it was unavailable during order fulfillment and you were not charged for it. Please contact customer service <b>(042) 37176611, (042) 37176612</b> with any further questions about your purchase.</p>
									</div>
									<div className="blockqoute_content">
										<h4><span className="fa fa-hand-o-right clr1"></span>Why was my order modified?</h4>
										<p>aodour.pk reserves the right to modify or cancel any order.</p>
									</div>

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
	)
}
