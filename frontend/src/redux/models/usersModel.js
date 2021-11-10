import { action, thunk } from "easy-peasy";
import { usersAPI } from "../../services/api";

export const usersModel = {
  loading: false,
  login: false,
  saved: false,
  userData: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [],
  usersData: [],
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setLogin: action((state, payload) => {
    state.login = payload;
  }),
  setUserSaved: action((state, payload) => {
    state.saved = payload;
    console.log(state.saved)
  }),
  populateUsersData: action((state, payload) => {
    state.usersData = payload;
    state.loading = false;
  }),
  populateUserData: action((state, payload) => {
    state.userData = payload;
    state.login = true;
  }),
  deleteUserData: action((state, payload) => {
    state.userData = [];
  }),
  fetchUsers: thunk(async (actions, usersData) => {
    await actions.setLoading(true);
    const response = await usersAPI.getUsersData();
    if (response.status === 200) {
      await actions.populateUsersData(response.data);
    }
  }),
  saveUser: thunk(async (actions, userData) => {
    const creationFeedback = await usersAPI.saveUser(userData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
      await actions.setUserSaved(true);
    }
  }),

  editUser: thunk(async (actions, userData) => {
    const creationFeedback = await usersAPI.editUser(userData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
      await actions.fetchUsers();

    }
  }),

  checkUser: thunk(async (actions, userData) => {
    const response = await usersAPI.checkUser(userData);
    if (response.status === 200) {
      console.log("status 200")
      await actions.populateUserData(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      await actions.setLogin(true);
    }
  }),

  changePassword: thunk(async (actions, userData) => {
    const creationFeedback = await usersAPI.changePassword(userData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {

    }
  }),

  logOutUser: thunk(async (actions, userData) => {
    console.log("logOutUser: thunk(as")
    await actions.deleteUserData();
    localStorage.removeItem("user");
  }),
};

