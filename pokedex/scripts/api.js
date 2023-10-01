const btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", () =>{

    let pokemonName = document.getElementById("search").value;

    let url  = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;


    // console.log writes to console 
    // write.log writes to html

    fetch(url)
    .then(res => res.json())
    .then(res =>{
        console.log(res);
        const mainImage = document.querySelector(".main-image");
        mainImage.innerHTML = `<img src="${res.sprites.front_default}">`;

        const name = document.querySelector("#name")
        name.textContent = res.name.toUpperCase();
        const height = document.querySelector("#height")
        height.textContent = `${res.height}m`;
        const weight = document.querySelector("#weight")
        weight.textContent = `${res.weight}kg`;

        const types = document.querySelector("#types");
        types.innerHTML = "";

        for (let index = 0; index < res.types.length; index++) {
            types.innerHTML += `<span class ="${res.types[index].type.name}">${res.types[index].type.name.toUpperCase()}</span>  `; 
            
        }
        
        const stats = document.querySelector("#stats");
        stats.innerHTML = "";

        for (let index = 0; index < res.stats.length; index++) {

            let name = res.stats[index].stat.name.toUpperCase();
            let percentage = (res.stats[index].base_stat / 450) * 100
            
            stats.innerHTML += `<div>${name}</div>
          <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
            <div class="progress-bar" style="width: ${percentage}%">${res.stats[index].base_stat}</div>
          </div>` 
        }
        
    })

})
