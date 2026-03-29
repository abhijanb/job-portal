import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useLogoutMutation } from '../features/auth/authApi';
import { clearCredentials } from '../features/auth/authSlice';
import { Briefcase, LogOut, User, ClipboardList, PlusCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
          <Briefcase />
          <span>JobPortal</span>
        </Link>
        <div className="flex items-center space-x-4">
          {token && user ? (
            <>
              {user.role === 'employer' ? (
                <>
                  <Link to="/my-jobs" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <ClipboardList size={18} />
                    <span>My Jobs</span>
                  </Link>
                  <Link to="/jobs/create" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <PlusCircle size={18} />
                    <span>Post Job</span>
                  </Link>
                </>
              ) : (
                <Link to="/my-applications" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <ClipboardList size={18} />
                  <span>My Applications</span>
                </Link>
              )}
              <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <User size={18} />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;