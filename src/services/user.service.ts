import axios from 'axios';

class UserService {

    create({ name, email }: any) {
        return axios.post('user',{
            name,
            email,
        });
    }

    getAll() {
        return axios.get('user');
    }

}

let userServiceInstance: UserService | null = null;

export default (() => {

    const getInstance = () => {
    
        if (!userServiceInstance) {
            userServiceInstance = new UserService();
        }
        return userServiceInstance;
    
    }
    
    return {
        getInstance,
    }

})()
