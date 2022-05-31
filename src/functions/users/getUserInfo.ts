import axios from "axios";

// TODO:это не функции а axios requests)


export const getUserInfo = async (userId: any) => {
  try {
    const { data } = await axios.get(`/api/users/getUserInfo?userId=${userId}`);
    if (data.success) {
      return data.userInfo;
    } else {
      console.log(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};
