import React from "react";

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gray-400">
      <div className="flex items-center">
        <img
          className="w-25"
          src="https://img.freepik.com/free-vector/hand-drawn-bookstore-logo_23-2149331221.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Welcome Admin</h1>

      <button className="cursor-pointer bg-black text-white font-bold p-2 rounded border hover:bg-white hover:text-black me-4">
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
