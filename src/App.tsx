import React, { useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [photo, setPhoto] = useState("");

  return (
    <section className="h-full max-h-full flex flex-col">
      <Header />
      <Main photo={photo} />
      <Footer setPhotoHandler={setPhoto} />
    </section>
  );
};

export default App;
