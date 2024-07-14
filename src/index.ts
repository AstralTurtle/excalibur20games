import {
	Actor,
	Color,
	Engine,
	Font,
	PostKillEvent,
	Random,
	Text,
	vec,
} from "excalibur";

import Bird from "./bird";
import PipeController from "./pipe";

let score = 0;

const deathText = new Text({
	text: ``,
	font: new Font({ size: 60 }),
});

let scoreText = new Text({
	text: `Score: ${score}`,
	font: new Font({ size: 30 }),
});

const scoreCallback = () => {
	score++;
	scoreText.text = `Score: ${score}`;
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
	const rand = new Random();

	let offset = rand.integer(-150, 150);

	let size = rand.integer(100, 225);

	let pipe = new PipeController(
		game.drawHeight / 2 + offset,
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

let scoreDisplay = new Actor({
	pos: vec(60, 20),
});

let deathDisplay = new Actor({
	pos: vec(game.drawWidth / 2, game.drawHeight / 2),
});

scoreDisplay.graphics.use(scoreText);
game.add(scoreDisplay);

deathDisplay.graphics.use(deathText);

bird.on(`postkill`, (evt: PostKillEvent) => {
	console.log("killed");
	(deathText.text = `Thanks for playing!\nReload to play Again!\nScore: ${score}`),
		game.add(deathDisplay);
});

setInterval(makePipe, 4000);

let testPipe = new PipeController(
	game.drawHeight / 2,
	100,
	game,
	bird.pos.x,
	scoreCallback
);

game.add(testPipe);
game.add(testPipe.getTopPipe());
game.add(testPipe.getBottomPipe());
