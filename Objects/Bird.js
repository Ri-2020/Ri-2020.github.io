class Bird{

    constructor(x,y,r){
        var options = {
            restitution: 1
        }
        this.body = Bodies.circle(x, y, r , options);
        Matter.Body.setMass(this.body , this.body.mass*4);
        World.add(world , this.body);
        this.r = r;
    }

    show(){
        const pos = this.body.position;
        const angle = this.body.angle;
        
        push();
        translate(pos.x  ,pos.y);
        rotate(angle);
        fill(255);
        imageMode(CENTER);
        image(dotImg ,0 , 0 , this.r*2, this.r*2);
        pop();
    }
}