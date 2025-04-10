import { Layout } from 'antd';
import { BuyerHeader, BuyerFooter } from 'Components';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const { Header: HeaderAntd, Footer: FooterAntd, Content, Sider } = Layout;

function ClientLayout() {
  // let { pathname } = useLocation();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Layout className="min-h-screen">
      <header className="bg-white h-[55px] max-h-[55px] border-b-[1px] border-slate-200">
        <BuyerHeader />
      </header>

      <Content className="">
        <Outlet />
      </Content>

      <FooterAntd style={{ backgroundColor: '#D9D9D9' }}>
        <BuyerFooter />
      </FooterAntd>
    </Layout>
  );
}

export default ClientLayout;
