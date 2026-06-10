export const getToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("access")
    : null;
};

export const getRole = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("role")
    : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
  localStorage.removeItem("username");

  window.location.href = "/";
};