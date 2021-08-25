class Box{
    constructor(x,y,w,h) {
        this.body = Bodies.rectangle(x , y , w , h);
        this.body.collisionFilter.group  = 0;
        this.body.collisionFilter.mask  = 2;
        this.body.collisionFilter.category = 2;

        World.add(world , this.body);
        this.w = w;
        this.h = h;
    };

    show(){
        const pos = this.body.position;
        const angle = this.body.angle;
        push();
        translate(pos.x , pos.y);
        rotate(angle);
        imageMode(CENTER)
        fill(255);
        image(boxImg , 0 , 0 , this.w , this.h);
        pop();
    }




}
