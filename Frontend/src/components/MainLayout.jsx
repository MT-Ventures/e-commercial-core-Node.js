import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
