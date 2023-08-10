import React from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
    return (
      <li className={style.ImageGalleryItem} onClick={onClick}>
        <img src={webformatURL} alt="" />
      </li>
    );
  };
  
  export default ImageGalleryItem;
  