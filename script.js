const outputDiv = document.getElementById('output');
const cmdInput = document.getElementById('cmd');
let isWelcomeMessage = true;
let isWelcomeComplete = false;
let maksonConnected = false;
let isPasswordPrompted = false;
let isSelfieCamera = false;

simulateTerminalResponse('You are welcome to the ibrain terminal.\n- Name: IBRAIN \n - Version: 5.0 \n- Doc: 29, October, 2023 \n- Developer: Makson.')
setTimeout(() => simulateTerminalResponse('Please wait a while.'), 6000);

cmdInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const command = cmdInput.innerText.trim().toLowerCase();
        outputDiv.innerHTML += '<br><br>' + `<span style="color: #fff";>ANONYMOUS</span><span style="color: #fff"> |</span></span><span style="color: red">$ </span>` + `<span class="command" style="color: white;"> ${command}</span>`;
        cmdInput.setAttribute('contenteditable', 'true');
        cmdInput.style.padding = '';
        handleCommand(command);
        cmdInput.innerHTML = ''
        isWelcomeMessage = true;
    }
});
// Store omitted text
omittedText = response;

// Use Web Speech API to read the omitted text
readOmittedText();

function simulateTerminalResponse(response, callback) {
    outputDiv.innerHTML += '<br>' + '<span class="blue" style="color: #00BCF9;">IBR</span><span class="pink" style="color: #EE0292;">AIN</span> <span style="color: #fff">|</span><span style="color: red">$ ';
    const responseElement = document.createElement('span');
    responseElement.className = 'response-container';
    responseElement.style.color = "#0f0";
    outputDiv.appendChild(responseElement);

    // Add a unique ID to the response container
    const responseId = `response-${Date.now()}`;
    responseElement.id = responseId;

    const textContainer = document.createElement('span');
    textContainer.className = 'response-text';
    responseElement.appendChild(textContainer);

    let index = 0;
    const intervalId = setInterval(() => {
        if (response[index] === '\n') {
            textContainer.appendChild(document.createElement('br'));
        } else {
            textContainer.innerHTML += response[index] + '';
        }

        index++;

        if (index === response.length) {
            const copyButton = document.createElement('span');
            copyButton.innerText = '';

            // Modify the copy button click event
            copyButton.addEventListener('', () => {
                const range = document.createRange();
                range.selectNode(textContainer);
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(range);
                document.execCommand('');
                document.getSelection().removeAllRanges();
                copyButton.innerHTML = '';
            });

            responseElement.appendChild(copyButton);

            clearInterval(intervalId);
            cmdInput.focus();
            cmdInput.setAttribute('contenteditable', 'true');
            isWelcomeComplete = true; // Set to true after the welcome message
            if (callback) {
                callback(); // Execute the callback after animation completion
            }

            // Store omitted text
            omittedText = response;

            // ...
        }
    },
        30);
}

function handleCommand(command) {

    // ...

    if (command === 'read') {
        if (omittedText) {
            simulateTerminalResponse(`Read: ${omittedText}`);
        } else {
            simulateTerminalResponse('No omitted text available to read.');
        }
    }

    // ...


    if (command === 'alert') {
        // Create an audio element
        const alertAudio = new Audio('alert.mp3'); // Replace 'alert.mp3' with the actual path to your alert audio file

        // Get audio duration (length)
        const audioDuration = alertAudio.duration;

        // Play the alert audio
        alertAudio.play();

        // Display a message in the terminal
        simulateTerminalResponse(`Alert played! Audio is now playing. Length: ${formatTime(audioDuration)}.`);

        // Update the time left every second
        const intervalId = setInterval(() => {
            const currentTime = alertAudio.currentTime;
            const timeLeft = audioDuration - currentTime;

            if (timeLeft <= 0) {
                clearInterval(intervalId);
            }

            // Display current time and time left
            simulateTerminalResponse(`Current Time: ${formatTime(currentTime)} | Time Left: ${formatTime(timeLeft)}`);
        },
            1000);

        return; // Add this return statement to exit the function after handling the "alert" command
    }
    // Helper function to format time in MM:SS format
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2,
            '0')}:${String(seconds).padStart(2,
            '0')}`;
    }


    if (command === 'copy' || command === 'copy text' || command === 'copy the text' || command === 'get text' || command === 'get the text') {
        const responseContainers = document.querySelectorAll('.response-text');

        if (responseContainers.length > 0) {
            const lastResponseContainer = responseContainers[responseContainers.length - 1];

            const range = document.createRange();
            range.selectNode(lastResponseContainer);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);

            try {
                const success = document.execCommand('copy');
                if (success) {
                    simulateTerminalResponse('Omitted text copied successfully.');
                } else {
                    simulateTerminalResponse('Error: Copy command failed.');
                }
            } catch (error) {
                simulateTerminalResponse('Error: Unable to copy text.');
            }

            document.getSelection().removeAllRanges();
        } else {
            simulateTerminalResponse('Error: Unable to find text for copying.');
        }
    }
    if (command === 'connect makson') {
        if (!isPasswordPrompted) {
            simulateTerminalResponse('Enter password:');
            isPasswordPrompted = true;
        } else {
            const password = command.toLowerCase().trim(); // Replace this with actual password check logic

            if (password === '0852') {
                simulateTerminalResponse('Password correct. Connecting to makson.js...');

                countdown(5, () => {
                    setTimeout(() => {
                        loadScript('makson.js')
                        .then(() => {
                            simulateTerminalResponse('Successfully connected!');
                            maksonConnected = true;
                            // Call a function from makson.js after connecting
                            if (typeof maksonConnectFunction === 'function') {
                                maksonConnectFunction();
                            }
                        })
                        .catch(() => {
                            simulateTerminalResponse('Failed to load makson.js. File not found.');
                        });
                    }, 2000);
                });
            } else {
                simulateTerminalResponse('Access denied! Incorrect password.');
                isPasswordPrompted = false; // Reset for the next attempt
            }
        }
    } else if (command === 'copy') {
        // Select and copy the omitted text
        const omittedTextContainer = document.querySelector('.response-text');
        const range = document.createRange();
        range.selectNode(omittedTextContainer);
        document.execCommand('copy');
        simulateTerminalResponse('Omitted text copied successfully.');
    } else if (command === 'ibrain' || command === 'what is ibrain') {
        const ibrainintroResponse = 'IBRAIN Terminal, led by the intelligent Makson Chakma, is a dynamic website that serves as a hub for knowledge and information. Makson, known for his sharp intellect, has curated a platform designed to facilitate seamless interactions and provide a rich user experience. IBRAIN Terminal is not just a website; it\'s a testament to Makson\'s commitment to fostering a space where information converges effortlessly. Explore the realms of knowledge with Makson Chakma at the helm of IBRAIN Terminal.';
        simulateTerminalResponse(ibrainintroResponse);
    } else if (isPasswordPrompted) {
        const passwordAttempt = command.trim(); // This should be replaced with actual password input logic

        if (passwordAttempt === '0852') {
            simulateTerminalResponse('Access granted! Connecting makson.js');

            countdown(5, () => {
                setTimeout(() => {
                    loadScript('makson.js')
                    .then(() => {
                        maksonConnected = true;
                        // Call a function from makson.js after connecting
                        if (typeof maksonConnectFunction === 'function') {
                            maksonConnectFunction();
                        }
                    })
                    .catch(() => {
                        simulateTerminalResponse('Failed to load makson.js. File not found.');
                    });
                }, 2000);
            });
        } else {
            simulateTerminalResponse('Access denied. Incorrect password.');
            isPasswordPrompted = false; // Reset for the next attempt
        }
    } else if (command === 'help' || command === 'help me') {
        const helpResponse = 'Available commands:\n - help\n - ip\n - connect makson\n - phone info\n - take photo\n - battery info \n - print';
        simulateTerminalResponse(helpResponse);
    } else if (command.startsWith('count')) {
        const countValue = parseInt(command.split(' ')[1]);
        if (!isNaN(countValue) && countValue >= 0) {
            countdown(countValue, () => {
                simulateTerminalResponse(`Countdown completed: ${countValue}s`);
            });
        } else {
            simulateTerminalResponse('Invalid count value. Please provide a non-negative number.');
        }
    } else if (command.startsWith('print')) {
        const parts = command.split(' ');
        const textToPrint = parts.slice(1, -1).join(' ');
        const numToPrint = parseInt(parts[parts.length - 1]);

        if (!isNaN(numToPrint) && numToPrint >= 0) {
            let printedText = '';

            for (let i = 0; i < numToPrint; i++) {
                printedText += `${textToPrint}\n`;
            }

            simulateTerminalResponse(printedText);
        } else {
            simulateTerminalResponse('Invalid number. Please provide a non-negative integer.');
        }
    } else if (command === 'battery info') {
        if ('getBattery' in navigator) {
            navigator.getBattery()
            .then(battery => {
                let temperatureInfo = battery.temperature ? `Battery Temperature: ${battery.temperature}°C`: 'Battery Temperature: N/A';
                const batteryInfoResponse = `Your battery info:
                Battery Level: ${battery.level * 100}%
                Charging: ${battery.charging ? 'Yes': 'No'}
                ${temperatureInfo}
                Charging Time: ${battery.chargingTime > 0 ? battery.chargingTime + ' seconds': 'N/A'}
                Discharging Time: ${battery.dischargingTime > 0 ? battery.dischargingTime + ' seconds': 'N/A'}
                Cable Connected: ${battery.charging ? 'Yes': 'No'}
                `;
                simulateTerminalResponse(batteryInfoResponse.replace(/\n\s*/g, '\n'));
            })
            .catch(error => {
                simulateTerminalResponse('Failed to retrieve battery information. Please try again.');
            });
        } else {
            simulateTerminalResponse('Battery information is not supported in this browser.');
        }
    } else if (command === 'phone info') {
        if ('getBattery' in navigator && 'deviceMemory' in navigator && 'hardwareConcurrency' in navigator && 'storage' in navigator) {
            navigator.getBattery()
            .then(battery => {
                let temperatureInfo = battery.temperature ? `Battery Temperature: ${battery.temperature}°C`: 'Battery Temperature: N/A';

                navigator.storage.estimate()
                .then(storageInfo => {
                    const spaceRemaining = formatBytes(storageInfo.quota - storageInfo.usage);
                    const numOfFiles = typeof storageInfo.fileCount !== 'undefined' ? storageInfo.fileCount: 'N/A';

                    const phoneInfoResponse = `Your phone information:
                    Battery Level: ${battery.level * 100}%
                    Charging: ${battery.charging ? 'Yes': 'No'}
                    ${temperatureInfo}
                    Charging Time: ${battery.chargingTime > 0 ? battery.chargingTime + ' seconds': 'N/A'}
                    Cable Connected: ${battery.charging ? 'Yes': 'No'}
                    Device Memory: ${navigator.deviceMemory} GB
                    CPU Cores: ${navigator.hardwareConcurrency}
                    Space Remaining: ${spaceRemaining}
                    Number of Files: ${numOfFiles}
                    `;
                    simulateTerminalResponse(phoneInfoResponse.replace(/\n\s*/g, '\n'));
                })
                .catch(error => {
                    simulateTerminalResponse('Failed to retrieve storage information. Please try again.');
                });
            })
            .catch(error => {
                simulateTerminalResponse('Failed to retrieve phone information. Please try again.');
            });
        } else {
            simulateTerminalResponse('Phone information is not fully supported in this browser.');
        }
    } else if (command === 'file ls') {
        // Replace this with your logic to fetch and display the list of files

        // Assume you have a server endpoint that provides the list of files
        const serverEndpoint = 'https://your-api-server.com/getFiles';

        // Fetch the file list from the server
        fetch(serverEndpoint)
        .then(response => response.json())
        .then(data => {
            // Format the file names for display
            const fileListResponse = data.files.join('\n');
            simulateTerminalResponse(fileListResponse);
        })
        .catch(error => {
            simulateTerminalResponse('Failed to fetch file list. Please try again.');
        });
    } else if (command === 'take photo') {
        takePhoto();
    } else if (command === 'capture') {
        // Display a message instructing the user to prepare for the photo
        simulateTerminalResponse('Get ready to capture! Use the command "take photo" to capture the photo.');
    } else if (command === 'take photo') {
        // Call the takePhoto function to capture the photo
        takePhoto();
    } else if (command === 'ip' || command === 'my ip' || command === 'what is my ip' || command === 'ip address') {
        getUserIP().then(ip => {
            const ipResponse = `Your IP Address: ${ip}`;
            simulateTerminalResponse(ipResponse);
        });
    } else if (command === 'ok' || command === 'thank you' || command === 'thank' || command === 'thnx' || command === 'thanks' || command === 'then cmd') {
        const gratitudeResponses = [
            'You\'re welcome!',
            'No problem!',
            'Glad I could help!',
            'Anytime!',
            'You got it!',
            'Sure thing!'
        ];

        const randomResponse = gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)];
        simulateTerminalResponse(randomResponse);
    } else if (
        command === 'what are you doing' ||
        command === 'what\'s are you doing' ||
        command === 'what\'s are you doing now' ||
        command === 'what are you doing now'
    ) {
        const doingResponses = [
            'I\'m assisting you right now.',
            'Just helping out with your queries.',
            'Answering your commands and questions.',
            'Engaged in chat mode.',
            'Providing information and assistance.',
            'Responding to your inputs.',
            'Executing your commands.',
            'Being your virtual assistant.',
            'Responding to your inquiries.',
            'Assisting with various tasks.'
        ];
        const trimmedCommand = command.replace(/[?]/g, '').trim();
        const randomResponse = doingResponses[Math.floor(Math.random() * doingResponses.length)];
        simulateTerminalResponse(randomResponse);
    } else if (command === 'asha' || command === 'asha yuni' || command === 'ashayuni' || command === 'about asha' || command === 'about asha yuni' || command === 'who is asha' || command === 'who is asha yuni' || command === 'axha') {
        const aboutAshaYuni = 'Asha Yuni, a vibrant 9th-grade student, finds joy in exploring the rich world of Korean culture. Her passion for learning and embracing diversity shines through in her academic journey.\n  Bio: \n - Dob: 18, April, 2006\n - Pob: Roing, Arunachal Pradesh, \n - Father: Unable to fetch. \n- Mother: Unable to fetch.\n - error fetching more detail. \n To view her image please command "fa img ashayuni"';
        simulateTerminalResponse(aboutAshaYuni);
    } else if (command === 'fa img ashayuni') {
        const faimgashayuni = 'Error! You need to connect makson.js, please command "connect makson"';
        simulateTerminalResponse(faimgashayuni);
    }
    else if (command === 'good') {
        const nemagoodResponse = 'Wow! It\s sound beautiful!\n - What is your mood now? Please type:\n - Happy\n -Sad".';
        simulateTerminalResponse(nemagoodResponse);
    }
    
    else if (command === 'bad') {
        const nemabadResponse = '- Oh really? I\m sorry! Please close the IBRAIN page!';
        simulateTerminalResponse(nemabadResponse);
    }
else if (command === 'happy') {
        const nemahappyResponse = 'I\m glad to jear. - There\s something specific I want to say? Please say you wont misunderstand me? \n Type: \n - You may\n - You may not".';
        simulateTerminalResponse(nemahappyResponse);
    }
else if (command === 'you may') {
        const nemayoumayResponse = 'Oh you\re agreed. Today I\m going to tell about something, secret. Type:\n - Tell me please \n- Ignore';
        simulateTerminalResponse(nemayoumayResponse);
    }

    else if (command === 'catch me') {
        const catchText = 'I catch you!';
        const catchCount = 1000000000000000000000000000000000000000000000000000000000000000000000000000000;






        // Check if the catch count is valid
        if (!isNaN(catchCount) && catchCount >= 0) {
            let printedText = '';

            // Generate the repeated text
            for (let i = 0; i < catchCount; i++) {
                printedText += `${catchText}\n`;
            }

            // Display the repeated text
            simulateTerminalResponse(printedText);
        } else {
            simulateTerminalResponse('Invalid catch count. Please provide a non-negative integer.');
        }
    } else {
        simulateTerminalResponse('Command not recognized');
    }
}

function loadScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
            console.log(`Script loaded: ${scriptUrl}`);
            resolve();
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${scriptUrl}`);
            reject();
        };
        document.head.appendChild(script);
    });
}

function countdown(seconds, callback) {
    let count = seconds;
    const intervalId = setInterval(() => {
        simulateTerminalResponse(`Please wait: ${count}s`);
        count--;

        if (count < 0) {
            clearInterval(intervalId);
            callback();
        }
    },
        1000);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0: decimals;
    const sizes = ['Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Update the openCamera function
function openCamera() {
    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the user's camera
        navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function (stream) {
            // Display the camera stream in a video element
            const video = document.createElement('video');
            video.srcObject = stream;
            document.body.appendChild(video);
            video.play();
        })
        .catch(function (error) {
            console.error('Error accessing camera:', error);
            simulateTerminalResponse('Error: Unable to access the camera.');
        });
    } else {
        console.error('getUserMedia is not supported in this browser');
        simulateTerminalResponse('Error: Camera access is not supported in this browser.');
    }
}

function takePhoto() {
    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Display countdown before taking a photo
        countdown(5, () => {
            // Access the user's camera
            navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(function (stream) {
                // Display the camera stream in a video element
                const video = document.createElement('video');
                video.srcObject = stream;
                document.body.appendChild(video);
                video.play();

                // Wait for the video to be fully loaded
                video.addEventListener('loadedmetadata', function () {
                    // Create a canvas element to capture the photo
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const context = canvas.getContext('2d');

                    // Render the video on the canvas
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert the canvas to a data URL
                    const dataURL = canvas.toDataURL('image/png');

                    // Create a link element to download the photo
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'makson_photo.png';
                    link.click();

                    // Remove the video and canvas elements
                    document.body.removeChild(video);
                    document.body.removeChild(canvas);
                });
            })
            .catch(function (error) {
                console.error('Error accessing camera:', error);
                simulateTerminalResponse('Error: Unable to access the camera.');
            });
        });
    } else {
        console.error('getUserMedia is not supported in this browser');
        simulateTerminalResponse('Error: Camera access is not supported in this browser.');
    }
}