import React from 'react'
import '../styles/About.css'
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
const img3 = 'https://storage.googleapis.com/aodour_v1/website/about_pix1.png';
const img4 = 'https://storage.googleapis.com/aodour_v1/website/about_pix2.png';
const img5 = 'https://storage.googleapis.com/aodour_v1/website/about_pix3.png';
const img1 = 'https://storage.googleapis.com/aodour_v1/website/grid-img-1.jpg';
const img2 = 'https://storage.googleapis.com/aodour_v1/website/grid-img-2.jpg';

export default function About() {
    return (
        <>
            <Helmet>
                <title>About Us</title>
                <meta name="keywords" content="Beauty And Personal Care" />
                <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
            </Helmet>
          	<div className="wapper">

                <div className="inner-banner">
                    <div className="container-fluid">
                        <ul className="breadcrumbs">
                            <li><Link to='/' >home</Link></li>
                            <li><span>about us</span></li>
                        </ul>
                    </div>
                </div>

                {/*
                =========================================
                CONTENT STARTS  style={{backgroundImage:`url(${img3})`}}
                =========================================
                */}
                <div className="content">


                    <div className="fixed-blog rtl-column">
                        <div className="container-fluid">
                            <div className="bg_blog" >
                                <img src={img3} alt="img here"/>
                                <div className="term-content heading">
                                    <h1>About us</h1>
                                    <p>Aodour is an establishment that prides itself in providing only the best and highest quality cosmetic products to its customers through tireless evaluation of leading brands worldwide.<br /> <br /> Since its Inception, Aodour has aimed to revolutiionize how cosmetics are percieved by providing detailed and in depth information about<br /> <br /> each and every product we offer so that our clients can find it easier to identify items that suit their individually specific needs & they have no problem in the perfect application of these items.</p>
                                </div>
                            </div>    
                        </div>
                    </div> 

                    <div className="fixed-blog fullwidth">
                        <div className="container-fluid">
                            <div className="bg_blog">
                                <img src={img4} alt="img here"/>
                                <div className="term-content heading">
                                    <h3>Why Aodour?</h3>
                                    <p>We at Aodour have no loyalties to any brand, our loyalties lie only with you, our customers, and we go to greath lengths to cater for your wishes by not only providing around the clock customer support but by identifying what is right for you and only you. With constant promotional offers and deals that can not be matched, Aodour is the best choice for all your cosmetic needs.<br /> <br /> How can you determine which product is best for you? Where can you find all the leading names in cosmetics? Where can you find the best prices with a short delivery time? The answer to all these questions is simply “Aodour”</p>
                                </div>
                            </div>    
                        </div>
                    </div> 

                    <div className="fixed-blog ltr-column">
                        <div className="container-fluid">
                            <div className="bg_blog">
                                <img src={img5} alt="img here"/>
                                <div className="term-content heading">
                                    <h3>Mission</h3>
                                    <p>We at Aodour want to make International... National. Not only do we aim to bring the best international cosmetic products to Pakistan but we want to deliver them to you at your doorstep. It is our goal to provide the people of Pakistan with the highest quality at the lowest prices. Unlike the products of many local distributors, our cosmetics are of the highest quality and one hundred percent original.<br /> <br /> It is our mission to revolutionise the cosmetic industry by providing unmatched products at unbeatable prices and most importantly spread awareness about cosmetics and encourage their proper selection and use so that the unmistakable beauty that shines in this country can shine even more brighter than ever before.</p>
                                </div>
                            </div>    
                        </div>
                    </div> 

                    <div className="fixed-blog">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="grid_style_2">
                                        <figure>
                                            <img src={img1} alt="img here" />
                                        </figure>
                                        <div className="grid-style-content">
                                            <h4><Link to='/' >Customer Care</Link></h4>
                                            <p>To help you regarding products, payments, delivery and all other queries, we have 24/7 online customer support service available to clear your queries or else you can also contact us via email at info@aodour.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="grid_style_2">
                                        <figure>
                                            <img src={img2} alt="img here" />
                                        </figure>
                                        <div className="grid-style-content">
                                            <h4><Link to='/' >Beauty Consultancy Service</Link></h4>
                                            <p>If you are worried about not being sure of your skin type & don’t know which product to buy? We are providing you the solution of that through “FREE BEAUTY CONSULTANCY”. You can get assistance from our Beauty Consultants via website.</p>
                                        </div>
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
