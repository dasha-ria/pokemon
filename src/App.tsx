import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonIdFromUrl } from "./getPokemonIdFromUrl";
import { usePokemons } from "./hooks/pokemon";
import { upperCase } from "./upperCase";

function App() {
  const { data: pokemons } = usePokemons();

  return (
    <Flex gap="10" justify="center" wrap="wrap" mt="8">
      {pokemons.map((pokemon) => (
        <Link to={`/pokemon/${getPokemonIdFromUrl(pokemon.url)}`}>
          <Box
            maxW="420px"
            bg="white"
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            cursor="pointer"
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPokemonIdFromUrl(
                pokemon.url
              )}.png`}
              alt="pokemon"
              objectFit="cover"
              mx="auto"
            ></Image>
            <Heading my="4" size="lg">
              {upperCase(pokemon.name)}
            </Heading>
          </Box>
        </Link>
      ))}

      {/* <pre>{JSON.stringify(pokemons, null, 2)}</pre> */}
    </Flex>
  );
}

export default App;
