const cards = document.querySelector('#cards');

async function getDailyQuotes() {
  const url = 'https://api.allorigins.win/get?url=https://favqs.com/api/qotd';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const data = await response.json();
    const quoteData = JSON.parse(data.contents); // FavQs response inside `contents`
    displayQuotes([quoteData.quote]); // wrap in array for displayQuotes

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
      <p>"${q.body}"</p>
      <small>— ${q.author || 'Unknown'}</small>
    `;
    cards.appendChild(quoteCard);
  });
}

getDailyQuotes();