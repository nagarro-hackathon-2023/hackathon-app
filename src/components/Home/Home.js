import React, { useEffect, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBCardImage
} from 'mdb-react-ui-kit';
import './Home.css';
import AuthContext from '../../context/AuthProvider';
import userService from "../../services/user.service";


const Bottonbar = () => (
  <footer className="footer mt-auto py-3 bg-light">
    <div className="container">
      <span className="text-muted">Place sticky footer content here.</span>
    </div>
  </footer>
);
// const Playbar = ({ children }) => (
//   <div className='playbar'>
//     {children}
//   </div>
// );

// const Topbar = ({ children }) => (
//   <div className="topbar">
//     {children}
//   </div>
// )

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

function Home() {
  const imageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    userService.getCurrentUser().then(({ data }) => {
          setAuth({
            token,
            user: {
              id: data.id,
              name: data.display_name,
              image: data.images.length > 0 ? data.images[0] : imageUrl,
            }
          });
        console.log('user', data);
    });
    // userService.getTopTracks().then((x) => {
    //     console.log(x);
    // });
  }, []);
  return (
    <div className='d-flex flex-column vh-100 background-radial-gradient overflow-hidden'>
      <main className="flex-grow-1">
        <div className="rounded bg-white m-3">
          <div className="row">
            <Sidebar />
            <Content />
          </div>
        </div>
      </main>
      <Bottonbar />
    </div>
  )
}
export default Home;