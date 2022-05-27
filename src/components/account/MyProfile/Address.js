import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  POST_ADDRESS_MAKE_DEFAULT,
  POST_DELETE_ADDRESS,
} from "../../../constants/actionTypes";

const Address = ({
  address,
  openEditModal,
  handleMakeDefault,
  handleDelete,
}) => {
  // const {
  //   address: addressLine,
  //   city_name: cityName,
  //   default: isDefault,
  //   first_name: firstName,
  //   last_name: lastName,
  //   id,
  //   phone,
  // } = address;

  // const [addressId, setAddressId] = useState();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(addressId);
  // }, [addressId]);

  const handleEdit = () => {
    openEditModal(address);
  };

  return (
    <div className="address_column">
      <div className="crud_actions">
        <div className="checkbox">
          <input
            onClick={() => {
              handleMakeDefault(address.id);
            }}
            id={address.id}
            type="radio"
            name="abc"
            value="a"
            checked={address.default === 1 ? true : false}
          />
          <label for={address.id}>
            <span></span>Default
          </label>
        </div>
        <ul className="crud_buttons">
          <li>
            <Link onClick={handleEdit}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Link>
          </li>
          {address.default === 0 && (
            <li>
              <Link onClick={() => handleDelete(address.id)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <p>
        {`${address.first_name} ${address.last_name ? address.last_name : ""}`}{" "}
        <span>({address.phone})</span>
      </p>
      <p>{`${address.address}, ${address.city_name}`}</p>
    </div>
  );
};

export default Address;
