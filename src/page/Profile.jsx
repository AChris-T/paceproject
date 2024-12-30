import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';

export default function Profile() {
  const { isLoading } = useState();
  function getImageFileObject(imageFile) {
    console.log({ imageFile });
  }

  function runAfterImageDelete(file) {
    console.log({ file });
  }
  return (
    <div className="max-w-[740px] mx-auto border-[1px] shadow-card overflow-x-hidden ">
      <div className=" px-[37px] py-[31px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-[32px] text-green-Primary_1 myFont">
              Complete profile
            </h3>
            <h3 className="font-semibold">1/3</h3>
          </div>
          <h3 className="font-normal text-[#4B4D52]">
            Let’s know you better 😊
          </h3>
        </div>
        <form className="mt-[23px]">
          <div>
            <ImageUploader
              onFileAdded={(img) => getImageFileObject(img)}
              onFileRemoved={(img) => runAfterImageDelete(img)}
            />
          </div>
          <div className="mt-[27px]">
            <label>Full name</label>
            <input
              name="fullName"
              className="w-full focus:outline-none border-b-[2px]"
            />
          </div>
          <div className="mt-[27px]">
            <label>Username</label>
            <input
              name="fullName"
              className="w-full focus:outline-none border-b-[2px]"
            />
          </div>
          <div className="mt-[27px]">
            <label>E-mail</label>
            <input
              name="fullName"
              className="w-full focus:outline-none  border-b-[2px]"
            />
          </div>
          <div className="mt-[27px]">
            <label>Gender</label>
            <input
              name="fullName"
              className="w-full focus:outline-none  border-b-[2px]"
            />
          </div>
          <div className="mt-[27px]">
            <label>Date of Birth</label>
            <input
              name="fullName"
              className="w-full focus:outline-none  border-b-[2px]"
            />
          </div>
          <div className="mt-[27px]">
            <label>Level of Study</label>
            <input
              name="fullName"
              className="w-full focus:outline-none border-b-[2px]"
            />
          </div>
          <div className="relative mt-10 cursor-pointer">
            <button
              type="submit"
              className="absolute  bg-green-Primary_1
              rounded-[50px] w-full h-[50px] 
              flex justify-center items-center
              text-white font-bold
               leading-[31.2px] text-[18px]"
            >
              {isLoading ? 'loading' : 'Sign up'}
            </button>
            <div className="z-20 mt-[5px] bg-green-Primary_2 rounded-[50px] w-full h-[50px]">
              {' '}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
