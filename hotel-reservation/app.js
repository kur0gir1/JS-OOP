document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservationForm");
  const fullName = document.getElementById("fullName");
  const address = document.getElementById("address");
  const contNumber = document.getElementById("contNumber");
  const accommodation = document.getElementById("accomodation");
  const stays = document.getElementById("daysOfStay");
  const downPayment = document.getElementById("downPayment");
  const spa = document.getElementById("spa");
  const massage = document.getElementById("massage");
  const breakfast = document.getElementById("breakfast");
  const seniorDiscount = document.getElementById("senior");
  const regularDiscount = document.getElementById("regular");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const invoice = document.getElementById("invoice");
  const clearButton = document.getElementById("clear");

  function calculateTotal() {
    const staysValue = parseInt(stays.value) || 0; // Number of days
    const accommodationValue = parseFloat(accommodation.value) || 0; // Accommodation cost
    const total = accommodationValue * staysValue; // Total cost
    console.log(staysValue, total);
    return total;
  }

  function getTotalBalance() {
    const total = calculateTotal();
    const spaValue = spa.checked ? 500: 0;
    const massageValue = massage.checked ? 300: 0;
    const breakfastValue = breakfast.checked ? 300 : 0;
    const discount = seniorDiscount.checked ? 0.3 : 0; // 30% discount for seniors
    const downPaymentValue = parseFloat(downPayment.value) || 0; 

    let amenitiesTotal = spaValue + massageValue + breakfastValue;

    // Calculate final total with amenities and discount
    let finalTotal = total + spaValue + massageValue + breakfastValue;
    finalTotal -= finalTotal * discount;

    // Calculate balance
    const balance = finalTotal - downPaymentValue;

    return { finalTotal, balance, amenitiesTotal };
  }

  function displayInvoice() {
    const fullNameValue = fullName.value;
    const addressValue = address.value;
    const contNumberValue = contNumber.value;
    const accommodationValue = accommodation.value;
    const staysValue = stays.value;
    const downPaymentValue = downPayment.value;
    const customer = seniorDiscount.checked ? seniorDiscount.value : regularDiscount.value;

    // Collect selected amenities
    const selectedAmenities = [];
    if (spa.checked) selectedAmenities.push("Spa");
    if (massage.checked) selectedAmenities.push("Massage");
    if (breakfast.checked) selectedAmenities.push("Breakfast");

    // Join selected amenities with commas
    const amenitiesSelected = selectedAmenities.join(", ");

    const total = calculateTotal();
    const { finalTotal, balance, amenitiesTotal } = getTotalBalance();

    invoice.value = 
    `
    Hello, ${fullNameValue}!
    Address: ${addressValue}
    Contact Number: ${contNumberValue}
    Accommodation Selected: ${accommodationValue}
    Days of Stay: ${staysValue}
    Amenities Selected: ${amenitiesSelected}
    Type of Customer: ${customer}
    Amenities Total: ${amenitiesTotal}
    Total: ${total}
    Balance: ${finalTotal}
    Down Payment: ${downPaymentValue}
    Balance Remaining: ${balance}
    `;
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (fullName.value && address.value && contNumber.value) {
      displayInvoice();
    } else {
      alert("Please fill in all required fields.");
    }
  });

  resetButton.addEventListener("click", function () {
    form.reset();
  });

  clearButton.addEventListener("click", function () {
    invoice.value = ``;
  });
});
