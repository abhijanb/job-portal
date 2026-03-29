import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../features/auth/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';
import { setToken } from '../utils/token';

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
      setToken(result.data.token);
      navigate('/');
    } catch (error: any) {
      alert(error.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email', { required: true })} className="w-full border rounded p-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" {...register('password', { required: true })} className="w-full border rounded p-2" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
};

export default Login;