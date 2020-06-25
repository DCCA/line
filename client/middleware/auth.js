export default function({ store, redirect }) {
  const token = store.state.token;
  if (!token || !isAuth(token)) {
    store.commit("resetAuth");
    return redirect("/auth/sign-up");
  }
}
async function isAuth(token) {
  // Check if user session exists somehow
  const result = await fetch(
    `http://localhost:8000/api/v1/auth/token/${token}`
  );
  return result;
}
