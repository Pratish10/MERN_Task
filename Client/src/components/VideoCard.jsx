import PropTypes from "prop-types";
import classes from "./VideosList.module.css";

const VideoCard = ({ video }) => {
  const date = new Date(video.createdAt);
  const formatDate = date.toLocaleDateString();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formatTime = `${hours}:${minutes} ${ampm}`;

  return (
    <li className={classes.items}>
      <div className={classes.card}>
        <video controls width="300">
          <source src={video.cloudinaryUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h4 className={classes.cardtitle}>Id: {video._id}</h4>
        <p>Date: {formatDate}</p>
        <p>Time: {formatTime}</p>
      </div>
    </li>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    cloudinaryUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCard;
