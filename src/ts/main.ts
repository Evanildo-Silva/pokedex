import { AxiosError } from "axios";
import { appElemets } from "./constants";
import { getPokemon } from "./index";

let searchPokemonList = "1";

const renderPokemon = async (pokemon: string) => {
  appElemets.pokemonName.innerHTML = "Loading...";
  try {
    const data = await getPokemon(pokemon);
    appElemets.pokemonImage.style.display = "block";
    appElemets.pokemonName.innerHTML = data.name;
    appElemets.pokemonId.innerHTML = data.id;
    appElemets.pokemonImage.src = data["sprites"]["versions"]["generation-v"][
      "black-white"
    ]["animated"]["front_default"]
      ? data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ]
      : data["sprites"]["front_default"];
    searchPokemonList = data.id;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    appElemets.pokemonImage.style.display = "none";
    appElemets.pokemonId.innerHTML = "";
    appElemets.pokemonName.innerHTML = "Not found";
  } finally {
    appElemets.input.value = "";
  }
};

appElemets.form?.addEventListener("submit", (e) => {
  e.preventDefault();

  renderPokemon(appElemets.input.value.toLocaleLowerCase());
});

appElemets.buttonPrev?.addEventListener("click", () => {
  let id = Number(searchPokemonList);
  if (id > 1) id -= 1;
  renderPokemon(id.toString());
});

appElemets.buttonNext?.addEventListener("click", () => {
  searchPokemonList += 1;
  renderPokemon(searchPokemonList);
});

appElemets.buttonShowModal?.addEventListener("click", () => {
  appElemets.modal?.showModal();
});

appElemets.buttonCloseModal?.addEventListener("click", () => {
  appElemets.modal?.close();
});

renderPokemon(searchPokemonList);
