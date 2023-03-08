import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pokemon() {
  const params = useParams();

  const [pokemon, setPokemon] = useState(null);

  const upperCase = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  if (pokemon === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${params.id}.png`}
        alt="pokemon"
        objectFit="cover"
        mx="auto"
      ></Image>
      <Heading my="4" size="lg">
        {upperCase(pokemon.name)}
      </Heading>

      {pokemon.abilities.map(({ ability }) => (
        <Heading>{upperCase(ability.name)}</Heading>
      ))}

      {/* <pre>{JSON.stringify(pokemon, null, 2)}</pre> */}
    </>
  );
}

export default Pokemon;
