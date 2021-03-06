export const state = () => {
  userId: null;
  token: null;
  items: null;
  pickerItems: null;
};
export const mutations = {
  setUserId(state, userId) {
    state.userId = userId;
  },
  setToken(state, token) {
    state.token = token;
  },
  resetAuth(state) {
    (state.userId = null), (state.token = null);
  },
  setItems(state, items) {
    state.items = items;
  },
  resetItems(state) {
    state.items = null;
  },
  setPickerItems(state, pickerItems) {
    state.pickerItems = pickerItems;
  },
  resetPickerItems(state) {
    state.pickerItems = null;
  }
};

const apiAuthUrl = "http://localhost:8000/api/v1/auth";
const apiPostUrl = "http://localhost:8000/api/v1/post";

export const actions = {
  // Log In
  async logIn({ commit }, payload) {
    const { email, password } = payload;
    try {
      const response = await fetch(`${apiAuthUrl}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      // Check response
      const data = await response.json();
      if (response.status === 200) {
        commit("setUserId", data.userId);
        commit("setToken", data.token);
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Sign Up
  async signUp(context, payload) {
    const { name, email, password } = payload;

    // Make the api request
    try {
      const response = await fetch(`${apiAuthUrl}/sign-up`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          name,
          password
        })
      });
      // Check the response
      const data = await response.json();
      if (response.status === 201) {
        const userId = data._id;
        return Promise.resolve(userId);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Create a new item
  async createItem({ state, commit }, payload) {
    try {
      const response = await fetch(`${apiPostUrl}/create-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.status === 201) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get items from user
  async getItems({ state, commit }) {
    try {
      const response = await fetch(`${apiPostUrl}/items`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        commit("setItems", data);
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Delete items
  async deleteItem({ state }, itemId) {
    try {
      const response = await fetch(`${apiPostUrl}/delete-item/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get picker items
  async getPickerItems({ commit }, payload) {
    const pickerEmail = payload;
    try {
      const response = await fetch(`${apiPostUrl}/picker-items`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pickerEmail
        })
      });
      console.log(JSON.stringify({ pickerEmail }));
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        commit("setPickerItems", data);
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Picked up item status
  async pickItem({}, payload) {
    const itemId = payload;
    try {
      const response = await fetch(`${apiPostUrl}/picked-item/${itemId}`);
      const data = await response.json();
      if (response.status === 200) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
