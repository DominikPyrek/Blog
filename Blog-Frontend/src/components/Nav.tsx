import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { useCookies } from 'react-cookie';

function UserGreeting() {
  return (
  <>
  <Button color="inherit" variant='contained'><Link to="/login">Login</Link></Button>
  <Button color="inherit" variant='contained' sx={{ml: 5,}}><Link to="/register">Register</Link></Button>
  </>
)
}

function GuestGreeting() {
  return (
    <>
    <Button color="inherit" variant='contained'><Link to="/login">Logout</Link></Button>
    </>
  )
}

export default function Nav() {
  const [cookies] = useCookies(['auth']);
  const authenticated = !!cookies.auth;
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
            <Link to="/">Home</Link>
            </Button>
            <Button color="inherit" variant='contained' sx={{ml: 5}}>
            <Link to="/post">Create a Post</Link>
            </Button>
            
          </Typography>

          {authenticated ? GuestGreeting() : UserGreeting()}
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}