import { Layout } from 'antd';

function Container({ children, ...props }) {
  return (
    <Layout style={{ padding: '24px 50px' }} {...props}>
      {children}
    </Layout>
  );
}

export default Container;
