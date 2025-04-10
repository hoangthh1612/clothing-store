import { Carousel, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SliderStateLess from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const { Title, Text } = Typography;
function Slider({ children, settings, title, textLevel }) {
  // const initImages = [
  //   'https://znews-photo.zingcdn.me/w960/Uploaded/natmts/2023_06_23/thumb_Mau_co.jpg',
  //   'https://znews-photo.zingcdn.me/w960/Uploaded/natmts/2023_06_23/thumb_Mau_co.jpg',
  //   'https://znews-photo.zingcdn.me/w960/Uploaded/natmts/2023_06_23/thumb_Mau_co.jpg',
  // ];

  return (
    <>
      {title && <Title level={textLevel}>{title}</Title>}
      <SliderStateLess {...settings}>{children}</SliderStateLess>
    </>
  );
}

export default Slider;
