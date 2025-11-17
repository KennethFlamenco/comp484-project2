$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.attack-button').click(clickedAttackButton);




})

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Onyx", weight: "70", happiness: "8" };

function clickedTreatButton() {
  //Increase pet happiness parseInt because if not it would add to string
  pet_info.happiness = parseInt(pet_info.happiness) + 4;
  //Increase pet weight
  pet_info.weight = parseInt(pet_info.weight) + 1;
  showPetMessage("Bark!");
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness = parseInt(pet_info.happiness) + 3;
  // Decrease pet weight
  pet_info.weight = parseInt(pet_info.weight) - 1;
  showPetMessage("GIMMIE THE BALL!");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness = parseInt(pet_info.happiness) - 2;
  // Decrease pet weight
  pet_info.weight = parseInt(pet_info.weight) - 2;
  showPetMessage("RUFF RUFF!")
  checkAndUpdatePetInfoInHtml();
}

function clickedAttackButton() {
  // Set Pet happines to zero
  pet_info.happiness = 0;
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

  if (pet_info.weight === 0 || pet_info.happiness === 0) {
    // disable play + exercise buttons
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
}

function showPetMessage(message) {
  const box = $('.pet-message');
  box.stop(true, true);
  box.text(message);
  box.addClass('visible');
  box.show();
  box.delay(3000); // waits 3 seconds until the next command is caleld
  box.fadeOut(2000); // messages fades away for 2 seconds
}
