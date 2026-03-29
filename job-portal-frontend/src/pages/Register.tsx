import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';
import { setToken } from '../utils/token';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'candidate' | 'employer';
};


const Register: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: RegisterForm) => {
        try {
            const result = await registerUser(data).unwrap();
            setToken(result.data.token);
            dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
            navigate('/');
        } catch (error: any) {
            alert(error.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input {...register('name', { required: 'Name is required' })} className="w-full border rounded p-2" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input {...register('email', { required: 'Email is required' })} className="w-full border rounded p-2" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" {...register('password', { required: 'Password is required', minLength: 8 })} className="w-full border rounded p-2" />
                    {errors.password && <p className="text-red-500 text-sm">Password must be at least 8 characters</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input type="password" {...register('password_confirmation', {
                        required: 'Please confirm password',
                        validate: val => val === watch('password') || 'Passwords do not match'
                    })} className="w-full border rounded p-2" />
                    {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Role</label>
                    <select {...register('role', { required: true })} className="w-full border rounded p-2">
                        <option value="candidate">Candidate</option>
                        <option value="employer">Employer</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded">
                    Register
                </button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </p>
        </div>
    );
};

export default Register;