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

    characters.forEach((character, index) => {
        
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
            <div class="card border border-warning border-2 text-white bg-info">
                <img src="${character.image}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#exampleModal-${index}" data-character="${JSON.stringify(characters)}">
                <div class="card-body">
                    <h3 class="card-title text-center fw-bold">${character.name}</h3>
                    <p class="card-text text-center mt-4"><span class="${statusClass}">Status:</span> ${character.status} - ${character.species}</p>
                </div>
            </div>

            <!-- MODAL -->

            <div class="modal fade" id="exampleModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Description Characters:</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="card mb-3" style="min-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${character.image}" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h2 class="card-title text-center">${character.name}</h2>
                                            <p class="card-text text-center"><span class="${statusClass}">Status:</span> ${character.status} <br> Specie: ${character.species}</p>
                                            <p class="card-text text-center">
                                            Gender: ${character.gender} <br>
                                            Last location: ${character.location.name} <br>
                                            Origin: ${character.origin.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `;


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