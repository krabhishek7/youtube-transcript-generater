window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.youtube-png');
    if (img) {
        img.addEventListener('load', () => {
            console.log('Image loaded successfully');
        });
        img.addEventListener('error', () => {
            console.error('Failed to load image');
            console.error('Image path:', img.src);
        });
    } else {
        console.error('Image element not found');
    }
}); 