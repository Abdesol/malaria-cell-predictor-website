import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState();
  const [output, setOutput] = useState("");

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const predictClicked = async () => {
    setOutput("Predicting...");
    const img = document.getElementById("file_input").files[0];
    const formData = new FormData();
    formData.append("image", img);
    await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        res.json().then((res) => {
          setOutput(
            `The cell image ${
              res.probability * 100
            }% likely contains malaria parasites.`
          );
        });
      })
      .catch((err) => {
        setOutput("Error occured while trying to predict!");
      });
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

        <div className="font-quicksand text-xl font-[500] pb-5">
          Provide an image of the sample cell you want to check up on below and
          click "Predict" to see if the cell is holding malaria.
        </div>

        <div className="flex flex-col items-center py-5">
          <label
            className="block mb-2 text-lg font-medium font-quicksand text-gray-900"
            htmlFor="file_input"
          >
            Upload Image
          </label>
          <input
            className="block w-full text-lg text-gray-900 font-quicksand bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none"
            id="file_input"
            saccept=".png, .jpg"
            type="file"
            onChange={imageChange}
          />

          {selectedImage && (
            <div className="flex flex-col items-center">
              <div className="cursor-pointer relative m-4 h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                  layout="fill"
                />
              </div>
            </div>
          )}
        </div>
        {selectedImage && (
          <div className="flex flex-col items-center">
            <button
              className="btn font-quicksand text-lg"
              onClick={predictClicked}
            >
              Predict
            </button>
          </div>
        )}
      </div>
      <div className="font-quicksand text-xl font-semibold py-5 text-center">
        {output.toString()}
      </div>
      <div className="text-xl font-quicksand font-semibold my-10 text-center">
        Made by
        <a
          href="https://ethioai.vercel.app/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-500"
        >
          {" "}
          EthioAI
        </a>
      </div>
    </div>
  );
}
