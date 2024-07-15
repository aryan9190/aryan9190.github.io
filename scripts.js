document.addEventListener('DOMContentLoaded', () => {
  fetchGitHubStats();
});

function fetchGitHubStats() {
  fetch('https://api.github.com/users/aryan9190/repos')
    .then(response => response.json())
    .then(repos => {
      const statsDiv = document.getElementById('github-stats');
      repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';
        repoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        statsDiv.appendChild(repoDiv);
      });
    })
    .catch(error => console.error('Error fetching GitHub data:', error));
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Message sent successfully!');
  form.reset();
});
