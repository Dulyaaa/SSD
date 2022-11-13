import React, { Component } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import LogoutButton from '../../components/logout';
import AuthService from '../../services/auth.services';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const clientId = "954998022306-tqeded1i8jsf5eemm7so5f28p8urr138.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {}
        };
        this.userAuthenticate = this.userAuthenticate.bind(this);
        this.getToken = this.getToken.bind(this);
        this.sendToken = this.sendToken.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount = () => {
        /* global google */
        google.accounts.id.initialize({
            client_id: clientId,
            callback: this.userAuthenticate
        });
    }

    userAuthenticate = (response) => {
        const userDetails = jwt_decode(response.credential);
        this.setState({
            userObject: userDetails
        });
        localStorage.setItem("UserLogged", "UserLogged");
        localStorage.setItem("userCredentials", JSON.stringify(userDetails));

        this.getUser(userDetails.email)
    }

    getUser = (email) => {
        AuthService.getUser(email)
            .then(response => {
                if (response.status === 200) {
                    console.log("fjh", response.data.data[0])
                    localStorage.setItem("user-role", response.data.data[0].role);
                    this.getToken(response.data.data[0]._id);
                }
            })
    }

    getToken = (userId) => {
        const token = google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: scope,
            callback: (tokenResponse) => {
                console.log("hghhjg", tokenResponse.access_token)
                localStorage.setItem("token", tokenResponse.access_token);
                this.sendToken(userId, tokenResponse.access_token);
            }
        })
        token.requestAccessToken();
    }

    sendToken = (userId, token) => {
        AuthService.sendToken(userId, token)
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push('/profile')
                }
            })
    }



    // googleAuthentication(response) {
    //     console.log("hfjhghjg", response)
    //     localStorage.setItem("UserLogged", "UserLogged");
    //     localStorage.setItem("code", response.credential);
    //     const code = jwt_decode(response.credential);
    //     console.log("sdhj", code);
    //     let token = {
    //         "code": response.credential
    //     }
    //     AuthService.getToken(token).then(response => {
    //         if (response.status === 200) {
    //             localStorage.setItem("token", JSON.stringify(response.data))
    //             localStorage.setItem("accessToken", response.data.access_token)
    //             console.log(response.data)
    //             AuthService.getUserInfo().then(res => {
    //                 if (response.status === 200) {
    //                     localStorage.setItem("name", response.data.name)
    //                     localStorage.setItem("profImage", response.data.picture)
    //                     this.props.history.push('/files');
    //                 }
    //             })
    //         }
    //     })
    // }


    render() {
        return (
            <div>
                <GoogleOAuthProvider
                    clientId={clientId}
                >
                    <div id="signInButton">
                        {/* <GoogleLogin
                            clientId={clientId}
                            buttonText="Log in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType="code"
                            scope='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'
                            isSignedIn={true}
                        /> */}

                        <GoogleLogin
                            clientId={clientId}
                            responseType="code"
                            scope='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'
                            render={(renderProps) => (
                                <button
                                    type="button"
                                    className=""
                                // onClick={renderProps.onClick}
                                // disabled={renderProps.disabled}
                                >
                                    Sign in with google
                                </button>
                            )}
                            onSuccess={this.userAuthenticate}
                            onFailure={this.userAuthenticate}
                            cookiePolicy={"single_host_origin"}
                        // theme={"filled_black"}
                        // size={"medium"}
                        // shape={"circle"}
                        />
                    </div>
                    {/* <LogoutButton /> */}

                </GoogleOAuthProvider>
            </div>
        )
    }
}