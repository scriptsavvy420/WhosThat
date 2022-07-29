export const fetchPokemonData = async (randomId) => {
  const randomPokemonFetchUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const resp = await fetch(randomPokemonFetchUrl);
  const pokemonData = await resp.json();
  return pokemonData;
};

export const fetchPokemonOption = async (offsetNum) => {
  const pokemonOptUrl = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offsetNum}`;
  const resp = await fetch(pokemonOptUrl);
  const options = await resp.json();
  return options;
};
