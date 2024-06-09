import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Text,
  Paper,
  Tabs,
  Button,
} from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { EventCard } from "../components/EventCard/EventCard";
import { AllClubsTable } from "../components/AllClubsTable";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [userid, setUserid] = useState(localStorage?.getItem("userid"));
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [userData, setUserData] = useState();
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    setUserid(localStorage?.getItem("userid"));
    setToken(localStorage?.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userid) {
        try {
          const response = await axios.get(
            `https://us-central1-my-project-fd5eb.cloudfunctions.net/getUserFunction?userId=${userid}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(response.data);
          console.log("user data fetched:", response.data);

          // Fetch data for all events registered by the user
          if (response.data?.eventsRegistered?.length > 0) {
            const eventsDataPromises = response.data.eventsRegistered.map(
              async (eventId) => {
                try {
                  const eventData = await axios.get(
                    `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction?eventId=${eventId}`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  return eventData.data;
                } catch (error) {
                  console.log("Error fetching event data:", error);
                  return null;
                }
              }
            );

            // Wait for all promises to resolve and set eventsData state
            Promise.all(eventsDataPromises).then((events) => {
              setEventsData(events.filter((event) => event !== null));
            });
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [userid, token]);

  console.log(userData);
  console.log(eventsData);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col ml-20">
        <Navbar />
        <div className="flex flex-col gap-4">
          <Container my="md" className="">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <img
                src={
                  userData?.profilePicture ||
                  "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                }
                alt="club dp"
                className="rounded-xl"
              />
              <Grid gutter="md">
                <Grid.Col>
                  <h1 className="font-bold text-2xl ">
                    {userData?.firstName} {userData?.lastName}
                  </h1>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper withBorder radius="md" p="xs">
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      Total Events:
                    </Text>
                    <Text fw={700} size="xl">
                      12
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper withBorder radius="md" p="xs">
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      College:
                    </Text>
                    <Text fw={700} size="xl">
                      {userData?.college}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper withBorder radius="md" p="xs">
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                      interests:
                    </Text>
                    {userData?.interests?.map((interest, index) => (
                      <Text fw={700} size="xl" key={index}>
                        {interest}
                      </Text>
                    ))}
                  </Paper>
                </Grid.Col>
                <Grid.Col>
                  <Button
                    variant="gradient"
                    gradient={{ deg: 133, from: "blue", to: "cyan" }}
                    size="lg"
                    radius="md"
                    mt="xl"
                    onClick={() =>
                      document
                        .getElementById("club")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Show Followed Clubs
                  </Button>
                </Grid.Col>
              </Grid>
            </SimpleGrid>
          </Container>

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

              {eventsData && (
                <Tabs.Panel value="Upcoming">
                  <EventCard data={eventsData} />
                </Tabs.Panel>
              )}

              {eventsData && (
                <Tabs.Panel value="Past events">
                  <EventCard data={eventsData} />
                </Tabs.Panel>
              )}
            </Tabs>
          </div>

          <div id="club" className="p-10 m-10">
            <p className="font-bold text-2xl">All the clubs</p>
            <AllClubsTable data={userData?.clubsFollowed} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
