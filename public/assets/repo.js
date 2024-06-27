function retornarPagina() {
    history.back();
}

document.getElementById('btn-return').addEventListener('click', retornarPagina);
document.getElementById('meuNome').addEventListener('click', retornarPagina);

const urlParams = new URLSearchParams(window.location.search);
const REPOID = urlParams.get("id");

function getRepo() {
  const title = document.querySelector("#tituloRep")
  const description = document.querySelector("#descRep")
  const data = document.querySelector("#dataRep")
  const language = document.querySelector("#lingRep")
  const link = document.querySelector("#linkRep")
  const stars = document.querySelector("#starCount")
  const visi = document.querySelector("#visiCount")
  const fork = document.querySelector("#forkCount")
  
  fetch("https://api.github.com/users/iQuezin/repos")
  .then(async res => {
    if(!res.ok) {
      throw new Error(res.status);
    }

    return res.json()
    .then(dados => {
      atualizar(dados);
    })

    function atualizar(dados) {
      let rep = "";

      for(let i = 0; i < dados.length; i++) {
        rep = dados[i];

        if(rep.id == REPOID) {
          title.textContent = rep.name;
          description.textContent = rep.description;
          data.textContent = Intl.DateTimeFormat('pt-br').format(new Date(rep.created_at));
          language.textContent = rep.language;
          link.textContent = rep.html_url;
          link.href = rep.html_url;
          stars.textContent = rep.stargazers_count;
          visi.textContent = rep.watchers_count;
          fork.textContent = rep.forks_count;
        }
      }
    }
    
  })
}
getRepo();