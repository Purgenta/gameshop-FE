import { User } from "./user";
export type UserReview = {
  rating: number;
  review: string;
  id: number;
  user: User;
  createdAt: Date;
};
