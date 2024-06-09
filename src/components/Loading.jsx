import { BackgroundImage, Center, Text, Box } from '@mantine/core';

export function Loading() {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://memetemplate.in/uploads/1640209279.jpeg"
        radius="xs"
      >
        <Center p="md">
          <Text c="white">
            L O A D I N G 
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}