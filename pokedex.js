//Creamos la constante baseUrl y le asignamos la url de la api
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

//Recuperamos los elementos de nuestro html
let pokedex$$ = document.querySelector("#pokedex");
let cargando$$ = document.querySelector("#cargando");
let searchContainer$$ = document.querySelector("#search-container");

//Creamos un array vacío que nos permitirá trabajar los valores deseados
let pokemonsList = [];
let filteredPokemons = [];

//Escondemos el input y la Pokédex al inicio
searchContainer$$.classList.add("hide");
pokedex$$.classList.add("hide");

//Creamos una función asíncrona para ejecutar el fetch y recuperar los 150 pokemons a través de un bucle
const getPokemons = async () => {
  for (let i = 1; i <= 150; i++) {
    try {
      const response = await fetch(`${baseUrl}${i}`);
      const pokemon = await response.json();

      // Empujamos los valores deseados dentro del array creado anteriormente
      pokemonsList.push({
        id: pokemon.id,
        image: pokemon.sprites.other["official-artwork"].front_default,
        name: pokemon.name,
        baseExperience: pokemon.base_experience,
        type: pokemon.types.map((type) => type.type.name).join(", "),
        abilities: pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
        stats: [
          { HP: pokemon.stats[0].base_stat },
          { Attack: pokemon.stats[1].base_stat },
          { Defense: pokemon.stats[2].base_stat },
          { "Special attack": pokemon.stats[3].base_stat },
          { "Special defense": pokemon.stats[4].base_stat },
          { Speed: pokemon.stats[5].base_stat },
        ],
      });
    } catch (error) {
      console.error("Error en la solicitud");
    }
  }
  filteredPokemons = pokemonsList;
  cargando$$.classList.add("hide"); // Oculta el div de carga
  searchContainer$$.classList.remove("hide"); // Muestra el input de búsqueda
  pokedex$$.classList.remove("hide"); // Muestra la Pokédex
  drawPokemons(filteredPokemons);
};

// Creamos y dibujamos el input de búsqueda
const drawInput = () => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () => {
    searchPokemons(input$$.value);
  });
};

// Función para filtrar los Pokémon
const searchPokemons = (filtro) => {
  filteredPokemons = pokemonsList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtro.toLowerCase())
  );
  drawPokemons(filteredPokemons);
};

// Función para dibujar los Pokémon
const drawPokemons = (pokemons) => {
  pokedex$$.innerHTML = ""; // Borra la lista anterior
  pokemons.forEach((pokemon) => {
    let li$$ = document.createElement("li");
    pokedex$$.appendChild(li$$);

    let card$$ = document.createElement("div");
    li$$.appendChild(card$$);
    card$$.className = "flip-card";

    let flipCardInner$$ = document.createElement("div");
    flipCardInner$$.className = "flip-card-inner";
    card$$.appendChild(flipCardInner$$);

    let flipCardFront$$ = document.createElement("div");
    flipCardFront$$.className = "flip-card-front";
    flipCardInner$$.appendChild(flipCardFront$$);

    let flipCardBack$$ = document.createElement("div");
    flipCardBack$$.className = "flip-card-back hide";
    flipCardInner$$.appendChild(flipCardBack$$);

    let cardHeader$$ = document.createElement("div");
    flipCardFront$$.appendChild(cardHeader$$);
    cardHeader$$.className = "card-header";

    let cardId$$ = document.createElement("h4");
    cardHeader$$.appendChild(cardId$$);
    cardId$$.textContent = `# ${pokemon.id}`;

    let cardExp$$ = document.createElement("h4");
    cardHeader$$.appendChild(cardExp$$);
    cardExp$$.textContent = `XP: ${pokemon.baseExperience}`;

    let cardTitle$$ = document.createElement("h4");
    flipCardFront$$.appendChild(cardTitle$$);
    cardTitle$$.className = "card-title";
    cardTitle$$.textContent = pokemon.name;

    let cardImage$$ = document.createElement("img");
    flipCardFront$$.appendChild(cardImage$$);
    cardImage$$.className = "card-image";
    cardImage$$.src = pokemon.image;

    let cardSubtitle$$ = document.createElement("h3");
    flipCardFront$$.appendChild(cardSubtitle$$);
    cardSubtitle$$.className = "card-subtitle";
    cardSubtitle$$.textContent = "Type: " + pokemon.type;

    let cardAbilitiesTitle$$ = document.createElement("h4");
    flipCardBack$$.appendChild(cardAbilitiesTitle$$);
    cardAbilitiesTitle$$.className = "title-back show";
    cardAbilitiesTitle$$.textContent = "Habilidades:";

    let cardAbilities$$ = document.createElement("p");
    flipCardBack$$.appendChild(cardAbilities$$);
    cardAbilities$$.className = "p-back show";
    cardAbilities$$.textContent = pokemon.abilities;

    let cardStatsTitle$$ = document.createElement("h4");
    flipCardBack$$.appendChild(cardStatsTitle$$);
    cardStatsTitle$$.className = "title-back show";
    cardStatsTitle$$.textContent = "Estadísticas:";

    pokemon.stats.forEach((stat) => {
      let cardStats$$ = document.createElement("p");
      flipCardBack$$.appendChild(cardStats$$);
      let index = Object.keys(stat)[0];
      cardStats$$.textContent = `${index}: ${stat[index]}`;
      cardStats$$.className = "p-back show";
    });

    card$$.addEventListener("mouseover", () => {
      flipCardFront$$.className = "flip-card-front hide";
      flipCardBack$$.className = "flip-card-back show";
    });

    card$$.addEventListener("mouseout", () => {
      flipCardFront$$.className = "flip-card-front show";
      flipCardBack$$.className = "flip-card-back hide";
    });
  });
};

// Inicializa las funciones
const init = async () => {
  cargando$$.classList.remove("hide"); // Muestra el div de carga
  setTimeout(async () => {
    await getPokemons();
    drawInput();
  }, 100); // Espera 100 ms antes de iniciar la carga de Pokémon
};

init();
