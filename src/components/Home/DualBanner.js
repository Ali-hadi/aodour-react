import React from "react";
import { Link } from "react-router-dom";
export default function ButtonBanner({ dual_banner }) {
  return (
    <>
      {/*
			=========================================
				Two column
			=========================================
	  		*/}
      {dual_banner && dual_banner.length > 0 && (
        <section className="padding50x">
          <div className="container-fluid">
            <div className="row">
              {dual_banner.map(banner => (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div className="simplebanner">
                    <a href={banner.href} target='_blank'>
                      <img src={banner.image} alt={banner.title} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/*
			=========================================
				Two column ends
			=========================================
	  		*/}
    </>
  );
}
