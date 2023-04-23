// Function to get random item from array
function getRandomText(randomTextArray) {
  var randomIndex = Math.floor(Math.random() * randomTextArray.length);
  return randomTextArray[randomIndex];
}

// Add event listener to button
document.getElementById("generateBtn").addEventListener("click", function () {
  // Load CSV file
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "random_text.csv", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var csvData = xhr.responseText;
      var csvArray = csvData.split("\n");
      var randomText = getRandomText(csvArray);
      document.getElementById("randomText").innerText = randomText;

      // Copy generated text to clipboard
      navigator.clipboard
        .writeText(randomText)
        .then(function () {
          console.log("Random text copied to clipboard:", randomText);
          alert("Random text copied to clipboard:\n\n" + randomText);
        })
        .catch(function (error) {
          console.error("Failed to copy text to clipboard:", error);
        });
    }
  };
  xhr.send();
});
