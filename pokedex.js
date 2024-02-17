//Creamos la constante baseRL y le asignamos la url de la api
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

//Recuperamos el elemento ol con el id 'pokedex' de nuestro html
let pokedex$$ = document.querySelector("#pokedex");
let cargando$$ = document.querySelector('#cargando')

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
  cargando$$.className = "hide";

  pokemonsList.map((pokemon) => {
    //También podría usar for (let pokemon of pokemonsList)
    // console.log(x);

    //Creamos el elemento li y lo relacionamos con su elemento padre (el elemento pokedex de nuestro html)
    let li$$ = document.createElement("li");
    pokedex$$.appendChild(li$$);

    //Creamos nuestras cartas y lo relacionamos con su elemento padre li
    let card$$ = document.createElement("div");
    li$$.appendChild(card$$);
    card$$.className = "card";

    //Dentro de nuestras cartas, dibujamos nuestros pokemons
    let cardTitle$$ = document.createElement("h4");
    card$$.appendChild(cardTitle$$);
    cardTitle$$.className = "card-title";
    // cardTitle$$.textContent = pokemon.name;
    cardTitle$$.textContent = `#${pokemon.id} ${pokemon.name} ${pokemon.baseExperience}`;

    let cardImage$$ = document.createElement("img");
    card$$.appendChild(cardImage$$);
    cardImage$$.className = "card-image";
    cardImage$$.src = pokemon.image;

    let cardSubtitle$$ = document.createElement("h3");
    card$$.appendChild(cardSubtitle$$);
    cardSubtitle$$.className = "card-subtitle";
    cardSubtitle$$.textContent = "Type: " + pokemon.type;

    let cardAbilities$$ = document.createElement("p");
    card$$.appendChild(cardAbilities$$);
    cardAbilities$$.className = 'hide'
    cardAbilities$$.textContent = "Habilidades: " + pokemon.abilities;
    
    let cardStatsTitle$$ = document.createElement("h4");
    card$$.appendChild(cardStatsTitle$$);
    cardStatsTitle$$.textContent = "Estadísticas:";
    cardStatsTitle$$.className = 'hide'
    let cardStats$$;
    pokemon.stats.map((stat) => {
       cardStats$$ = document.createElement("p");
      card$$.appendChild(cardStats$$);
      let index = Object.keys(stat)[0];
      cardStats$$.textContent = `${index}: ${stat[index]}`;
      cardStats$$.className = 'hide'
    });
    let hoverCard = card$$.addEventListener('click', () =>{
      cardAbilities$$.className = 'show'
      cardStatsTitle$$.className = 'show'
      cardStats$$.className = 'show'
    })
  });

  
};

//Por último, llamamos a nuestra función drawPokemons
drawPokemons();

//También podríamos crear una función que sería como nuestra hoja de ruta, en la que almacenaríamos las diferentes funciones que necesitamos llamar (si fuese el caso), y así tendríamos que hacer una sola llamada
// const init = async () => {
// };

// init();
