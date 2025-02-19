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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (user.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [user.hasUnsavedChanges]);

  const [formData, setFormData] = useState({
    name: user.name || "",
    address: user.address || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    let newErrors = { name: "", address: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(setUser({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(saveUser());
      navigate("/");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400, borderRadius: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 , textAlign:'center' , marginBottom:'2px' }}>
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
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{ sx: { fontSize: "12px", height: "50px" , borderRadius : "10px"  } }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            InputProps={{ sx: { fontSize: "12px", height: "50px" , borderRadius : "10px"  } }}
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
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ sx: { fontSize: "12px", height: "50px" , borderRadius : "10px"  } }}
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
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{ sx: { fontSize: "12px", height: "50px" , borderRadius : "10px"  } }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 , borderRadius : "10px" }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UserForm;
