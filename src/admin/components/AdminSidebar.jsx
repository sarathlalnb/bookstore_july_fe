import { faBook, faBriefcase, faDashboard, faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div style={{ minHeight: "87vh" }} className="bg-gray-800">
      <h1 className="mt-10 text-3xl font-bold text-amber-200 text-center">
        Admin Dashboard <FontAwesomeIcon icon={faDashboard} />
      </h1>

      <div className="border mt-20 text-center p-10">
        <div>
          <Link to={"/admin-home"} className="text-amber-200 font-bold">
            Admin Home <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>

        <div className="mt-10">
          <Link to={"/admin-books"} className="text-amber-200 font-bold">
            Admin Books/Users <FontAwesomeIcon icon={faBook} />
          </Link>
        </div>

          <div className="mt-10">
          <Link to={"/admin-careers"} className="text-amber-200 font-bold">
            Admin Careers <FontAwesomeIcon icon={faBriefcase} />
          </Link>
        </div>

          <div className="mt-10">
          <Link to={"/admin-settings"} className="text-amber-200 font-bold">
            Admin Settings <FontAwesomeIcon icon={faGear} />
          </Link>
        </div>


      </div>
    </div>
  );
};

export default AdminSidebar;
