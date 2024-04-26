
document.addEventListener('DOMContentLoaded', function () {
    const uploadedImage = document.querySelector('.right-box');
    const fileInput = document.querySelector("input[type='file']");
    const successButton = document.querySelector('.btn-success');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const qualityInput = document.getElementById('quality');
    const imageContainer = document.getElementById('image-container');
    const fileFormatLabel = document.querySelector('.label');
    let selectedFile = null;
    let clearButton = document.querySelector('.clear-btn');
    let downloadButton = document.querySelector('.download-btn');
    let uploadAgainButton = document.querySelector('.upload-btn');
    let formatButtons = document.querySelectorAll('.format-btn');

    // Function to handle file selection
    uploadedImage.addEventListener('click', () => fileInput.click());

    // Event listener for "Success" button click
    successButton.addEventListener('click', function () {
        const customWidth = parseInt(widthInput.value);
        const customHeight = parseInt(heightInput.value);
        const quality = parseInt(qualityInput.value);

        if (!isNaN(customWidth) && !isNaN(customHeight) && customWidth > 0 && customHeight > 0 && !isNaN(quality) && quality >= 0 && quality <= 100) {
            if (selectedFile) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const img = new Image();

                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = customWidth;
                        canvas.height = customHeight;
                        ctx.drawImage(img, 0, 0, customWidth, customHeight);

                        // Apply quality setting
                        const imageData = canvas.toDataURL(`image/${fileFormatLabel.textContent.toLowerCase()}`, quality / 100);
                        const newImg = new Image();

                        newImg.onload = function () {
                            imageContainer.innerHTML = '';
                            imageContainer.appendChild(newImg);
                        };

                        newImg.src = imageData;
                    };

                    img.src = event.target.result;
                };

                reader.readAsDataURL(selectedFile);
            } else {
                alert('Please select an image.');
            }
        }
    });

    // Event listener for file input change
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (file && acceptedExtensions.includes(fileExtension)) {
            selectedFile = file;

            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);

                    const width = img.width;
                    const height = img.height;

                    widthInput.value = width;
                    heightInput.value = height;

                    fileFormatLabel.textContent = fileExtension.toUpperCase();
                };
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select a file with JPG, JPEG, PNG, or GIF format.');
            fileInput.value = ''; // Reset the file input
        }
    });

    // Event listener for format buttons
    formatButtons.forEach(button => {
        button.addEventListener('click', function () {
            fileFormatLabel.textContent = button.getAttribute('data-format');
        });
    });

    // Function to create the clear button
    clearButton.addEventListener('click', function () {
        fileInput.value = '';
        widthInput.value = '';
        heightInput.value = '';
        imageContainer.innerHTML = '';
        selectedFile = null;
        fileFormatLabel.textContent = '';
    });

    // Function to create the download button
    downloadButton.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = canvas.toDataURL(`image/${fileFormatLabel.textContent.toLowerCase()}`);
            const downloadLink = document.createElement('a');
            downloadLink.href = imageData;
            downloadLink.download = `customized_image.${fileFormatLabel.textContent.toLowerCase()}`;
            downloadLink.click();
        };
        img.src = imageContainer.querySelector('img').src;
    });

    // Function to create the "Upload Again" button
    uploadAgainButton.addEventListener('click', function () {
        fileInput.value = '';
        widthInput.value = '';
        heightInput.value = '';
        imageContainer.innerHTML = '';
        selectedFile = null;
        fileFormatLabel.textContent = '';
    });
});


