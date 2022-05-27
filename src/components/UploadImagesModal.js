import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { customRequest } from "../redux/sagas";
import Upload from "rc-upload";
import "../styles/AddToCartModel.css";
import notification from "./Notification";
import { Callbacks } from "jquery";

const ThankYouModal = ({ isOpen, onClose, onSubmitHandler }) => {
  const [files, setFiles] = useState([]);

  const uploadProps = {
    multiple: false,
    beforeUpload: () => {
      if (files.length > 2) {
        notification({
          message: "Only 3 images can be uploaded",
          error: true,
        });
        return false;
      }
      return true;
    },
    customRequest: customRequest,
    onStart(file) {
      // console.log("onStart", file, file.name);
      setFiles((fs) => {
        return [...fs, { ...file, error: false, uploading: true }];
      });
    },
    onSuccess(file) {
      // console.log("onSuccess", ret, file.name);
      setFiles((f) =>
        f.map((item) =>
          item.uid === file.uid
            ? { ...file, error: false, uploading: false }
            : item
        )
      );
    },
    onError(ret) {
      setFiles((f) =>
        f.map((item) =>
          item.orignalName === ret.name
            ? { ...item, error: true, uploading: false }
            : item
        )
      );
    },
    onProgress({ percent }, file) {
      // console.log("onProgress", `${percent}%`, file.name);
      //   setFiles(
      //     files.map((item) =>
      //       item.uid === file.uid
      //         ? { ...item, error: false, uploading: true }
      //         : item
      //     )
      //   );
    },
  };
  
  const onCloseHandler = (f) => {
    setFiles((file) => file.filter((item) => item.uid !== f.uid));
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      className={"productmodel"}
      onRequestClose={() => {
        onClose();
        setFiles([]);
      }}
      shouldCloseOnOverlayClick={true}
      overlayClassName="notify_opacity"
    >
      <div>
        <div className="pro_notify_model uploading_files_model">
          <div className="notify_head">
            <h6>Upload images</h6>
          </div>
          <span
            className="cross-btn icon-close"
            onClick={() => {
              onClose();
              setFiles([]);
            }}
          ></span>
          <div className="floating">
            <Upload {...uploadProps}>
              <button>
                <i className="fa fa-paperclip" aria-hidden="true"></i>Upload Images
              </button>
            </Upload>
            <ul className="uploading_images">
              {files.map((item) => (
                <li className={item.error ? "error" : ""} >
                  {!item.uploading && <img src={item.url} alt=""/>}
                  <b
                    className="cross-btn icon-close"
                    onClick={() => onCloseHandler(item)}
                  ></b>
                  {item.uploading && (
                    <div className="overlay_spiners">
                      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                      <span className="sr-only"></span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="btns">
            <button
              className="btn-normal at_bg2"
              onClick={() => {
                const images = files
                  .filter((item) => !item.uploading && item.url)
                  .map((item) => item.url);
                if (images.length === 0)
                  return notification({
                    message: "Please upload at least one image",
                    error: true,
                  });

                onSubmitHandler(images, () => {
                  onClose();
                  setFiles([]);
                });
              }}
            >
              submit
            </button>
            <button
              className="btn-normal at_bg3"
              onClick={() => {
                onClose();
                setFiles([]);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ThankYouModal;
