import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemon } from "./hooks/pokemon";
import { upperCase } from "./upperCase";

function Pokemon() {
  const params = useParams();

  const { data: pokemon, status: pokemonStatus } = usePokemon(params.id);

  //   const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  //   const [char, setChar] = useState(null);

  //   useEffect(() => {
  //     fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  //       .then((response) => response.json())
  //       .then((data) => setPokemon(data));
  //   }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
      .then((response) => response.json())
      .then((data) => setSpecies(data));
  }, []);

  //   useEffect(() => {
  //     fetch(`https://pokeapi.co/api/v2/characteristic/${params.id}`)
  //       .then((response) => response.json())
  //       .then((data) => setChar(data));
  //   }, []);

  if (pokemonStatus === "loading") {
    return <p>Loading</p>;
  }
  if (species === null) {
    return <p>Loading</p>;
  }

  //   if (char === null) {
  //     return <p>Loading</p>;
  //   }

  return (
    <>
      <Flex
        align="center"
        wrap="wrap"
        justify="center"
        gap="24"
        width="100vw"
        height="100vh"
      >
        <Flex direction="column" align="center">
          <Box bg="white" p="4" borderWidth="1px" borderRadius="lg">
            <Image
              maxW="400px"
              maxH="400px"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${params.id}.png`}
              alt="pokemon"
              objectFit="cover"
              mx="auto"
            ></Image>
          </Box>
          <Heading my="4" size="lg">
            {upperCase(pokemon.name)}
          </Heading>
        </Flex>

        <Flex direction="column">
          <Heading size="md" mb="1">
            Abilities
          </Heading>
          {pokemon.abilities.map(({ ability }) => (
            <Text size="sm" p="0" key={ability.name}>
              {upperCase(ability.name)}
            </Text>
          ))}

          <Heading size="md" mb="1">
            Color
          </Heading>

          <Link to={`/color/${species.color.name}`}>
            <Text size="sm" p="0">
              {upperCase(species.color.name)}
            </Text>
          </Link>

          {/* <Heading size="md" mb="1">
            Characteristic
          </Heading> */}
          {/* {char.descriptions
            .filter((d) => d.language.name === "en")
            .map(({ description }) => (
              <Text size="sm" p="0">
                {upperCase(description)}
              </Text>
            ))} */}
        </Flex>
      </Flex>

      {/* <pre>{JSON.stringify(char, null, 2)}</pre> */}
    </>
  );
}

export default Pokemon;
