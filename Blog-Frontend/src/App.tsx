import { AuthProvider } from './auth/AuthContext';
import AuthTestComponent from './components/Auth';
function App() {

  return (
    <>
    <AuthProvider>
      <AuthTestComponent />
    </AuthProvider>
    </>
  )
}

export default App
