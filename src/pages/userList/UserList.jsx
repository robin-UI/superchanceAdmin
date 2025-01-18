import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { create_user, list_user } from "../../api/user";
import StyledModal from "../../components/styledComponents/StyledModal";
import UserInfoCard from "../../components/uiUtils/UserInfoCard";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleClose = function() {
    setFormData({
      username: "",
      first_name: "",
      password: "",
      confirm_password: "",
    });
    setOpenModal(false);
  }

  const handleChange = function (e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  async function fetch_list() {
    let res = await list_user();
    if (res.statusCode === 200) {
      console.log(res.response.data);
      setUserList(res.response.data);
    }
  }
  const createUser = async function (e) {
    e.preventDefault();
    console.log(formData);

    await create_user(formData);
    fetch_list();
    handleClose();
  };
  useEffect(() => {
    fetch_list();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 1, pt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Paper
              sx={{
                width: "100%",
                minHeight: 150,
                height: "100%",
                flexDirection: "column",
                borderRadius: 3,
              }}
              component={Button}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <AddIcon fontSize="large" color="primary" />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "GrayText",
                  textTransform: "none",
                }}
              >
                Add Devices
              </Typography>
            </Paper>
          </Grid>
          {userList.length <= 0 ? (
            <Grid size={6}>
              <Paper
                sx={{
                  width: "100%",
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "GrayText",
                    textTransform: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  No Devices Avilable
                </Typography>
              </Paper>
            </Grid>
          ) : (
            userList.map((obj, key) => (
              <Grid key={key} size={6}>
                <UserInfoCard deviceId={obj.id} username={obj.username} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <StyledModal
        open={openModal}
        handleClose={handleClose}
        handleSubmit={createUser}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
}

export default UserList;
