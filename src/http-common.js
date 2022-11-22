import axios from "axios";

export default axios.create({
  baseURL: "http://141.136.47.177:4001/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
