import axios from "axios";

export function register(username: string, password: string) {
    axios.post('http://127.0.0.1:8000/api/register/', {
        username: username,
        password: password
      }, {
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


