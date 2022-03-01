import { getUsers } from "@/services/users.js";
import { merge, pick } from "lodash";
import { userTableMap } from "@/data";

const namespaced = true;

const state = {
  allUsers: [],
  users: []
};

const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload;
  },
  SET_ALL_USERS: (state, payload) => {
    state.allUsers = payload;
  }
};

const actions = {
  fetchUsers: async ({ commit }) => {
    const data = await getUsers();
    const isDataAvailable = data.every(
      (dataCall) => dataCall.status === "fulfilled"
    );
    if (isDataAvailable) {
      let allUsers = merge(data[0].value.data, data[1].value.data);
      allUsers = allUsers.map((user) => {
        return pick(user, Object.values(userTableMap))
      })
      commit("SET_USERS", allUsers);
      commit("SET_ALL_USERS", allUsers);
    }
    return isDataAvailable;
  },
  filterUsers: ({ commit, state }, fullName) => {
    const users = state.allUsers.filter(({ first_name, last_name }) => {
      const userFullName = `${first_name.toLowerCase().trim()}${last_name
        .toLowerCase()
        .trim()}`;
      return userFullName.indexOf(fullName) !== -1;
    });
    commit("SET_USERS", users);
  },
  resetUsers({ commit, state }) {
    commit("SET_USERS", state.allUsers);
  }
};

export default {
  state,
  mutations,
  actions,
  namespaced
};
