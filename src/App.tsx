import React, { useState } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Error from "./components/Error";

import useRandomPhotoOnLoad from "./hooks/useRandomPhotoOnLoad";

const App: React.FC = () => {
  const [photoData, setPhotoData] = useState({
    src: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useRandomPhotoOnLoad(setPhotoData, setIsError, setIsLoading);

  return (
    <section className="h-full max-h-full flex flex-col">
      <Header />
      {isLoading && <Loading />}
      {isError && <Error />}
      <Main photoData={photoData} isLoading={isLoading} />
      <Footer
        setPhotoHandler={setPhotoData}
        setErrorHandler={setIsError}
        setIsLoadingHandler={setIsLoading}
      />
    </section>
  );
};

export default App;
