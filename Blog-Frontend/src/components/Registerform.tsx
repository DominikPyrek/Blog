import {register} from "../auth/auth"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import axios from "axios";

const RegisterSchema = z.object({
    username: z.string().min(5, {
      message: "Your username needs to be atleast 5characters long"
    }),
    password: z.string().min(5, {
      message: "Your password needs to be atleast 5characters long"
    })
})

export default function RegisterForm() {
    
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          username: "",
          password: ""
        }
    })
    
    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        axios.post('http://127.0.0.1:8000/api/register/', {
            username: data.username,
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
        
      )
}