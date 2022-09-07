const d = document,
$pokeCard = d.querySelector("[data-poke-card]"),
$pokeName = d.querySelector("[data-poke-name]"),
$pokeImgContainer = d.querySelector("[data-poke-img-container]"),
$pokeImg = d.querySelector("[data-poke-img]"),
$pokeId = d.querySelector("[data-poke-id]"),
$pokeTypes= d.querySelector("[data-poke-types]"),
$pokeStats = d.querySelector("[data-poke-stats]");

const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6DF9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#9400D3',
  ground: '#8B4513',
  dragon: '#DA627D',
  steel: '#696969',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

const searchPokemon = (event) => {
  event.preventDefault(); // Evitamos el submit del formulario
  const { value } = event.target.pokemon;

  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) // El endpoint puede ser name o id
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(error => renderNotFound());
}

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default; // Sacamos la imagen del pokemon
  const { stats, types } = data; // Stats y types de los pokemons. Tienen el mismo nombre que los de la api para guardarlos directamente

  $pokeName.textContent = data.name;
  $pokeImg.setAttribute('src', sprite);
  $pokeId.textContent = `Nº ${data.id}`;

  setCardColors(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
}

const setCardColors = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1] ? typeColors[types[1].type.name] : colorOne; 

  $pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`; // Creamos las pelotitas atras del pokemon
  $pokeImg.style.backgroundSize = '15px 15px';
}

const renderPokemonTypes = (types) => {
  $pokeTypes.innerHTML = ''; // Borramos la info anterior

  types.forEach(type => {
    const typeTextElement = d.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    
    $pokeTypes.appendChild(typeTextElement); // Le hacemos un appendChild al div de los elementos
  });
}

const renderPokemonStats = (stats) => {
  $pokeStats.innerHTML = '';

  stats.forEach(stat => {
    const statElement = d.createElement("div"),
      statElementName = d.createElement("div"),
      statElementAmount = d.createElement("div");
    
    statElementName.textContent = stat.stat.name.toUpperCase();
    statElementName.classList.add("stat");
    statElementAmount.textContent = stat.base_stat;
    statElementAmount.classList.add("amount");

    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);

    $pokeStats.appendChild(statElement);
  });
}

const renderNotFound = () => {
  $pokeName.textContent = "Pokemon no encontrado!";
  $pokeImg.setAttribute("src", "img/pokeball-shadow.png");
  $pokeImg.style.background = "#fff";

  $pokeTypes.innerHTML = "";
  $pokeStats.innerHTML = "";
  $pokeId.textContent = "";
}