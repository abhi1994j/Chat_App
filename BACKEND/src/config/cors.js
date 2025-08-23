import cors from "cors";

const corsConfig = ()=>{
  return cors({
    origin: process.env.FRONT_baseURL,
    credentials:true
  })
}

export {corsConfig};