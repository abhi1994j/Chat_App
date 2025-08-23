import { IoMdChatboxes } from 'react-icons/io';
import { IoSettingsOutline } from "react-icons/io5";
import { LuUser } from 'react-icons/lu';
import { MdLogout, MdLogin } from 'react-icons/md';
import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="w-full px-4 py-2">
      <div className="w-full flex justify-between items-center">
        {/* Logo  */}
        <div className="flex items-center gap-2 font-bold">
          <span className="p-2 flex items-center bg-white/20 backdrop-blur-md rounded-lg">
            <IoMdChatboxes className="size-5" />
          </span>
          Chatify
        </div>
        {/* Settings Button */}
        {authUser ? (
          <nav className="hidden lg:flex items-center gap-4 ">
            <button className="flex items-center gap-2 font-semibold text-[14px] rounded-lg">
              <IoSettingsOutline className="size-5" />
              Settings
            </button>
            <Link to={'/profile'} className={`btn btn-sm flex gap-2 items-center rounded-lg`}>
              {' '}
              <LuUser className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button className="flex gap-2 items-center rounded-lg" onClick={logout}>
              <MdLogout className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        ) : (
          <Link to={'/login'} className={`btn btn-sm flex gap-2 items-center rounded-lg`}>
            {' '}
            <MdLogin className="size-5" />
            <span className="hidden sm:inline">Log in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
