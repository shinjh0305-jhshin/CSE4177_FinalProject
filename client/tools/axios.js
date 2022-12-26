import axios from "axios";

const axiosGet = (URL, params = null, onSuccess = null, onFailed = null) => {
  console.log("axiosGet", URL);
  axios
    .get(URL, {
      params,
    })
    .then((resp) => {
      if (resp.status === 200) {
        if (onSuccess) onSuccess(resp.data);
      } else if (onFailed) onFailed(resp.data);
    })
    .catch((err) => {
      if (onFailed) onFailed(err);
    });
};

const axiosPost = (URL, Data, onSuccess = null, onFailed = null) => {
  console.log("axiosPost", URL, Data);
  axios
    .post(URL, JSON.stringify(Data), {
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((resp) => {
      if (resp.status === 200) {
        if (onSuccess) onSuccess(resp.data);
      } else if (onFailed) onFailed(resp.data);
    })
    .catch((err) => {
      onFailed(err);
    });
};

export { axiosGet, axiosPost };
