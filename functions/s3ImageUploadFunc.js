import axios from 'axios';
import { API_FILE_UPLOAD } from '../envVars';
import * as ImageManipulator from 'expo-image-manipulator';
import { getStorage, getUserToken } from './storageFunc';

const resizeImage = async (uri) => {

    return await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { height: 1080 } }],
        { base64: true, compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
}

export const imgUploadCall = async (file) => {
          const HOST = await getStorage("host");

    const accessToken = await getUserToken();

    if (file && accessToken) {

        console.log("이미지 내용???????????=>", file)
        console.log("업로드 요청토큰======>>>>>>>>>>", accessToken)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        }
        const resizedImg = await resizeImage(file);

        console.log("리사이즈완료?", resizedImg)
        return resizedImg && await axios.post(`${HOST + API_FILE_UPLOAD}`, {
            body: resizedImg.base64,
            contentType: "image/jpeg"
        }, config)
            .then(response => {
                console.log("res=>>>>>", response.data)
                return response.data.url
            })
            .catch(err => console.log("uri->>>>>>", err))

    }

}
export const base64UploadCall = async (file) => {
          const HOST = await getStorage("host");

    const accessToken = await getUserToken();

    if (file) {
        // console.log("이미지 내용???????????=>", file)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        }
        const data = {
            body: file.split(",")[1],
            contentType: `${file.split(',').shift().split(":")[1].split(";")[0]}`
        }

        console.log(data.body);

        return file && await axios.post(`${HOST + API_FILE_UPLOAD}`, data, config)
            .then(response => {
                console.log("res=>>>>>", response.data)
                return response.data.url;
            })
            .catch(err => console.log("base64=>>>>>", err))
    }

}