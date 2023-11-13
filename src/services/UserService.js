import axios from "axios";
import User from "../models/User";

const UserService = {
    getUserData: async (userId) => {
        try{
            const response = await axios.get(`http://localhost:8080/users/${userId}`);
            const responseData = response.data;
            const userObject = new User(
                responseData.id,
                responseData.firstName,
                responseData.lastName,
                responseData.username,
                responseData.mobile,
                responseData.email,
                responseData.passwordHash,
                responseData.registeredAt,
                responseData.lastLogin,
                responseData.intro,
                responseData.profile
              );
        
              return userObject;
        }catch(error){
            throw new Error('Error fetching user data: ' + error.message);  
        }
    },
};

export default UserService