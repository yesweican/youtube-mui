import ScrollableImageList from "./ScrollableImageList";
const images = [
  { img: 'https://source.unsplash.com/random/1', title: 'Image 1' },
  { img: 'https://source.unsplash.com/random/2', title: 'Image 2' },
  { img: 'https://source.unsplash.com/random/3', title: 'Image 3' },
  { img: 'https://source.unsplash.com/random/4', title: 'Image 4' },
  { img: 'https://source.unsplash.com/random/5', title: 'Image 5' },
  { img: 'https://source.unsplash.com/random/6', title: 'Image 6' },
  { img: 'https://source.unsplash.com/random/7', title: 'Image 7' },
  { img: 'https://source.unsplash.com/random/8', title: 'Image 8' },
  { img: 'https://source.unsplash.com/random/9', title: 'Image 9' }, 
  // Add more images as needed
];
export default function VideoPopularity() {
    return (
      <section>
        <h1>Amazing Video By Popularity</h1>
        <ScrollableImageList images = { images } />
      </section>
    );
  }