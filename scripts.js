const username = 'aryan9190';
const maxPages = 3;
const hideForks = true;
const repoList = document.querySelector('.repo-list');
const reposSection = document.querySelector('.repos');

// Get user's GitHub profile data
const getProfile = async () => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    displayProfile(profile);
};
getProfile();

// Display user's GitHub profile data
const displayProfile = (profile) => {
    const userInfo = document.querySelector('.user-info');
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <h2><a href=${profile.html_url}><strong>${profile.name} - ${profile.login}</strong></a></h2>
            <p>${profile.bio}</p>
            <p>
                Followers: <strong>${profile.followers}</strong>
                Repos: <strong>${profile.public_repos}</strong>
                Gists: <strong>${profile.public_gists}</strong>
            </p>
            <p>
                Work: ${profile.company}
                Location: ${profile.location}
            </p>
        </div>
    `;
};

// Get user's GitHub repositories
const getRepos = async () => {
    let repos = [];
    let res;
    for (let i = 1; i <= maxPages; i++) {
        res = await fetch(`https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`);
        let data = await res.json();
        repos = repos.concat(data);
    }
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    repos.sort((a, b) => b.forks_count - a.forks_count);
    displayRepos(repos);
};
getRepos();

// Display user's GitHub repositories
const displayRepos = (repos) => {
    const userHome = `https://github.com/${username}`;
    for (const repo of repos) {
        if (repo.fork && hideForks) continue;

        const repoItem = document.createElement('li');
        repoItem.classList.add('repo');

        repoItem.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description provided'}</p>
            <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
        `;

        repoList.appendChild(repoItem);
    }
};

// Fetch and display GitHub stats
const fetchGitHubStats = () => {
    const statsDiv = document.getElementById('github-stats');
    statsDiv.innerHTML = `
        <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark" alt="GitHub Stats" class="github-card">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark" alt="GitHub Streak Stats" class="github-card">
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark" alt="Top Languages" class="github-card">
    `;
};
fetchGitHubStats();
