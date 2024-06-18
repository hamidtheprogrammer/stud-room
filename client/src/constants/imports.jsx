import Header from "../components/shared/Header";
import Button from "../components/UI/Button";
import Nav from "../components/shared/Nav";
import Layout from "../components/Layout";
import Footer from "../components/shared/Footer";
import { NavItems } from ".";
import Register from "../pages/Register";
import Login from "../components/shared/Login";
import { registerApi } from "../api/ApiCalls";
import { useContext } from "react";
import { GlobalContext } from "../contextApi/GlobalState";

export {
  Header,
  Button,
  Nav,
  Layout,
  NavItems,
  Footer,
  Register,
  Login,
  registerApi,
  useContext,
  GlobalContext,
};
