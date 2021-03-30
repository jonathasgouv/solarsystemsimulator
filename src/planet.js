class Planet {
	constructor(mass, _pos, _vel, galaxy, color) {
		this.mass = mass;
		this.pos = _pos;
		this.vel = _vel;
		this.r = this.mass * 5;
		this.path = [];
		this.color = color || [
			random(255),
			random(255),
			random(255),
			random(80, 100)
		];
		this.galaxy = galaxy;
		this.galaxy.pushPlanet(this);
	}

	show() {
		noStroke();
		fill(color(this.color[0], this.color[1], this.color[2], this.color[3]));
		ellipse(this.pos.x, this.pos.y, this.r, this.r);

		for (let i = 0; i < this.path.length - 2; i++) {
			stroke(i - 10, i);
			line(this.path[i].x, this.path[i].y, this.path[i + 1].x, this.path[i + 1].y);
		}
	}

	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.path.push(this.pos.copy());

		if (this.path.length > 100) {
			this.path.splice(0, 1);
		}
	}

	applyForce(f) {
		this.vel.x += f.x / this.mass;
		this.vel.y += f.y / this.mass;
	}

	attract(child) {
		let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
		let f = this.pos.copy().sub(child.pos);
		f.setMag(G * this.mass * child.mass / (r * r));
		child.applyForce(f);
	}
}
