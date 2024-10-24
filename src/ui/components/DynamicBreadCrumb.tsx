import { Breadcrumb } from 'antd';
import React from 'react';
import '@ui/components/DynamicBreadCrumb.css';
import { useLocation } from 'react-router-dom';
import parseURLToBreadcrumbs from '@domain/utils/parseURLToBreadcrumbs';

export default function DynamicBreadCrumb() {
  const location = useLocation();
  const breadcrumbParts = parseURLToBreadcrumbs(location.pathname);
  return (
    <div className={'breadcrumb-wrapper'}>
      <Breadcrumb items={breadcrumbParts} />
    </div>
  );
}
