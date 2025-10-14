const cards = document.querySelector('#cards');

async function getDailyQuotes() {
  const url = 'https://poetrydb.org/random';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();
    const randomPoem = data[Math.floor(Math.random() * data.length)];
    displayQuotes([randomPoem]);

  } catch (error) {
    console.error(error.message);
    alert('Oops! Please try again later.');
  }
}

function displayQuotes(quotes) {
  cards.innerHTML = '';
  quotes.forEach(q => {
    const quoteCard = document.createElement('div');
    quoteCard.classList.add('quote-card');
    quoteCard.innerHTML = `
      <p>${q.lines.slice(0,3).join('<br>')}</p> 
      <small>— ${q.author || 'Unknown'}</small>
    `;//<div class="poem-lines">${poem.lines.slice(0, 3).join('<br>')}...</div>
    cards.appendChild(quoteCard);
  });
}

getDailyQuotes();