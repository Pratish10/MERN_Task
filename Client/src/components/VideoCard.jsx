import PropTypes from "prop-types";
import classes from "./VideosList.module.css";

const VideoCard = ({ video }) => {
  return (
    <li className={classes.items}>
      <div className={classes.card}>
        <video controls width="300">
          <source src={video.cloudinaryUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </li>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    cloudinaryUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCard;