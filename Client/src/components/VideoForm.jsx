import classes from "../UI/Input.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
  const [videos, setVideos] = useState([1]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddInput = () => {
    setVideos([...videos, null]);
  };

  const handleFileInputChange = (e, index) => {
    const newVideos = [...videos];
    newVideos[index] = e.target.files[0];
    setVideos(newVideos);
  };

  const handleRemoveInput = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < videos.length; i++) {
      formData.append("files", videos[i]);
    }
    // console.log(videos);
    // console.log(formData);

    try {
      setLoading(true);
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
      setVideos([]);
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
        <div
          style={{
            border: "1px solid grey",
            height: "60vh",
            overflowY: "scroll",
          }}
        >
          <div className={classes.input}>
            {/* <label htmlFor="files">You can upload 2 mp4 files at once</label>
          <input
            id="files"
            type="file"
            multiple
            name="files"
            accept=".mpg, .avi, .mp4"
            onChange={(e) => setVideos(e.target.files)}
          /> */}
            <label htmlFor="files">You can upload multiple mp4 files</label>
            {videos.map((file, index) => (
              <div key={index} className={classes.input}>
                <input
                  type="file"
                  accept=".mpg, .avi, .mp4"
                  onChange={(e) => handleFileInputChange(e, index)}
                />
                <button type="button" onClick={() => handleRemoveInput(index)}>
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className={classes["button-container"]}>
          <Button type="button" onClick={handleAddInput}>
            Add File
          </Button>
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
