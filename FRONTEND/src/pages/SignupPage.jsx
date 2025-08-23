import AuthImagePattern from '../components/AuthImagePattern';
import SignUp from '../components/SignUp';
import useAuthStore from '../store/useAuthStore';

const SignupPage = () => {
  const { isSigningup , signup } = useAuthStore();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Right Side */}
      <SignUp isSigningup={isSigningup} signup={signup}/>
      {/* Left Side */}
      <AuthImagePattern/>
    </div>
  );
}

export default SignupPage;
