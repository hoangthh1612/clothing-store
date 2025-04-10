'use client'

import CreateVoucher from "../components/create-voucher";


import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';


const CreateVoucherPage = () => {
    return (
        
        <ConfigProvider>
            <StyleProvider hashPriority="high">
                <CreateVoucher />
        </StyleProvider>
        </ConfigProvider>
    )
}
export default CreateVoucherPage;