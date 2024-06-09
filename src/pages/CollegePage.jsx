import React, { useState, useEffect } from "react";
import { ClubThumbNail } from "../components/ClubThumbNail/ClubThumbNail";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { Footer } from "../components/Footer/Footer";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navbar } from "../components/Navbar/Navbar";
import { Tabs } from "@mantine/core";
import axios from "axios";

const CollegePage = () => {
  const [allClubs, setAllClubs] = useState([{}]);
  const [yourClubs, setYourClubs] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // clubs
  const [tech, setTechnology] = useState([]);
  const [art, setArts] = useState([]);
  const [dance, setDance] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const savedItem = localStorage.getItem("userid");
    const tok = localStorage.getItem("token");
    if (savedItem) setUserId(savedItem);
    if (tok) setToken(tok);
  }, []);

  useEffect(() => {
    const fetchAllClubs = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-my-project-fd5eb.cloudfunctions.net/getClubFunction`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const clubs = response.data;
        setAllClubs(clubs);
  
        // Categorize events based on tags
        const techClubs = [];
        const artClubs = [];
        const danceClubs = [];
        const sportClubs = [];
  
        clubs.forEach((club) => {
          if (club.tags && club.tags.includes("technology")) {
            techClubs.push(club);
          }
          if (club.tags && club.tags.includes("arts")) {
            artClubs.push(club);
          }
          if (club.tags && club.tags.includes("dance")) {
            danceClubs.push(club);
          }
          if (club.tags && club.tags.includes("sports")) {
            sportClubs.push(club);
          }
        });
  
        setTechnology(techClubs);
        setArts(artClubs);
        setDance(danceClubs);
        setSports(sportClubs);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (token) {
      fetchAllClubs();
    }
  }, [token]);
  

  return (
    <>
      <Sidebar />
      <div className="flex flex-col ml-20">
        <Navbar />
        {/* <Hero /> */}
        <SearchInput />
        <div className="flex flex-col gap-6">
          <Tabs variant="pills" radius="md" defaultValue="All" className="m-10">
            <Tabs.List
              className="flex justify-center"
              style={{ marginBottom: "20px" }}
            >
              <Tabs.Tab value="All">All</Tabs.Tab>
              <Tabs.Tab value="Tech">Tech</Tabs.Tab>
              <Tabs.Tab value="Art">Art</Tabs.Tab>
              <Tabs.Tab value="Dance">Dance</Tabs.Tab>
              <Tabs.Tab value="Esports">Esports</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="All">
              <div className="flex flex-wrap gap-6">
                {allClubs.map((data,index) => {
                  return <ClubThumbNail key={index}  data={data}/>;
                })}
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="Tech">
              <div className="flex flex-wrap gap-6">
                {tech.map((data,index) => {
                  return <ClubThumbNail key={index} data={data}/>;
                })}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="Art">
              <div className="flex flex-wrap gap-6">
                {art.map((data,index) => {
                  return <ClubThumbNail key={index}  data={data}/>;
                })}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="Dance">
              <div className="flex flex-wrap gap-6">
                {dance.map((data,index) => {
                  return <ClubThumbNail key={index}  data={data}/>;
                })}
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="Esports">
              <div className="flex flex-wrap gap-6">
                {sports.map((data,index) => {
                  return <ClubThumbNail key={index}  data={data}/>;
                })}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CollegePage;
