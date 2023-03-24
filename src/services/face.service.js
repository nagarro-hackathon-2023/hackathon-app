import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'MANISHGOYAL02.pythonanywhere.com/';

class FaceService {
  getUserEmotion(data) {
    return axios.post(API_URL + 'get_emotion',data ,{ headers: authHeader() });
  }
}

export default new FaceService();