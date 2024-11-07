async function fetchAppsData() {
    try {
        // Gọi API
        const response = await fetch('https://repo.upglobal.pro');
        
        // Kiểm tra phản hồi HTTP có thành công không
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Cố gắng chuyển đổi dữ liệu thành JSON
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            throw new Error('Lỗi khi chuyển đổi dữ liệu thành JSON: ' + jsonError.message);
        }

        // Kiểm tra xem có trường "apps" trong dữ liệu hay không
        if (!data.apps || !Array.isArray(data.apps)) {
            throw new Error('Dữ liệu không hợp lệ: Không có trường "apps" hoặc "apps" không phải mảng.');
        }

        // Lấy danh sách ứng dụng
        const apps = data.apps;
        const container = document.getElementById('appContainer');
        const searchInput = document.getElementById('searchInput');

        // Hiển thị danh sách ứng dụng
        const displayApps = (apps) => {
            container.innerHTML = '';  // Xóa nội dung cũ trong container
            if (apps.length === 0) {
                container.innerHTML = '<p>Không có ứng dụng nào để hiển thị.</p>';
                return;
            }

            // Tạo và thêm các hộp ứng dụng vào container
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

        // Hiển thị danh sách ứng dụng ban đầu
        displayApps(apps);

        // Tìm kiếm ứng dụng khi người dùng nhập vào ô tìm kiếm
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm));
            displayApps(filteredApps);
        });

    } catch (error) {
        // In ra thông báo lỗi chi tiết
        console.error('Lỗi khi tải dữ liệu:', error);
        const container = document.getElementById('appContainer');
        container.innerHTML = `<p style="color: red;">Có lỗi xảy ra khi tải dữ liệu: ${error.message}</p>`;
    }
}

// Gọi hàm fetchAppsData khi trang được tải
fetchAppsData();
