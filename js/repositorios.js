(function() {
  console.log(window.location.search);
  get_info_repositories();
})();
function get_info_repositories() {
  var url = new URLSearchParams(window.location.search);
  var c = url.get("repo");
  HTTP("repos/" + c).then(resp => {
    document.getElementById("nome-repo").innerHTML = resp.name;
    document.getElementById("desc-repo").innerHTML = resp.description;
    document.getElementById("start-repo").innerHTML = resp.stargazers_count;
    document.getElementById("ling-repo").innerHTML = resp.language;
    document.getElementById("link-repo").href = resp.url;
  });
}
