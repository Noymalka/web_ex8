import React, { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Similar to ng-repeat in AngularJS
  const renderImages = () => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image.smallimgUrl}
        alt="Smallimg"
        className="smallimg"
        onClick={() => selectImage(index)}
      />
    ));
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
  };

  // Fetch images when component mounts
  React.useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = [];
      for (let i = 1; i <= 10; i++) {
        fetchedImages.push({
          id: i,
          url: `https://picsum.photos/id/${i}/350/350`,
          smallimgUrl: `https://picsum.photos/id/${i}/50/50`,
        });
      }
      setImages(fetchedImages);
    };
    fetchImages();
  }, []);

  return (
    <div className="image-container">
      <div className="smallimg-container">{renderImages()}</div>
      <div className="main-img-container">
        <img src={images[selectedImageIndex]?.url} alt="Selected" className="main-img" />
      </div>
      <div className="arrows">
        <span className="arrow" onClick={prevImage}>
          &larr; 
        </span>
        <span className="arrow" onClick={nextImage}>
          &rarr;
        </span>
      </div>
    </div>
  );
}

export default App;
