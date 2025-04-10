import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
type PropsType = {
  index: number;
  setValue: any;
  imgPreview: any;
  inputName: string;
};

const UploadImage = ({ index, setValue, imgPreview, inputName }: PropsType) => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>(null);

  useEffect(() => {
    imgPreview && setImagePreview(imgPreview);
  }, [imgPreview])
  const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qgxrg9uu");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "http://api.cloudinary.com/v1_1/hoangthh1612/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (err) {
      setUploadingImg(false);
      console.log(err);
    }
  };
  const validateImg = async (e: any, index: number) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    try {
      setIsLoadingImage(true);
      const url = await uploadImage(e.target.files[0]);

      url && setImageUrl(url);
      url && setIsLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //imageUrl && setValue(`sales_info.${index}.image`, imageUrl);
    imageUrl && setValue(inputName, imageUrl);
  }, [imageUrl]);
  //console.log(imageUrl);
  //console.log(imgPreview);
  
  return (
    <div className="w-[60px] h-[60px] border-[1px] border-dashed border-gray-300 flex flex-col items-center justify-center relative">
      {isLoadingImage && (
        <div>
          <CircularProgress size={15} />
        </div>
      )}

      {!isLoadingImage && (
        <>
          {imagePreview && <img src={imagePreview} />}
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg"
            id={`sales_info.${index}.image`}
            onChange={(e) => {
              validateImg(e, index);
            }}
            // {...field}
          />
          <label
            htmlFor={`sales_info.${index}.image`}
            className="cursor-pointer absolute image-upload-label"
          >
            <i className="add-picture-icon">+</i>
          </label>
        </>
      )}
    </div>
  );
};
export default UploadImage;
