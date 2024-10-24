import React from 'react';
import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import DynamicBreadCrumb from '@ui/components/DynamicBreadCrumb';

export default function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={'main-layout'}>
      <DynamicBreadCrumb />
      <Content
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className={'main-content'}
      >
        Content
      </Content>
    </Layout>
  );
}
