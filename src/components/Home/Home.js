import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotify } from 'react-spotify-embed';
import { ToastContainer, toast } from 'react-toastify';
import {
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
  MDBFile,
  MDBIcon
} from 'mdb-react-ui-kit';
import './Home.css';
import AuthContext from '../../context/AuthProvider';
import userService from "../../services/user.service";
import faceService from "../../services/face.service";
import playlistService from "../../services/playlist.service";


const Bottonbar = ({ trackUrl }) => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          <Spotify wide link={trackUrl} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
        </span>
      </div>
    </footer>
  );
};

const Sidebar = ({ user }) => (
  <div className="col-md-2 border-right mt-3">
    <div className="d-flex flex-column align-items-center text-center">
      <img className="rounded-circle" alt="user" width="100px" height="100px" src={user.image} />
      <span className="fw-bold">Hey {user.name}!</span>
    </div>
  </div>
);

const Content =  ({ onGetEmotions, onCreatePlaylist, onGetEmotionStarted }) => {
  const { setAuth } = useContext(AuthContext);
  const [ hasPlayList, setHasPlaylist ] = useState(false);
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { userImage } = e.target.elements;
    if (userImage.files.length > 0) {
      onGetEmotionStarted();
      const file = userImage.files[0];
      const fileType = file.type.match('image.*') ? 'image' : 'video';
      const data = new FormData();
      data.append('file', file);
      const result = await faceService.getUserEmotion(data, fileType);
      onGetEmotions(result.data);
      setHasPlaylist(true);
    } else {
      toast.error('Please upload file.');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth(null);
    navigate('/login');
  };
  return (
    <div className="col-md-10 border-right justify-content-between d-flex align-items-center">
      <form onSubmit={onSubmit}>
      <MDBRow className='row-cols-lg-auto g-3 align-items-center'>
          <MDBCol size='12'>
            <span>Upload Image/Video</span>
          </MDBCol>
          <MDBCol size='12'>
            <MDBFile id='userImage'  accept="video/*,image/*" />
          </MDBCol>
          <MDBCol size='12'>
            <MDBBtn type='submit'>Find Music</MDBBtn>
          </MDBCol>
      </MDBRow>
      </form>
      {hasPlayList && 
        <MDBBtn size='sm' rounded color='success' onClick={onCreatePlaylist}>
          <MDBIcon className='me-2' fab icon='spotify' /> Create Playlist
        </MDBBtn>
      }
      <MDBBtn size='sm' outline rounded color='info' onClick={handleLogout}>
        <MDBIcon className='me-2' fas icon='sign-out-alt' /> Logout
      </MDBBtn>
    </div>
  );
}

const PlayList = ({ track, onTrackClick }) => {
  const handlePlayClick = () => {
    onTrackClick(track);
  };
  return (
    <MDBListGroupItem className='d-flex justify-content-between align-items-center track-item'>
      <div className='d-flex align-items-center'>
        <img
          src={track.imageUrl}
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle'
        />
        <div className='ms-3'>
          <p className='mb-1'>{track.name}</p>
        </div>
      </div>
      <MDBBtn size='sm' rounded color='link' onClick={handlePlayClick}>
        Select
      </MDBBtn>
    </MDBListGroupItem>
  )
};

const Loader = () => (
  <div className='overlay'>
    <div className='spinner'></div>
    <br/>
    Loading...
  </div>
);

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [playListInfo, setPlayListInfo] = useState({tracks: [], emotion: ''})

  const imageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    userService.getCurrentUser().then(({ data }) => {
      const user = {
        id: data.id,
        name: data.display_name,
        image: data.images.length > 0 ? data.images[0].url : imageUrl,
      }
      setAuth({
        token,
        user
      });
      setCurrentUser(user);
    });
  }, []);


  const onTrackClick = track => {
    setCurrentTrack(track.trackUrl);
  };

  const onGetEmotions = ({ tracks, emotion }) => {
    const msg = `Emotion detected: ${ emotion }`;
    if (emotion == 'happy') {
      toast.success(msg);
    } else if (emotion == 'sad') {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
    setPlayListInfo({ tracks, emotion});
    setCurrentTrack(tracks[0].trackUrl);
    setIsLoading(false);
  }

  const onCreatePlaylist = async () => {
    setIsLoading(true);
    await playlistService.createPlayList(currentUser.id, playListInfo.tracks, playListInfo.emotion);
    setIsLoading(false);
    toast.success('Playlist created in spotify.');
  };

  const onGetEmotionStarted = () => {
    setIsLoading(true);
  };

  return (
    <div className='d-flex flex-column vh-100 background-radial-gradient overflow-hidden'>
      { isLoading && <Loader /> }
      <ToastContainer />
      <main className="flex-grow-1">
        <div className="rounded">
          <div className="row bg-white m-3">
            {currentUser && <Sidebar user={currentUser} />}
            <Content onGetEmotionStarted={ onGetEmotionStarted } onGetEmotions={ onGetEmotions } onCreatePlaylist = {onCreatePlaylist} />
          </div>
          <div className='row bg-white m-3 playlist-container'>
            <div>
              <MDBListGroup style={{ minWidth: '22rem' }} light>
                {playListInfo.tracks.map((track, i) => (
                  <PlayList key={i} track={track} onTrackClick={onTrackClick} />
                ))}
              </MDBListGroup>
            </div>
          </div>
        </div>
      </main>
      {currentTrack && <Bottonbar trackUrl={currentTrack} />}
    </div>
  )
}
export default Home;