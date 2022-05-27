import React, { useState, useEffect } from "react";
import { customRequest } from "../../redux/sagas";
import Upload from "rc-upload";
import notification from '../Notification';

const Leftsection = ({ data: { complaintType, orders }, onSubmit }) => {
  const [selectedComplaintType, setSelectedComplaintType] = useState();
  const [reason, setReason] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);

  const onChange = (value, id, resons) => {
    if (value) {
      const reasonId = complaintType.find((item) => item.id == id);
      setSelectedComplaintType(id);
      setReason(resons);
      setSelectedProducts((p) =>
        p?.map((item) => ({
          ...item,
          reasonId: reasonId.complaintReasons[0].id,
        }))
      );
    }
  };



  const onCloseHandler = (f) => {
    setFiles((file) => file.filter((item) => item.uid !== f.uid));
  };

  const handleSubmit = () => {
    const payload = {
      orderDetails: {
        complaint_type_id: selectedComplaintType,
        products: selectedProducts.filter((item) => item.selected),
        complaint_notes: note,
      },

      images: files.filter((item) => item.url).map((item) => item.url),
    };
    onSubmit(payload);
  };

  useEffect(() => {
    if (complaintType) {
      setReason(complaintType[0].complaintReasons);
      setSelectedComplaintType(complaintType[0].id);
      setSelectedProducts(() =>
        orders[0]?.products?.map((item) => ({
          ...item,
          selected: false,
          reasonId: complaintType[0].complaintReasons[0].id,
        }))
      );
    }
  }, [complaintType]);

  const selectAll = (e) => {
    setSelectedProducts((selectedProducts) =>
      selectedProducts.map((item) => ({ ...item, selected: e }))
    );
  };

  const changeReasonHandler = (value, productid) => {
    setSelectedProducts((selectedProducts) =>
      selectedProducts.map((item) =>
        item.id === productid ? { ...item, reasonId: value } : item
      )
    );
  };

  const onSelect = (value, productid) => {
    setSelectedProducts((selectedProducts) =>
      selectedProducts.map((item) =>
        item.id === productid ? { ...item, selected: value } : item
      )
    );
  };

  const uploadProps = {
    multiple: false,
    accept:'image/*',
    beforeUpload: (file) => {
      // console.log(file, 'befor upload file si he');
      
      if (files.length > 2) {
        notification({
          message: "Only 3 images can be uploaded",
          error: true,
        });
        return false;
      }

      if(file.size > 4002047){
        notification({
          message: "Image size is too large",
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
      // console.log("onSuccess", file, file.name);
      setFiles((f) =>
        f.map((item) =>
          item.uid === file.uid
            ? { ...file, error: false, uploading: false }
            : item
        )
      );
    },
    onError(ret) {
      let dt = [...files];
      for(let row of dt){
        if(row.orignalName === ret.name){
          row.error = true;
          row.uploading = false
        }
      }
      setFiles(dt);
      notification({
        message: "Error While Uploading",
        error: true,
      });
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

  // console.log(files, 'files files');
  

  if (orders)
    return (
      <div className="col-md-9 col-sm-12 col-xs-12">
        <div className="floating mb10 responsive_orders">
          {/* <h6 className="order-nr">
            Order Number:<span>{orders[0].orderNumber}</span>
          </h6> */}
          <div className="group_menu">
            <h6 className="order-nr">
              Type of Complaint: <sup>*</sup>
            </h6>
            <div className="reason_menu">
              {complaintType &&
                complaintType.map((item, index) => (
                  <div className="radio_btn">
                    <input
                      id={item.id}
                      type="radio"
                      value={item.id}
                      name="typeofcomplaint"
                      checked={item.id === selectedComplaintType ? true : false}
                      onChange={(e) =>
                        onChange(
                          e.target.checked,
                          item.id,
                          item.complaintReasons
                        )
                      }
                    />
                    <label htmlFor={item.id}>
                      <span></span>
                      {item.type}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="selection_from">
          <div className="table-wrapper mb30">
            <div className="cms_table_content">
              <table>
                <thead>
                  <tr>
                    <th>
                      <div className="checkbox">
                        <input
                          id="-1"
                          type="checkbox"
                          value="-1"
                          onChange={(e) => selectAll(e.target.checked)}
                        />
                        <label htmlFor="-1">
                          <span></span>
                        </label>
                      </div>
                    </th>
                    <th>
                      select product
                    </th>
                    <th>
                      Name
                    </th>
                    <th>
                     Qty
                    </th>
                    <th>
                      Reason Of Complaint
                    </th>
                    <th>
                     Price
                    </th>
                    <th>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((item) => (
                    <tr>
                      <td>
                        <div className="checkbox">
                          <input
                            onChange={(e) =>
                              onSelect(e.target.checked, item.id)
                            }
                            checked={item.selected}
                            id={item.id}
                            type="checkbox"
                            value={item.id}
                          />
                          <label htmlFor={item.id}>
                            <span></span>
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src={item.image} alt="image here" />
                      </td>
                      <td>
                        <div className="product_listing">
                          <h6>{item.productVariationName}</h6>
                        </div>
                      </td>
                      <td>
                        <span>x{item.quantity}</span>
                      </td>
                      <td>
                        <div className="reason_menu">
                          <select
                            onChange={(e) =>
                              changeReasonHandler(e.target.value, item.id)
                            }
                          >
                            {reason.map((item) => (
                              <option id={item.id} value={item.id}>
                                {item.reason}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td>
                        {item.discountPrice > 0 ? (
                          <span>
                            Rs. {item.price - item.discountPrice}{" "}
                            <del>{item.price}</del>
                          </span>
                        ) : (
                            <span>Rs. {item.price}</span>
                          )}
                      </td>
                      <td>
                        <span className="pull-right">
                          {item.discountPrice > 0 ? (
                            <span>
                              Rs.{" "}
                              {(item.price - item.discountPrice) *
                                item.quantity}{" "}
                              <del>{item.price * item.quantity}</del>
                            </span>
                          ) : (
                              <span>Rs. {item.price * item.quantity}</span>
                            )}
                          /-
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <h5 className="pull-right"></h5>
                    </td>
                    <td>
                      <h5 className="pull-right"></h5>
                    </td>
                    <td>
                      <h5 className="pull-right"></h5>
                    </td>
                    <td>
                      <h5 className="pull-right"></h5>
                    </td>
                    <td>
                      <h5 className="pull-right"></h5>
                    </td>
                    <td>
                      <span>Delivery Charges</span>
                    </td>
                    <td>
                      <span className="pull-right">Rs.200/-</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* htmlFor Mobile */}
          <div className="listing_phone">


            <div className="listing-mobile-header">
              <div className="checkbox">
                <input
                  id="-2"
                  type="checkbox"
                  value="-2"
                  onChange={(e) => selectAll(e.target.checked)}
                />
                <label htmlFor="-2">
                  <span></span>
                </label>
              </div>
              <h5>Select product</h5>
            </div>

            {selectedProducts.map((item) => (
              <div className="htmlFor_mobile">
                <div className="listing_columns">
                  <div className="checkbox">
                    <input
                      onChange={(e) =>
                        onSelect(e.target.checked, item.id)
                      }
                      checked={item.selected}
                      id={item.id}
                      type="checkbox"
                      value={item.id}
                    />
                    <label htmlFor={item.id}>
                      <span></span>
                    </label>
                  </div>
                  <img src={item.image} alt="image here" />
                  <div className="product_listing">
                    <h6>{item.productVariationName}</h6>
                    <span>x{item.quantity}</span>
                    {item.discountPrice > 0 ? (
                      <span>
                        Rs. {item.price - item.discountPrice}{" "}
                        <del>{item.price}</del>
                      </span>
                    ) : (
                        <span>Rs. {item.price}</span>
                      )}
                    <span className="pull-right">
                      {item.discountPrice > 0 ? (
                        <span>
                          Rs.{" "}
                          {(item.price - item.discountPrice) *
                            item.quantity}{" "}
                          <del>{item.price * item.quantity}</del>
                        </span>
                      ) : (
                          <span>Rs. {item.price * item.quantity}</span>
                        )}
                          /-
                        </span>
                  </div>
                  <div className="reason_menu">
                    <select
                      onChange={(e) =>
                        changeReasonHandler(e.target.value, item.id)
                      }
                    >
                      {reason.map((item) => (
                        <option id={item.id} value={item.id}>
                          {item.reason}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* htmlFor Mobile End */}
          <div className="group_menu floating mb30">
            <h6 className="order-nr">Complaint notes:</h6>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="User will enter compaint notes or info in this text box"
            ></textarea>
          </div>
          <div className="group_menu uploading_column floating mb30">
            <Upload {...uploadProps}>
              <button className="order-nr"> <i className="fa fa-paperclip" aria-hidden="true"></i>Upload
                  Images <sup>*</sup>
                  <br />

                  <sup>Maximum Image size is 4MB</sup>        
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
          <div className="group_menu floating res_mb50 align-center">
            <button type="submit" className="btn-normal at_bg2" onClick={handleSubmit}>
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    );

  return null;
};

export default Leftsection;
