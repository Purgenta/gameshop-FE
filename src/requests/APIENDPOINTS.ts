const AUTHENDPOINTS = {
  refreshToken: "authentication/refreshToken",
  login: "authentication/login",
  register: "authentication/register",
};
const USERS = {
  getOrderItems: "orders/getOrders",
  placeOrder: "orders/checkout",
};
const GAMEENDPOINTS = {
  filter: "games/filterValues",
  filteredGames: "games/getGames",
  getGameById: (game_id: number) => `games/game/${game_id}`,
};
const CART = {
  itemCount: "cart/itemCount",
  cartItems: "cart/cartItems",
  deleteCartItem: "cart/deleteCartItem",
  setCartItem: "cart/setCartItem",
  addCartItem: "cart/addCartItem",
};
const PUBLISHERS = {
  getPublishers: "publishers/getPublishers",
};
const CATEGORIES = {
  getCategories: "categories/getAllCategories",
};
const ADMIN = {
  dashBoardItems: "games/paged",
  addGame: `games/addGame`,
  deleteGame: (game_id: number) => `games/deleteGame/${game_id}`,
  updateGame: (game_id: number) => `games/updateGame/${game_id}`,
  deleteImage: (image_id: number) => `games/deleteImage/${image_id}`,
};
export {
  AUTHENDPOINTS,
  GAMEENDPOINTS,
  USERS,
  CART,
  ADMIN,
  PUBLISHERS,
  CATEGORIES,
};
