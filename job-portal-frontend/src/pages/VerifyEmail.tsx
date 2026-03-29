import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../features/auth/authApi';
import Loader from '../components/Loader';

const VerifyEmail: React.FC = () => {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [verify, { isLoading }] = useVerifyEmailMutation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (id && hash) {
        try {
          await verify({ id, hash }).unwrap();
          setMessage('Email verified successfully! You can now login.');
          setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
          setMessage('Verification failed. The link may be invalid or expired.');
        }
      }
    };
    verifyEmail();
  }, [id, hash, verify, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      <p className="mb-4">{message}</p>
    </div>
  );
};

export default VerifyEmail;