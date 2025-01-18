import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { DeviceHub, Person, AccountBalance } from "@mui/icons-material";
import { useNavigate } from "react-router";

function UserInfoCard({
  deviceId = "DEV-123",
  username = "John Doe",
  balance = "$1,000.00",
}) {
    const navigate = useNavigate();
  return (
    <>
      <Card
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#fff",
          minHeight: 150,
          cursor: "pointer"
        }}
        onClick={() => { navigate(`user-detail#${deviceId}`) }}
      >
        <CardContent sx={{}}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DeviceHub sx={{ color: "#666", mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Device ID
              </Typography>
            </Box>
            <Chip
              label={deviceId}
              size="small"
              sx={{ ml: "auto", backgroundColor: "#f0f7ff", color: "#0066cc" }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person sx={{ color: "#666", mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Username
              </Typography>
            </Box>
            <Typography sx={{ ml: "auto", fontWeight: 500 }}>
              {username}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalance sx={{ color: "#666", mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Balance
              </Typography>
            </Box>
            <Typography sx={{ ml: "auto", fontWeight: 600, color: "#2e7d32" }}>
              {balance}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default UserInfoCard;
