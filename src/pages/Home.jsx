import React, { useState, useEffect } from "react";
import { Hero } from "../components/Hero/Hero";
import { EventCard } from "../components/EventCard/EventCard";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Tabs } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { fetchUser } from "../store/atoms";
import axios from "axios";

const Home = () => {
  const user = useRecoilValue(fetchUser);
  const [technology, setTechnology] = useState([]);
  const [arts, setArts] = useState([]);
  const [dance, setDance] = useState([]);
  const [sports, setSports] = useState([]);
  const [collegeEvents, setCollegeEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedItem = localStorage.getItem("userid");
    const tok = localStorage.getItem("token");

    if (savedItem) {
      setUserId(savedItem);
    }
    if (tok) {
      setToken(tok);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("college", user.college);
  }, [user]);

  useEffect(() => {
    const fetchCollegeEvents = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const events = response.data;
        setCollegeEvents(events);

        // Categorize events based on tags
        const techEvents = [];
        const artEvents = [];
        const danceEvents = [];
        const sportEvents = [];

        events.forEach((event) => {
          if (event.tags.includes("technology")) {
            techEvents.push(event);
          }
          if (event.tags.includes("arts")) {
            artEvents.push(event);
          }
          if (event.tags.includes("dance")) {
            danceEvents.push(event);
          }
          if (event.tags.includes("sports")) {
            sportEvents.push(event);
          }
        });

        setTechnology(techEvents);
        setArts(artEvents);
        setDance(danceEvents);
        setSports(sportEvents);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchCollegeEvents();
    }
  }, [token]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col ml-20">
        <Navbar />
        {/* <Hero /> */}
        <SearchInput />

        <Tabs variant="pills" radius="md" defaultValue="All" className="m-10">
          <Tabs.List className="flex justify-center">
            <Tabs.Tab value="All">All</Tabs.Tab>
            <Tabs.Tab value="Tech">Tech</Tabs.Tab>
            <Tabs.Tab value="Art">Art</Tabs.Tab>
            <Tabs.Tab value="Dance">Dance</Tabs.Tab>
            <Tabs.Tab value="Esports">Esports</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="All">
            <EventCard data={collegeEvents} />
          </Tabs.Panel>
          <Tabs.Panel value="Tech">
            <EventCard data={technology} />
          </Tabs.Panel>

          <Tabs.Panel value="Art">
            <EventCard data={arts} />
          </Tabs.Panel>

          <Tabs.Panel value="Dance">
            <EventCard data={dance} />
          </Tabs.Panel>
          <Tabs.Panel value="Esports">
            <EventCard data={sports} />
          </Tabs.Panel>
        </Tabs>

        <Footer />
      </div>
    </>
  );
};

export default Home;
