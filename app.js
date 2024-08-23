document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const result = document.getElementById('result');
    const shortenedUrl = document.getElementById('shortenedUrl');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const longUrl = urlInput.value;
        const accessToken = 'e1f5ccf7482b7b967e90318dc084c64a73fdba6e'; // Replace with your Bitly access token

        try {
            const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ long_url: longUrl }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            shortenedUrl.href = data.link;
            shortenedUrl.textContent = data.link;
            result.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to shorten the URL. Please try again.');
        }
    });
});
