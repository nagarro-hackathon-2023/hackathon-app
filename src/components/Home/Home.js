import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotify } from 'react-spotify-embed';
import {
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
  MDBFile
} from 'mdb-react-ui-kit';
import './Home.css';
import AuthContext from '../../context/AuthProvider';
import userService from "../../services/user.service";
import faceService from "../../services/face.service";


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
  <div className="col-md-2 border-right">
    <div className="d-flex flex-column align-items-center text-center">
      <img className="rounded-circle" alt="user" width="100px" height="100px" src={user.image} />
      <span className="font-weight-bold">{user.name}</span>
    </div>
  </div>
);

const Content =  ({ onGetEmotions }) => {
  const { setAuth } = useContext(AuthContext);
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { userImage } = e.target.elements;
    const data = new FormData();
    data.append('file', userImage.files[0]);
    // const result = await faceService.getUserEmotion(data);
    // console.log(result);
    const tracks = [
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/3ohQknrCZwxPoke6Dy2L7S',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/1pDOFak83OlJVuXnMRkXHq',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/7t2pQVJ3tCbrEBg9uDz0qb',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      },
      {
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851aca38bbbc4bdaa23155b4802',
        trackUrl: 'https://open.spotify.com/album/4ejdjD4ByhxyBEFtlYWBcI',
        name: "Bhool Bhulaiyaa 2 Title Track (From \"Bhool Bhulaiyaa 2\")"
      }
    ];
    onGetEmotions(tracks);
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
            <span>Upload Face Image</span>
          </MDBCol>
          <MDBCol size='12'>
            <MDBFile id='userImage'  accept="image/png, image/gif, image/jpg, image/jpeg" />
          </MDBCol>
          <MDBCol size='12'>
            <MDBBtn type='submit'>Find Music</MDBBtn>
          </MDBCol>
      </MDBRow>
      </form>
      <MDBBtn size='sm' rounded color='link' onClick={handleLogout}>
        Logout
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
        Play
      </MDBBtn>
    </MDBListGroupItem>
  )
};

function Home() {
  const { setAuth } = useContext(AuthContext);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [tracks, setTracks] = useState([]);

  const imageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    userService.getCurrentUser().then(({ data }) => {
      const user = {
        id: data.id,
        name: data.display_name,
        image: data.images.length > 0 ? data.images[0] : imageUrl,
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

  const onGetEmotions = data => {
    setTracks(data);
    setCurrentTrack(data[0].trackUrl);
  }

  return (
    <div className='d-flex flex-column vh-100 background-radial-gradient overflow-hidden'>
      <main className="flex-grow-1">
        <div className="rounded">
          <div className="row bg-white m-3">
            {currentUser && <Sidebar user={currentUser} />}
            <Content onGetEmotions={ onGetEmotions }/>
          </div>
          <div className='row bg-white m-3 playlist-container'>
            <div>
              <MDBListGroup style={{ minWidth: '22rem' }} light>
                {tracks.map((track, i) => (
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