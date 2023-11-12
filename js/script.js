const pokemonName = document.getElementById('poke-name')

const callAPI = async (pokemon) =>{
    const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await API.json()
}