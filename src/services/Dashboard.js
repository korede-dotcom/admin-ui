import { Axios } from '../utils/Axios';
import { BASE_URL } from 'config/config';

const baseurl = BASE_URL

// user login
export const CreateBranch = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}branch/create`,
    body
  );
  console.log(body)
  return data;
};
export const UpdateBranch = async ({id,body}) => {

  const { data } = await Axios.put(
    `${baseurl}branch/update/?id=${id}`,
    body
  );
  console.log(body)
  return data;
};

export const CreateAnyUser = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}user/create`,
    body
  );
  console.log(body)
  return data;
};
export const CreateExpensis = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}expensis`,
    body
  );
  console.log(body)
  return data;
};
export const UpdateAnyUser = async ({id,body}) => {

  const { data } = await Axios.put(
    `${baseurl}user/update/?id=${id}`,
    body
  );
  console.log(body)
  return data;
};

export const ApproveAnyUser = async (body) => {

  const { data } = await Axios.put(
    `${baseurl}user/approve/?id=${body.id}`,
    body
  );
  return data;
};

export const DeclineAnyUser = async ({id}) => {

  const { data } = await Axios.get(
    `${baseurl}user/decline/?id=${id}`,
  );
  return data;
};
export const AllExpensis = async () => {

  const { data } = await Axios.get(
    `${baseurl}expensis`,
  );
  return data;
};

export const CreateService = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}service/create`,
    body
  );
  console.log(body)
  return data;
};
export const CreateTodo = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}todos`,
    body
  );
  console.log(body)
  return data;
};
export const CreateRoom = async (body) => {

  const { data } = await Axios.post(
    `${baseurl}hotelmanager/create`,
    body
  );
  console.log(body)
  return data;
};

export const Services = async () => {
    const { data } = await Axios.get(
        `${baseurl}service`,
      );
      return data;
};
export const Rooms = async () => {
    const { data } = await Axios.get(
        `${baseurl}hotelmanager/pkg`,
      );
      return data;
};
export const BookRooms = async (body) => {
    const { data } = await Axios.post(
        `${baseurl}hotelmanager/bookroom`,
        body
        );
        console.log(body)
        return data;
};
export const bookings = async () => {
    const { data } = await Axios.get(
        `${baseurl}hotelmanager/bookings`,
      );
      return data;
};
export const AvailableRooms = async () => {
    const { data } = await Axios.get(
        `${baseurl}hotelmanager/pkg/available`,
      );
      return data;
};
export const BookRoom = async () => {
    const { data } = await Axios.get(
        `${baseurl}hotelmanager/pkg`,
      );
      return data;
};
export const EventPkg = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}eventmanager/create`,
    body
  );
  console.log(body)
  return data;
};
export const EventBook = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}eventmanager/book`,
    body
  );
  console.log(body)
  return data;
};

export const AllEventBook = async () => {
    const { data } = await Axios.get(
        `${baseurl}eventmanager/book`,
      );
      return data;
};
export const AllEventRecordFilter = async (start,end) => {
    const { data } = await Axios.get(
        `${baseurl}eventmanager/book/?start=${start}&end=${end}`,
      );
      return data;
};

export const GetEventPkg = async () => {
    const { data } = await Axios.get(
        `${baseurl}eventmanager/pkg`,
      );
      return data;
};

export const UpadateEventPkg = async ({id,body}) => {
    console.log("🚀 ~ file: Dashboard.js:96 ~ UpadateEventPkg ~ id,body:", id,body)
    const { data } = await Axios.put(
        `${baseurl}eventmanager/update/?id=${id}`,
          body
      );
      console.log("🚀 ~ file: Dashboard.js:99 ~ UpadateEventPkg ~ data:", data)
      return data;
};

export const getAllBranch = async () => {

  const { data } = await Axios.get(
    `${baseurl}branch`,
  );
  return data;
};

export const getAllUsers = async () => {

  const { data } = await Axios.get(
    `${baseurl}user`,
  );
  return data;
};
export const getDashboard = async () => {

  const { data } = await Axios.get(
    `${baseurl}eventmanager/dashboard`,
  );
  return data;
};
export const getAllTodos = async () => {

  const { data } = await Axios.get(
    `${baseurl}todos`,
  );
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

