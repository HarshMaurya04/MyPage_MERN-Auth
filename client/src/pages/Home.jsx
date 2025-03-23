import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className='flex flex-col item-center justify-center min-h-screen bg-gradient-to-tl from-gray-900 via-blue-700 to-gray-950'>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
