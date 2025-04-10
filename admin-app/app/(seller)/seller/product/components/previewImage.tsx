'use client'

import Image from 'next/image';
import React, { useState } from 'react'

const PreviewImage = ({file}: {file: any}) => {
    const [preview, setPreview] = useState<any>(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader?.result);
    }

    return (
    <div>
        {preview ? <Image src={preview} alt='preview' width={200} height={200} /> : "loading"}
    </div>
  )
}

export default PreviewImage