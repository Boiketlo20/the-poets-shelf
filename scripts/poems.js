
const cards = document.querySelector('#cards');

// Curated list of popular poets from PoetryDB
const popularPoets = [
  "William Shakespeare", "Edgar Allan Poe", "Emily Dickinson", 
  "William Wordsworth", "Paul Laurence Dunbar", "John Keats",
  "Percy Bysshe Shelley", "James Thomson", "William Blake",
  "Elizabeth Barrett Browning", "Robert Browning", "Phillis Wheatley",
  "William Blake", "John Milton", "Oscar Wilde", "Lord Alfred Tennyson",
  "Geoffrey Chaucer", "Alexander Pope", "Emily Bronte", "Christina Rossetti"
];

function displayPoets() {
  cards.innerHTML = '';
  popularPoets.forEach(author => {
    const poetCard = document.createElement('div');
    poetCard.classList.add('poet-card');
    poetCard.innerHTML = `
      <h3>${author}</h3>
      <button onclick="getAuthorPoems('${author}')">View Poems</button>
    `;
    cards.appendChild(poetCard);
  });
}

async function getAuthorPoems(authorName) {
  try {
    const url = `https://poetrydb.org/author/${encodeURIComponent(authorName)}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Failed to fetch poems');
    
    const poems = await response.json();
    displayAuthorPoems(poems, authorName);
  } catch (error) {
    console.error('Error fetching poems:', error);
    alert('Failed to load poems. Please try again.');
  }
}

function displayAuthorPoems(poems, authorName) {
  cards.innerHTML = `
    <button onclick="displayPoets()">← Back to Authors</button>
    <h2>Poems by ${authorName}</h2>
  `;
  
  poems.forEach(poem => {
    const poemCard = document.createElement('div');
    poemCard.classList.add('poem-card');
    poemCard.innerHTML = `
      <h3>${poem.title}</h3>
      <p>${poem.lines.slice(0, 4).join('<br>')}...</p>
      <button onclick="showFullPoem(${JSON.stringify(poem).replace(/"/g, '&quot;')})">
        Read Full Poem
      </button>
    `;
    cards.appendChild(poemCard);
  });
}

function showFullPoem(poem) {
  cards.innerHTML = `
    <div class="poem-wrapper">
    <button onclick="getAuthorPoems('${poem.author}')">← Back to Poems</button>
    <h2>${poem.title}</h2>
    <h3>By ${poem.author}</h3>
    <div class="poem-content">
      ${poem.lines.join('<br>')}
    </div>
    </div>
  `;
}

// Initialize
displayPoets();