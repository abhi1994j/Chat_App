import { LuLoader, LuMessageSquareDiff } from 'react-icons/lu';
import { GoPerson } from 'react-icons/go';
import { TfiEmail } from 'react-icons/tfi';
import { VscLock } from 'react-icons/vsc';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from '../utils/schema';
import { LuLoaderCircle } from "react-icons/lu";
import toast from 'react-hot-toast';
const SignUp = ({ isSigningup , signup }) => {

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      cpassword: ''
    },
  });
  const password = watch('password');
  const onError = (errors) => {
    // Show only the first error as toast
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    const {fullname , email , password } = data;
    const formData = {
      fullname:fullname,
      email:email,
      password:password
    }
    console.log(formData);
    signup(formData);
    reset({ fullname: '', email: '', password: '' , cpassword: ''},
      { keepErrors: false, keepTouched: false }
    );
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
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Fullname</span>
            </label>
            <div className="input input-bordered w-full">
              <GoPerson className="size-5 text-base-content/40" />
              <input
                type="text"
                className="pl-2 grow"
                placeholder="John Doe"
                {...register('fullname')}
              />
            </div>
          </div>
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
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <div className="input input-bordered w-full relative">
              <VscLock className="size-5 text-base-content/40" />
              <input
                type={'password'}
                className="pl-2 grow tracking-widest"
                placeholder={'******'}
                {...register('cpassword', {
                  validate: (value) => value === password || 'Password does not match',
                })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn  bg-yellow-500 hover:bg-yellow-600 py-3"
            disabled={isSigningup}
          >
            {isSigningup ? (
              <div>
                <LuLoaderCircle className="size-5 animate-spin" />
                ...Loading
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <p className="text-yellow-400">
          Already have an account?
          <Link
            className="font-semibold cursor-pointer text-yellow-500 hover:text-yellow-600 ml-1"
            to="/login"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
