import React from "react";

const Loading: React.FC = () => (
  <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center z-50">
    <div className="h-8 w-8 animate-spin border-4 border-white border-solid absolute transform rotate-90 opacity-75" />
    <div className="h-8 w-8 animate-spin border-4 border-white border-solid absolute transform -rotate-180 opacity-75" />
    <div className="h-24 w-24 animate-spin border-4 border-white border-solid absolute transform rotate-90 opacity-75" />
    <div className="h-24 w-24 animate-spin border-4 border-white border-solid absolute transform -rotate-180 opacity-75" />
    <div className="h-16 w-16 animate-spin border-4 border-white border-solid absolute transform rotate-180 opacity-75" />
    <div className="h-16 w-16 animate-spin border-4 border-white border-solid absolute transform -rotate-90 opacity-75" />
  </div>
);

export default Loading;
