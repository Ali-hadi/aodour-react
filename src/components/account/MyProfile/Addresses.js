import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Address from "./Address";
import AddAddress from "./editAdress";
import notification from "../../Notification";
import {
  POST_ADD_ADDRESS,
  POST_ADDRESS_MAKE_DEFAULT,
  POST_EDIT_ADDRESS,
  POST_DELETE_ADDRESS,
} from "../../../constants/actionTypes";
import Loader from "../../Loader/compnentLoader";
import { getUserToken } from "../../../util";

export default function Addresses({ addresses }) {
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [forEdit, setForEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const openEditModal = (address) => {
    setForEdit(true);
    setSelectedAddress(address);
    setIsAddAddressOpen(true);
  };

  const openAddModal = () => {
    setForEdit(false);
    setSelectedAddress({});
    setIsAddAddressOpen(true);
  };

  const addAddress = (id, name, city, phone, address, isPrimary, isNew) => {
    if (isNew) {
      setLoading(true);
      dispatch({
        type: POST_ADD_ADDRESS,
        payload: {
          city_id: city,
          name,
          phone,
          address,
          default_status: isPrimary,
        },
        callback: (response, status) => {
          setLoading(false);
          if (status === "fail") {
            notification({
              message: "Something went wrong try again",
              error: true,
            });
          } else {
            setIsAddAddressOpen(false);
            notification({
              message: "Added Successfully",
              error: false,
            });
          }
        },
      });
    } else {
      // TODO: edit address
      setLoading(true);
      dispatch({
        type: POST_EDIT_ADDRESS,
        payload: {
          id,
          city_id: city,
          name,
          phone,
          address,
          default_status: isPrimary,
        },
        callback: (response, status) => {
          setLoading(false);
          if (status === "fail") {
            notification({
              message: "Something went wrong try again",
              error: true,
            });
          } else {
            setIsAddAddressOpen(false);
            notification({
              message: "Added Successfully",
              error: false,
            });
          }
        },
      });
    }
  };

  const handleMakeDefault = (id) => {
    setLoading(true);
    dispatch({
      type: POST_ADDRESS_MAKE_DEFAULT,
      payload: { id, customer_id: getUserToken() },
      callback: () => {
        setLoading(false);
      },
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    dispatch({
      type: POST_DELETE_ADDRESS,
      payload: { id },
      callback: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="address_grid">
        <h4>My Addresses</h4>
        <Link className="btn-normal at_bg2" onClick={openAddModal}>
          <i className="icon-plus"></i>Add address
        </Link>
      </div>
      <div className="addresses_row">
        {addresses &&
          addresses.map((address) => (
            <Address
              address={address}
              openEditModal={openEditModal}
              openAddModal={openAddModal}
              handleMakeDefault={handleMakeDefault}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      <AddAddress
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        addNewAddress={addAddress}
        forEdit={forEdit}
        selectedAddress={selectedAddress}
        addAddress={addresses}
      />
    </>
  );
}
