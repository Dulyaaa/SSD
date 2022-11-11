import axios from 'axios';

class FileManagerService {

    getDriveFiles(data) {
        return axios.request({
            url: 'https://localhost:8080/api/oauth/readDrive',
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Authorization': localStorage.getItem("token")
            }
        })
    }

    getThumbnail(id) {
        return axios.request({
            url: 'https://localhost:8080/api/oauth/thumbnail/' + { id },
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Authorization': localStorage.getItem("token")
            }
        })
    }

    uploadFile(data) {
        return axios.request({
            url: 'https://localhost:8080/api/oauth/fileUpload',
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/octet-stream',
                'Authorization': localStorage.getItem("token")
            }
        })
    }
}

export default new FileManagerService();