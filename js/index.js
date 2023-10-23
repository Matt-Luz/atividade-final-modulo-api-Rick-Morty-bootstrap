const charactersList = document.querySelector(".row-characters-list");
const searchCharacters = document.getElementById('searchCharacters')

const pagination = document.getElementById('pagination')
const btnPrevious = document.getElementById('previous')
const btnNext = document.getElementById('next');

let currentPage = 1;
let info;

async function charactersSearch(page = 1, name = "") {
    try {
        const params = {
            page,
            name
        };

        const response = await api.get("/character", {
            params
        });

        btnPrevious.disabled = true
        btnNext.disabled = true

        const characters = response.data.results;
        info = response.data.info;

        console.log(response.data);

        showCharacters(characters);


    } catch (error) {
        console.log("Erro ao buscar personagens", error);
    };
};

function showCharacters(characters) {
    charactersList.innerHTML = "";

    characters.forEach((character) => {
        
        const card = document.createElement("div");
        card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4');

        let statusClass;

        if (character.status === "Alive") {
        statusClass = 'status-alive'
        } else if (character.status === "Dead") {
        statusClass = 'status-dead'
        } else if (character.status === "unknown") {
        statusClass = 'status-unknown'
        };

        card.innerHTML = `
            <div class="card border border-warning border-2 text-white bg-info" style="height: 450px">
                <img src="${character.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-center fw-bold">${character.name}</h3>
                    <p class="card-text text-center"><span class="${statusClass}">Status:</span> ${character.status} - ${character.species}</p>
                    <p class="card-text text-center">Last location: <br> ${character.location.name}</p>
                </div>
            </div>
        `
        charactersList.appendChild(card);

        btnPrevious.disabled = info.prev ? false : true
        btnNext.disabled = info.next ? false : true
        
    });
};

btnPrevious.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      charactersSearch(currentPage, searchCharacters.value);
    }
  });
  
  btnNext.addEventListener("click", () => {
    if (currentPage < info.pages) {
      currentPage++;
      charactersSearch(currentPage, searchCharacters.value);
    }
  });

  searchCharacters.addEventListener("input", () => {
    currentPage = 1;
    charactersSearch(currentPage, searchCharacters.value);
  });

charactersSearch();