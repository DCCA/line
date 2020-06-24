export const state = () => {
  userId: null;
  token: null;
};
export const mutations = {
  setUserId(state, userId) {
    state.userId = userId;
  },
  setToken(state, token) {
    state.token = token;
  }
};

const apiUrl = "http://localhost:8000/api/v1/";

export const actions = {
  async logIn({ commit }, payload) {
    const { email, password } = payload;
    try {
      const response = await fetch(`${apiUrl}/login`, {
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
      const response = await fetch(`${apiUrl}/sign-up`, {
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
  }
};
