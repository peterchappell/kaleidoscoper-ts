import React from "react";

type MainProps = {
  photo: string;
};

const Main: React.FC<MainProps> = ({ photo }: MainProps) => {
  return (
    <main className="flex justify-center items-center bg-green-800 flex-grow overflow-hidden">
      {photo && <img src={photo} alt="" />}
    </main>
  );
};

export default Main;
