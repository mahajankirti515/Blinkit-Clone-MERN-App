import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Deshboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid grid-cols-[250px_1fr]">
        {/* left for menu */}
        <div className="py-4 sticky top-24 overflow-y-auto">
          <UserMenu />
        </div>

        {/* right for menu */}
        <div className="bg-white p-4">
            <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Deshboard;
