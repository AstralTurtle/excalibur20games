import { Actor, Color, Engine } from "excalibur";
import Bird from "./bird";

const pipeWidth = 50;

// handles movement of both pipes
export default class PipeController extends Actor {
	private scored: boolean;

	private topPipe: Actor;
	private bottomPipe: Actor;

	private _birdPos: number;

	public scoreCallback: Function;

	constructor(
		holePos: number,
		holeSize: number,
		game: Engine,
		birdPos: number,
		callback: Function
	) {
		super({
			x: game.drawWidth,
			y: holePos,
		});
		this.scored = false;
		let offset = holeSize / 2;

		this._birdPos = birdPos;

		this.scoreCallback = callback;

		let pipeHeights = [holePos - offset, holePos - offset];

		this.topPipe = new Actor({
			color: Color.Green,
			width: pipeWidth,
			height: pipeHeights[0],
			y: pipeHeights[0] / 2,
		});

		this.bottomPipe = new Actor({
			color: Color.Green,
			width: pipeWidth,
			height: pipeHeights[1],
			y: game.drawHeight - pipeHeights[1] / 2,
		});
	}

	getTopPipe() {
		return this.topPipe;
	}
	getBottomPipe() {
		return this.bottomPipe;
	}

	onInitialize(engine: Engine): void {
		console.log(`pipe made`);
		console.log(`pipe @ ${this.pos.x}`);
	}

	update(engine: Engine, delta: number): void {
		this.pos.x -= 3 / delta;
		this.topPipe.pos.x = this.pos.x;
		this.bottomPipe.pos.x = this.pos.x;

		if (!this.scored && this.pos.x < this._birdPos) {
			this.scoreCallback();
			this.scored = true;
			console.log(`called ${!this.scored && this.pos.x < this._birdPos}`);
		}

		if (this.pos.x < 0 - pipeWidth / 2) this.kill();
	}
}
