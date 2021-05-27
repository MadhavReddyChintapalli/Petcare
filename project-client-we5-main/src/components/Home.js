import SideBar from "./SideBar";
import Sale from "./Sale";
import Feed from "./Feed";
import Service from "./Service";
import Events from "./Events";
import LostAndFound from "./LostAndFound";
import Trainings from "./Trainings";
import Stores from "./Stores";
import MyPosts from "./MyPosts";
import Saved from "./Saved";
import Users from "./Users";
import { Router } from "@reach/router";
import FeedForm from "./feed-form";
import ServiceForm from "./service-form";
import Tutorial from './Tutorial'
import EventsForm from './event-form'
import SaleForm from './SaleForm'

const Home = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <div className='main-side-container'>
      <SideBar />
      <div className='main-content'>
        <Router>
          <Sale path="/sales" />
          <Service path="/service" />
          <Events path="/events/*" />
          <LostAndFound path="/lost-and-found" />
          <Trainings path="/trainings" />
          <Stores path="/stores" />
          <MyPosts path="/my-posts" />
          <Saved path="/saved" />
          {isAdmin === "true" && <Users path="/users" />}
          <Feed path="/" />
          <FeedForm path="/feed-form/*" />
          <SaleForm path="/sale-form/*" />
          <ServiceForm path="/service-form/*" />
          <Tutorial path="/tutorials" />
          <EventsForm path="/event-form/*" />
        </Router>
      </div>
    </div>
  )
}

export default Home
