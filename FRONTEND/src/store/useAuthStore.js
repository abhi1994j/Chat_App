import { create } from 'zustand'
import { axiosInstance } from '../libs/axiosInstance';
import { apiPaths } from '../utils/apipath';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: true,
  isSigningup: false,
  isLogin: false,
  isUpdateProfile: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get(apiPaths.AUTH.PROFILE);
      if (response.status !== 200) throw new Error("User not found");
      set({ authUser: response.data })
    } catch (error) {
      console.log(`Error in checkAuth function : ${error.message}`);
      if (error.response?.status === 401) {
        set({ authUser: null });
      }
    }
    finally {
      set({ isLoading: false })
    }
  },
  signup: async (data) => {
    set({ isSigningup: true })
    try {
      const response = await axiosInstance.post(apiPaths.AUTH.REGISTER, data);
      console.log(response);
      toast.success("Account Created Successfully")
      set({ authUser: response.data })
    } catch (error) {
      console.log(`Error in signup function : ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message);
      // set({ authUser: null })
    }
    finally {
      set({ isSigningup: false })
    }
  },
  login: async (data) => {
    set({ isLogin: true })
    try {
      const response = await axiosInstance.post(apiPaths.AUTH.LOGIN, data);
      console.log(response);
      toast.success("Log in Successfully")
      set({ authUser: response.data })
    } catch (error) {
      console.log(`Error in login function : ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message);
      // set({ authUser: null })
    }
    finally {
      set({ isLogin: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post(apiPaths.AUTH.LOGOUT);
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(`Error in logout function : ${error?.response?.data?.message}`);
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdateProfile: true })
    try {
      const response = await axiosInstance.put(apiPaths.AUTH.UPDATEPROFILE, data
        // headers: { "Content-Type": "multipart/form-data" }, // ✅ important
      );
      // console.log(response);
      set({ authUser: response?.data })
      toast.success("Profile Image updated Successfully")
    } catch (error) {
      console.log(`Error in UpdateProfile function : ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message);
      // set({ authUser: null })
    }
    finally {
      set({ isUpdateProfile: false })
    }
  },
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

export default useAuthStore;
