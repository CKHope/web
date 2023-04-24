// Function to get random item from array
function getRandomArrayItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Add event listener to generate text button
document
  .getElementById("generateTextBtn")
  .addEventListener("click", function () {
    // Load CSV file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "random_text.csv", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var csvData = xhr.responseText;
        var csvArray = csvData.split("\n");
        var randomText = getRandomArrayItem(csvArray);
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

// Add event listener to generate image button
// Array of image file names
var images = ["im1.jpg", "im2.jpg", "im3.jpg"];

// Function to generate a random image URL
function generateRandomImageURL() {
  var randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

// Button click event handler for "Generate Random Image" button
document
  .getElementById("generateImageBtn")
  .addEventListener("click", function () {
    // Generate random image URL
    var imageURL = generateRandomImageURL();

    // Create temporary image element
    var tempImg = document.createElement("img");
    tempImg.src = imageURL;

    // Load image to get data URL
    tempImg.onload = function () {
      // Convert image to data URL
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(tempImg, 0, 0);
      var dataURL = canvas.toDataURL();

      // Copy data URL to clipboard
      copyToClipboard(dataURL);

      // Update image source and display success message
      document.getElementById("randomImage").src = imageURL;
      alert("Random image copied to clipboard!");
    };
  });
