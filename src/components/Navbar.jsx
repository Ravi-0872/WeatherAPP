import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[#28273cbb] flex flex-col  w-[5vw] h-[90vh] text-white p-2 rounded-xl justify-around items-center">
      <div className="logo">Weather</div>
      <ul className="flex flex-col gap-10">
        <li>
          <span class="material-symbols-outlined">home</span>
        </li>
        <li>
          <span class="material-symbols-outlined">location_on</span>
        </li>
        <li>
          <span class="material-symbols-outlined">calendar_today</span>
        </li>
        <li>
          <span class="material-symbols-outlined">settings</span>
        </li>
      </ul>
      <div className="lastpart">
        <ul className="flex gap-5 flex-col">
        <li>
          <span class="material-symbols-outlined">logout</span>
        </li>
        <li>
          <span class="material-symbols-outlined">dark_mode</span>
        </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
