import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [pokemons, setPokemons] = useState([]);

  const pokemonId = (url) => {
    const parts = url.split("/");
    return parts.at(-2);
  };

  const upperCase = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/pokemon");
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  return (
    <Flex gap="10" justify="center" wrap="wrap" mt="8" cursor="pointer">
      {pokemons.map((pokemon) => (
        <Box
          maxW="420px"
          bg="white"
          p="4"
          borderWidth="1px"
          borderRadius="lg"
          onClick={handleClick}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId(
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
      ))}

      {/* <pre>{JSON.stringify(pokemons, null, 2)}</pre> */}
    </Flex>
  );
}

export default App;
