function convertPokemonTypesToList(pokemonTypes){
  return pokemonTypes.map((typeSlot) => {
    return `
      <span>${typeSlot.type.name}</span>
    `
  })
}

function pokemonComponent(pokemon) {
  return `
  <li>
    <div class="card-pokemon">
      <div class="card-id">
        <div>
          <p>${pokemon.order}</p>
        </div>
      </div>
      <div class="card-name">
        <span>${pokemon.name}</span>
      </div>
      <div class="card-detail">
        <div class="skill-pokemon">
          ${convertPokemonTypesToList(pokemon.types).join('')}
        </div>
        <div class="img-pokemon">
          <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"/>
        </div>
      </div>
    </div>
    </li>`;
}

const pokemonList = document.getElementById('pokemon-list-group');

pokeApi.getPokemons()
.then((pokemon) => {
  pokemonList.innerHTML += pokemon.map(pokemonComponent).join('');
})