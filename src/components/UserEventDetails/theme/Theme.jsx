import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Theme.module.css";

const mockdata = [
  {
    title: "ARVR",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
  },
  {
    title: "AIML",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
  },
  {
    title: "Cyber Sec",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    title: "Blockchain",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    title: "Game Dev",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
];

const Theme = ({ tags }) => {
  const theme = useMantineTheme();
  console.log("themeTags", tags);
  const features = tags.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature}
      </Text>
      {/* <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text> */}
    </Card>
  ));

  return (
    <Container size="lg" py="xl" className="mt-20 mb-20">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Theme
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Theme;
