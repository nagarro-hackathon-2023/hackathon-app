import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';
import './Login.css';
import AuthContext from '../../context/AuthProvider';
function Login() {
  const scopes = 'user-read-private user-read-email user-top-read user-read-playback-state user-modify-playback-state playlist-modify-public';
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = window.location.href;
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE;
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`;

  let navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash) {
      const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token);
      setAuth({ token });
      navigate('/');
    }
  }, []);

  return (
    <MDBContainer fluid className='pt-4 vh-100 background-radial-gradient overflow-hidden'>
      <div className='d-flex justify-content-between'>
        <img src='./assets/nagarro_logo.svg' alt='logo' />
        {/* <MDBBtn size='lg' style={{ backgroundColor: '#19ba27' }} href={loginUrl}>
          <MDBIcon className='me-2' fab icon='spotify' /> Login With Spotify
        </MDBBtn> */}
      </div>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Musicfy.AI <br />
            <span style={{ color: 'hsl(218, 81%, 75%)', fontSize: '3rem' }}>You are what you listen to!</span>
          </h1>
        </MDBCol>
        <MDBCol md='6'>
          <div className='d-flex justify-content-center align-items-center'>
            <img src='./assets/Spotify-PNG-Logo.png' alt='spotify' height={250} width={250} />
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)', height: '200px' }}>
            <img alt="sub logo" src="./assets/sub_logo.svg"/>
          </p>
        </MDBCol>
        <MDBCol>
          <div className='d-flex align-items-center justify-content-center'>
            <MDBBtn size='lg' style={{ backgroundColor: '#20b720', marginTop: '20px' }} href={loginUrl}>
              <MDBIcon className='me-2' fab icon='spotify' /> Login With Spotify
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
};
export default Login;