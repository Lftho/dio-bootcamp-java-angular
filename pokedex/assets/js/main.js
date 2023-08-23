const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let modal = document.querySelector('.modal');
let infoDetails = document.querySelector('.infoModal');
let popup = document.querySelector('#popup');

const maxRecords = 151
const limit = 10
let offset = 0;
let pokedexList = [];

//Requisão para API, carregando os pokemons
loadPokemonItens = (offset, limit) => {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        pokedexList.push(pokemons);  
        const newHtml = pokemons.map(convertPokemonToLi).join('');
          pokemonList.innerHTML += newHtml;
      });
  }
  
//Ação para carregar os pokemons em tela
loadPokemonItens(offset, limit);

//Converte os pokemons em uma lista 
convertPokemonToLi = (pokemon) => {
    return `
    <button id="${pokemon.number}" class="pokemon-card" onclick="openModal(${pokemon.number})">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    </button>
    `
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Infinite Scroll - Carrega mais pokémons ao final da página
window.addEventListener('scroll', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        // loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});

/* Get Pokemon por ID */
getPokemonID = (pokemonID) => {
    let page = parseInt((pokemonID - 1) / limit);
    let index = (pokemonID-1) % limit;
    let pokemon = pokedexList[page][index];
    return pokemon;
}

/* Modal de cada pokemon */
openModal = (pokemonID) =>{
    let pokemon = getPokemonID(pokemonID);
    let createToModal = convertPokemonDetailToModal(pokemon);

    modal.style.display = 'block';
    modal.classList.add(`${pokemon.type}`);    
    modal.innerHTML += createToModal;

    let menuInfo = document.querySelector('.infoModal');
    let elements = document.querySelectorAll('.menuModal button');
    let id;

    elements.forEach((element) => {
        if(element.classList.contains("selected")){
            id = element.id;
        }
    })

    let message = convertPokemonDetailsToMenu(id, pokemonID);
    menuInfo.innerHTML = message;

    //Dependendo do menu, chama a função espeficica referente aos dados
    if (menuId.id == 'menu1') formatData();
    if (menuId.id == 'menu2') barColors(pokemonId);
}

closePopUP = () => {
	popup.style.display="none";    
}

closeModal= (pokemonID) => {
    let pokemon = getPokemonID(pokemonID);

    modal.classList.remove(`${pokemon.type}`);
    modal.style.display = "none";
    modal.innerHTML = "";

    closePopUP();
}

convertPokemonDetailToModal = (pokemon) =>{
    return `
        <div class="header">
            <div class="button">
                <div class="back">
                    <button onclick="closeModal(${pokemon.number})">
                        <img src="./assets/image/arrow.png" alt="Voltar">
                    </button>
                </div>
            </div>
            <div class="infos">
                <div class="detail">
                    <span class="name">${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
    
                <span class="number">#${pokemon.number}</span>
            </div>
    
            <div class="photo">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    
        <div class="detailsModal">
            <ul class="menuModal">
                <button id="menu1" class="selected" onclick="menuSelector('menu1', '${pokemon.number}')">
                    <li>About</li>
                </button>
            </ul>
            <hr>
            <div class="infoModal"></div>
        </div>
    `;
}

convertPokemonDetailsToMenu = (param, pokemonId) => {
    let pokemon = getPokemonID(pokemonId);

    if(param == 'menu1'){
        return `
        <div class="infosPokemon">
            <div class="about1">
                <div><label class="text-gray">Base. Exp.</label> <label>${pokemon.baseExp} exp.</label></div>
                <div><label class="text-gray">Height</label> <label class="height">${pokemon.height}</label></div>
                <div><label class="text-gray">Weight</label> <label class="weight">${pokemon.weight}</label></div>
                <div><label class="text-gray">Abilities</label> <label class="abilities">${pokemon.abilities}</label></div>
            </div>
        </div>
        `
    } else if(param == 'menu2'){
        return `
        <div class="about1">
            <div
                <label class="text-gray">HP</label>
                <div class="hp">
                    <label class="text-black">${pokemon.stats[0]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
            <div
                <label class="text-gray">Attack</label>
                <div class="atk">
                    <label class="text-black">${pokemon.stats[1]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
            <div
                <label class="text-gray">Defense</label>
                <div class="dfs">
                    <label class="text-black">${pokemon.stats[2]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
            <div
                <label class="text-gray">Sp. Atk.</label>
                <div class="sp-atk">
                    <label class="text-black">${pokemon.stats[3]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
            <div
                <label class="text-gray">Sp. Def.</label>
                <div class="sp-def">
                    <label class="text-black">${pokemon.stats[4]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
            <div
                <label class="text-gray">Speed</label>
                <div class="spd">
                    <label class="text-black">${pokemon.stats[5]}</label> 
                    <div class="health-bar">
                        <div class="bar-red">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

barColors = (pokemonId) => {
    let colorBar = document.querySelectorAll('.health-bar div');
    let pokemon = getPokemonID(pokemonId);
    let stats = pokemon.stats;
    let maxWidthBar = 200, maxAttribute = 225, newWidthBar = 0;

    for (let i = 0; i < colorBar.length; i++){
        //Ajusta cor das barras
        if (stats[i] > 75) {
            colorBar[i].classList.add("bar-green");
            colorBar[i].classList.remove("bar-red");            
        } else {
            colorBar[i].classList.add("bar-red");
            colorBar[i].classList.remove("bar-green");
        }

        //Ajustar largura das barras
        newWidthBar = (stats[i] * maxWidthBar) / maxAttribute;
        colorBar[i].style.width = newWidthBar + 'px';
    }
}

formatData = () => {
    //habilidades
    let abilitiesUpper = document.querySelector('.abilities');
    let abilitiesUpperText = document.querySelector('.abilities').textContent;
    let splitString = abilitiesUpperText.split(',');
    
    let upper = splitString.map ((e) => {
        return e.charAt(0).toUpperCase() + e.substring(1);
    })
    
    abilitiesUpper.innerHTML = upper.join(', ');

    //Peso
    let weight = document.querySelector('.weight');
    let weightText = document.querySelector('.weight').textContent;
    let newWeight = weightText.substring(0,weightText.length-1) + "." + weightText.substring(weightText.length-1);
    
    weight.innerHTML = newWeight + ' kg';

    //Altura
    let height = document.querySelector('.height');
    let heightNumber = parseInt(document.querySelector('.height').textContent);
    let newHeight = (heightNumber * 10) / 100;
    
    if (parseInt(newHeight) == 0){
        height.innerHTML = newHeight.toFixed(2) + ' cm';
    } else {
        height.innerHTML = newHeight.toFixed(2) + ' m';
    }
}