
        // Function to get user's IP address
        const getUserIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
                return 'unknown';
            }
        };

        // Display the user's full IPv4 address with typewriter animation
        const displayFullUserIPv4 = async () => {
            const userIP = await getUserIP();
            const userIPElement = document.getElementById('userIP');

            // Create typewriter effect
            for (let i = 0; i < userIP.length; i++) {
                setTimeout(() => {
                    userIPElement.innerText = 'yourIP/'+userIP.substring(0, i + 1)+':';
                }, 100 * i);
            }
        };

        // Call the function when the page is loaded
        window.onload = displayFullUserIPv4;
    