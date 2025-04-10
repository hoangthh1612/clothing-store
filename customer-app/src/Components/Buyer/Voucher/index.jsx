import React from 'react';
import './index.css';
import { Button, Row, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import VoucherCard from './VoucherCard';
import data from 'Components/Buyer/DumpData';

export default function Voucher({ onClose }) {
  const { vouchers } = data;
  return (
    <div className="bg-white max-w-2xl p-xl voucher-list relative">
      <Tooltip title="Close" className="absolute right-2 top-2">
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </Tooltip>
      <h1 className="h3 text-center text-primary my-3 ">
        <b>Voucher Cards</b>
      </h1>
      <div className="bg-light shadow rounded mx-5 mb-3 p-5">
        <div className="row">
          {vouchers.map((item) => (
            <div className="col-sm-4 px-4 pt-0 pb-5">
              <VoucherCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
