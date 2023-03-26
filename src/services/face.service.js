import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:5000/';

class FaceService {
  getUserEmotion(data, fileType) {
    return axios.post(API_URL + 'get_tracks', data, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
        "fileType": fileType
      }
    });
  }
}

export default new FaceService();