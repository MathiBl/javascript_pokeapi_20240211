const pokedex$$ = document.querySelector("#pokedex");
let pokemonsList = [];

const getPokemons = async () => {
  for (let i = 1; i <= 150; i++) {
    try {
      const pokemonsUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const results = await pokemonsUrl.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }
};



const init = async () => {
  //Primero, le digo que se espere a la petición
  const pokemons = await getPokemons();
  // console.log("Function init", pokemons);
  //Segundo, mapeamos los Pokemons pansándole a la función nuestros Pokemons de la linea 22
  
};
init();

















// getPokemon();
// console.log(pokemons);

// for (let i = 1; i <= 150; i++) {
//       const pokemonsUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
//       const response = await pokemonsUrl.json();
//       console.log(response);

//       const mappedPokemon = {
//         name: response.name,
//         image: response.sprites["front_default"],
//         type: response.type,
//         id: response.id,
//       };
//       pokemons.push(mappedPokemon);
//     }
