import Login from '../components/Login';
import AuthImagePattern from '../components/AuthImagePattern';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const { isLogin, login } = useAuthStore();
  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2">
        <Login isLogin={isLogin} login={login} />
        <AuthImagePattern />
      </div>
    </>
  );
};

export default LoginPage;
