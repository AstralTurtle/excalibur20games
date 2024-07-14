import { Color, Engine } from "excalibur";

import Bird from "./bird";
import PipeController from "./pipe";

let score = 0;

const scoreCallback = () => {
	score++;
	console.log(`score: ${score}`);
};

const game = new Engine({
	width: 800,
	height: 600,
});

game.start();

const bird = new Bird({
	x: 40,
	y: game.drawHeight / 2,
	width: 20,
	height: 20,
	color: Color.Yellow,
});

function makePipe(): void {
	console.log("making pipe");

	let offset = Math.random() * 100;
	let sign = Math.random() > 0.5 ? 1 : -1;

	let size = Math.floor(Math.random() * 50) + 75;

	let pipe = new PipeController(
		game.drawHeight / 2 + offset * sign,
		size,
		game,
		bird.pos.x,
		scoreCallback
	);

	game.add(pipe);
	game.add(pipe.getTopPipe());
	game.add(pipe.getBottomPipe());
}

game.add(bird);

let testPipe = new PipeController(
	game.drawHeight / 2 + 50,
	100,
	game,
	bird.pos.x,
	scoreCallback
);

game.add(testPipe);
game.add(testPipe.getTopPipe());
game.add(testPipe.getBottomPipe());

setInterval(makePipe, 4000);
