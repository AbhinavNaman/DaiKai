import React, { useEffect, useState } from "react";
import { Info } from "./Info/Info";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Text,
  Progress,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./ProgressCardColored.module.css";
import Theme from "./theme/Theme";

const UserEventDetails = () => {
  const { eventid } = useParams();
  const [eventData, setEventData] = useState({
    name: "",
    hostClub: "",
    description: "",
    location: "",
    form: [],
    registrationStartTime: "",
    registrationEndTime: "",
    eventStartTime: "",
    eventEndTime: "",
    tags: [""],
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      formResponse:[],
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  useEffect(() => {
    const storedToken = localStorage?.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log("Event ID from useParams:", eventid);
    const fetchEvent = async () => {
      if (token && eventid) {
        try {
          const response = await axios.get(
            `https://us-central1-my-project-fd5eb.cloudfunctions.net/getEventsFunction?eventId=${eventid}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setEventData(response.data);
          console.log("Event data fetched:", response.data);
        } catch (error) {
          console.log("Error fetching event data:", error);
        }
      }
    };
    fetchEvent();
    setLoading(false);
  }, [token, eventid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://us-central1-my-project-fd5eb.cloudfunctions.net/handleEventRegistrationFunction",
        { userId: localStorage.getItem('userid'), eventId: eventid, formResponse: [] },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          },
        }
      );
      console.log(response.data);
      // Optionally, reset the form after successful submission
      form.reset();
      
      if (response.status === 200) {
        alert("Registration successful!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col ml-20">
        <Navbar />
        <div className="flex flex-col m-10">
          <div className="flex flex-row gap-8 ">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                alt="event banner"
                className="rounded-xl"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="font-bold text-2xl ">
                {eventData.name || "Event Title will be displayed here"}
              </h1>
              <Button
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
                size="lg"
                radius="md"
                mt="xl"
                onClick={() =>
                  document
                    .getElementById("form")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Register
              </Button>
              <Card withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
                  Total Registrations
                </Text>
                <Text fz="lg" fw={500} className={classes.stats}>
                  {eventData.registrations || 0} / {eventData.capacity || 100}
                </Text>
                <Progress
                  value={(eventData.registrations / eventData.capacity) * 100}
                  mt="md"
                  size="lg"
                  radius="xl"
                  classNames={{
                    root: classes.progressTrack,
                    section: classes.progressSection,
                  }}
                />
              </Card>
            </div>
          </div>

          <div className="mt-20">
            <Info
              desc={eventData.description}
              time={eventData.eventStartTime}
              college={eventData.college}
              loc={eventData.location}
            />
          </div>

          <div>
            <Theme tags={eventData.tags} />
          </div>

          {/* form */}
          <div id="form">
            <form onSubmit={handleSubmit}>
              <Title
                order={2}
                size="h1"
                style={{
                  fontFamily: "Greycliff CF, var(--mantine-font-family)",
                }}
                fw={900}
                ta="center"
              >
                Register
              </Title>

              <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  name="name"
                  variant="filled"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="Your email"
                  name="email"
                  variant="filled"
                  {...form.getInputProps("email")}
                />
              </SimpleGrid>
              {/* <TextInput
                label="Subject"
                placeholder="Subject"
                mt="md"
                name="subject"
                variant="filled"
                {...form.getInputProps("subject")}
              />
              <Textarea
                mt="md"
                label="Message"
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="message"
                variant="filled"
                {...form.getInputProps("message")}
              /> */}

              <Group justify="center" mt="xl">
                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ deg: 133, from: "blue", to: "cyan" }}
                  size="lg"
                  radius="md"
                  mt="xl"
                >
                  Register
                </Button>
              </Group>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserEventDetails;
