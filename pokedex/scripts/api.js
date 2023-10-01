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
        name.style.fontSize = "20px";

        const height = document.querySelector("#height");
        height.innerHTML = `Height: ${res.height}m <br>`;
        
        const weight = document.querySelector("#weight");
        weight.innerHTML = `Weight: ${res.weight}kg`;
        
        const types = document.querySelector("#types");
        const ability = document.querySelector("#ability");
        types.innerHTML = "";

        for (let index = 0; index < res.types.length; index++) {
            types.innerHTML += `<span class ="${res.types[index].type.name}">${res.types[index].type.name.toUpperCase()}</span>  `; 
            
        }
        
        const stats = document.querySelector("#stats");
        stats.innerHTML = "<b>Stats:<b><br>";
        for (let index = 0; index < res.stats.length; index++) {
          let name = res.stats[index].stat.name.toUpperCase();
          let percentage = (res.stats[index].base_stat / 450) * 100;
      
          let barColorClass = "";
          switch (name) {
              case "HP":
                  barColorClass = "bg-danger";
                  break;
              case "ATTACK":
                  barColorClass = "bg-warning";
                  break;
              case "DEFENSE":
                  barColorClass = "bg-success";
                  break;
              case "SPECIAL ATTACK":
                  barColorClass = "bg-primary";
                  break;
              case "SPECIAL DEFENSE":
                  barColorClass = "bg-info";
                  break;
              case "SPEED":
                  barColorClass = "bg-info";
                  break;
              default:
                  break;
          }
      
          stats.innerHTML += `
              <div>${name}</div>
              <div class="progress" role="progressbar" aria-label="${name} progress bar" aria-valuenow="${res.stats[index].base_stat}" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
                  <div class="progress-bar progress-bar-striped progress-bar-animated ${barColorClass}" style="width: ${percentage}%">${res.stats[index].base_stat}</div>
              </div>`;
      }
      
      



        ability.innerHTML = "<b>Abilities:<b><br>";
        
        for (let index = 0; index < res.abilities.length; index++) {
          let abilityName = res.abilities[index].ability.name.toUpperCase();
          ability.innerHTML += `<span>${abilityName}</span><br> `;
        }



        
    })

})
