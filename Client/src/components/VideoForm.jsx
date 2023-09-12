import classes from "../UI/Input.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
  const [videos, setVideos] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < videos.length; i++) {
      formData.append("files", videos[i]);
    }
    formData.append("title", title);
    // console.log(videos);
    // console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/upload",
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
      setLoading(false);
    } catch (error) {
      console.log("An error occurred:", error);
      setVideos(null);
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={classes.input}>
          <label htmlFor="title">Enter Video Title</label>
          <input
            id="title"
            type="text"
            name="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="files">You can upload 2 mp4 files at once</label>
          <input
            id="files"
            type="file"
            multiple
            name="files"
            accept=".mpg, .avi, .mp4"
            onChange={(e) => setVideos(e.target.files)}
          />
          <br />
          <Button type="submit">
            {loading ? "Merging and Uploading" : "Merge"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default VideoForm;
