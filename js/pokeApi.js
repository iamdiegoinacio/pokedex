const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.type = pokemon.types[0];
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon; 
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;  
  
  return fetch(url)
  .then((response) => response.json())
  .then((json) => json.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  .then((detailRequests) => Promise.all(detailRequests))
  .then((pokemonsDetails) => pokemonsDetails)
};


