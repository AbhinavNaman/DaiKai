import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
} from "@mantine/core";
import {
  IconReceiptOff,
  IconFlame,
  IconCircleDotted,
  IconFileCode,
  IconClockHour3,
  IconCalendarEvent,
  IconMapPinShare,
} from "@tabler/icons-react";
import classes from "./Info.module.css";

const features = [
  {
    icon: IconClockHour3,
    title: "Time",
    description:
      "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: IconCalendarEvent,
    title: "Date",
    description:
      "Build type safe applications, all components and hooks export types",
  },
  {
    icon: IconMapPinShare,
    title: "Place",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: IconFlame,
    title: "Flexible",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
];

function convertToISO(eventStartTime) {
  if (
    !eventStartTime ||
    typeof eventStartTime._seconds === "undefined" ||
    typeof eventStartTime._nanoseconds === "undefined"
  ) {
    console.error("Invalid eventStartTime:", eventStartTime);
    return "Invalid time";
  }

  const { _seconds, _nanoseconds } = eventStartTime;
  const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
  const date = new Date(milliseconds);
  return date.toISOString();
}

export function Info({ desc, time, college, loc }) {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon
          style={{ width: rem(26), height: rem(26) }}
          stroke={1.5}
        />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={`classes.title mb-4`} order={2}>
            Description
          </Title>
          <Text c="dimmed">{desc}</Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Get started
          </Button>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }} className="mt-16">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            <div>
              <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
              >
                <IconClockHour3
                  style={{ width: rem(26), height: rem(26) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Text fz="lg" mt="sm" fw={500}>
                {time ? convertToISO(time) : "No time available"}
              </Text>
            </div>
            <div>
              <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
              >
                <IconCalendarEvent
                  style={{ width: rem(26), height: rem(26) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Text fz="lg" mt="sm" fw={500}>
                {loc || "No location available"}
              </Text>
            </div>
            <div>
              <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: "blue", to: "cyan" }}
              >
                <IconMapPinShare
                  style={{ width: rem(26), height: rem(26) }}
                  stroke={1.5}
                />
              </ThemeIcon>
              <Text fz="lg" mt="sm" fw={500}>
                {college || "No college available"}
              </Text>
            </div>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
