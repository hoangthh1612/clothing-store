import { Pagination } from 'antd';
import React from 'react';

export default function Panigation({
  settings = {
    total: 45,
    // current:{}
    defaultPageSize: 1,
    pageSize: 15,
    showLessItems: true,
    // showQuickJumper:{{ goButton: <h1>12e</h1> }}
    showQuickJumper: true,
    // locale:{{ jump_to: 'Di toi', page: 'trang' }}
  },
  ...rest
}) {
  return <Pagination {...settings} {...rest} />;
}
