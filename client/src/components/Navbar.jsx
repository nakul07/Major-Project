const NavbarItems = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
  return (
    <nav className="w-full flex md:justify-center ">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <p>EMDRS</p>
      </div>
      <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Hospitals", "Doctors", "Patients", "Reports"].map((item, index) => (
          <NavbarItems key={item + index} title={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
