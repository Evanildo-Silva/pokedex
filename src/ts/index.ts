import axios from "axios"

export const getPokemon = async (pokemon: string) => { 
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(response.status === 200){
    return response.data
    }
}
