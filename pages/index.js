import Head from "next/head";
import Image from "next/image";

export default function Home() {
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

      <div className="flex flex-col items-center px-5 md:px-20">
        <div className="font-quicksand text-3xl font-bold py-5">
          Malaria From Cell Predictor
        </div>

        <div className="font-quicksand text-[24px] font-[500] pb-5">
          Provide an image of the sample cell you want to check up on below and
          click "Predict" to see if the cell is holding malaria.
        </div>

        
      </div>
    </div>
  );
}
