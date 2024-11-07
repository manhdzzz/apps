async function fetchAppsData() {
    try {
        const response = await fetch('https://repo.upglobal.pro');
        const data = await response.json();

        const apps = data.apps;
        const container = document.getElementById('appContainer');
        const searchInput = document.getElementById('searchInput');

        const displayApps = (apps) => {
            container.innerHTML = '';
            apps.forEach(app => {
                const appBox = document.createElement('div');
                appBox.className = 'app-box';

                appBox.innerHTML = `
                    <img src="${app.iconURL}" alt="${app.name} Icon" class="app-icon">
                    <h3>${app.name}</h3>
                    <p><strong>Bundle ID:</strong> ${app.bundleID}</p>
                    <p><strong>Version:</strong> ${app.version}</p>
                    <p><strong>Version Date:</strong> ${app.versionDate}</p>
                    <p><strong>Developer:</strong> ${app.developerName || 'N/A'}</p>
                    <p><strong>Description:</strong> ${app.localizedDescription}</p>
                    <a href="${app.downloadURL}" class="download-btn" target="_blank">Tải về</a>
                `;

                container.appendChild(appBox);
            });
        };

        displayApps(apps);

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm));
            displayApps(filteredApps);
        });
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

fetchAppsData();
