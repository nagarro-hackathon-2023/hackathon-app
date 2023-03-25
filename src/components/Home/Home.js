import React, { useEffect, useContext, useState } from 'react';
import { Spotify } from 'react-spotify-embed';
import {
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import './Home.css';
import AuthContext from '../../context/AuthProvider';
import userService from "../../services/user.service";


const Bottonbar = ({ trackUrl }) => {
  useEffect(() =>{
    console.log(document.querySelector('button[data-testid="play-pause-button"]'));
    // document.querySelector('button[data-testid="play-pause-button"]').click();
  },[]);
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

const Sidebar = () => (
  <div className="col-md-2 border-right">
    <div className="d-flex flex-column align-items-center text-center">
      <img className="rounded-circle" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
      <span className="font-weight-bold">Edogaru</span>
      <span className="text-black-50">edogaru@mail.com.my</span>
      <span> </span>
    </div>
  </div>
);

const Content = () => (
  <div className="col-md-10 border-right">
  </div>
)

const PlayList = ({ track, onTrackClick }) => {
  const handlePlayClick = () => {
    onTrackClick(track);
  };
  return (
    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
    <div className='d-flex align-items-center'>
      <img
        src={track.imageUrl}
        alt=''
        style={{ width: '45px', height: '45px' }}
        className='rounded-circle'
      />
      <div className='ms-3'>
        <p className='fw-bold mb-1'>{track.name}</p>
      </div>
    </div>
    <MDBBtn size='sm' rounded color='link' onClick={handlePlayClick}>
      Play
    </MDBBtn>
  </MDBListGroupItem>
  )
};

function Home() {
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
  const [ currentTrack, setCurrentTrack ] = useState(null);
  
  const imageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    setCurrentTrack('https://open.spotify.com/track/2cbaCL38j8eUXBQjvLawET');
    const token = window.localStorage.getItem("token");
    // userService.getCurrentUser().then(({ data }) => {
    //       setAuth({
    //         token,
    //         user: {
    //           id: data.id,
    //           name: data.display_name,
    //           image: data.images.length > 0 ? data.images[0] : imageUrl,
    //         }
    //       });
    //     console.log('user', data);
    // });
    // userService.getTopTracks().then((x) => {
    //     console.log(x);
    // });
  }, []);


  const onTrackClick = track => {
    console.log(track);
    setCurrentTrack(track.trackUrl);
  };

  return (
    <div className='d-flex flex-column vh-100 background-radial-gradient overflow-hidden'>
      <main className="flex-grow-1">
        <div className="rounded">
          <div className="row bg-white m-3">
            <Sidebar />
            <Content />
          </div>
          <div className='row m-3 playlist-container'>
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
      {currentTrack && <Bottonbar trackUrl={currentTrack}/>}
    </div>
  )
}
export default Home;