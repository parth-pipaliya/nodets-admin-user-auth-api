export const adminLoginResource = (res: any): any => {
    const responseData = {
        _id: res?._id, 
        email:res?.email,
        password: res?.password, 
        createdAt: res?.createdAt, 
        // Add more fields as needed
    };

    return responseData;
};