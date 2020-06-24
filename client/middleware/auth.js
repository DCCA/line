export default function({ store, redirect }) {
  if (!isAuth()) {
    return redirect("/auth/sign-in");
  }
}
function isAuth() {
  // Check if user session exists somehow
  return false;
}
