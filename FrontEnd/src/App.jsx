import { Navigate, Route, Routes} from 'react-router-dom';




import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LoadingSpinner from './conponents/General/LoadingSpinner';

import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import ExercisesPage from './pages/ExercicesPage';
import NavBar from './conponents/General/NavBar';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
};


const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user }= useAuthStore()

    /*useEffect(() => {
     checkAuth()
    },[checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;*/


  return (
    <div className='hero-bg h-screen bg-cover flex items-center flex-col'>
    
    <NavBar />
        
        
      <Routes>
        <Route 
          path='/' 
          element={<HomePage/>

          } 
        />

        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
             <LoginPage/>
            </RedirectAuthenticatedUser>
          } 
        />

        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage/>
            </RedirectAuthenticatedUser>
          } 
        />
        <Route
          path='/verify-email'
          element={<VerifyEmailPage/>
          }
        />
        <Route
          path='/exercises/:bodypart'
          element={
             <ExercisesPage/>
          } 
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
