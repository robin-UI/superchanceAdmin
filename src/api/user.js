import axios from "axios";

export const create_user = async function (body) {
  try {
    const { data } = await axios.post("api/v1/user/register/", {
      ...body,
    });
    // const {data} = await axios({
    //   method: "post",
    //   url: "api/v1/user/login/",
    //   data: body,
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const list_user = async function () {
  try {
    const { data } = await axios("api/v1/user/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const user_details = async function (id) {
  try {
    const { data } = await axios("api/v1/user/"+id+"/", );
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const login_user = async function (body) {
  try {
    // const { data } = await axios.post("api/v1/user/login/", {
    //   ...body,
    // });
    const { data } = await axios({
      method: "post",
      url: "api/v1/user/login/",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};
