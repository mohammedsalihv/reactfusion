import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { setUser, saveUser } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || "",
    address: user.address || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      if (
        isFormDirty &&
        !window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        window.history.pushState(null, "", window.location.href);
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isFormDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(setUser({ [e.target.name]: e.target.value }));
    setIsFormDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveUser());
    setIsFormDirty(false);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    if (isFormDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure?"
      );
      if (!confirmLeave) return;
    }
    navigate(path);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400, borderRadius: 5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 2,
            textAlign: "center",
            marginBottom: "2px",
          }}
        >
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, borderRadius: "10px" }}
          >
            Save
          </Button>
        </form>
        <Button onClick={() => handleNavigation("/dashboard")} sx={{ mt: 2 }}>
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default UserForm;
