const btnMenu = document.getElementById("btn-menu");
const closeMenu = document.getElementById("close-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener('click', function() {
    if(btnMenu) {
        menu.style.display = "block";
        menu.style.animationName = "openMenu";
    }
});

closeMenu.addEventListener('click', function () {
    if(closeMenu) {
        menu.style.display = "none";
    }
});

function fecharComEsc() {
    let esc;
    if(menu.style.display == "block") {
        document.addEventListener('keydown', () => {

        })
    }
}

// Redes Sociais:
function clickToGithub() {
    if('click') {
        window.location.href = "https://github.com/iQuezin";
    }
};

function clickToInstagram() {

    if('click') {
        window.location.href = "https://www.instagram.com/ique_dsa/";
    };
}

function clickToLinkedin() {
    if('click') {
        window.location.href = "https://www.linkedin.com/in/kayque-dsa"
    }
};  



function sobreMim() {
    if ('click') {
        menu.style.display = "none";
        location.hash = '#secaoUm';
    }
};
function repositorios() {
    if ('click') {
        menu.style.display = "none";
        location.hash = '#secaoDois';
    }
};
function conteudos() {
    if ('click') {
        menu.style.display = "none";
        location.hash = '#secaoTres';
    }
};
function colegas() {
    if ('click') {
        menu.style.display = "none";
        location.hash = '#secaoQuatro';
    }
};

// Repositorios

const repos = document.querySelector("#repos");

function getApiGitHub() {
    fetch('https://api.github.com/users/iQuezin/repos')
        .then(async res => {
          if(!res.ok) {
            throw new Error(res.status);            
          }
          
            let data = await res.json();
            data.map(item => {
                let project = document.createElement('div');
                project.classList.add('col-md-4');
                project.classList.add('col-sm-12');
                project.classList.add('my-3');
                
                let linguagemName;

                if(item.language !== null) {
                    linguagemName = item.language;
                } else {
                    linguagemName = "Não definida";
                }

                if(item.visibility == "public") {
                    project.innerHTML = `
                    <div class="card-body">
                        <a href="./repo.html?id=${item.id}">
                            <div id="cards" class="card">
                                <h5 id="repoName">${item.name}</h5>
                                <p id="linguagens">Linguagem: ${linguagemName}</p>
                                <p id="data">Data: ${Intl.DateTimeFormat('pt-br').format(new Date(item.created_at))}</p>
                                <div class="row mt-2">
                                    <div class="col d-flex justify-content-evenly">
                                        <p class="m-0 p-0"><span class="material-symbols-rounded m-0 p-0">star</span>${item.stargazers_count}</p>
                                        <p class="m-0 p-0"><span class="material-symbols-rounded m-0 p-0">visibility</span>${item.watchers_count}</p>
                                        <p class="m-0 p-0"><span class="material-symbols-rounded m-0 p-0">content_copy</span>${item.forks_count}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `
                }

                repos.appendChild(project);

            })
        })

}

getApiGitHub();

// Colegas:

function getColegas() {
    const largura = window.innerWidth;
    
    const htmlcolegas = document.querySelector("#colegas")
    
    fetch("/colegas")
    .then(async res => {
        if(!res.ok) {
          throw new Error(res.status);            
        }
        
          let data = await res.json();
          data.map(col => {
              let project = document.createElement('div');
              project.classList.add('col-md-4');
              project.classList.add('col-sm-12');
              project.classList.add('my-3');
              
              if(largura > 768) {
                project.innerHTML = `
                <div class="row d-flex justify-content-around">
                    <div class="col">
                        <div class="row">
                            <a class="d-flex justify-content-center" href="${col.urlGitHub}"><img id="colegasImg" src="${col.img}"></a>
                        </div>
                        <div class="row">
                            <p id="colegasNome" class="d-flex justify-content-center mt-2"><a href="${col.urlGitHub}">${col.nome}</a></p>
                        </div>
                    </div>
                </div>
              `;
              } else if(largura < 768){
                project.innerHTML = `
                <div class="row">
                    <div class="col d-flex justify-content-around">
                        <a href="${col.urlGitHub}"><img  id="colegasImg" src="${col.img}"></a>
                    </div>
                    <div class="col d-flex justify-content-start align-items-center m-0">
                        <p id="colegasNome" class="m-0"><a href="${col.urlGitHub}">${col.nome}</a></p>
                    </div>      
                </div>
              `;
              }
              
              

              htmlcolegas.appendChild(project);

          })
      })
}
getColegas();

//Carrossel
function getConteudos() {
    const htmlcarousel = document.querySelector("#inCarousel")
    const desccarousel = document.querySelector("#description");
    
    fetch("/conteudos")
    .then(async res => {
        if(!res.ok) {
          throw new Error(res.status);            
        }
        
          let data = await res.json();
          data.map(con => {
              let car = document.createElement('div');
              car.classList.add("carousel-item");
              car.id = `${con.id}`;
              
              if(car.id == 1) {
                car.classList.add("active");
              }

              car.innerHTML = `
                <a id="linkCarousel" href="${con.urlYt}">
                    <img id="imgCarousel" src="${con.urlimg}" class="d-block w-100" alt="${con.nome}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5 id="carTitle">${con.nome}</h5>
                        <p id="carDesc">${con.descricao}</p>
                    </div>
                </a>
              `
              htmlcarousel.appendChild(car);


              let slide = document.querySelectorAll('.slide');
              
              if(slide.length > 0) {
                var elem = slide[0];

                var idElem = elem.id;

                if(idElem == 1) {
                    car.classList.add('active');
                }
              }

          })
      })
}
getConteudos();