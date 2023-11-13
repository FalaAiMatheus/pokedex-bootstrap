const form = document.querySelector('form')
const inputSearch = document.querySelector('input')
const btnSearch = document.querySelector('button')

async function callAPI(pokemon){
    const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(API.status == 200){
        const data = await API.json()
        return data
    }
}

async function renderPokemon (pokemon){
    const firstTypePokemon = document.getElementById('first-type-poke')
    const secondTypePokemon = document.getElementById('second-type-poke')
    const pokemonName = document.getElementById('poke-name')
    const pokemonId = document.getElementById('poke-id')
    const pokemonImage = document.getElementById('poke-img')
    const statsPokeContainer = document.querySelector('.stats-poke')

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
        statsPokeContainer.innerHTML = 
        `
        <section class="stats-poke"
        <div class="stat">
            <span class="border border-black p-2 rounded bg-danger-subtle">HP: ${data.stats[0].base_stat}</span>
        </div>
        <div class="stat">
            <span class="border border-black p-2 rounded bg-danger">ATK: ${data.stats[1].base_stat}</span>
        </div>
        <div class="stat">
            <span class="border border-black p-2 rounded bg-info-subtle">DEF: ${data.stats[2].base_stat}</span>
        </div>
        </section>
        `

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