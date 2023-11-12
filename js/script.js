const pokemonName = document.getElementById('poke-name')
const pokemonId = document.getElementById('poke-id')
const pokemonImage = document.getElementById('poke-img')
const form = document.querySelector('form')
const inputSearch = document.querySelector('input')
const btnSearch = document.querySelector('button')
const firstTypePokemon = document.getElementById('first-type-poke')
const secondTypePokemon = document.getElementById('second-type-poke')
const colorsTypes ={
    normal: '#ddd',
    fire: '#D62E00',
    water: '#2859FE',
    grass: '#067D20',
    flying: '#57C9C0',
    fighting: '#C9265A',
    poison: '#99267C',
    electric: '#F2D027',
    ground: '#8C4D38',
    rock: '#525151',
    psychic: '#E95AFF',
    ice: '#45F7FE',
    bug: '#73FF92',
    ghost: '#695370',
    steel: '#8C8C8C',
    dragon: '#FF655F',
    dark: '#563E57',
    fairy: '#28734D'
}

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
        pokemonId.innerHTML = `#0${data.id}`;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonImage.alt = data.name
        firstTypePokemon.innerHTML = data.types[0].type.name
        secondTypePokemon.innerHTML = data.types[1].type.name
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