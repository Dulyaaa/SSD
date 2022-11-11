import React, { Component } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import LogoutButton from '../../components/logout';
// import AuthService from '../../services/auth.services';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const clientId = "954998022306-tqeded1i8jsf5eemm7so5f28p8urr138.apps.googleusercontent.com";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: {}
        };
        this.handleCallbackResponse = this.handleCallbackResponse.bind(this);
        // this.googleAuthentication = this.googleAuthentication.bind(this);
    }

    componentDidMount = () => {
        /* global google */
        google.accounts.id.initialize({
            client_id: clientId,
            callback: this.handleCallbackResponse
        });
    }

    handleCallbackResponse = (response) => {
        console.log("jhjdhfj", response.credential);
        const userDetails = jwt_decode(response.credential);
        console.log("jhjdhfj", userDetails);
        this.setState({
            userObject: userDetails
        });
        localStorage.setItem("UserLogged", "UserLogged");
        localStorage.setItem("userCredentials", JSON.stringify(userDetails));
        this.props.history.push('/profile')
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
                            onSuccess={this.handleCallbackResponse}
                            onFailure={this.handleCallbackResponse}
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