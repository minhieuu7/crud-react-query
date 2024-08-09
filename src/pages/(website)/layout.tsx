import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderCpmponent from '@/components/Header';
import FooterComponent from '@/components/Footer';

const App: React.FC = () => {
  return (
    <Layout>
      <HeaderCpmponent/>
        <Outlet/>
      <FooterComponent/>
    </Layout>
  );
};

export default App;