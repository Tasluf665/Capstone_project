import { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button
} from "@mui/material";
import axios from "axios";
import jwtEncode from "jwt-encode";
import secureLocalStorage from "react-secure-storage";

const initialQuery = {
  uid: "",
  role: "",
};

const WasteManagement = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const token = jwtEncode(
    secureLocalStorage.getItem("session"),
    process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
  );

  const [query, setQuery] = useState({ ...initialQuery });

  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get(
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
          }/api/user/auth/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
  }, []);


  const updateRole = async () => {
    if (!query.uid || !query.role) {
      alert("Please select a user and a role.");
      return;
    }

    try {
      const response = await axios.post(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
        }/api/system/change-role?uid=${query.uid}&role=${query.role}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          alert("Role updated successfully!");
          setQuery({ ...initialQuery });
          // update user in users state
          const updatedUsers = users.map((user) => {
            if (user._id === query.uid) {
              return { ...user, role: query.role };
            }
            return user;
          });
          setUsers(updatedUsers);
        }
        return response.data;
      }
      );
      console.log("Role updated:", response);
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select User</InputLabel>
            <Select
              value={query.uid}
              onChange={(e) => setQuery({ ...query, uid: e.target.value })}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} {user.lastName} - {user.email} ({user.role})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={query.role}
              onChange={(e) => setQuery({ ...query, role: e.target.value })}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            onClick={updateRole}
          >
            Update role
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WasteManagement;
