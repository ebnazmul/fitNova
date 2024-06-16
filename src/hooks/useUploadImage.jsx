import axios from "axios";

const useUploadImage = () => {
  const imageUpload = (img) => {
    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMAGE_UPLOAD_API);
    body.append("image", img);
    return axios.post("https://api.imgbb.com/1/upload", body);
  };

  return imageUpload;
};

export default useUploadImage;
