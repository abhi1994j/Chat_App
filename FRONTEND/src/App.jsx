import Navbar from './components/Navbar';
import { Suspense, lazy, useEffect } from 'react';
import { themeChange } from 'theme-change';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorFallback from './utils/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import { Loader } from './utils/Loader';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const { authUser, isLoading, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // console.log(authUser);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  if (isLoading && !authUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  // Lazy-loaded components
  const HomePage = lazy(() => import('./pages/HomePage'));
  const LoginPage = lazy(() => import('./pages/LoginPage'));
  const SignupPage = lazy(() => import('./pages/SignupPage'));
  const ProfilePage = lazy(() => import('./pages/ProfilePage'));
  const SettingsPage = lazy(() => import('./pages/SettingsPage'));

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Optionally reset state here or reload
          window.location.reload();
        }}
      >
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center h-screen">
              <Loader />
            </div>
          }
        >
          <Navbar />
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
            />
          </Routes>
          <Toaster />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
