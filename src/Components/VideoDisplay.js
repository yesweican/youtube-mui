import { useParams } from "react-router-dom";

function VideoDisplay() {
  const { id } = useParams(); // <-- route param

  return (
    <div>
      <h2>Video Display</h2>
      <p>Video ID: {id}</p>
    </div>
  );
}

export default VideoDisplay;
