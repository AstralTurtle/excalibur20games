import { Actor, clamp, Keys} from 'excalibur';

export default class Bird extends Actor{
    public update(engine, delta){
        if (engine.input.keyboard.wasPressed(Keys.Space)) this._jump();
    
        this.pos.y += 1 / delta

        console.log(this.pos.y)


        if (this.pos.y > 800){
            this._kill()
        
        }
      
    }

    _kill(){
        console.log('die')
    }

    _jump(){
        this.pos.y -= 20
        this.pos.y = clamp(this.pos.y, 0, 810)
    }

}

