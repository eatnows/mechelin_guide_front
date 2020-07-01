import axios from "axios";
const instance = axios.create({
  baseURL:
    "http://ec2-54-180-115-24.ap-northeast-2.compute.amazonaws.com/mechelin/",
});
export default instance;
