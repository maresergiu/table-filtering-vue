import { usersProfilesUrl, usersDataUrl, errorCodes } from "@/data";
import axios from "axios";

export const getUsersData = async () => {
  try {
    return axios.get(usersDataUrl);
  } catch (e) {
    return {
      errorCode: errorCodes.USERS_001
    };
  }
};

export const getUsersProfile = async () => {
  try {
    return axios.get(usersProfilesUrl);
  } catch (e) {
    return {
      errorCode: errorCodes.USERS_001
    };
  }
};

export const getUsers = () => {
  return Promise.allSettled([getUsersData(), getUsersProfile()]).then(
    (values) => values
  );
};
