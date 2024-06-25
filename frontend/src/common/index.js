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
    addProduct:{
        url:`${backendDomain}/add-product`,
        method:"post",
    },
    allProduct:{
        url:`${backendDomain}/all-product`,
        method:"get",
    },
    editProduct:{
        url:`${backendDomain}/editProduct`,
        method:"post",
    },
}

export default summaryAPI;

