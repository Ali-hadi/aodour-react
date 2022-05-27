import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Promo_style.css";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";

import FlipCountdown from '@rumess/react-flip-countdown';
import Modal from "react-modal";

export default function Campaign() {
    const banner = "https://storage.googleapis.com/aodour_v1/campaign_images/banner1.png";
    const banner2 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner2.png";
    const mbanner2 = "https://storage.googleapis.com/aodour_v1/campaign_images/mbanner2.png";
    const banner3 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner3.png";
    const banner4 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner4.png";
    const banner5 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner50.png";
    const banner6 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner6.png";
    const banner7 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner7.png";
    const mbanner7 = "https://storage.googleapis.com/aodour_v1/campaign_images/mbanner7.png";
    const banner8 = "https://storage.googleapis.com/aodour_v1/campaign_images/banner8.png";
    
    const mbanner8 = "https://storage.googleapis.com/aodour_v1/campaign_images/mbanner8.jpg";
    const card = "https://storage.googleapis.com/aodour_v1/campaign_images/card.png";
    const mcard = "https://storage.googleapis.com/aodour_v1/campaign_images/mcard2.png";
    const lights = "https://storage.googleapis.com/aodour_v1/campaign_images/lights.png";
    const lights2 = "https://storage.googleapis.com/aodour_v1/campaign_images/title.png";
    const lights3 = "https://storage.googleapis.com/aodour_v1/campaign_images/dico.png";



    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Helmet>
                <title>
                    {"New Year Upcoming Sale of the 2020 Year | Aodour"}
                </title>
                <meta name="description" content={""} />
                <meta name="keywords" content={"New Year Upcoming Sale of the 2020 Year | Aodour"} />
            </Helmet>
            {/* <Loader loading={loading} /> */}

            <div className="wrapper">
                <div className="mbanners ">
                    <img src={banner} alt="img here" />
                    <figcaption>
                        <img src={lights} alt="img here" />
                    </figcaption>
                </div>
                <div className="countdown">
                    <div className="container">
                        <div className="countdown_columns">
                            <h2>going to be <b>Live on</b></h2>
                            <FlipCountdown
                                titlePosition='bottom'
                                dayTitle='DAYS'
                                hourTitle='HOURS'
                                minuteTitle='MINUTES'
                                secondTitle='SECONDS'
                                hideYear
                                hideMonth
                                endAt={'2020-12-21 19:30:00'} // Date/Time
                            />
                        </div>
                    </div>
                </div>
                <div className="content_campaign">

                    <div className="banner_blog">
                        <div className="container-fluid">
                            <img className="desktop" src={card} alt="img here" />
                            <img className="mobile" src={mcard} alt="img here" />
                        </div>
                    </div>
                        <div className="banners">
                            <div className="container-fluid">
                                <img className="desktop" src={banner2} alt="img here" />
                                <img className="mobile" src={mbanner2} alt="img here" />
                            </div>
                        </div>

                        <div className="column_grid">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <img src={banner3} alt="img here" />
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <img src={banner4} alt="img here" />
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <img src={banner5} alt="img here" />
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <img src={banner6} alt="img here" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="banners playbutton">
                            <div className="container-fluid">
                                <figure>
                                    <img className="desktop" src={banner7} alt="img here" />
                                    <img className="mobile" src={mbanner7} alt="img here" />
                                    <span><i className="fa fa-play" aria-hidden="true" onClick={() => setIsOpen(true)}></i></span>
                                </figure>
                            </div>
                        </div>
                        <div className="banners">
                            <div className="container-fluid">
                                <img className="desktop" src={banner8} alt="img here" />
                                <img className="mobile" src={mbanner8} alt="img here" />
                            </div>
                        </div>

                    
                </div>
            </div>

            <Modal
                closeTimeoutMS={500}
                isOpen={isOpen}
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                overlayClassName={'ReactModal__Overlay video_pop'}
            >
                 <span
                    className="cross-btn icon-close"
                    data-dismiss="modal"
                    onClick={() => {
                        closeModal();
                    }}
                ></span>
                <div className="modal-body">
                    <div>
                        <iframe src="https://www.youtube.com/embed/v-Uqp3yIn7U" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
               
            </Modal>

        </>
    );
}
