const pokeAPI = {};

function convertPokemonAPIDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.baseExp = pokeDetail.base_experience;

  const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
  const [ability] = abilities

  pokemon.abilities = abilities;
  pokemon.ability = ability;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)
  const [move] = moves

  pokemon.moves = moves
  pokemon.move = move

  const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
  const [stat] = stats

  pokemon.stats = stats
  pokemon.stat = stat

  return pokemon
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
