import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MuiInput from "@mui/material/Input";
import { user_balance_margin, user_delete, user_details } from "../../api/user";
import { useNavigate } from "react-router";
import moment from "moment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";

const Input = styled(MuiInput)`
  width: 42px;
`;
const APPPASSWORD = "1234";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

function UserDetails() {
  const uuid = window.location.hash.substring(1);
  const navigate = useNavigate();
  const [value, setValue] = useState(100);
  const [userDetails, setUserDetails] = useState({
    id: "",
    username: "",
    balance: 0,
    profit_margin: 0,
    created_at: "",
    updatedBalance: 0,
    password: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    balance: "",
    password: "",
  });

  const handleSliderChange = async (e, value) => {
    setValue(value);
    const res = await user_balance_margin({
      user_id: uuid,
      profit_margin: value,
    });
    if (res.statusCode === 200) {
      // fetchUseDetails();
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const onBalanceFormSubmit = async (e) => {
    e.preventDefault();
    console.log("userDetails", userDetails);

    if (userDetails.updatedBalance <= userDetails.balance) {
      setErrors((prev) => ({
        ...prev,
        balance: "Balance must be greater than current balance",
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        balance: "",
      }));
    }

    if (userDetails.password !== APPPASSWORD) {
      setErrors((prev) => ({
        ...prev,
        password: "Password did not match",
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }

    const res = await user_balance_margin({
      user_id: uuid,
      balance: userDetails.updatedBalance,
    });
    if (res.statusCode === 200) {
      setOpenModal(false);
      fetchUseDetails();
    }
  };

  const fetchUseDetails = async () => {
    const res = await user_details(uuid);
    if (res.statusCode === 200) {
      console.log(res.response);
      setUserDetails({ ...userDetails, ...res.response });
    }
  };

  const deleteUser = async () => {
    const res = await user_delete(uuid);
    if (res.statusCode === 200) {
      console.log(res.response.data);
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchUseDetails();
  }, []);

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "bold", lineHeight: 1.4 }}
              >
                {userDetails.username || "User name"}
              </Typography>
              <Typography
                sx={{ fontSize: "12px", fontWeight: "300", lineHeight: 1 }}
              >
                {moment(userDetails.created_at).format("YYYY-MM-DD") ||
                  "created date"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, px: 1 }}
        >
          <MonetizationOnIcon color="success" />
          <Typography
            sx={{ fontSize: "18px", fontWeight: "bold", lineHeight: 1.4 }}
          >
            Balance :
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "18px", fontWeight: "bold", lineHeight: 1.4 }}
          >
            {userDetails.balance || 0}
          </Typography>
          <IconButton size="small" onClick={() => setOpenModal(true)}>
            <Add />
          </IconButton>
        </Box>

        <Box sx={{ px: 2 }}>
          <Typography id="input-slider" gutterBottom>
            Profit Margin
          </Typography>

          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={(e, value) => setValue(value)}
                onChangeCommitted={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item sx={{ width: 62 }}>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  textAlign: "right",
                  samp: { color: "text.secondary", fontSize: "18px" },
                }}
              >
                {value} <samp>%</samp>
              </Typography>
            </Grid>
          </Grid>

          <TextField
            label="Commission"
            id="outlined-start-adornment"
            sx={{ m: 1, ml: 0, width: "25ch" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">per %</InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={onBalanceFormSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Balance
          </Typography>
          <TextField
            label="Balance"
            type="number"
            id="outlined-start-adornment"
            sx={{ m: 1, ml: 0, width: "100%" }}
            value={userDetails.updatedBalance || userDetails.balance}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setUserDetails({ ...userDetails, updatedBalance: newValue });
            }}
            error={!!errors.balance}
            helperText={errors.balance}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="App Password"
            id="outlined-password-input"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            sx={{ m: 1, ml: 0, mb: 1.5, width: "100%" }}
            value={userDetails.password}
            onChange={(e) => {
              const newValue = e.target.value;
              setUserDetails({ ...userDetails, password: newValue });
            }}
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

          <Button variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default UserDetails;
