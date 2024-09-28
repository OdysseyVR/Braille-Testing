console.log("New script loaded - version 3");

let brailleDots = [false, false, false, false, false, false];
let targetLetter = '';

const brailleAlphabet = [
    { letter: 'A', pattern: [1,0,0,0,0,0] },
    { letter: 'B', pattern: [1,1,0,0,0,0] },
    { letter: 'C', pattern: [1,0,0,1,0,0] },
    { letter: 'D', pattern: [1,0,0,1,1,0] },
    { letter: 'E', pattern: [1,0,0,0,1,0] },
    { letter: 'F', pattern: [1,1,0,1,0,0] },
    { letter: 'G', pattern: [1,1,0,1,1,0] },
    { letter: 'H', pattern: [1,1,0,0,1,0] },
    { letter: 'I', pattern: [0,1,0,1,0,0] },
    { letter: 'J', pattern: [0,1,0,1,1,0] },
    { letter: 'K', pattern: [1,0,1,0,0,0] },
    { letter: 'L', pattern: [1,1,1,0,0,0] },
    { letter: 'M', pattern: [1,0,1,1,0,0] },
    { letter: 'N', pattern: [1,0,1,1,1,0] },
    { letter: 'O', pattern: [1,0,1,0,1,0] },
    { letter: 'P', pattern: [1,1,1,1,0,0] },
    { letter: 'Q', pattern: [1,1,1,1,1,0] },
    { letter: 'R', pattern: [1,1,1,0,1,0] },
    { letter: 'S', pattern: [0,1,1,1,0,0] },
    { letter: 'T', pattern: [0,1,1,1,1,0] },
    { letter: 'U', pattern: [1,0,1,0,0,1] },
    { letter: 'V', pattern: [1,1,1,0,0,1] },
    { letter: 'W', pattern: [0,1,0,1,1,1] },
    { letter: 'X', pattern: [1,0,1,1,0,1] },
    { letter: 'Y', pattern: [1,0,1,1,1,1] },
    { letter: 'Z', pattern: [1,0,1,0,1,1] },
    // Numbers
    { letter: '1', symbol: '⠼⠁' },
    { letter: '2', symbol: '⠼⠃' },
    { letter: '3', symbol: '⠼⠉' },
    { letter: '4', symbol: '⠼⠙' },
    { letter: '5', symbol: '⠼⠑' },
    { letter: '6', symbol: '⠼⠋' },
    { letter: '7', symbol: '⠼⠛' },
    { letter: '8', symbol: '⠼⠓' },
    { letter: '9', symbol: '⠼⠊' },
    { letter: '0', symbol: '⠼⠚' },
    // Contractions
    { letter: 'and', symbol: '⠯' },
    { letter: 'for', symbol: '⠿' },
    { letter: 'of', symbol: '⠷' },
    { letter: 'the', symbol: '⠮' },
    { letter: 'with', symbol: '⠾' },
    { letter: 'ch', symbol: '⠡' },
    { letter: 'gh', symbol: '⠣' },
    { letter: 'sh', symbol: '⠩' },
    { letter: 'th', symbol: '⠹' },
    { letter: 'wh', symbol: '⠱' },
    { letter: 'ed', symbol: '⠫' },
    { letter: 'er', symbol: '⠻' },
    { letter: 'ou', symbol: '⠳' },
    { letter: 'ow', symbol: '⠪' },
    { letter: 'ar', symbol: '⠜' },
    { letter: 'ing', symbol: '⠬' }
];

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(`${page}-page`).style.display = 'block';

    if (page === 'grade1') {
        loadGrade1Content();
    } else if (page === 'grade2') {
        loadGrade2Content();
    } else if (page === 'practice') {
        loadPracticeContent();
    }
}

function loadPracticeContent() {
    console.log("Loading practice content - version 4");
    const practiceContent = document.getElementById('practice-content');
    practiceContent.innerHTML = `
        <p>Type Braille symbols using your keyboard. Use the keys SDF (dots 1-3) and JKL (dots 4-6).</p>
        <div id="braille-input-area">
            <div id="braille-display">
                <div class="braille-column">
                    <div class="braille-dot" id="dot-1"></div>
                    <div class="braille-dot" id="dot-2"></div>
                    <div class="braille-dot" id="dot-3"></div>
                </div>
                <div class="braille-column">
                    <div class="braille-dot" id="dot-4"></div>
                    <div class="braille-dot" id="dot-5"></div>
                    <div class="braille-dot" id="dot-6"></div>
                </div>
            </div>
            <input type="text" id="braille-input" autofocus placeholder="Press SDFJKL to input Braille" onkeydown="handleBrailleInput(event)" readonly>
        </div>
        <p>Current letter to practice: <span id="target-letter"></span></p>
        <button onclick="checkBrailleInput()">Check Input</button>
        <p id="braille-feedback" class="feedback"></p>
        <button onclick="generateNewLetter()">New Letter</button>
    `;
    generateNewLetter();
    updateBrailleDisplay();
}

function handleBrailleInput(event) {
    const key = event.key.toLowerCase();
    const dotIndex = 'sdfjkl'.indexOf(key);
    if (dotIndex !== -1) {
        brailleDots[dotIndex] = !brailleDots[dotIndex];
        updateBrailleDisplay();
        console.log("Updated braille dots:", brailleDots.map(d => d ? 1 : 0).join(''));
        event.preventDefault();
    }
}

function updateBrailleDisplay() {
    console.log("Updating Braille display - version 3");
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            if (brailleDots[i - 1]) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        }
    }
}

function generateNewLetter() {
    const randomIndex = Math.floor(Math.random() * brailleAlphabet.length);
    targetLetter = brailleAlphabet[randomIndex].letter;
    document.getElementById('target-letter').textContent = targetLetter;
    resetBrailleDots();
}

function resetBrailleDots() {
    brailleDots = [false, false, false, false, false, false];
    updateBrailleDisplay();
}

function checkBrailleInput() {
    console.log("Checking Braille input");
    const correctEntry = brailleAlphabet.find(item => item.letter === targetLetter);
    console.log("Target letter:", targetLetter);
    console.log("Input pattern:", brailleDots.map(d => d ? 1 : 0).join(''));
    console.log("Correct pattern:", correctEntry ? correctEntry.pattern.join('') : "Not found");

    const feedback = document.getElementById('braille-feedback');

    const isCorrect = patternsMatch(brailleDots, correctEntry.pattern);
    console.log("Patterns match:", isCorrect);

    if (correctEntry && isCorrect) {
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
        setTimeout(() => {
            feedback.textContent = '';
            generateNewLetter();
        }, 1000);
    } else {
        feedback.textContent = 'Incorrect. Try again.';
        feedback.className = 'feedback incorrect';
    }
}

function patternsMatch(inputPattern, correctPattern) {
    const match = inputPattern.every((value, index) => (value === true) === (correctPattern[index] === 1));
    console.log("Pattern comparison:");
    inputPattern.forEach((value, index) => {
        console.log(`Dot ${index + 1}: Input=${value}, Correct=${correctPattern[index]}, Match=${(value === true) === (correctPattern[index] === 1)}`);
    });
    return match;
}

function brailleDotsToSymbol(dots) {
    const base = 0x2800;
    const binaryString = dots.map((dot, index) => {
        // Reorder the dots to match Braille cell order
        const order = [0, 3, 1, 4, 2, 5];
        return dot ? '1' : '0';
    }).join('');
    const decimalValue = parseInt(binaryString, 2);
    return String.fromCharCode(base + decimalValue);
}

// Initialize the app
navigateTo('welcome');

function loadGrade1Content() {
    console.log("Loading Grade 1 content");
    const content = document.getElementById('grade1-content');
    let alphabetHTML = '<h3>Grade 1 Braille Alphabet</h3><div class="braille-grid">';
    
    brailleAlphabet.forEach(item => {
        if (item.letter.length === 1 && isNaN(item.letter)) {  // Only single letters, no numbers
            alphabetHTML += `
                <div class="braille-item">
                    <span class="braille-symbol">${item.symbol}</span>
                    <span class="braille-letter">${item.letter}</span>
                </div>
            `;
        }
    });
    
    alphabetHTML += '</div>';
    content.innerHTML = alphabetHTML;
}

function loadGrade2Content() {
    console.log("Loading Grade 2 content");
    const content = document.getElementById('grade2-content');
    let contractionHTML = '<h3>Grade 2 Braille Contractions</h3><div class="braille-grid">';
    
    brailleAlphabet.forEach(item => {
        if (item.letter.length > 1 || !isNaN(item.letter)) {  // Contractions and numbers
            contractionHTML += `
                <div class="braille-item">
                    <span class="braille-symbol">${item.symbol}</span>
                    <span class="braille-letter">${item.letter}</span>
                </div>
            `;
        }
    });
    
    contractionHTML += '</div>';
    content.innerHTML = contractionHTML;
}

function displayBrailleState() {
    const stateDiv = document.createElement('div');
    stateDiv.id = 'braille-state';
    stateDiv.style.fontFamily = 'monospace';
    stateDiv.style.marginTop = '10px';
    const brailleInputArea = document.getElementById('braille-input-area');
    brailleInputArea.appendChild(stateDiv);
}

function updateBrailleState() {
    const stateDiv = document.getElementById('braille-state');
    if (stateDiv) {
        stateDiv.textContent = `Braille state: ${brailleDots.map(d => d ? '1' : '0').join('')}`;
    }
}

// Call this in loadPracticeContent
displayBrailleState();

// Call this in handleBrailleInput and resetBrailleDots
updateBrailleState();
