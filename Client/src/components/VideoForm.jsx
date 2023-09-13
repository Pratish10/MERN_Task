import classes from "../UI/Input.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const VideoForm = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddInput = () => {
    setVideos([...videos, null]);
  };

  const handleFileInputChange = (e, index) => {
    // const selectedFile = e.target.files[0];
    // console.log("Selected file:", selectedFile);

    const newVideos = [...videos];
    newVideos[index] = e.target.files[0];

    // console.log("New videos state:", newVideos);
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
    videos.forEach((video) => {
      // console.log(video);
      formData.append(`files`, video);
      // console.log(formData);
    });
    // console.log(videos);
    // console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
      alert("An error occurred");
      setVideos([]);
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
            <label htmlFor="files">You can upload multiple mp4 files</label>
            {videos.map((file, index) => (
              <div key={index} className={classes.input}>
                <input
                  type="file"
                  accept=".mpg, .avi, .mp4"
                  onChange={(e) => handleFileInputChange(e, index)}
                  // value={null}
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
            Add Input File
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
