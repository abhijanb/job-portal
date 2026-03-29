import React from 'react';
import { useForm } from 'react-hook-form';
import { useGetProfileQuery, useUpdateProfileMutation } from '../features/user/userApi';
import Loader from '../components/Loader';

type ProfileForm = {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
};

const Profile: React.FC = () => {
  const { data: user, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: user,
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile(data).unwrap();
      alert('Profile updated successfully');
      refetch();
    } catch (error) {
      alert('Update failed');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input {...register('name', { required: 'Name is required' })} className="w-full border rounded p-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email', { required: true })} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password (optional)</label>
          <input type="password" {...register('password')} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input type="password" {...register('password_confirmation')} className="w-full border rounded p-2" />
        </div>
        <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 text-white py-2 rounded">
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;