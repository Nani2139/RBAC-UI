import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function RoleForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const handlePermissionChange = (e) => {
    const value = e.target.value;
    setPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Role name is required!");
      return;
    }
    onAdd({ id: Date.now(), name, permissions });
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add Role</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Role Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <Box>
            {["Read", "Write", "Delete"].map((perm) => (
              <FormControlLabel
                key={perm}
                control={
                  <Checkbox
                    value={perm}
                    onChange={handlePermissionChange}
                    checked={permissions.includes(perm)}
                  />
                }
                label={perm}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Role
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoleForm;
