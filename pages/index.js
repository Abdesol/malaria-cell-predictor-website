import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <div>
      <Head>
        <title>Malaria From Cell Predictor</title>
        <meta
          name="description"
          content="You can use this website to detect malaria from cell."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center px-6 md:px-20">
        <div className="font-quicksand text-3xl font-bold py-5">
          Malaria From Cell Predictor
        </div>

        <div className="font-quicksand text-[24px] font-[500] pb-5">
          Provide an image of the sample cell you want to check up on below and
          click "Predict" to see if the cell is holding malaria.
        </div>

        <div className="flex flex-col items-center py-5">
          <input
            clasName="btn"
            saccept=".png, .jpg"
            type="file"
            onChange={imageChange}
          />

          {selectedImage && (
            <div className="flex flex-col items-center">
              <div className="cursor-pointer relative m-4 h-[250px] w-[250px] md:h-[500px] md:w-[500px]">
                <Image src={URL.createObjectURL(selectedImage)} layout="fill" />
              </div>
              <button
                className="btn font-quicksand text-lg "
                onClick={removeSelectedImage}
              >
                Remove This Image
              </button>
            </div>
          )}
        </div>
        {selectedImage && (
          <div>
            <button
              className="btn font-quicksand text-lg"
              onClick={removeSelectedImage}
            >
              Predict
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}
