import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import React from "react";
import CloseIcon from "@mui/icons-material/Close";
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
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              onChange={handleChange}
              // error={!!errors.email}
              // helperText={errors.email}
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
              onChange={handleChange}
              // error={!!errors.email}
              // helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
            //   type={showPassword ? "text" : "password"}
              autoFocus
              value={formData.password}
              onChange={handleChange}
              // error={!!errors.email}
              // helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="conformpassword"
              label="Conform password"
              name="confirm_password"
              autoComplete="conformpassword"
              autoFocus
              value={formData.confirm_password}
              onChange={handleChange}
              // error={!!errors.email}
              // helperText={errors.email}
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
