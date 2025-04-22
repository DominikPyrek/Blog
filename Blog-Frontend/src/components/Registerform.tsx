import { TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

type Inputs = {
  login: string
  password: string
}

const Register = () => {
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Inputs>()
const onSubmit: SubmitHandler<Inputs> = (data) => {
  axios.post('http://127.0.0.1:8000/api/register/', {
      username: data.login,
      password: data.password
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


  return (
    <Box component="section" sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "90vh",
      }}>
    <h1>Register Form</h1>
    <Divider></Divider>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('login', { 
            required: 'Login is required',
          })}
          error={!!errors.login}
          helperText={errors.login?.message}
    />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Minimum 6 characters'
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
    <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
    </form>
    </Box>
  )

};
export default Register;
