import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css';

const LazyImage = ({ image }) => (
  <div style={{width: image.containerWidth}} className={""}>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      effect="opacity"
      src={image.src} // use normal <img> attributes as props
      className={image.className}
      wrapperClassName={image.wrapperClassName}
      width={image.width} />
    <h4>{image.caption}</h4>
  </div>
);

export default LazyImage;