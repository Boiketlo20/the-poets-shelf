const getString = window.location.search;

const myInfo = new URLSearchParams(getString);
const selectedForums = [];

document.querySelector('#results').innerHTML = `
  <p>Your story begins here, ${myInfo.get('first')} ${myInfo.get('last')}!</p>
  <p>A world of poems awaits you tailored to your taste!</p>
  
  <p><strong>Updates you’ll receive:</strong></p>
  <ul>
    <li>New releases or updates from <strong>${myInfo.get('author')}</strong>.</li>
    <li>Curated recommendations sent to: <strong>${myInfo.get('email')}</strong>.</li>
    ${myInfo.get('phone') ? `<li>SMS updates to: <strong>${myInfo.get('phone')}</strong></li>` : ''}
  </ul>

  <p>Thank you for trusting us with your poetry journey! 🎉</p>
  <p><em>The Poet's Shelf Team</em></p>
`;
