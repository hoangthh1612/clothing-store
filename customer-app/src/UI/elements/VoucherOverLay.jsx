import React, { useState } from 'react';
import VoucherCard from 'Components/Buyer/Voucher';

const VoucherOverlay = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity flex justify-center items-center ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }
      ${isOpen ? 'block' : 'hidden'}
      `}
      style={{ zIndex: isOpen ? 9999 : -1 }}
    >
      {console.log('is Open', isOpen)}
      <VoucherCard onClose={onClose} />
    </div>
  );
};

export default VoucherOverlay;
