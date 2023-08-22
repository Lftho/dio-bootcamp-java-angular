const pokeAPI = {};

convertPokemonAPIDetailToPokemon = (pokeDetail) => {
const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types; //destruction

  pokemon.types = types
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemonAPIDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(API_URL)
  .then(response => response.json())
  .then(jsonBody => jsonBody.results)
  .then(pokemons => pokemons.map(pokeAPI.getPokemonDetail))
  .then((detailRequests) => Promise.all(detailRequests))
  .then((pokemonsDetail) => pokemonsDetail)
  .catch(error => console.error(error) )
  .finally(() => console.log('Requisição concluída!'))
}
