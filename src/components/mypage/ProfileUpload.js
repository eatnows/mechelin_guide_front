import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import Axios from "util/axios";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ProfileUpload extends React.Component {
  state = {
    loading: false,
    path:
      "http://localhost:9000/mechelin/image/profile/image?id=" +
      sessionStorage.getItem("userId"),
    imageUrl: "",
  };

  componentWillMount() {
    const url = `/friends/profile?id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        this.setState({
          imageUrl: res.data.profile_url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div style={{ width: "7vw", height: "auto", margin: "0 auto" }}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={this.state.path}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    );
  }
}

export default ProfileUpload;
