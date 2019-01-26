let repositorios = [];
function get_info() {
  let user = document.getElementById("username").value;
  Promise.all([HTTP("users/" + user), HTTP("users/" + user + "/repos")]).then(
    resp => {
      document.getElementsByClassName("dados")[0].style.display = "flex";
      load_data(resp[0]);
      let repos = ordernaDesc(resp[1]);
      repositorios = repos;
      load_repositories(repos);
    }
  );
}

function get_details(repo) {
  let user = document.getElementById("username").value;
  HTTP("users/" + user).then(resp => {
    load_data(resp);
  });
}

function load_data(user) {
  document.getElementById("seguidores").innerHTML = user.followers;
  document.getElementById("seguindo").innerHTML = user.following;
  document.getElementById("email").innerHTML = user.email;
  document.getElementById("bio").innerHTML = user.bio;
  document.getElementById("avatar").src = user.avatar_url;
}

function load_repositories(repos) {
  document.getElementById("lista-repo").innerHTML = "";
  repos.forEach(repo => {
    let ul = document.getElementById("lista-repo");
    let li = document.createElement("li");
    let small = document.createElement("small");
    let a = document.createElement("a");

    a.appendChild(document.createTextNode("ver"));
    a.href = window.location.href + "repositorio?repo=" + repo.full_name;
    small.appendChild(a);

    li.appendChild(document.createTextNode(repo.name));
    li.appendChild(small);
    ul.appendChild(li);
  });
}

function desc() {
  let repositorioDesc = ordernaDesc(repositorios);
  load_repositories(repositorioDesc);
}

function asc() {
  let repositorioAsc = ordernaAsc(repositorios);
  load_repositories(repositorioAsc);
}

function ordernaDesc(array) {
  return array.sort(
    (a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count)
  );
}

function ordernaAsc(array) {
  return array.sort(
    (a, b) => parseFloat(a.stargazers_count) - parseFloat(b.stargazers_count)
  );
}

function HTTP(endpoint) {
  return new Promise((resolve, reject) => {
    fetch(URL + endpoint)
      .then(function(response) {
        response.json().then(function(data) {
          resolve(data);
        });
      })
      .catch(function(err) {
        reject(err);
      });
  });
}
