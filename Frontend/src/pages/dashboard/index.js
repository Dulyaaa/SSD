import React, { Component } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import LogoutButton from '../../components/logout';
import { Col, Row } from 'react-bootstrap'
import AuthService from '../../services/auth.services';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Constants from '../../util/constants/constants';
import image from '../../assets/upload.png'
import image2 from '../../assets/message.png'
import './index.css'

// const clientId = "954998022306-tqeded1i8jsf5eemm7so5f28p8urr138.apps.googleusercontent.com";
// const scope = "https://www.googleapis.com/auth/drive";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: "",
            tokenClient: "",


            imageUrl: '',
            imageURLValidation: false,
            imageValidation: false,
            imageName: '',
            name: '',
            fileType: '',
            file: '',
            driveFilesArray: [],
            isSaved: false,
        };
        this.logout = this.logout.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount = () => {
        const details = localStorage.getItem("userCredentials");
        this.setState({
            userObject: JSON.parse(details)
        })

        // this.getToken();
    }

    logout = () => {
        localStorage.removeItem("userCredentials")
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        this.props.history.push('/')
        window.location.reload();
    }

    upload = () => {
        localStorage.removeItem("inputGroupFile02")
    }
    
    reload() {
        window.location.refresh();
      }

    render() {
        return (

            <section class="block">

                <div class="left-p">

                    <div>
                        <img class="round" src={this.state.userObject.picture} alt="user" />
                        <h3>{this.state.userObject.name}</h3>
                        {/* <h6>dulyakemali@gmail.com</h6> */}
                        <p>{this.state.userObject.email}</p>

                        {/* Log out button */}
                        <div class="buttons">
                            <button class="primary" onClick={this.logout}>
                                Log Out
                            </button>
                        </div>
                    </div>


                </div>
                <div class="right-p">

                    <div class="card mb-3">
                        <img class="card-img-top" src={image} alt="Card image cap"></img>
                        <div class="card-body">
                            <h3 class="card-title">Upload File</h3>
                            <p class="card-text">Please upload your file here.</p>

                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile02"></input>
                                </div>
                                <div class="buttons">
                                <button onClick="window.location.href=window.location.href">Refresh Page</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card mb-3">
                        <img class="card-img-top" src={image2} alt="Card image cap"></img>
                        <div class="card-body">
                            <h3 class="card-title">Message</h3>
                            <p class="card-text">Please add your message here.</p>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}