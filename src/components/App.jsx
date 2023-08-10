import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = '35985154-1fa347b3ddcc8b13ab706f11a';
  const perPage = 12;

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (largeImageURL) => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage, apiKey]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {isLoading && <Loader />}
      {!!images.length && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={modalImage} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
