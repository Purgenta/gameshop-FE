import axios from "../axios/axios";
import { AUTHENDPOINTS } from "../APIENDPOINTS";
import { FormValues } from "@/components/Forms/LoginForm/LoginForm";
import { Role } from "@/types/role";
type AuthResponse = {
  accessToken: string;
  role: Role;
};
const registerRequest = async (values: FormValues) => {
  const response = (await axios.post(AUTHENDPOINTS.register, values))
    .data as AuthResponse;
  return response;
};
export { registerRequest };
