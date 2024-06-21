const backendDomain="http://localhost:8080";

const summaryAPI={
    signup:{
        url:`${backendDomain}/signup`,
        method:"post",
    },
    login:{
        url:`${backendDomain}/login`,
        method:"post",
    },
    userDetails:{
        url:`${backendDomain}/user-details`,
        method:"get",
    },
    logout:{
        url:`${backendDomain}/logout`,
        method:"get",
    },
    allUsers:{
        url:`${backendDomain}/all-users`,
        method:"get",
    },
    updateUser:{
        url:`${backendDomain}/updateUser`,
        method:"post",
    },
}

export default summaryAPI;

