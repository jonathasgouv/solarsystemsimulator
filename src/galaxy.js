class Galaxy {
	constructor() {
		this.planets = [];
		this.suns = [];
	}

	update() {
		this.planets.forEach((planet) => {
			planet.update();
			planet.show();
		});

		this.suns.forEach((sun) => {
			sun.update();
			sun.show();
		});
	}

	attractSun() {
		this.suns.forEach((sun) => {
			this.planets.forEach((planet) => {
				sun.attract(planet);
			});
		});
	}

	attractPlanets() {
		for (let i = 0; i < this.planets.length; i++) {
			for (let j = 0; j < this.planets.length; j++) {
				if (this.planets[i] != this.planets[j]) {
					this.planets[i].attract(this.planets[j]);
				}
			}
		}
	}

	pushPlanet(planet) {
		this.planets.push(planet);
	}

	pushSun(sun) {
		this.suns.push(sun);
	}
}
