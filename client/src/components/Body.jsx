import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Body1 = () => {
  const [formData, setformData] = useState({
    h_owner: "",
    name: "",
  });

  const {
    currentAccount,
    connectWallet,
    sendTransaction,
    isLoading,
    transactions,
    doctors,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { h_owner, name } = formData;

    e.preventDefault();

    if (!h_owner || !name) return;

    sendTransaction(formData);
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <div>
      {!currentAccount ? (
        <button type="button" onClick={connectWallet} className="border-[1px]">
          Connect to Wallet
        </button>
      ) : (
        shortenAddress(currentAccount)
      )}

      <h1>Hospital Details</h1>
      <input
        placeholder="Hospital Name"
        name="name"
        type="text"
        onChange={(e) => handleChange(e, "name")}
      />
      <input
        placeholder="h_owner"
        name="h_owner"
        type="text"
        onChange={(e) => handleChange(e, "h_owner")}
      />
      <div>
        <button type="button" onClick={handleSubmit} className="border-[1px]">
          Register
        </button>
      </div>
      <div>
        Hospitals:
        <div>
          <p> {transactions["name"]}</p>
          <p> {transactions["h_owner"]}</p>
        </div>
      </div>
      <div>
        Doctors:
        {doctors.map((doctor, i) => (
          <div key={i}>
            <p>{doctor.name}</p>
            <p> {doctor.d_address}</p>
            <p>{doctor.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body1;
