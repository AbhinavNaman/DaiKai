import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Text,
  Paper,
  Tabs,
  Button,
  Modal,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { EventCard } from "../EventCard/EventCard";
import { Form } from "../Form/Form";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useDisclosure } from "@mantine/hooks";
import { Form2 } from "../Form/Form2";
import EventCalendar from "../EventCalendar";
import { useState, useEffect } from "react";

import { useRecoilValue } from "recoil";
import { fetchAllEventsSelector, fetchUser } from "../../store/atoms";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClubReport from "../ClubReport";

const ClubDashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = { width: rem(12), height: rem(12) };
  const [userId, setUserId] = useState(null);
  const [collegeName, setCollegeName] = useState(null);
  const [token, setToken] = useState(null);
  const [collegeEvents, setCollegeEvents] = useState([]);
  const [isClub, setIsClub] = useState("");
  const { clubid } = useParams();
  const [club, setClub] = useState({});
  const [eventData, setEventsData] = useState([]);
  console.log(clubid);

  const fetchCollegeEvents = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction?college=${collegeName}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setCollegeEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClubDetails = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/getClubFunction?clubId=${
          isClub || clubid
        }`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(response.data);
      setClub(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("club:", club);
  console.log("club pfp:", club?.profilePicture);
  console.log("club uid:", club?.uid);

  useEffect(() => {
    const savedItem = localStorage?.getItem("userid");
    const tok = localStorage?.getItem("token");
    const college = localStorage?.getItem("college");
    const isClubAvail = localStorage?.getItem("clubAdminId");
    if (savedItem) setUserId(savedItem);
    if (tok) setToken(tok);
    if (college) setCollegeName(college);
    if (isClubAvail) setIsClub(isClubAvail ? isClubAvail : paramClubId);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCollegeEvents();
    }
    if (isClub || clubid) {
      fetchClubDetails();
    }
  }, [token, isClub]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (club?.uid) {
        try {
          const res = await axios.get(
            `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction?clubId=${club?.uid}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("*************", res);
          setEventsData(res.data);
        } catch (error) {
          console.log("Error fetching event data:", error);
        }
      }
    };
    fetchEvents();
  }, [club?.uid, token]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col ml-20">
        <Navbar />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 m-10 justify-between">
            <img
              // club?.profilePicture ||
              src={
                "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
              }
              alt="club dp"
              className="rounded-xl"
            />

            <div className="flex flex-col">
              <h1 className="font-bold text-2xl ">{club?.name}</h1>

              {club && (
                <>
                  <Paper withBorder radius="md" p="xs">
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Total Events:
                    </Text>
                    <Text fw={700} size="xl">
                      {club?.events?.length}
                    </Text>
                  </Paper>

                  <Paper withBorder radius="md" p="xs">
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Total Members:
                    </Text>
                    <Text fw={700} size="xl">
                      {club?.memberCount}
                    </Text>
                  </Paper>
                </>
              )}
              {isClub && (
                <Button
                  variant="gradient"
                  gradient={{ deg: 133, from: "blue", to: "cyan" }}
                  size="lg"
                  radius="md"
                  mt="xl"
                  onClick={open}
                >
                  Create Event
                </Button>
              )}
            </div>
            {/* {isClub && <EventCalendar />} */}
            <EventCalendar />
          </div>

          {/* tabs */}
          <div className="m-10 ">
            <h1 className="font-bold text-2xl mb-10">All Events</h1>
            <Tabs
              variant="outline"
              orientation="vertical"
              defaultValue="Upcoming"
            >
              <Tabs.List>
                <Tabs.Tab
                  value="Upcoming"
                  leftSection={<IconMessageCircle style={iconStyle} />}
                >
                  <h1 className="font-bold text-xl ">Upcoming</h1>
                </Tabs.Tab>
                <Tabs.Tab
                  value="Past events"
                  leftSection={<IconSettings style={iconStyle} />}
                >
                  <h1 className="font-bold text-xl ">Past events</h1>
                </Tabs.Tab>
              </Tabs.List>
              {eventData && (
                <Tabs.Panel value="Upcoming">
                  <EventCard data={eventData} />
                </Tabs.Panel>
              )}

              {eventData.length > 0 ? (
                <Tabs.Panel value="Past events">
                  <EventCard data={eventData} />
                </Tabs.Panel>
              ) : (
                <p>Loading</p>
              )}
            </Tabs>
          </div>

         {eventData && <div><ClubReport events={eventData}/></div>} 

          {/* <div id="form">
            <Form />
          </div> */}
          {isClub && (
            <Modal
              opened={opened}
              onClose={close}
              size="100%"
              title="Create event"
            >
              <Form2 />
            </Modal>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ClubDashboard;
