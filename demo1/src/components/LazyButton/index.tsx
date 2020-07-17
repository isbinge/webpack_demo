import React, { useRef } from 'react';
import { Button } from 'antd';

const LazyButton: React.FC = () => {
  const lazyButtonRef = useRef(null);

  const handleClick = () => {
    import('./common')
      .then(({ default: staticText }) => {
        lazyButtonRef.current.innerText = staticText;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Button ref={lazyButtonRef} onClick={handleClick} className="pure-button" />
    </>
  );
};
export default LazyButton;
