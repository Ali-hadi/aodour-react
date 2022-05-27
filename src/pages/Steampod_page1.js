import React from "react";
import '../styles/TermAndCondition.css'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
const Steampod_b1 = "https://storage.googleapis.com/aodour_v1/images/steampod/image019.jpg";
const Steampod2_b2 = "https://storage.googleapis.com/aodour_v1/images/steampod/image021.jpg";
const Steampod3_user1 = "https://storage.googleapis.com/aodour_v1/images/steampod/image020.png";
const Steampod3_user2 = "https://storage.googleapis.com/aodour_v1/images/steampod/image022.jpg";
const Steampod3_user3 = "https://storage.googleapis.com/aodour_v1/images/steampod/image023.jpg";
const Steampod3_user4 = "https://storage.googleapis.com/aodour_v1/images/steampod/image024.png";
const Steampod3_user5 = "https://storage.googleapis.com/aodour_v1/images/steampod/image025.png";
const Steampod3_user6 = "https://storage.googleapis.com/aodour_v1/images/steampod/image026.png";
const Steampod3_user7 = "https://storage.googleapis.com/aodour_v1/images/steampod/image027.png";
const img = "https://storage.googleapis.com/aodour_v1/website/terms-02.png";
export default function Policy() {
  return (
    <>
      <Helmet>
        <title>FAQs</title>
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
                <span>FAQs</span>
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-sm-12 col-xs-12"></div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="title_content">
                  <h2><b>Steampod</b></h2>
                  <p><b><span>WHAT IS A STEAMPOD HAIR STRAIGHTENER?</span></b></p>
                  <figure><img src={Steampod_b1} alt="image here" /></figure>
                  <p><b><span>L'Orial Professional Steampod</span></b><span>
                      is a professional steam styler using patented steam technology to transform your hair with professional results. </span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>HOW DOES STEAMPOD WORK?</span></b></p>
                  <p><span>Using
                  a continuous flow of high-pressure steam to target each strand without
                  flattening the fibers, the hair styling tool features anodized ceramic plates to create an ultra-smooth finish with mirror-like shine.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>HOW DOES STEAMPOD DIFFER TO A REGULAR HAIR STRAIGHTENER?</span></b>
                  </p>
                  <p><span>With
                  a regular hair straightener when you straighten hair and you see steam coming
                  off the hair, this is because water is evaporating from the hair/moisture is
                  leaving the hair. Because the hair is made of water it acts like a sponge, so
                  if its empty, void of moisture and you go outside and itOs humid, the hair will
                  want to regain and retain the moisture, the weak bonds will be broken then by water and the hair reforms back into its natural state i.e. It becomes frizzy!</span>
                  </p>
                  <p><span>With
                  Steampod, the combination of heat and steam gently and durably style the hair
                  without drying the core so that when you go outside in humid weather, the hair
                  wonot take on any more water so it will keep its straightened state/style for longer.</span>
                  </p>
                  <p>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user1} alt="image here" /></div>
                      <div className="col-md-6 col-sm-6 col-xs-6"></div>
                    </div>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>IS STEAMPOD LESS DAMAGING VS. A NORMAL HAIR STRAIGHTENER?</span></b>
                  </p>
                  <p><span>78% Less damage*</span>
                  </p>
                  <figure><img src={Steampod2_b2} /></figure>
                  <p><b><span>DOES THE COLOUR FADE USING THE STEAMPOD VS A REGULAR STRAIGHTENER?</span></b>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>WHO ARE ROWENTA?</span></b></p>
                  <p><span>For
                  the 1st time ever, 2 world class brands, LOOrOal Professionnel, the
                  hairdressersO professional choice in salon, and Rowenta, a leading manufacturer
                  of small home appliances, have combined their expertise to develop a high-tech
                  steam straightening iron for use professionally in salon and at home for your convenience.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>IS THE STEAMPOD HEAVY?</span></b></p>
                  <p><span>Steampod is super thin and light!</span>
                  </p>
                  <p> 
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user2} alt="img here" /></div>
                      <div className="col-md-6 col-sm-6 col-xs-6"></div>
                    </div>  
                  </p>
                  <p><b><span>&nbsp;</span></b></p>
                  <p><b><span>SHOULD I USE FILTERED WATER TO FILL MY STEAMPOD TOOL?</span></b>
                  </p>
                  <p><span>Yes,filtered water should be used to fill the water tank within your Steampod tool.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>DOES STEAMPOD TURN ITSELF OFF? </span></b></p>
                  <p><span>Steampod switches itself to sleep mode after 30 min of inactivity.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>How To Use Steampod </span></b></p>
                  <p><b><span>HOW DO YOU USE A STEAMPOD?O </span></b></p>
                  <p><span>Direction of use: </span>
                  </p>
                  <p><span>The
                  Steampod styler must be used in the direction indicated by the arrows (comb
                  always located at the bottom) so that the hair section is exposed to the steam before being straightened between the plates.</span>
                  </p>
                  <p><span>Clasp
                  the hair firmly between the plates; the steam starts spreading automatically as
                  soon as the tongs are closed. Run your Steampod slowly, from the root to the end of the hair so that the steam can spread to the heart of the hair section. </span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>CAN STEAMPOD BE USED ON WET HAIR?</span></b>
                  </p>
                  <p><span>For optimum results, we recommend the hair is 100% dry before using the Steampod.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>CAN I USE THE STEAMPOD WITHOUT WATER?</span></b>
                  </p>
                  <p><span>We
                  do not recommend using the Steampod without the correct level of water in the tank.</span>
                  </p>
                  <p><b><span>&nbsp;</span></b></p>
                  <p><b><span>HOW TO REMOVE STEAMPOD COMB?</span></b></p>
                  <p><span>Attaching
                  / Removing / cleaning the comb: If you want to clean the comb, you can remove
                  it by sliding it outwards. You must remove the comb when it is cold in order to
                  avoid getting burnt. The comb can be cleaned in soapy water. Check that the comb is dry before fitting it back in the straightener.</span>
                  </p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>CAN I USE A STEAMPOD FOR SHORT HAIR?</span></b>
                  </p>
                  <p><span>Yes,
                  the Steampod can be used on all hair types, preferably the hair should fit comfortably within the width of the plates.</span>
                  </p>
                  <p>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user3} alt="img here" /></div>
                      <div className="col-md-6 col-sm-6 col-xs-6"></div>
                    </div>
                  </p>
                  <p><b><span>DOES STEAMPOD WORK ON ALL HAIR TYPES? </span></b>
                  </p>
                  <p><span>Yes, it can be used on all hair types.</span>
                  </p>
                  <p>
                    <div className="row">
                     <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user4} alt="img here" /></div>
                     <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user5} alt="img here" /></div>
                    </div> 
                  </p>
                  <p><b><span>CAN I CURL MY HAIR WITH A STEAMPOD?</span></b>
                  </p>
                  <p><span>Many styles can be produced using the Steam pod, follow the link for styling tips </span>
                  </p>
                  <p><b><a href="https://www.youtube.com/channel/UCxJ_cNEIb7tlMif4T4NH-ag" target="_blank">https://www.youtube.com/channel/UCxJ_cNEIb7tlMif4T4NH-ag</a></b></p>
                  <p><span>&nbsp;</span></p>
                  <p><b><span>WHAT PRODUCT TO USE WITH THE STEAMPOD?</span></b>
                  </p>
                  <p><span>Use
                  the Liss Unlimited Primrose Oil or Mythic oil for maximum shine and smoothness.</span>
                  </p>
                  <p>
                    <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user6} alt="img here" /></div>
                    <div className="col-md-6 col-sm-6 col-xs-6"><img src={Steampod3_user7} alt="img here" /></div>
                    </div>
                  </p>
                </div>  
              </div>
              <div className="col-md-3 col-sm-12 col-xs-12"></div>
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
