// Utilized Hack Club's Painting App Workshop (https://workshops.hackclub.com/painting_app/)
// Definitions
var canvas = document.getElementById('paint-canvas');
var context = canvas.getContext('2d');
var boundings = canvas.getBoundingClientRect();
var range = document.getElementById('brush')
	.value;

// Specifications
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
context.strokeStyle = 'black'; // initial brush color

//Handle brush size
var brush = document.getElementById('brush');

brush.addEventListener('input', function (brush) {
	context.lineWidth = brush.target.value;
});

// Handle Colors
var colors = document.getElementsByClassName('colors')[0];

colors.addEventListener('click', function (event) {
	context.strokeStyle = event.target.value || 'black';
});

// Mouse Down Event
canvas.addEventListener('mousedown', function (event) {
	setMouseCoordinates(event);
	isDrawing = true;

	// Start Drawing
	context.beginPath();
	context.moveTo(mouseX, mouseY);
});

// Mouse Move Event
canvas.addEventListener('mousemove', function (event) {
	setMouseCoordinates(event);

	if (isDrawing) {
		context.lineTo(mouseX, mouseY);
		context.stroke();
	}
});

// Mouse Up Event
canvas.addEventListener('mouseup', function (event) {
	setMouseCoordinates(event);
	isDrawing = false;
});

// Handle Mouse Coordinates
function setMouseCoordinates(event) {
	mouseX = event.clientX - boundings.left;
	mouseY = event.clientY - boundings.top;
}

// Handle Clear Button
var clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
});

// Handle Save Button
var saveButton = document.getElementById('save');

saveButton.addEventListener('click', function () {
	var imageName = prompt('Please enter image name');
	var canvasDataURL = canvas.toDataURL();
	var a = document.createElement('a');
	a.href = canvasDataURL;
	a.download = imageName || 'drawing';
	a.click();
});


function img(input) {
	let img = document.getElementsByClassName('import-img')[1];
	let reader = new FileReader();

	reader.onload = function (e) {
		img.setAttribute('src', e.target.result);
		const prefix = 'upload-img';
		img.zIndex = toString(img.id.slice(prefix.length));
	}

	reader.readAsDataURL(input.files[0]);

}

// duplication
function textDup() {
	var elem = document.getElementsByClassName('writing-txt')[0];
	var clone = elem.cloneNode(true);
	const prefix = 'upload-txt';
	const q = clone.id.slice(prefix.length);
	const i = parseInt(q) + 1;
	elem.id = prefix + i;
	clone.style.display = 'inherit';
	elem.after(clone);
}

function textDupH() {
	var elem = document.getElementsByClassName('writing-txt')[0];
	var clone = elem.cloneNode(true);
	const prefix = 'upload-txt';
	const q = clone.id.slice(prefix.length);
	const i = parseInt(q) + 1;
	elem.id = prefix + i;
	clone.classList.add('header-txt');

	clone.style.display = 'inherit';
	elem.after(clone);
}

function textDupT() {
	var elem = document.getElementsByClassName('writing-txt')[0];
	var clone = elem.cloneNode(true);
	const prefix = 'upload-txt';
	const q = clone.id.slice(prefix.length);
	const i = parseInt(q) + 1;
	elem.id = prefix + i;
	clone.classList.add('title-txt');

	clone.style.display = 'inherit';
	elem.after(clone);
}

function imgDup() {
	var elem = document.getElementsByClassName('import-div')[0];
	var clone = elem.cloneNode(true);

	var image = document.getElementsByClassName('import-img')[0];
	const prefix = 'upload-img';
	const q = image.id.slice(prefix.length);
	const i = parseInt(q) + 1;
	image.id = prefix + i;

	clone.style.display = 'inherit';

	elem.after(clone);
}

// draggable
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	var image_box = ev.target.getBoundingClientRect();

	ev.target.style.position = 'absolute';
	ev.target.style.left = image_box.left + 'px';
	ev.target.style.top = image_box.top + 'px';

	var style = window.getComputedStyle(ev.target, null);

	ev.dataTransfer.setData('text/plain',
		(parseInt(style.getPropertyValue('left'), 10) - ev.clientX) + ',' + (parseInt(style.getPropertyValue('top'), 10) - ev.clientY) + ',' + ev.target.id);

}

function drop(ev) {
	ev.preventDefault();

	var offset = ev.dataTransfer.getData('text/plain')
		.split(',');

	var x = (ev.clientX + parseInt(offset[0], 10));
	var y = (ev.clientY + parseInt(offset[1], 10));

	var id = offset[2];

	var box = document.querySelector('.box')
		.getBoundingClientRect();
	var image = document.getElementById(id)

	if (x > box.left && x < box.right && y > box.top && y < box.bottom) {

		image.style.left = x + 'px';

		image.style.top = y + 'px';
	} else {
		image.style.position = 'static';
	}
	
	var boxElement = document.querySelector('.box');
	
	boxElement.appendChild(image);
}

// accordian
var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener('click', function () {
		this.classList.toggle('active');
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + 'px';
		}
	});
}

function screenshot(){
   var button = document.getElementById('but_screenshot');
   button.style.display = 'none';
   
   html2canvas(document.getElementById('box')).then(function(canvas) {
    button.style.display = 'block';
    
    var imageName = prompt('Please enter image name');
	var canvasDataURL = canvas.toDataURL();
	var a = document.createElement('a');
	a.href = canvasDataURL;
	a.download = imageName || 'drawing';
	a.click();
    
   });
   
}

function changeColor() {
    document.getElementById("box").style.backgroundColor =
	document.getElementById("MyColorPicker").value;
}