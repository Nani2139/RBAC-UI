import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import { AccountTree, Settings, Delete } from "@mui/icons-material"; // Icons
import RoleForm from "./RoleForm";

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(savedRoles);
  }, []);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleAddRole = (role) => {
    setRoles((prev) => [{ ...role, id: Date.now() }, ...prev]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedRoles = roles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#BCBCBC",
      }}
    >
   
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
        >
          Add Role
        </Button>
      </div>

      <TableContainer style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}> 
              <TableCell>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white", 
                    fontWeight: "bold",
                  }}
                >
                  <AccountTree style={{ marginRight: "8px", color: "white" }} />
                  Role Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white", 
                    fontWeight: "bold",
                  }}
                >
                  <Settings style={{ marginRight: "8px", color: "white" }} />
                  Permissions
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <Delete style={{ marginRight: "8px", color: "white" }} />
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRoles.map((role) => (
              <TableRow key={role.id} style={{ backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={roles.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[3]}
      />

      {showForm && <RoleForm onClose={() => setShowForm(false)} onAdd={handleAddRole} />}
    </Paper>
  );
}

export default RoleTable;
