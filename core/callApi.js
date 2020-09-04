import axios from 'axios';
const config = {
  api: {
    BASE_URL: "https://hrdotnet.azurewebsites.net/"
  }
}
const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'access-control-request-origin': '*',
  'Access-Control-Allow-Origin': '*'
}

export const callApi = async  (endpoint, method = 'GET', body) => {
  let access_token = await localStorage.getItem("token");
  if (!access_token) {
    window.location.href = "/"
  }

  access_token = JSON.parse(access_token)

  return axios({
    url: `${config.api.BASE_URL}/api/${endpoint}`,
    method,
    headers: {
      ...header,
      'Authorization': 'Bearer ' + access_token
    },
    data: body
  }).then(res => {
    return res;
  }).catch(err => {
    return err.message;
  });
}