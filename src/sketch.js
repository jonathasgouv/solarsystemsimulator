let G = 100;
let numPlanets = 7;
let sun;
let destebalise = 0.2;

function reset() {
	clear();
	milkway = new Galaxy();

	sun = new Sun(150, createVector(0, 0), createVector(0, 0), milkway, [
		255,
		137,
		0,
		100
	]);

	for (let i = 0; i < numPlanets; i++) {
		let r = random(sun.r, min(windowWidth / 2, windowHeight / 2));
		let theta = random(TWO_PI);
		let planetPos = createVector(r * cos(theta), r * sin(theta));
		planetVel = orbitate(sun, planetPos);

		planet = new Planet(random(4, sun.mass / 10), planetPos, planetVel, milkway);
	}
}

function setup() {
	clear();

	numPlanetsSlider = createSlider(1, 20, 7, 1);
	numPlanetsSlider.position(20, 20);
	destebaliseSlider = createSlider(0, 10, 0.2, 0.1);
	destebaliseSlider.position(20, 50);
	GSlider = createSlider(0, 1000, 100, 1);
	GSlider.position(20, 80);
	checkbox = createCheckbox('Add gravity to planets', false);
	checkbox.position(20, 110);
	button = createButton('Reset');
	button.position(20, 140);
	button.mousePressed(reset);

	canvas = createCanvas(windowWidth, windowHeight);
	milkway = new Galaxy();

	sun = new Sun(150, createVector(0, 0), createVector(0, 0), milkway, [
		255,
		137,
		0,
		100
	]);

	for (let i = 0; i < numPlanets; i++) {
		let r = random(sun.r, min(windowWidth / 2, windowHeight / 2));
		let theta = random(TWO_PI);
		let planetPos = createVector(r * cos(theta), r * sin(theta));
		planetVel = orbitate(sun, planetPos);

		planet = new Planet(random(4, sun.mass / 10), planetPos, planetVel, milkway);
	}
}

function draw() {
	translate(-sun.pos.x + windowWidth / 2, windowHeight / 2);
	background(color(10, 10, 88, 100));

	let numPlanetsSliderValue = numPlanetsSlider.value();
	let destebaliseSliderValue = destebaliseSlider.value();
	G = GSlider.value();

	text(
		'Number of Planets',
		numPlanetsSlider.x * 2 + numPlanetsSlider.width - windowWidth / 2 + sun.pos.x,
		35 - windowHeight / 2
	);
	text(
		'Desestebalise orbit',
		destebaliseSlider.x * 2 + destebaliseSlider.width - windowWidth / 2 + sun.pos.x,
		65 - windowHeight / 2
	);
	text('Gravity constant', GSlider.x * 2 + GSlider.width - windowWidth / 2 + sun.pos.x, 95 - windowHeight / 2);
	fill(0, 102, 153);

	milkway.attractSun();
	attractPlanets(checkbox.checked());
	milkway.update();

	if (numPlanetsSliderValue != numPlanets || destebaliseSliderValue != destebalise) {
		numPlanets = numPlanetsSliderValue;
		destebalise = destebaliseSliderValue;

		reset();
	}
}

function orbitate(body, childPos) {
	let childVel = childPos.copy();
	childVel.rotate(HALF_PI);
	childVel.setMag(sqrt(G * body.mass / childPos.mag()));
	childVel.mult(random(1 - destebalise, 1 + destebalise));

	return childVel;
}

function attractPlanets(boolean) {
	if (boolean) {
		milkway.attractPlanets();
	}
}
