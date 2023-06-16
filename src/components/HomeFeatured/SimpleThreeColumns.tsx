import { ReactElement } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FaUser, FaGamepad, FaTruck } from "react-icons/fa";
import NumberCounter from "../NumberCounter/NumberCounter";
import useGetStats from "@/requests/user/hooks/useGetStats";
import { Heading } from "@chakra-ui/react";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
  stat?: number;
}

const Feature = ({ title, text, icon, stat }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Heading size={"lg"}>{title}</Heading>
      <Text color={"gray.600"}>{text}</Text>
      {stat && (
        <Heading color="black" fontSize={"2xl"}>
          <NumberCounter duration={2} from={0} to={stat}></NumberCounter>+
        </Heading>
      )}
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  const { data } = useGetStats();
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {data && (
          <>
            <Feature
              icon={<Icon as={FaUser} w={10} h={10} color={"black"} />}
              title={"Users"}
              text={
                "Join our passionate gaming community, where millions unite. Collaborate, conquer challenges, and forge lasting friendships in our thriving online realm."
              }
              stat={data.userCount}
            />
            <Feature
              icon={<Icon as={FaGamepad} color={"black"} w={10} h={10} />}
              title={"Games"}
              text={
                "Embark on thrilling adventures across a vast collection. Explore diverse genres, boundless worlds, and countless gaming possibilities with your friends."
              }
              stat={data.gameCount}
            />
            <Feature
              icon={<Icon as={FaTruck} color={"black"} w={10} h={10} />}
              title={"Orders"}
              text={
                "Experience seamless ordering with lightning-fast delivery. Trust in our efficient system as we process and fulfill orders promptly, bringing gaming treasures to your doorstep!"
              }
              stat={data.orderCount}
            />{" "}
          </>
        )}
      </SimpleGrid>
    </Box>
  );
}
