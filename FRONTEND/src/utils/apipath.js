// Routes used For Front-End

const basePath = "/api/v1/chat";
export const apiPaths ={
  
  AUTH : {
    REGISTER:`${basePath}/register`,
    LOGIN : `${basePath}/login`,
    LOGOUT : `${basePath}/logout`,
    UPDATEPROFILE:`${basePath}/update-profile`,
    PROFILE : `${basePath}/check`
  },
  MESSAGE:{
    USERLIST:`${basePath}/users`,
    GETCHATMESSAGE:(id)=> `${basePath}/${id}`,
    SENDMESSAGE:(id)=> `${basePath}/send/${id}`
  }
}