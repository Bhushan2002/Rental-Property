import React from 'react';
import Lottie from 'lottie-react';
import animationData from "../lib/assets/loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={animationData} loop={true} className="w-36 h-36" />
    </div>
  );
};

export default Loading;
