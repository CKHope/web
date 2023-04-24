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
var images = ["im01/im1.jpg", "im01/im2.jpg", "im02/im3.jpg", "im02/im4.png"];

// Function to generate a random image URL
function generateRandomImageURL() {
  var randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function writeToCanvas(src) {
  return new Promise((res) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = src;

    img.onload = function () {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        res(blob);
      }, "image/png");
    };
  });
}

async function copyToClipboard(src) {
  // const data = await fetch(src);
  // const blob = await data.blob();
  const blob = await writeToCanvas(src);

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    console.log("Success");
  } catch (e) {
    console.log(e);
  }
}

// Button click event handler for "Generate Random Image" button
document.getElementById("generateImageBtn").addEventListener("click", () => {
  // Generate random image URL
  var imageURL = generateRandomImageURL();

  // Create temporary image element
  var tempImg = document.createElement("img");
  tempImg.src = imageURL;

  // Copy data URL to clipboard
  copyToClipboard(imageURL);

  // Update image source and display success message
  document.getElementById("randomImage").src = imageURL;
  alert(`Random image copied to clipboard! ${imageURL}`);
});
