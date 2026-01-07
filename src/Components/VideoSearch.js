import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function VideoSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      // Call your API here
      // fetchVideos(query);
      console.log('Searching videos for:', query);
    }
  }, [query]);

  return (
    <div>
      <h2>Video Search</h2>
      {query && <p>Results for: <strong>{query}</strong></p>}
      {/* Render results here */}
    </div>
  );
}

export default VideoSearch;
