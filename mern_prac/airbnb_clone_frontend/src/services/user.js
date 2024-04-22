import axios from "axios";
import { config } from "../config";

export async function login(email, password) {
  const body = { email, password };
  const response = await axios.post(`${config.url}/user/login`, body);
  return response.data;
}
export async function register(
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) {
  const body = { firstName, lastName, email, phoneNumber, password };
  const response = await axios.post(`${config.url}/user/register`, body);
  return response.data;
}
