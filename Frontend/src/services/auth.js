import axios from "axios";

export const signup = async ({
  name,
  surname,
  email,
  password,
  address,
  city,
  country,
  phone,
  answer,
}) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/user/register",
      {
        name,
        surname,
        email,
        password,
        address,
        city,
        country,
        phone,
        answer,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("/users/profile", config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
