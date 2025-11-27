/** @type {HTMLInputElement} */
const slider = document.getElementById('tempo-slider');
/** @type {HTMLInputElement} */
const tempoInput = document.getElementById('tempo-display');
const incButton = document.getElementById('increase-tempo');
const decButton = document.getElementById('decrease-tempo');

/**
 * Load saved tempo from localStorage and update the slider and display.
 */
function loadSavedTempo() {
    const savedTempo = localStorage.getItem('metronomeTempo');
    if (savedTempo) {
        slider.value = savedTempo;
        updateTempoDisplay(savedTempo);
    } else {
        updateTempoDisplay(slider.value);
    }
}

/**
 * Add event listeners to the slider and buttons.
 */
function addListeners() {
    slider.addEventListener('input', handleSliderInput);
    incButton.addEventListener('click', () => handleTempoButtonClick(1));
    decButton.addEventListener('click', () => handleTempoButtonClick(-1));
    tempoInput.addEventListener('input', handleTempoInputChange);
    tempoInput.addEventListener('blur', handleTempoInputBlur);
}

loadSavedTempo();
addListeners();

/**
 * Handle slider input event.
 * @param {Event} event The slider input event
 */
function handleSliderInput(event) {
    const tempoValue = parseInt(event.target.value, 10);
    updateTempoDisplay(tempoValue);
}

/**
 * Handle a button click to adjust tempo.
 * @param {number} amount The amount to adjust tempo by
 */
function handleTempoButtonClick(amount) {
    let newValue = parseInt(slider.value, 10) + amount;
    if (newValue < parseInt(slider.min, 10)) {
        newValue = parseInt(slider.min, 10);
    } else if (newValue > parseInt(slider.max, 10)) {
        newValue = parseInt(slider.max, 10);
    }
    slider.value = newValue;
    updateTempoDisplay(newValue);
}

/**
 * Updates the tempo display with the given value.
 * @param {number} value The tempo value
 */
function updateTempoDisplay(value) {
    console.debug(typeof value);

    tempoInput.value = value.toString();
    saveTemp(value);
}

/**
 * 
 * @param {number} value The tempo value to save
 */
function saveTemp(value) {
    localStorage.setItem('metronomeTempo', value);
}

/**
 * Handle tempo input change event
 * @param {Event} event The input event
 */
function handleTempoInputChange(event) {
    let value = event.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    // Update both input and slider
    tempoInput.value = value.toString();
    slider.value = value.toString();
    saveTemp(value);
}

/**
 * Handle tempo input blur event
 * @param {Event} event The input blur event
 */
function handleTempoInputBlur(event) {
    let value = parseInt(event.target.value, 10);
    
    // Clamp value to slider min/max
    if (value < parseInt(slider.min, 10)) {
        value = parseInt(slider.min, 10);
    } else if (value > parseInt(slider.max, 10)) {
        value = parseInt(slider.max, 10);
    }

    // Update both input and slider
    tempoInput.value = value.toString();
    slider.value = value.toString();
    saveTemp(value);
}