import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./contexts/MainContext";
import Gallery from "./gallery/Gallery";
import Posts from "./posts/Posts";
import style from "./style.module.css";
import Todos from "./todos/Todos";
import Users from "./users/Users";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./users/CreateUser";
const Content = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);

  const [size, setsize] = useState();

  const handleShowMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  // useEffect(() => {
  //   const handelSize = () => {
  //     let f = window.innerWidth;
  //     setsize(f);
  //     console.log(size);
  //   };

  //   window.addEventListener("resize", handelSize);
  // });

  return (
    <div
      className={showMenu ? style.content_section : style.content_sectionwidth}
    >
      <i
        className={`${style.menu_button} fas fa-bars text-dark m-2 pointer`}
        onClick={handleShowMenu}
      ></i>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Todos" element={<Todos />} />
        <Route path="/User/Create" element={<CreateUser />}>
          <Route path=":userId" />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
