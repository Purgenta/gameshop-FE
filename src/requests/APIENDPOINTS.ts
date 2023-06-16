const AUTHENDPOINTS = {
  refreshToken: "authentication/refreshToken",
  login: "authentication/login",
  register: "authentication/register",
};
const USERS = {
  getOrderItems: "orders/getOrders",
  placeOrder: "orders/checkout",
};
const GAME = {
  filter: "games/filterValues",
  filteredGames: "games/getGames",
  featuredGames: "games/featuredGames",
  getGameById: (game_id: number) => `games/game/${game_id}`,
};
const REVIEWS = {
  getGameReviews: (game_id: number, page: number) =>
    `review/getReviews/${game_id}/${page}`,
  addReview: `review/addReview`,
  getReviewEligibility: (game_id: number) =>
    `review/getReviewEligibility/${game_id}`,
};
const CART = {
  itemCount: "cart/itemCount",
  cartItems: "cart/cartItems",
  deleteCartItem: "cart/deleteCartItem",
  setCartItem: "cart/setCartItem",
  addCartItem: "cart/addCartItem",
  checkout: "cart/checkout",
};
const PUBLISHERS = {
  getPublishers: "publishers/getPublishers",
};
const CATEGORIES = {
  getCategories: "categories/getAllCategories",
};
const ORDER = {
  addReview: (orderId: number) => `order/addReview/${orderId}`,
  deleteReview: (reviewId: number) => `order/deleteReview/${reviewId}`,
};
const ADMIN = {
  dashBoardItems: "games/paged",
  addGame: `games/addGame`,
  deleteGame: (game_id: number) => `games/deleteGame/${game_id}`,
  updateGame: (game_id: number) => `games/updateGame/${game_id}`,
  deleteImage: (image_id: number) => `games/deleteImage/${image_id}`,
};
const USER = {
  profile: "user/profile",
  stats: "user/stats",
};
export {
  AUTHENDPOINTS,
  GAME,
  USERS,
  CART,
  ADMIN,
  PUBLISHERS,
  CATEGORIES,
  REVIEWS,
  ORDER,
  USER,
};
