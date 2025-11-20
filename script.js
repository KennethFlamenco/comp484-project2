$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.attack-button').click(clickedAttackButton);




})

const sounds = {
  treat: new Audio("sounds/dog-eating-biscuits-32876.mp3"),
  play: new Audio("sounds/animated-dog-panting-287307.mp3"),
  exercise: new Audio("sounds/dog-barking-406629.mp3"),
  attack: new Audio("sounds/dog-growl-61002.mp3"),
}

let currentSound = null; // reference the current sound being played

//play sound function
function playSound(sound) {
  // stops sound if new sound is played
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }
  //start new sound
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => { }); //stops autoplay

    currentSound = sound;

    setTimeout(() => {
      if (currentSound === sound) {   // only stop if it's still the active one
        currentSound.pause();
        currentSound.currentTime = 0;
        currentSound = null;
      }
    }, 3000); // stops after 3 seconds
  }
}

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Onyx", weight: "70", happiness: "8", energy: "50" };

function clickedTreatButton() {
  //Increase pet happiness parseInt because if not it would add to string
  pet_info.happiness = parseInt(pet_info.happiness) + 4;
  //Increase pet weight
  pet_info.weight = parseInt(pet_info.weight) + 1;
  //Increase energy
  pet_info.energy = parseInt(pet_info.energy) + 10;
  playSound(sounds.treat);
  showPetMessage("Bark!");
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness = parseInt(pet_info.happiness) + 3;
  // Decrease pet weight
  pet_info.weight = parseInt(pet_info.weight) - 1;
  //Decrease energy
  pet_info.energy = parseInt(pet_info.energy) - 5;
  playSound(sounds.play);
  showPetMessage("GIMMIE THE BALL!");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness = parseInt(pet_info.happiness) - 2;
  // Decrease pet weight
  pet_info.weight = parseInt(pet_info.weight) - 2;
  //Decrease energy
  pet_info.energy = parseInt(pet_info.energy) - 5;
  playSound(sounds.exercise);
  showPetMessage("RUFF RUFF!")
  checkAndUpdatePetInfoInHtml();
}

//NEW FUNCTION SO THE PET CAN ATTACK
function clickedAttackButton() {
  // Set Pet happines to zero
  pet_info.happiness = 0;
  //Decrease energy
  pet_info.energy = parseInt(pet_info.energy) - 20;
  playSound(sounds.attack);
  showPetMessage("GRRR! GRR!");
  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (parseInt(pet_info.weight) <= 0) {
    pet_info.weight = 0;
  }
  // makes sure visual number doesnt go past 0
  if (parseInt(pet_info.happiness) <= 0) {
    pet_info.happiness = 0;
  }

  if (parseInt(pet_info.energy) <= 0) {
    pet_info.energy = 0;
  }

  // if the pet has below 20 energy than the attack button is disabled
  if (pet_info.energy <= 20) {
    $('.attack-button').prop('disabled', true);
    $('.attack-button').addClass('disabled-btn');
  } else {
    $('.attack-button').prop('disabled', false);
    $('.attack-button').removeClass('disabled-btn');
  }

  if (pet_info.weight === 0 || pet_info.happiness === 0) {
    // disable play + exercise buttons when either is 0
    $('.play-button').prop('disabled', true);
    $('.play-button').addClass('disabled-btn');

    $('.exercise-button').prop('disabled', true);
    $('.exercise-button').addClass('disabled-btn');
  } else {
    // enable if weight > 0 or happines > 0
    $('.play-button').prop('disabled', false);
    $('.play-button').removeClass('disabled-btn');
    $('.exercise-button').prop('disabled', false);
    $('.exercise-button').removeClass('disabled-btn');
  }

}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

function showPetMessage(message) {
  const box = $('.pet-message');
  box.stop(true, true); //stops from other messages and animations from stacking
  box.text(message);
  box.addClass('visible');
  box.show();
  /*****************************************************************
   USW OF .delay() and .fadeOut() METHOD
   ****************************************************************/
  box.delay(3000); // waits 3 seconds until the next command is caleld
  box.fadeOut(2000); // messages fades away for 2 seconds
}
