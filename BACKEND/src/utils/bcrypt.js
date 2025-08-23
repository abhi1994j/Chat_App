import bcrypt from "bcrypt";

const genarateHashpassword = async (password) => {
  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};



const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword)
}

export { genarateHashpassword, comparePassword };
