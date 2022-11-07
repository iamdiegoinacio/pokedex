function pokemonComponent(pokemon) {
  return `
  <li class="${pokemon.type}">
    <div class="card-pokemon">
      <div class="card-id">
        <div>
          <p>${pokemon.id}</p>
        </div>
      </div>
      <div class="card-name">
        <span>${pokemon.name}</span>
      </div>
      <div class="card-detail">
        <div class="skill-pokemon">
          ${pokemon.types.map((type) => `<span>${type}</span>`).join('')}
        </div>
        <div class="img-pokemon">
          <img src="${pokemon.image}" alt="${pokemon.name}"/>
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