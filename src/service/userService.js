import User from '../model/User.js';
import jwtProvider from '../util/jwtProvider.js';

class UserService{

    async findUserProfileByJwt(jwt){
        const email = jwtProvider.getEmailFromJwt(jwt);

        const user = await User.findOne({email});
        if(!user){
            throw new Error(`User does not exist with email ${email}`);

        }
        return user;
    }

    async findUserByEmail(email){
        const user = await User.findOne({email});
        if(!user){
            throw new Error(`user does not exist with email ${email}`);
        }
        return user;
    }
}

export default UserService;