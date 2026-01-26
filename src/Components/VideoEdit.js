import { useParams } from "react-router-dom";

function VideoEdit() {
  const { id } = useParams(); // <-- route param

  return (
    <div>
      <h2>Video Edit</h2>
      <p>Editing Video ID: {id}</p>
    </div>
  );
}

export default VideoEdit;


