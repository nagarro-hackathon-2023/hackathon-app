import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api.spotify.com/v1/';

class PlaylistService {
    async createPlayList(userId, tracks) {
        const playlistInfo = {
            "name": "Playlist_" + parseInt(Date.now() + Math.random()),
            "description": "New playlist created by hackathon app",
            "public": true
        };
        const response = await axios.post(`${API_URL}users/${userId}/playlists`, playlistInfo, { headers: authHeader() });
        const uris = tracks.map(x => x.trackUrl.replace('https://open.spotify.com/track/', 'spotify:track:'));
        const addTrackData = {
            "uris": uris,
            "position": 0
        };
        await axios.post(`${API_URL}playlists/${response.data.id}/tracks`, addTrackData, { headers: authHeader() });

    }
}

export default new PlaylistService();