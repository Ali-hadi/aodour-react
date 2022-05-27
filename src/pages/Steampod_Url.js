import React from 'react'
import '../styles/sale.css'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import ReactOwlCarousel from "react-owl-carousel";
const Banner1 = "https://storage.googleapis.com/aodour_v1/images/banner1.jpg";
const Banner2 = "https://storage.googleapis.com/aodour_v1/images/banner2.jpg";
const Banner2_mobile = "https://storage.googleapis.com/aodour_v1/images/banner2_mobo.jpg";
const User1 = "https://storage.googleapis.com/aodour_v1/images/user1.jpg";
const User2 = "https://storage.googleapis.com/aodour_v1/images/user2.jpg";
const User3 = "https://storage.googleapis.com/aodour_v1/images/user3.jpg";
const User4 = "https://storage.googleapis.com/aodour_v1/images/user4.jpg";
const User5 = "https://storage.googleapis.com/aodour_v1/images/user5.jpg";
const Placeholder = "https://storage.googleapis.com/aodour_v1/images/610x360.png";
// import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";
const responsive = {
	0: {
		items: 2
	},
	600: {
		items: 2
	},
	1000: {
		items: 5
	}
};
export default function Delivery() {

	return (

		<>
			<Helmet>
				<title>SteamPod 3.0</title>
				<meta name="keywords" content="Beauty And Personal Care" />
				<meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
			</Helmet>

			<div className="offer_page">
				<div className="mb30">
					<div className="container-fluid">
						<a href="https://www.aodour.pk/brand/loreal-professional/steampod-30" className="floating"><img src={Banner1} alt="banner image here" /></a>
					</div>
				</div>
				<div className="floating">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<div className="grid-column">
									<img src={Placeholder} className="placeholderbg" alt="image here" />
									<iframe
										src="https://www.youtube.com/embed/XcYkviUzq_8"
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<div className="grid-column">
									<img src={Placeholder} className="placeholderbg" alt="image here" />
									<iframe
										src="https://www.youtube.com/embed/IOE_Gv_1yGM"
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="banners">
					<div className="container-fluid">
						<img className="floating for-desktop" src={Banner2} alt="banner image here" />
						<img className="floating for-mobile" src={Banner2_mobile} alt="banner image here" />
					</div>
				</div>
				<div className="steem-buttons">
					<div className="container-fluid">
						<a href="https://www.aodour.pk/brand/loreal-professional/steampod-30" className="btn-normal at_bgbk">shop now</a>
						<ul>
							<div className="row">
								<li>
									<Link to="/SteampodFAQs" className="btn-normal4">FAQS</Link>
								</li>
								<li>
									<Link to="/howtouse" className="btn-normal4">HOW TO USE STEAMPOD HAIR STRAIGHTENER</Link>
								</li>
								<li>
									<Link to="/curlhair" className="btn-normal4">HOW TO CURL HAIR WITH STRAIGHTENERS</Link>
								</li>
							</div>
						</ul>
					</div>
				</div>
				<div className="last-section">
					<div className="container-fluid">
						<div className="syle-heading">
							<h2>create 5 signature looks with <span>Steam<span>Pod</span></span></h2>
						</div>
						<ul className="users_images">
							<ReactOwlCarousel lazyLoad={true} responsive={responsive}
								loop
								nav
								margin={10}
							>
								<li className="">
									<h6>Glass Hair</h6>
									<img src={User1} className="placeholderbg" alt="image here" />
								</li>
								<li className="">
									<h6>blow-dry</h6>
									<img src={User2} className="placeholderbg" alt="image here" />
								</li>
								<li className="">
									<h6>s-wave</h6>
									<img src={User3} className="placeholderbg" alt="image here" />
								</li>
								<li className="">
									<h6>2-waves</h6>
									<img src={User4} className="placeholderbg" alt="image here" />
								</li>
								<li className="">
									<h6>hollywood waves</h6>
									<img src={User5} className="placeholderbg" alt="image here" />
								</li>
							</ReactOwlCarousel>
						</ul>
					</div>

				</div>
				{/* <EidCampaignBottomBanner /> */}
			</div>
			
		</>
	)
}
