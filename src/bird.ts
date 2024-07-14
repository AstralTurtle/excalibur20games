import {
	Actor,
	clamp,
	Collider,
	CollisionContact,
	CollisionType,
	Engine,
	Input,
	Keys,
	Side,
} from "excalibur";

export default class Bird extends Actor {
	public update(engine: Engine, delta: number) {
		if (engine.input.keyboard.wasPressed(Keys.Space)) this._jump();

		this.pos.y += 5 / delta;

		if (this.pos.y > 600) {
			this._kill();
		}
	}

	onInitialize(engine: Engine): void {
		engine.input.pointers.on("down", (event: Input.PointerEvent) => {
			this._jump();
		});

		this.body.collisionType = CollisionType.Fixed;
	}

	onCollisionStart(
		self: Collider,
		other: Collider,
		side: Side,
		contact: CollisionContact
	): void {
		this._kill();
	}

	_kill() {
		this.kill();
	}

	_jump() {
		this.pos.y -= 40;
		this.pos.y = clamp(this.pos.y, 0, 810);
	}
}
