const offset = 0;
const limit = 10;
const API_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToHTMLLi(pokemon) {
  return `
      <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            <li class="type">grass</li>
            <li class="type">poison</li>
          </ol>
          <img src="" alt="${pokemon.name}">
        </div>
      </li>
    `
}

fetch(API_URL)
  .then(response => response.json())
  .then(jsonBody => jsonBody.results)
  .then((pokemonList) => {
    for(let i=0; i < pokemonList.length; i++) {
      const pokemon = pokemonList[i];
      const pokemonOl = document.getElementById('pokemonList');
      pokemonOl.innerHTML += convertPokemonToHTMLLi(pokemon);
    }
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Requisição concluída!');
  })