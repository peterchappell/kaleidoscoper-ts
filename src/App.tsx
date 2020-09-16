import React, { useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [photoData, setPhotoData] = useState({
    src: "",
  });

  return (
    <section className="h-full max-h-full flex flex-col">
      <Header />
      <Main photoData={photoData} />
      <Footer setPhotoHandler={setPhotoData} />
    </section>
  );
};

export default App;
