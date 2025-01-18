import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
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
import { user_details } from "../../api/user";
import { useNavigate } from "react-router";

const Input = styled(MuiInput)`
  width: 42px;
`;

function UserDetails() {
  const navigate = useNavigate();
  const [value, setValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
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

  const uuid = window.location.hash.substring(1);

  const fetchUseDetails = async () => {
    const res = await user_details(uuid);
    if (res.statusCode === 200) {
      console.log(res.response.data);
      // setUserList(res.response.data);
    }
  };

  useEffect(() => {
    fetchUseDetails();
  }, []);

  return (
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
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            User name
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ px: 2 }}>
        <Typography id="input-slider" gutterBottom>
          Profit Margin
        </Typography>

        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {/* <Grid item>
          <VolumeUp />
        </Grid> */}

          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item sx={{ width: 62 }}>
            {/* <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            /> */}
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ textAlign: "right", samp: { color: "text.secondary", fontSize: "18px" } }}
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
  );
}

export default UserDetails;
