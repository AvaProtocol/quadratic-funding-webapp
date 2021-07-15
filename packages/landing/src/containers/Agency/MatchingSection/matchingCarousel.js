import { Carousel } from 'antd';
import React from 'react';
import img1 from '../../../common/assets/image/carousell/1.jpeg';
import img2 from '../../../common/assets/image/carousell/2.png';
import 'antd/dist/antd.css';

const contentStyle = {
  height: '300x',
  width: 640,
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

const MatchingCarousel = () => {
  return (
    <Carousel style={{ width: '640px', height: '300px' }}>
      <div>
        <img style={contentStyle} src={img1} alt="" />
      </div>
      <div>
        <img style={contentStyle} src={img2} alt="" />
      </div>
    </Carousel>
  );
};

export default MatchingCarousel;
