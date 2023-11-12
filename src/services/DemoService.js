import axios from 'axios';

class DemoService{
    static async getDemoService(){
        try {
            const response = await axios.get('http://your-api-url/endpoint');
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
          }
    }
}

export default DemoService;