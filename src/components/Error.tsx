import React from "react";

const Error: React.FC = () => (
  <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center z-50 pointer-events-none text-center">
    <div className="max-w-md p-8 rounded bg-black bg-opacity-75">
      <h2 className="text-2xl">Uh oh...</h2>
      <p>There was a problem loading the image.</p>
      <p>Please try again.</p>
    </div>
  </div>
);

export default Error;
