import Header from "../shared/widgets/Header";
import GameScreen from "./GameScreen";
import Footer from "../shared/widgets/Footer";
import { useState } from "react";
import About from "./About";

const Home = ({ setToken, socket }) => {
  const [home, setHome] = useState(true);
  const [about, setAbout] = useState(false);
  return (
    <>
      {home && (
        <>
          <Header setToken={setToken} setHome={setHome} setAbout={setAbout} />
          <GameScreen setToken={setToken} socket={socket} />
          <Footer />
        </>
      )}
      {about && (
        <>
          <Header setToken={setToken} setHome={setHome} setAbout={setAbout} />
          <About />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
