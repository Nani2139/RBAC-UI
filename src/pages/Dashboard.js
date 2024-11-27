import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import UserTable from "../components/UserManagement/UserTable";
import RoleTable from "../components/RoleManagement/RoleTable";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="User Management" />
        <Tab label="Role Management" />
      </Tabs>
      <Box padding={3}>
        {activeTab === 0 && <UserTable />}
        {activeTab === 1 && <RoleTable />}
      </Box>
    </Box>
  );
}

export default Dashboard;
