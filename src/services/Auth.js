import { Axios } from '../utils/Axios';
import { BASE_URL } from 'config/config';

const baseurl = BASE_URL

// user login
export const userLogin = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}auth/login`,
    body
  );
  console.log(body)
  return data;
};



// Change password
export const changePassword = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}account/change-password/`,
    body
  );
  return data;
};

// forgot password
export const forgotPassword = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}account/reset-otp/`,
    body
  );
  return data;
};

