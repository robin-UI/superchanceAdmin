import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 330,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};

function StyledModal({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
}) {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   userName: "",
  //   password: "",
  //   confirm_password: "",
  // });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeName = (e) => {
    handleChange(e);
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.first_name) {
      newErrors.first_name = "Name is required";
    }

    // Name validation
    if (!formData.username) {
      newErrors.username = "UserName is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.password = "Password must be same";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Confirm Password is required";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitform = async (e) => {
    e.preventDefault();
    console.log();

    if (validateForm()) {
      handleSubmit(e);
    }
  };

  const closeModal = function() {
    handleClose();
    setErrors({})
  }

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ fontSize: "18px" }}
          >
            Create Device
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmitform}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ px: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="first_name"
              autoComplete="name"
              autoFocus
              value={formData.first_name}
              onChange={handleChangeName}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="username"
              autoComplete="userName"
              autoFocus
              value={formData.username}
              onChange={handleChangeName}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              autoFocus
              value={formData.password}
              onChange={handleChangeName}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_password"
              label="Conform password"
              name="confirm_password"
              autoComplete="conformpassword"
              type={showPassword ? "text" : "password"}
              autoFocus
              value={formData.confirm_password}
              onChange={handleChangeName}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ borderTop: 1, borderColor: "divider", p: 1, py: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ textTransform: "none" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}

export default StyledModal;
