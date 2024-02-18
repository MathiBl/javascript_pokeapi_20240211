//Creamos la constante baseRL y le asignamos la url de la api
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

//Recuperamos el elemento ol con el id 'pokedex' de nuestro html
let pokedex$$ = document.querySelector("#pokedex");

//Creamos un array vacío que nos permitirá trabajar los valores deseados
let pokemonsList = [];

//Creamos una función asíncrona para ejecutar el fetch y recuperar los 150 pokemons a través de un bucle
const getPokemons = async () => {
  for (let i = 1; i <= 150; i++) {
    try {
      const pokemonsUrl = await fetch(`${baseUrl}${i}`);
      const results = await pokemonsUrl.json();
      // console.log(results);

      // Empujamos los valores deseados dentro del array creado anteriormente
      pokemonsList.push({
        id: results.id,
        image: results.sprites["front_default"],
        name: results.name,
        baseExperience: results.base_experience,
        type: results.types.map((type) => type.type.name).join(", "),
        abilities: results.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
        stats: [
          { HP: results.stats[0].base_stat },
          { Attack: results.stats[1].base_stat },
          { Defense: results.stats[2].base_stat },
          { "Special attack": results.stats[3].base_stat },
          { "Special defense": results.stats[4].base_stat },
          { Speed: results.stats[5].base_stat },
        ],
      });
    } catch (error) {
      console.error("Error en la solicitud");
    }
  }
  console.log(pokemonsList);
};

//Creamos una nueva función asíncrona para pintar los Pokemons
const drawPokemons = async () => {
  // console.log(pokemon);

  //Recuperamos el resultado del fetch
  await getPokemons();

  //Llamamos al elemento "#cargando" que hemos creado en el html y que aparecerá algunos segundos antes de que carguen los pokemons
  let cargando$$ = document.querySelector("#cargando");
  cargando$$.className = "hide";

  pokemonsList.map((pokemon) => {
    //También podría usar for (let pokemon of pokemonsList)

    //Creamos el elemento li y lo relacionamos con su elemento padre (el elemento pokedex de nuestro html)
    let li$$ = document.createElement("li");
    pokedex$$.appendChild(li$$);

    //Creamos nuestras cartas y lo relacionamos con su elemento padre li
    let card$$ = document.createElement("div");
    li$$.appendChild(card$$);
    card$$.className = "card";

    //Dentro de nuestras cartas, dibujamos nuestros pokemons

    //Empezamos por crear un div que contendrá el ID y el XP de cada pokemon
    let cardHeader$$ = document.createElement("div");
    card$$.appendChild(cardHeader$$);
    cardHeader$$.className = "card-header";

    let cardId$$ = document.createElement("h4");
    cardHeader$$.appendChild(cardId$$);
    cardId$$.textContent = `# ${pokemon.id}`;

    let cardExp$$ = document.createElement("h4");
    cardHeader$$.appendChild(cardExp$$);
    cardExp$$.textContent = `XP: ${pokemon.baseExperience}`;

    //Ahora pintamos el nombre, la imágen y el típo de cada pokemon
    let cardTitle$$ = document.createElement("h4");
    card$$.appendChild(cardTitle$$);
    cardTitle$$.className = "card-title";
    cardTitle$$.textContent = pokemon.name;

    let cardImage$$ = document.createElement("img");
    card$$.appendChild(cardImage$$);
    cardImage$$.className = "card-image";
    cardImage$$.src = pokemon.image;

    let cardSubtitle$$ = document.createElement("h3");
    card$$.appendChild(cardSubtitle$$);
    cardSubtitle$$.className = "card-subtitle";
    cardSubtitle$$.textContent = "Type: " + pokemon.type;

    //Seguimos con la habilidades y las estadísticas de cada uno. Esos datos aparecerán solo con un mouseover
    let cardAbilities$$ = document.createElement("p");
    card$$.appendChild(cardAbilities$$);
    cardAbilities$$.className = "hide";
    cardAbilities$$.textContent = "Habilidades: " + pokemon.abilities;

    let cardStatsTitle$$ = document.createElement("h4");
    card$$.appendChild(cardStatsTitle$$);
    cardStatsTitle$$.className = "hide";
    cardStatsTitle$$.textContent = "Estadísticas:";

    pokemon.stats.map((stat) => {
      let cardStats$$ = document.createElement("p");
      card$$.appendChild(cardStats$$);
      let index = Object.keys(stat)[0];
      cardStats$$.textContent = `${index}: ${stat[index]}`;
      cardStats$$.className = "card-stats hide";
    });

    //Creamos un addEventListener. Le pedimos que nos enseñe las habilidades y las estadísticas al pasar el ratón y que las esconde al quitar el ratón
    card$$.addEventListener("mouseover", (x) => {
      cardAbilities$$.className = "show";
      cardStatsTitle$$.className = "show";
      card$$.querySelectorAll("p").className = "show";
      let stats = Array.from(card$$.getElementsByTagName("p"));
      stats.map((x) => (x.className = "show"));
    });
    card$$.addEventListener("mouseout", (x) => {
      cardAbilities$$.className = "hide";
      cardStatsTitle$$.className = "hide";
      card$$.querySelectorAll("p").className = "hide";
      let stats = Array.from(card$$.getElementsByTagName("p"));
      stats.map((x) => (x.className = "hide"));
    });
  });
};

//Por último, llamamos a nuestra función drawPokemons
drawPokemons();

//También podríamos crear una función que sería como nuestra hoja de ruta, en la que almacenaríamos las diferentes funciones que necesitamos llamar (si fuese el caso), y así tendríamos que hacer una sola llamada
// const init = async () => {
// };

// init();
