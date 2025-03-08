const imageUrls = [
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/201',
    'https://invalid-url.com/404',
    'https://via.placeholder.com/202'
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
}

async function downloadImages() {
    const outputDiv = document.getElementById('output');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    outputDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    loadingDiv.style.display = 'block';

    try {
        const images = await Promise.all(imageUrls.map(downloadImage));
        images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

downloadImages();
