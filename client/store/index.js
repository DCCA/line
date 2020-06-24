export const state = () => {
  token: null;
};
export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};
export const actions = {
  async signUp(context, payload) {
    console.log("Got here!");
    const { name, email, password } = payload;

    const apiUrl = "http://localhost:8000/api/v1/sign-up";
    // const apiUrl = "https://google.com";
    // Make the api request
    try {
      const response = await fetch(apiUrl, {
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
        const { token } = data;
        context.commit("setToken", token);
        return Promise.resolve(token);
      }
      return Promise.reject(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
