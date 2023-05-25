const AUTHENDPOINTS = {
  refreshToken: "authentication/refreshToken",
  login: "authentication/login",
  register: "authentication/register",
};
const USERS = {
  getAllUsers: "users/getAllUsers",
};
const GAMEENDPOINTS = {
  filter: "games/filterValues",
  filteredGames: "games/getGames",
};
const CART = {
  itemCount: "cart/itemCount",
  cartItems: "cart/cartItems",
  deleteCartItem: "cart/deleteCartItem",
  addCartItem: "cart/addCartItem",
};
export { AUTHENDPOINTS, GAMEENDPOINTS, USERS, CART };
