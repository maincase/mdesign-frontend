import React from "react";
import { Helmet } from "react-helmet";
import Content from "../../components/Content";
import Header from "../../components/Header";
import NewRender from "../../components/NewRender";
import StyleGallery from "../../components/StyleGallery";

import "./style/style.scss";

const Main = () => {
  return (
    <div>
      <Helmet>
        <title>Interior AI</title>
      </Helmet>
      <Header />
      <NewRender />
      <Content />
      <StyleGallery />
    </div>
  );
};

export default Main;
