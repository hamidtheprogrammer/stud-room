import React from "react";
import { Route, Routes } from "react-router";
import {
  Header,
  Home,
  Layout,
  Register,
  PostAd,
  MyRooms,
  MyRoomDetails,
} from "./constants/imports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <section className="wrapper mx-auto">
      <ToastContainer autoClose={4000} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>
        <Route
          path="/postad"
          element={
            <Layout>
              <PostAd />
            </Layout>
          }
        ></Route>
        <Route
          path="/my-rooms"
          element={
            <Layout>
              <MyRooms />
            </Layout>
          }
        ></Route>
        <Route
          path="/my-rooms/:id"
          element={
            <Layout>
              <MyRoomDetails />
            </Layout>
          }
        ></Route>
      </Routes>
    </section>
  );
};

export default App;
