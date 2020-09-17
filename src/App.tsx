import React, { useState, useEffect } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Error from "./components/Error";

const App: React.FC = () => {
  const [photoData, setPhotoData] = useState({
    src: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="h-full max-h-full flex flex-col">
      <Header />
      {isLoading && <Loading />}
      {isError && <Error />}
      <Main photoData={photoData} />
      <Footer
        setPhotoHandler={setPhotoData}
        setErrorHandler={setIsError}
        setIsLoadingHandler={setIsLoading}
      />
    </section>
  );
};

export default App;
