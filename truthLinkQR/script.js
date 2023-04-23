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
document
  .getElementById("generateImageBtn")
  .addEventListener("click", function () {
    // Array of local image filenames
    var imageArray = ["im1.jpg", "im2.jpg", "im3.jpg"];
    var randomImage = getRandomArrayItem(imageArray);

    // Copy generated image to clipboard
    var imgElement = new Image();
    imgElement.src = randomImage;
    imgElement.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0);
      canvas.toBlob(function (blob) {
        navigator.clipboard
          .write([new ClipboardItem({ "image/jpeg": blob })])
          .then(function () {
            console.log("Random image copied to clipboard:", randomImage);
            alert("Random image copied to clipboard:\n\n" + randomImage);
          })
          .catch(function (error) {
            console.error("Failed to copy image to clipboard:", error);
          });
      }, "image/jpeg");
    };
  });
