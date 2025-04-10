import React, { Suspense } from 'react'
import ProductManagement from '../components/list-product'
import Loading from "../../../loading";

const ProductManagementPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <div className='mx-16'>
        <ProductManagement />
        </div>
    </Suspense>
  )
}

export default ProductManagementPage