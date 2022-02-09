//import Loader from "./";
// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input
//     placeholder={placeholder}
//     name={name}
//     type={type}
//     value={value}
//     onChange={(e) => handleChange(e, name)}
//     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black   text-sm white-glassmorphism"
//   />
// );

const Body1 = () => {
  const handleSubmit = () => {};
  const connectWallet = () => {};
  return (
    <div>
      <button type="button" onClick={connectWallet} className="border-[1px]">
        Connect to Wallet
      </button>
      <h1>Hospital Details</h1>
      <input
        placeholder="Hospital Name"
        name="hospitalName"
        type="text"
        //value=""
        onChange={() => {}}
      />
      <div>
        <button type="button" onClick={handleSubmit} className="border-[1px]">
          Register
        </button>
      </div>
    </div>
  );
};

export default Body1;
