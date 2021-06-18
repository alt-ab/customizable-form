// Definitions
var canvas = document.getElementById("paint-canvas");
var context = canvas.getContext("2d");
var boundings = canvas.getBoundingClientRect();
var range = document.getElementById("brush")
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

function read(input) {
	let img = document.getElementById("upload-img");
	let reader = new FileReader();

	reader.onload = function (e) {
		img.setAttribute('src', e.target.result);
	}

	reader.readAsDataURL(input.files[0]);

}

//draggable
/* draggable element */

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	var image_box = ev.target.getBoundingClientRect();

	ev.target.style.position = 'absolute';
	ev.target.style.left = image_box.left + 'px';
	ev.target.style.top = image_box.top + 'px';

	var style = window.getComputedStyle(ev.target, null);

	ev.dataTransfer.setData("text/plain",
		(parseInt(style.getPropertyValue("left"), 10) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - ev.clientY) + ',' + ev.target.id);

}

function drop(ev) {
	ev.preventDefault();

	var offset = ev.dataTransfer.getData("text/plain")
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
}