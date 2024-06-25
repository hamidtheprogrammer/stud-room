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
import Home from "../pages/Home";
import PostAd from "../pages/PostAd";
import ManageRoomForm from "../forms/manageRoomForms/ManageRoomForm";
import RoomDetailsSection from "../forms/manageRoomForms/RoomDetailsSection";
import RoomTypeprice from "../forms/manageRoomForms/Room-Type-price";
import RoomTerm from "../forms/manageRoomForms/RoomTerm";
import Extras from "../forms/manageRoomForms/Extras";
import Images from "../forms/manageRoomForms/Images";
import ImageUrl from "../forms/manageRoomForms/ImageUrl";
import MyRooms from "../pages/MyRooms";
import MyRoomDetails from "../pages/MyRoomDetails";

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
  Home,
  PostAd,
  ManageRoomForm,
  RoomDetailsSection,
  RoomTypeprice,
  RoomTerm,
  Extras,
  Images,
  ImageUrl,
  MyRooms,
  MyRoomDetails,
};
