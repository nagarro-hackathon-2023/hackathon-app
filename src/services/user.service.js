import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api.spotify.com/v1/';

class UserService {
  getCurrentUser() {
    return axios.get(API_URL + 'me', { headers: authHeader() });
  }
}

export default new UserService();