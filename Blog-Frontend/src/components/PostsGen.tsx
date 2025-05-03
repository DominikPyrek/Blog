const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.fetch('http://127.0.0.1:8000/api/token/', {
        username: data.login,
        password: data.password,
      }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

export default function PostsGen() {

}