import { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import Card from "../UI/Card";
import classes from "./VideosList.module.css";
import backendUrl from "../../config";

const VideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/get-videos`)
      .then((response) => {
        const sortedVideos = response.data.Videos.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setVideos(sortedVideos);
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
