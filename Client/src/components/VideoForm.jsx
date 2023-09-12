import classes from "../UI/Input.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < videos.length; i++) {
      formData.append("files", videos[i]);
    }
    // console.log(videos);
    // console.log(formData);

    try {
      const response = await axios.post(
        "https://mern-tassk-backend.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Video is merged and uploaded to cloudinary");
        // console.log("Videos uploaded successfully to cloudinary");
      } else {
        console.log("Failed to upload videos");
      }
      navigate("/videoList");
      setVideos(null);
    } catch (error) {
      console.log("An error occurred:", error);
      setVideos(null);
    }
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={classes.input}>
          <label htmlFor="files">You can upload 2 mp4 files at once</label>
          <input
            label="Upload your first Video"
            id="files"
            type="file"
            multiple
            name="files"
            accept=".mpg, .avi, .mp4"
            onChange={(e) => setVideos(e.target.files)}
          />
          <br />
          <Button type="submit">Merge</Button>
        </div>
      </form>
    </Card>
  );
};

export default VideoForm;
