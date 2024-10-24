import { Breadcrumb } from 'antd';
import React from 'react';
import '@ui/components/DynamicBreadCrumb.css';

export default function DynamicBreadCrumb() {
  return (
    <div className={'breadcrumb-wrapper'}>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
      />
    </div>
  );
}
