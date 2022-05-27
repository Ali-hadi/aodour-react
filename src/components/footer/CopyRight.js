import React from "react";
import {Link} from 'react-router-dom';
export default function copyRight() {
  return (
    <>
      <div className="copyrights">
        <div className="container-fluid">
          <ul className="social-icons">
            <li>
              <a href='https://www.facebook.com/aodourpakistan' target='_blank'>
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/aodourpakistan/' target='_blank'>
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a  href='https://twitter.com/AodourPakistan' target='_blank'>
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a  href='https://www.youtube.com/channel/UCr81MePqWu-OfInHM7xjZmQ' target='_blank'>
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href='https://api.whatsapp.com/send?phone=+923134846158' target='_blank'>
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
          <p>&copy; copyright 2016 - 2021 <small>aodour.pk</small> (Pvt.) Ltd. All rights reserved.</p>
          <ul className="via-meta">
            <li>
              <img src='../../assets/images/cod.jpg' alt="cod image" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
