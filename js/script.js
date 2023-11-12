const pokemonName = document.getElementById('poke-name')
const pokemonId = document.getElementById('poke-id')
const pokemonImage = document.getElementById('poke-img')
const form = document.querySelector('form')
const inputSearch = document.querySelector('input')

async function callAPI(pokemon){
    const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(API.status == 200){
        const data = await API.json()
        return data
    }
}

async function renderPokemon (pokemon){
    pokemonName.innerHTML = 'Loading...'

    const data = await callAPI(pokemon)

    pokemonName.innerHTML = ''
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        inputSearch.value = ''
    }
    else{
        pokemonName.innerHTML = 'Não encontrado'
        pokemonId.innerHTML = ''
        pokemonImage.src = ''
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    console.log('Loading API..')
    renderPokemon(inputSearch.value.toLocaleLowerCase())
})

callAPI()
renderPokemon('1')