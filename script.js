const pokemonCount = 151;

var pokedex = {}; //name, image, type, description

let randBtn = document.getElementById("console-img");

window.onload = async function() {
    for(let i=1; i<=pokemonCount; i++)
    {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        document.getElementById("pokemon-list").append(pokemon);

        pokemon.addEventListener("click", updatePokemon);
    }

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];    

    console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/"+num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][10]["flavor_text"];

    pokedex[num] = {
        "name": pokemonName,
        "img": pokemonImg,
        "types": pokemonType,
        "desc": pokemonDesc 
    }
}

function updatePokemon() {

    if(this.id<=9) {
        document.getElementById("poke-title").innerText = "#00"+ this.id +" "+ pokedex[this.id]["name"].toUpperCase();
    }
    else if(this.id>9 && this.id<=99) {
        document.getElementById("poke-title").innerText = "#0"+ this.id +" "+ pokedex[this.id]["name"].toUpperCase();
    }
    else {
        document.getElementById("poke-title").innerText = "#"+ this.id +" "+ pokedex[this.id]["name"].toUpperCase();
    }
    
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while(typesDiv.firstChild)
    {
        typesDiv.firstChild.remove();
    }

    //update type
    let types = pokedex[this.id]["types"];
    for(let i=0; i<types.length; i++)
    {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}

randBtn.addEventListener("click", getRandPokemon);

function getRandPokemon() {
    let randId = Math.floor(Math.random()*151);

    if(randId<=9) {
        document.getElementById("poke-title").innerText = "#00"+ randId +" "+ pokedex[randId]["name"].toUpperCase();
    }
    else if(randId>9 && randId<=99) {
        document.getElementById("poke-title").innerText = "#0"+ randId +" "+ pokedex[randId]["name"].toUpperCase();
    }
    else {
        document.getElementById("poke-title").innerText = "#"+ randId +" "+ pokedex[randId]["name"].toUpperCase();
    }

    document.getElementById("pokemon-img").src = pokedex[randId]["img"];

    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while(typesDiv.firstChild)
    {
        typesDiv.firstChild.remove();
    }

    //update type
    let types = pokedex[randId]["types"];
    for(let i=0; i<types.length; i++)
    {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[randId]["desc"];
}