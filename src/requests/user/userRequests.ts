import axios from "../axios/axios";
import { AUTHENDPOINTS } from "../APIENDPOINTS";
import { FormValues } from "@/components/LoginForm/LoginForm";
import { Role } from "@/redux/authSlice/authSlice";
type AuthResponse = {
  accessToken: string;
  role: Role;
};
const loginRequest = async (values: FormValues) => {
  try {
    const response = (await axios.post(
      AUTHENDPOINTS.login,
      values
    )) as AuthResponse;
    return response;
  } catch (error: any) {
    Promise.resolve(error);
  }
};
const registerRequest = async (values: FormValues) => {
  try {
    const response = (await axios.post(AUTHENDPOINTS.register, values))
      .data as AuthResponse;
    return response;
  } catch (error: any) {
    Promise.resolve(error);
  }
};
export { loginRequest, registerRequest };
