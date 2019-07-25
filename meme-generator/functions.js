var submitButton = document.getElementById('memesubmit');
var memesDiv = document.getElementById('yourmemes');
var upperText = [];
var lowerText = [];
var urls = [];
var i = 0;

var createMeme = function(e) {
    var upperTextFormVal = document.getElementById('upper');
    var lowerTextFormVal = document.getElementById('lower');
    var urlFormVal = document.getElementById('url');

    upperText.push(upperTextFormVal.value);
    lowerText.push(lowerTextFormVal.value);
    urls.push(urlFormVal.value);

    upperTextFormVal.value = '';
    lowerTextFormVal.value = '';
    urlFormVal.value = '';

    var upperTextNode = document.createElement('h2');
    upperTextNode.innerHTML = upperText[i];
    upperTextNode.classList.add('uppertext');

    var lowerTextNode = document.createElement('h2');
    lowerTextNode.innerHTML = lowerText[i];
    lowerTextNode.classList.add('lowertext');

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('memediv','mt-5', 'mb-2');

    var newImg = document.createElement('img');
    newImg.setAttribute('src',urls[i]);
    newImg.classList.add('memeimage');

    var removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove This Meme';
    removeButton.setAttribute('id','button-'+i);
    removeButton.classList.add('btn', 'btn-primary', 'btn-block', 'btn-lg');

    imgDiv.appendChild(newImg);
    imgDiv.appendChild(upperTextNode);
    imgDiv.appendChild(lowerTextNode);
    memesDiv.appendChild(imgDiv);
    memesDiv.appendChild(removeButton);
    removeButton.addEventListener('click', function() {
        memesDiv.removeChild(imgDiv);
        memesDiv.removeChild(removeButton);
    });

    i++;
    e.preventDefault();
}

submitButton.addEventListener('click', createMeme);
