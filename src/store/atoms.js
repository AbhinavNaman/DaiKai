import { atom, selector } from "recoil";
import axios from "axios";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const allEventsState = atom({
  key: "allEventsState",
  default: [],
});

export const fetchAllEventsSelector = selector({
  key: "fetchAllEventsSelector",
  // eslint-disable-next-line no-unused-vars
  get: async ({ get }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const userState = atom({
  key: "userState",
  default: [],
});

export const fetchUser = selector({
  key: "fetchUser",
  // eslint-disable-next-line no-unused-vars
  get: async ({ get }) => {
    // eslint-disable-next-line no-useless-catch
    const userid = localStorage.getItem("userid");
    try {
      const response = await axios.get(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/getUserFunction?userId=${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});