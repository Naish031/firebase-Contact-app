import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white flex justify-center items-center gap-2 my-4 h-[60px] rounded-lg p-2">
      <img src="/Vector.png" alt="comapny logo" />
      <h2 className="text-xl text-black font-semibold">Firebase Contact App</h2>
    </nav>
  );
};

export default Navbar;
