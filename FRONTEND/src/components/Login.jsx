import { LuLoader, LuMessageSquareDiff } from 'react-icons/lu';
import { GoPerson } from 'react-icons/go';
import { TfiEmail } from 'react-icons/tfi';
import { VscLock } from 'react-icons/vsc';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LuLoaderCircle } from 'react-icons/lu';
import toast from 'react-hot-toast';

const Login = ({ isLogin, login }) => {

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onError = (errors) => {
    // Show only the first error as toast
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  const onSubmit = (data) => {
    // console.log(data);
    login(data);
    reset({ fullname: '', email: '', password: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <LuMessageSquareDiff className="size-6" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back 😊</h1>
            <p className="text-base-content/60">Log in your account</p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="input input-bordered w-full">
              <TfiEmail className="size-5 text-base-content/40" />
              <input
                type="email"
                className="pl-2 grow"
                placeholder="you@Example.com"
                {...register('email')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="input input-bordered w-full relative">
              <VscLock className="size-5 text-base-content/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="pl-2 grow tracking-widest"
                placeholder={showPassword ? '123456' : '******'}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <LuEye className="size-5 text-base-content/40" />
                ) : (
                  <LuEyeOff className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn  bg-yellow-500 hover:bg-yellow-600 py-3"
            disabled={isLogin}
          >
            {isLogin ? (
              <div>
                <LuLoaderCircle className="size-5 animate-spin" />
                ...Loading
              </div>
            ) : (
              'Log in'
            )}
          </button>
        </form>
        <p className="text-yellow-400">
          Don't have an account?
          <Link
            className="font-semibold cursor-pointer text-yellow-500 hover:text-yellow-600 ml-1"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
