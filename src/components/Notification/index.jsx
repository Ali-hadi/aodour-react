import React from "react";
import Notification from "rc-notification";
import "rc-notification/assets/index.css";
let notification = null;
Notification.newInstance(
  { style: { bottom: '0px', right: 0 } }, 
  (n) => (notification = n));

export default function SimpleNotification({ message, error }) {
  return notification.notice({
    style: { background: '#344447' },
    duration: 3,
    content: (
      <div className="notification_row sucess">
        <i className="fa">{error ? "X" : "✓"}</i>
        <span>{message}</span>
      </div>
    ),
    onClose() {
      // console.log("simple close");
    },
  });
}
