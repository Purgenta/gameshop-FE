"use client";
import React from "react";
import CaptionCarousel from "@/components/Slider/Slider";
import useFeaturedGames from "@/requests/game/hooks/useFeaturedGames";
import {
  Flex,
  AspectRatio,
  Box,
  Heading,
  Text,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import SimpleThreeColumns from "@/components/HomeFeatured/SimpleThreeColumns";
const Home = () => {
  const { data } = useFeaturedGames();
  return (
    <Flex direction={"column"} gap={"3rem"}>
      {data && (
        <Flex justifyContent={"center"}>
          <CaptionCarousel
            cards={data.map((featured) => {
              return {
                image: featured.banner,
                text: featured.text,
                title: featured.game.title,
              };
            })}
          ></CaptionCarousel>
        </Flex>
      )}
      <SimpleThreeColumns></SimpleThreeColumns>
      <SimpleGrid
        padding={"1rem"}
        justifyContent={"center"}
        gap={"1rem"}
        minChildWidth={"500px"}
        alignItems={"center"}
      >
        <Flex display={"flex"} justifyContent={"center"}>
          <AspectRatio flexGrow={1} ratio={16 / 9} maxW="650px">
            <iframe
              title="naruto"
              src={"https://www.youtube.com/embed/AV7XbY5XDFU"}
              allowFullScreen
            />
          </AspectRatio>
        </Flex>
        <Box padding={"0.5rem"}>
          <Heading size={"lg"} marginBottom={"5"}>
            Win a trip to Hogwarts
          </Heading>
          <Text _firstLetter={{ fontSize: "2rem" }}>
            Experience the enchantment of a lifetime with a fully paid trip to
            Hogwarts! Immerse yourself in the captivating world of witchcraft
            and wizardry as you reside in the legendary Hogwarts Castle, attend
            magical classes taught by esteemed professors, engage in thrilling
            activities like Quidditch matches and forest explorations, savor
            delightful feasts in the Great Hall, and create everlasting memories
            captured by our complimentary photo package. Pack your bags, embrace
            the magic, and prepare for an unforgettable adventure at Hogwarts
            School of Witchcraft and Wizardry.
          </Text>
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
