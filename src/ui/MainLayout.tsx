import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';

export default function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={'main-layout'}>
      {/*<DynamicBreadCrumb />*/}
      <Content
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className={'main-content'}
      >
        <Outlet />
      </Content>
    </Layout>
  );
}
