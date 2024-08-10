import React from "react";
import MainLayout from "../../components/MainLayout";
import PopularProduct from "./Container/PopularProduct";
import ShortcutButtons from "./Container/ShortcutButtons";
import Categories from "./Container/Categories";
import Panel from "./Container/Panel";

const HomePage = () => {
  return (
    <MainLayout>
      <Panel></Panel>
      <ShortcutButtons></ShortcutButtons>
      <PopularProduct></PopularProduct>
      <Categories></Categories>
    </MainLayout>
  );
};

export default HomePage;
