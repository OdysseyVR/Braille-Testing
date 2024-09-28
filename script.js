console.log("New script loaded - version 3");

let brailleDots = [false, false, false, false, false, false];
let targetLetter = '';

const brailleAlphabet = [
    { letter: 'A', symbol: '⠁' },
    { letter: 'B', symbol: '⠃' },
    { letter: 'C', symbol: '⠉' },
    { letter: 'D', symbol: '⠙' },
    { letter: 'E', symbol: '⠑' },
    { letter: 'F', symbol: '⠋' },
    { letter: 'G', symbol: '⠛' },
    { letter: 'H', symbol: '⠓' },
    { letter: 'I', symbol: '⠊' },
    { letter: 'J', symbol: '⠚' },
    { letter: 'K', symbol: '⠅' },
    { letter: 'L', symbol: '⠇' },
    { letter: 'M', symbol: '⠍' },
    { letter: 'N', symbol: '⠝' },
    { letter: 'O', symbol: '⠕' },
    { letter: 'P', symbol: '⠏' },
    { letter: 'Q', symbol: '⠟' },
    { letter: 'R', symbol: '⠗' },
    { letter: 'S', symbol: '⠎' },
    { letter: 'T', symbol: '⠞' },
    { letter: 'U', symbol: '⠥' },
    { letter: 'V', symbol: '⠧' },
    { letter: 'W', symbol: '⠺' },
    { letter: 'X', symbol: '⠭' },
    { letter: 'Y', symbol: '⠽' },
    { letter: 'Z', symbol: '⠵' },
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
    const inputSymbol = brailleDotsToSymbol(brailleDots);
    const correctEntry = brailleAlphabet.find(item => item.letter === targetLetter);
    const feedback = document.getElementById('braille-feedback');

    if (correctEntry && inputSymbol === correctEntry.symbol) {
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
        setTimeout(generateNewLetter, 1000);
    } else {
        feedback.textContent = 'Incorrect. Try again.';
        feedback.className = 'feedback incorrect';
    }
}

function brailleDotsToSymbol(dots) {
    const base = 0x2800;
    const binaryString = dots.map(dot => dot ? '1' : '0').join('');
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