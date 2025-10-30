import React from 'react';
import logo from '../../public/app.svg';
function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = logo;
      }}
      {...props}
    />
  );
}

export default Image;
