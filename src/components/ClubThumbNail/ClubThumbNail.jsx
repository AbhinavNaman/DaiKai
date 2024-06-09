import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import { Card, Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import classes from "./ClubThumbNail.module.css";
import { Link, useParams } from "react-router-dom";

export function ClubThumbNail({data}) {
    console.log(data);
  const theme = useMantineTheme();
  const clubid = useParams("clubid");
//   console.log(clubid);
  return (
    <Link to={`/club/details/${data?.id}`}>
      <Card p="lg" shadow="lg" className={classes.card} radius="md">
        <div
          className={classes.image}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} fw={500}>
              {data.name}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {data.description}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
