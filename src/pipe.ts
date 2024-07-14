import { Actor, Color, Engine} from 'excalibur';

const pipeWidth = 50

// handles movement of both pipes
export default class PipeController extends Actor {
    private holePos: number = 0
    private holeSize: number = 100

    private topPipe: Pipe
    private bottomPipe:Pipe

    constructor(newHolePos:number, newHoleSize:number, game) {
        super({
            x: game.drawWidth,
            y:newHolePos,
            width: 10,
            height: 10,
            color: Color.Red

        })
        this.holePos = newHolePos
        this.holeSize = newHoleSize
        
        let offset = this.holeSize /2 





        let pipeHeights = [this.holePos - offset, this.holePos - offset]

        this.topPipe = new Pipe({
            color:Color.Red,
            width:pipeWidth,
            height:pipeHeights[0],
            y:pipeHeights[0]/2
        })

        

        
        
        this.bottomPipe = new Pipe({
            color:Color.Yellow,
            width:pipeWidth,
            height:pipeHeights[1],
            y:game.drawHeight - pipeHeights[1]/2
        })


        

    }

    getTopPipe(){
        return this.topPipe
    }
    getBottomPipe(){
        return this.bottomPipe
    }

    update(engine: Engine, delta: number): void {
        this.pos.x -= 3 / delta
        this.topPipe.pos.x = this.pos.x
        this.bottomPipe.pos.x = this.pos.x
    }

}

// the actuall pipe visual/collision
class Pipe extends Actor {

}