import { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import Card from "../UI/Card";
import classes from "./VideosList.module.css";

const VideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-videos")
      .then((response) => {
        setVideos(response.data.Videos);

        // console.log(response.data.Videos);
      })
      .catch((error) => {
        console.log("Error fetching videos:", error);
      });
  }, []);

  return (
    <Card>
      <h2>List of Videos</h2>
      <ul className={classes.cards}>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </ul>
    </Card>
  );
};

export default VideosList;
