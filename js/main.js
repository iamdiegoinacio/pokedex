const pokemonList = document.getElementById('pokemon-list-group');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;
const maxRecords = 11;

function pokemonComponent(pokemon) {
  return `
  <li>
    <div class="card-pokemon ${pokemon.type}">
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
          ${pokemon.types.map((type) => `<span class="${type}">${type}</span>`).join('')}
        </div>
        <div class="img-pokemon">
          <img src="${pokemon.image}" alt="${pokemon.name}"/>
        </div>
      </div>
    </div>
    </li>`;
}

pokeApi.getPokemons(offset, limit)
.then((pokemon) => {
  pokemonList.innerHTML += pokemon.map(pokemonComponent).join('');
})

function loadMorePokemons(offset, limit){
  pokeApi.getPokemons(offset, limit)
  .then((pokemons = []) => {
    const newHtml = pokemons.map(pokemonComponent).join('')
    pokemonList.innerHTML += newHtml;
  })
}

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if(qtdRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadMorePokemons(offset, newLimit);

    loadMoreButton.style.display = 'none';
    return true;
  }else{
    loadMorePokemons(offset, limit);
    return false;
  }
});