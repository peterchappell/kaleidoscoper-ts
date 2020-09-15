import React from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <section className="h-full flex flex-col">
      <Header />
      <Main />
      <Footer />
    </section>
  );
};

export default App;
