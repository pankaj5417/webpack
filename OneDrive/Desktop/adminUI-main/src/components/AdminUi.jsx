import React from "react";
import "antd/dist/antd.css";
import AdminTable from "./AdminTable";
import "./AdminUi.css"

const AdminUI = () => {
  return (
    <div className="admin-container">
      <AdminTable />
    </div>
  );
};

export default AdminUI;
