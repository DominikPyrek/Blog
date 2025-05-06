import { TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import api from '../axios/axiosInstance';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router";
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

type Inputs = {
  username: string
  password: string
}

type ApiError = {
  response?: {
    data?: {
      detail?: string;
    };
  };
  message?: string;
};

const Login = () => {
  
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Inputs>()

let navigate = useNavigate();
const [_, setCookie] = useCookies(['auth']);

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const onSubmit: SubmitHandler<Inputs> = (data) => {
  api.post('/api/token/', {
      username: data.username,
      password: data.password,
    }, {
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    .then(async function () {
      setCookie('auth', true, {
        path: '/',
        maxAge: 900,
      });
      toast.success('🦄 You have been logeed in succesfully you will be now redirected to home page')
      await sleep(5000);
      return  navigate("/")
    })
    .catch(function (error: ApiError) {
      toast.error(error.response?.data?.detail || "Login failed")
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
    <h1>Login Form</h1>
    <Divider></Divider>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
          fullWidth
          label="Username"
          margin="normal"
          {...register('username', { 
            required: 'Username is required',
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
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
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
  />
    </Box>
  )

};
export default Login;