import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import MobileNav from "./MobileNav";

import NavBarCategoryMenu from "./NavBarCategoryMenu";
import { Link } from "react-router-dom";
import CardDropDown from "./CartDropDown";
import NavBarBrandMenu from "./NavBarBrandMenu";
import SearchModal from "./SearchModal";
import MinisoNav from "./MinisoNav"
import { isUserLoggedIn } from "../../util";
import ProfileIcon from "./ProfileIcon";
const Salebtn = "https://storage.googleapis.com/aodour_v1/campaign/PakistanDay/nav_btn1.png";
// const Eidbtn = "https://storage.googleapis.com/aodour_v1/compaign/eidbtn.png";
const TrackIcon =
  "https://storage.googleapis.com/aodour_v1/website/track_icon.png";

export default function NavBar({
  setSearchModel,
  categories,
  brands: { new_brands, popular_brands, all_brands },
  isMiniso,
  location,
  getFilteredCart
}) {
  const history = useHistory();

  const gotoCheckout = () => {
    if (cartList.length > 0) {
      history.push("/checkout");
    }
  };

  const { cartList, wishlist } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const { minisoMenu } = useSelector(({ minisoMenu }) => minisoMenu);

  const cate = minisoMenu && minisoMenu.result && minisoMenu.result.category;

  // const [wishlist, setWishlist] = useState([]);

  // const getWishlist = () => {
  //   let list = window.localStorage.getItem("wishlist");
  //   if (list) {
  //     setWishlist(JSON.parse(list));
  //   } else {
  //     setWishlist([]);
  //   }
  // };

  console.log(location,'location.pathname', history);
  

  return (
    <div>
      <div className="sec_row">
        <div className="container-fluid">
          {/*
					================================
						NAVIGATION MENU STARTS
					================================
			    */}
          <div className="responsive-btn">
            <span className="sidebaricon" onClick={() => setOpen(true)}><i className="fa fa-bars" aria-hidden="true"></i></span>
            <MobileNav
              isOpen={open}
              onClose={setOpen}
              categories={isMiniso ? cate : categories}
              new_brands={new_brands ? new_brands : []}
              popular_brands={popular_brands ? popular_brands : []}
              all_brands={all_brands ? all_brands : []}
              isMiniso={isMiniso}
            />
          </div>
          <div className="logo res">
            <Link to="/track-order">
              <img src={TrackIcon} alt="img here" />
            </Link>
          </div>
          <div className="logo center">
            <h2>
              <Link to="/">
                <img src={logo} alt="Aodour" />
              </Link>
            </h2>
          </div>
          <div className="middle_menu">

            <div className="navigation-menu ">
              
              {
               location && location.pathname != '/checkout' && !location.pathname.includes('/checkout') ? <SearchModal /> : null
              }
              
              {
                !isMiniso ?

                  <nav>
                    <ul>
                      <li>
                        <Link to="/"> Home</Link>
                      </li>
                      <li>
                        <NavBarBrandMenu
                          new_brands={new_brands ? new_brands : []}
                          popular_brands={popular_brands ? popular_brands : []}
                          all_brands={all_brands ? all_brands : []}
                        />
                      </li>
                      <li>
                        <NavBarCategoryMenu
                          categories={categories.categories ? categories.categories : []}
                          subCategories={categories.subcategories}
                          subSubCategories={categories.subsubcategories}
                        />
                      </li>
                      <li>
                        <Link to="/Shop/new_arrival">New Arrivals</Link>
                      </li>
                      
                      <li>
                        <Link to="/professional-hair">Professional haircare</Link>
                      </li>
                      <li>
                        <Link to="/miniso">Miniso</Link>
                      </li>
                      {/* <li className="sale_btn">
                        <Link to="/womenday"><img src={Salebtn} alt="img here"/></Link>
                      </li> */}
                      <li>
                        <Link to="/flash-sale">Flash sale</Link>
                      </li>
                      {/*<li>
                         <Link to="/campaign11-11">11.11 Sale</Link> 
                      </li>*/}
                      {/* <li className="sale_btn">
                        <Link to="/pakistanday"><img src={Salebtn} alt="sale button"/></Link>
                      </li> */}
                      {/* <li className="padding-middle">
                  <Link to="/commingsoon" >
                    Beauty blog
                  </Link>
                </li>
                <li>
                  <Link to="/commingsoon" >
                    Offers
                  </Link>
                </li> */}
                      {/* <li>
                  <Link to='/commingsoon' >E Clinic</Link>
                </li> */}
                    </ul>
                  </nav>
                  : null}
            </div>
          </div>
          <div className="right-btns">
            {/* <ul className="meta fl mb15">
                <li>
                  <Link to="/commingsoon" className="btn-simple clr1" >
                    <i className="icon-Group-162"></i>E-Clinic
                    <b>E Clinic</b>
                  </Link>
                </li>
              </ul> */}
            {/*
						====================================
							BUTTONS =>
							SEARCH & USER & CART
						====================================
				  		*/}
            <ul className="shop_cart">
              <li className="res-none">
                <span className="carticon" onClick={gotoCheckout}>
                  <i className="icon-shopping-cart"></i>
                  <sup className="qty-show">{getFilteredCart().length}</sup>
                </span>
                <CardDropDown cartList={cartList} />
              </li>
              <li className="">
                <Link to="/track-order" className="tracking-btn"><i className="icon-tracking"></i><small><b>Track order</b></small></Link>
              </li>
              <li className="">
                <Link to="/track-complaint" className="tk-btn"><i className="icon-clock1"></i><small><b>Track Complaint</b></small></Link>
              </li>
              <ProfileIcon />
            </ul>
          </div>
          {/*
					====================================
						TOP RIGHT SIDE CONTENT ENDS
					====================================
			  		*/}
        </div>
        {
          isMiniso ?
            <>
              <MinisoNav />
            </> 
            : null}
      </div>
      {/*
			=========================================
				SECOND ROW ENDS
			=========================================
	  		*/}
    </div>

  );
}
