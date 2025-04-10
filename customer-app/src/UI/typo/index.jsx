import { Typography } from 'antd';

const { Title: TitleAntd, Text: TextAntd } = Typography;
const textSize = {
  xs: 'text-xl',
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};
const checkDeviceSize = (width) => {
  if (width > 992) return 'lg';

  if (width > 768) return 'md';

  if (width > 576) return 'sm';
  return 'xs';
};
export const Title = ({ children, ...props }) => (
  <TitleAntd level={window.screen.width > 576 ? 2 : 5} {...props}>
    {children}
  </TitleAntd>
);

export const Text = ({ children, className, ...props }) => {
  const fontSize = textSize[checkDeviceSize(window.screen.width)];

  return (
    <TextAntd {...props} className={className + ` ${fontSize}`}>
      {children}
    </TextAntd>
  );
};
