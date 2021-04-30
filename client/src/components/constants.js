let urlString = window.location.origin.split(":");
let url = urlString[0] + ":" + urlString[1];

const constants = {
  baseUrl: `${url}:4000/api`,
};

export default constants;
