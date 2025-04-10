import { Image } from 'antd';
import styled from 'styled-components';
import logo from '../../../Resources/assets/img/logo.svg';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
`;
function Footer() {
  return (
    <Container>
      <Image src={logo} alt="logo" width="152px" preview={false} />
      <div>
        <span>Follow us on: </span>
      </div>
    </Container>
  );
}

export default Footer;
