import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Person, Email, Work, CheckCircle, HighlightOff, Settings } from "@mui/icons-material"; 
import UserForm from "./UserForm";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;


  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(savedUsers);
    setRoles(savedRoles);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [{ ...user, id: Date.now() }, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedUsers = users.slice(
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
          Add User
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
                  <Person style={{ marginRight: "8px", color: "white" }} />
                  Name
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
                  <Email style={{ marginRight: "8px", color: "white" }} />
                  Email
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
                  <Work style={{ marginRight: "8px", color: "white" }} />
                  Role
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
                  <CheckCircle style={{ marginRight: "8px", color: "white" }} />
                  Status
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
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                style={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.active ? (
                    <CheckCircle style={{ color: "green" }} />
                  ) : (
                    <HighlightOff style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setEditingUser(user);
                      setShowForm(true);
                    }}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(user.id)}
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
        count={users.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[3]}
      />

      {showForm && (
        <UserForm
          onClose={() => {
            setEditingUser(null);
            setShowForm(false);
          }}
          onSave={handleSaveUser}
          roles={roles}
          user={editingUser}
        />
      )}
    </Paper>
  );
}

export default UserTable;
