
import {Engine, Color, Actor, CollisionType, Keys} from 'excalibur';

import Bird from './bird.ts'
import PipeController from './pipe.ts';


const game = new Engine({
    width: 800,
    height: 600
})

game.start() 


const bird = new Bird({
    x:1,
    y:game.drawHeight / 2,
    width: 20,
    height:20,
    radius: 10,
    color: Color.Yellow,

});



bird.body.collisionType = CollisionType.Fixed;




game.add(bird);


let testPipe  = new PipeController(game.drawHeight /2, 100, game)


game.add(testPipe)
game.add(testPipe.getTopPipe())
game.add(testPipe.getBottomPipe())