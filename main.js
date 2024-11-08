// Fetch JSON từ GitHub và render ra giao diện
async function fetchAppsData() {
    try {
        const response = await fetch('https://repo.ucerts.io'); // Đường dẫn tới file JSON
        const data = await response.json();

        const apps = data.apps; // Lấy danh sách apps từ JSON
        const container = document.getElementById('appContainer');
        const searchInput = document.getElementById('searchInput');

        // Hàm hiển thị ứng dụng
        const displayApps = (apps) => {
            container.innerHTML = ''; // Xóa nội dung hiện tại
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

        // Hiển thị tất cả ứng dụng ban đầu
        displayApps(apps);

        // Thêm sự kiện tìm kiếm
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm));
            displayApps(filteredApps); // Hiển thị ứng dụng đã lọc
        });
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

// Gọi hàm để fetch và hiển thị dữ liệu
fetchAppsData();
