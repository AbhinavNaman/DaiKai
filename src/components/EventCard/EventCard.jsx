import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import classes from "./EventCard.module.css";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchAllEventsSelector } from "../../store/atoms";
import { useEffect, useState } from "react";

export function EventCard({ data }) {
  console.log(data)
  // const allEvents = useRecoilValue(fetchAllEventsSelector);
  const [userid, setUserId] = useState(localStorage?.getItem("userid"))
  const [userData, setUserData] = useState();

  useEffect(()=>{
    setUserId(localStorage?.getItem("userid"))
  },[])

  useEffect(()=>{
    
  },[])



  return (
    <div className={classes.container}>
      {data?.map((event) => (
        <Link to={`usereventdetail/${event.uid}`}>
          <Card
            key={event.uid}
            withBorder
            radius="md"
            p="md"
            className={`${classes.card} shadow-xl`}
            style={{}}
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                alt={event.name}
                height={180}
              />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
              <Group justify="apart">
                <Text fz="lg" fw={500}>
                  {event.name}
                </Text>
                <Badge size="sm" variant="light">
                  {event.hostClub}
                </Badge>
              </Group>
              <Text fz="sm" mt="xs">
                {event.description}
              </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
              <Text mt="md" className={classes.label} c="dimmed">
                Tags
              </Text>
              <Group gap={7} mt={5}>
                {event?.tags?.map((tag) => (
                  <Badge key={tag} variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Card.Section>

            {/* <Group mt="xs">
            <Button radius="md" style={{ flex: 1 }}>
              <Link to={`usereventdetail/${event.uid}`}>Show details</Link>
            </Button>
          </Group> */}
          </Card>
        </Link>
      ))}
    </div>
  );
}
