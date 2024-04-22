import { config } from "../config";
import axios from "axios";

export async function getCategories() {
  const response = await axios.get(`${config.url}/category`);
  return response.data;

  // console.log(result["data"]);
}
