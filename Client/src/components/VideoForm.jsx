import classes from "../UI/Input.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const VideoForm = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allowedFormats = ".mp4";

  const handleAddInput = () => {
    setVideos([...videos, null]);
  };

  const handleFileInputChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (allowedFormats.includes(`.${fileExtension}`)) {
      const newVideos = [...videos];
      newVideos[index] = selectedFile;
      setVideos(newVideos);
    } else {
      alert("Unsupported file format. Please select a valid video format.");
    }
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
      formData.append(`files`, video);
    });

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Video is merged and uploaded to cloudinary");
      } else {
        console.log("Failed to upload videos");
      }
      navigate("/videoList");
      setVideos([]);
      setLoading(false);
    } catch (error) {
      console.log("An error occurred:", error);
      alert(error.message);
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
                  accept=".mp4"
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
          <Link to="/videoList">
            <Button>Videos List</Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default VideoForm;
