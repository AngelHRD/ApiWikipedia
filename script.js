const wiki = async (searchInput) => {
  //Appel l'API
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
  );
  // Conversion en JSON
  const data = await response.json();

  // Recherche dans l'objet data
  const searchInfo = data.query.search;

  // Ou les résultats vont être afficher
  const titleContainer = document.querySelector(".mainDiv");

  // Réinitialise le container
  titleContainer.innerHTML = "";

  // Boucle pour parourir chaque élément de l'API
  searchInfo.forEach((INFO) => {
    // Crée une div pour afficher
    const searchElement = document.createElement("div");
    searchElement.innerHTML = `
    <div class="result">
    <h2>${INFO.title}</h2>
    <p>${INFO.snippet}</p>
    <a>${INFO.pageid}</a>
    `;
    titleContainer.appendChild(searchElement);
  });
};

// Selection de l'input dans le DOM
const input = document.getElementById("research");
// Ajout event
input.addEventListener("input", () => {
  // Recup la valeur saisie par l'utilisateur
  const searchInput = input.value.trim();
  if (searchInput) {
    wiki(searchInput);
  }
});
