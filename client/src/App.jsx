import React from "react";
import { Route, Routes } from "react-router";
import { Header, Layout, Register } from "./constants/imports";

const App = () => {
  return (
    <section className="wrapper mx-auto">
      <Routes>
        <Route path="/" element={<Layout></Layout>}></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>
      </Routes>
    </section>
  );
};

export default App;
