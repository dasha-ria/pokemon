import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonIdFromUrl } from "./getPokemonIdFromUrl";
import { upperCase } from "./upperCase";

function Color() {
  const params = useParams();
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-color/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPokemons(data));
  }, []);

  if (pokemons === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Flex gap="10" justify="center" wrap="wrap" mt="8">
        {pokemons.pokemon_species.map((pokemon) => (
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
      </Flex>

      <pre>{JSON.stringify(pokemons, null, 2)}</pre>
    </>
  );
}

export default Color;
