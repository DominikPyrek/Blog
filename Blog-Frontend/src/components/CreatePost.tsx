import { TextField, Button, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import api from '../axios/axiosInstance';
import * as React from 'react';

type Inputs = {
  title: string
  content: string
}



export default function Post() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        api.post('/api/posts/', {
            title: data.title,
            content: data.content,
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
        }
        
        
        return (
            <Box component="section" sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "90vh",
              }}>
            <h1>Create Post</h1>
            <Divider></Divider>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                  fullWidth
                  label="title"
                  margin="normal"
                  {...register('title', { 
                    required: 'title is required',
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
            />
                <TextField
                  fullWidth
                  label="content"
                  margin="normal"
                  {...register('content', { 
                    required: 'content is required',
                  })}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
                <InputLabel id="choose-category">Category</InputLabel>
        <Select
          labelId="choose-category"
          id="choosecategory"
          value={category}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"IT"}>IT</MenuItem>
          <MenuItem value={"Cats"}>Cats</MenuItem>
          <MenuItem value={"Dogs"}>Dogs</MenuItem>
        </Select>
            <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Commit a post
                </Button>
            </form>
            </Box>
          )
        
};