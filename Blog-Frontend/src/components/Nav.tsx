import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Nav() {
  return (
    <Box sx={{ 
        display: 'flex',
        mx: 20,
        
    }}>
      <AppBar position="static" sx={{
        borderRadius: 2,
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            PostsSite
            <Button color="inherit" variant='contained' sx={{ml: 5}}>
            <a href="./posts">Posts</a>
            </Button>
          </Typography>

          <Button color="inherit" variant='contained'><a href="./login">Login</a></Button>

          <Button color="inherit" variant='contained' sx={{
            ml: 5,
          }}><a href="./register">Register</a></Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}