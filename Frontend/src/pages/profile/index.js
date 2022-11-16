import { Component } from "react";
import FileManagerService from "../../services/fileManager.service";
import Constants from "../../util/constants/constants";
import "./index.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObject: "",
      tokenClient: "",

      image: "",
      imageUrl: "",
      imageURLValidation: false,
      imageValidation: false,
      imageName: "",
      name: "",
      fileType: "",
      file: "",
      driveFilesArray: [],
      isSaved: false,
    };
    this.logout = this.logout.bind(this);
    // this.getToken = this.getToken.bind(this);
    // this.createDriveFile = this.createDriveFile.bind(this);
    // this.loadDriveFiles = this.loadDriveFiles.bind(this);
  }

  componentDidMount = () => {
    const details = localStorage.getItem("userCredentials");
    this.setState({
      userObject: JSON.parse(details),
    });

    // this.getToken();
  };

  // getToken = () => {
  //     // Access Tokens
  //     // Upload to a specific users google drive

  //     // tokenclient
  //     const google = window.google;
  //     tokenClient = google.accounts.oauth2.initTokenClient({
  //         client_id: Constants.client_id,
  //         scope: Constants.scope,
  //         callback: (tokenResponse) => {
  //             console.log("hghhjg", tokenResponse.access_token)
  //             localStorage.setItem("token", tokenResponse.access_token);

  //             // FIXME:
  //             if (tokenResponse && tokenResponse.access_token) {
  //                 fetch("https://www.googleapis.com/drive/v3/files", {
  //                     method: 'GET',
  //                     headers: {
  //                         'Content-Type': 'application/json',
  //                         'Authorization': `Bearer ${tokenResponse.access_token}`
  //                     },
  //                     // body: JSON.stringify({"name": "hfjd", "mimeType": "text/plain"})
  //                 }).then(res => {
  //                     console.log("dhf", res)
  //                     this.setState({ driveFilesArray: res.body })
  //                 })
  //                 console.log("gjhu", this.state.driveFilesArray)
  //             }
  //         }
  //     })
  // }

  // createDriveFile = () => {
  //     tokenClient.requestAccessToken();

  //     this.loadDriveFiles();
  // }

  logout = () => {
    localStorage.removeItem("userCredentials");
    localStorage.removeItem("userToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    this.props.history.push("/");
    window.location.reload();
  };

  //load drive files
  // loadDriveFiles = () => {
  //     FileManagerService.getDriveFiles().then(res => {
  //         if (res.status === 200) {
  //             let files = [];
  //             if (res.data.length === 0) {
  //                 this.setState({
  //                     driveFilesArray: files
  //                 })
  //             }
  //             res.data.map(data => {
  //                 FileManagerService.getThumbnail(data.id).then(res => {
  //                     let thumbnail = ''
  //                     if (Object.keys(res.data).length === 0 && res.data.constructor === Object) {
  //                         thumbnail = ''
  //                     } else {
  //                         thumbnail = res.data.thumbnailLink
  //                     }
  //                     const imgData = {
  //                         "name": data.name,
  //                         "type": data.mimeType,
  //                         "thumbnail": thumbnail,
  //                         "id": data.id
  //                     }
  //                     files.push(imgData)
  //                     this.setState({
  //                         driveFilesArray: files
  //                     })
  //                 })
  //             })
  //         }
  //     }).catch(err => {
  //         if (err !== undefined)
  //             if (err.status === 400)
  //                 console.log("hfhjj", err)
  //     });
  // }

  render() {
    return (
      <div>
        <div class="card-container">
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

      // <div>
      //     <img src={this.state.userObject.picture} alt="profilePicture"></img>
      //     <h3>{this.state.userObject.name}</h3>
      //     <button type='submit' onClick={this.createDriveFile}>Upload file</button>

      //     <table className="table">
      //         <thead>
      //             <tr>
      //                 <th scope="col">Thumbnail</th>
      //                 <th scope="col">Name</th>
      //                 <th scope="col"></th>
      //             </tr>
      //         </thead>
      //         <tbody>
      //             {
      //                 this.state.driveFilesArray.length !== 0 ?
      //                     this.state.driveFilesArray.map(data => {
      //                         return (<tr>
      //                             <th scope="row">
      //                                 <a target="_blank" href={data.thumbnail}>
      //                                     <img
      //                                         src={data.thumbnail}
      //                                         className="card-img-top"
      //                                         alt="..."
      //                                     />
      //                                 </a>
      //                             </th>
      //                             <td>{data.name}</td>
      //                             <td>
      //                                 <button type="button" className="btn btn-secondary"
      //                                     onClick={() => this.downloadFile(data.id, data.name, data.type)}>Download
      //                                 </button>
      //                                 <button type="button" className="btn btn-danger"
      //                                     onClick={() => this.deleteDocument(data.id, data.name)}>Delete
      //                                 </button>
      //                             </td>
      //                         </tr>)
      //                     })
      //                     : <tr>
      //                         <td colSpan="2">
      //                             {
      //                                 <h1>Wait</h1>
      //                             }

      //                         </td>
      //                     </tr>
      //             }

      //         </tbody>
      //     </table>
      //     <button onClick={this.logout}>Logout</button>
      // </div>
    );
  }
}
