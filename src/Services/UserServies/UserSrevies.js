import { jpAxios } from "../jpAxios";

export const AddUser = (user) => {
  return jpAxios.post("/users", user);
};

 export const requestRemove = async (userId) => {
  return await axios({
    method: "DELETE",
    url: `https://jsonplaceholder.typicode.com/users/${userId}`
  });
};