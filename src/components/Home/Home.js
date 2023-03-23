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
import userService from "../../services/user.service";
function Home() {
    useEffect(() => {
        userService.getCurrentUser().then(({ data }) => {
            console.log('x', data);
        });
    }, []);
    return (
        <MDBContainer fluid className='p-4 vh-100 background-radial-gradient overflow-hidden'>
            Home
        </MDBContainer>
    )
}
export default Home;