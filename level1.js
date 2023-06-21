//import file here
let level1;
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 600,
            height: 700
        },
        scene: scene1,
        physics: {
            default: "matter",
            matter: {
                gravity: {
                    y: 0
                },
                debug: false,
            }
        }
    }
    level1 = new Phaser.Game(gameConfig);
    window.focus();

}
//document.body.style = 'margin:0;';
let counter1 = 0;
let counterText; // variable for text object
this.counterText = null;
class scene1 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }



create(){

    //mask for graphic effects

    var graphics = this.add.graphics();
    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRect(0, 0, 800, 700);

    var image = this.add.image(400, 300, 'blood.jpg');
    image.mask = mask;
    //maskSprite.setTexture('image');
  
    //this.mask.gameObject.setMask(mask);
    //mask.bringToTop();

    //var shape = this.add.graphics();
    //var mask = shape.add.bitmapMask();

    let path = [{x:0, y:0}, {x:level1.config.width, y:0}, {x:level1.config.width, y:50},{x: 0, y:50} ];
        this.polygon = this.matter.add.fromVertices(level1.config.width/2, 250, path, { isStatic: true });
        this.polygon.gameObject = this.add.polygon(level1.config.width/2, 250, path, '0xff0000');
        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.add.text(13, 11, 'Level 1',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter1, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
    }


 
    startDrawing(pointer){
        this.isDrawing = true;
        counter1 = counter1 + 1;
    }

    update(){
        if (counter1 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter1, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        }

         
    }

    keepDrawing(pointer){
        if(this.isDrawing){
            this.lineGraphics.clear();
            this.lineGraphics.lineStyle(5, 'black');
            this.lineGraphics.moveTo(pointer.downX, pointer.downY);
            this.lineGraphics.lineTo(pointer.x, pointer.y);
            this.lineGraphics.strokePath();
    }}
    
    stopDrawing(pointer){
        this.lineGraphics.clear();
        this.isDrawing = false;
        let bodies = this.matter.world.localWorld.bodies;
        let toBeSliced = [];
        let toBeCreated = [];
        for(let i = 0; i < bodies.length; i++){
            let vertices = bodies[i].parts[0].vertices;
            let pointsArray = [];
            vertices.forEach(function(vertex){
                pointsArray.push(vertex.x, vertex.y)
            });
            let slicedPolygons = PolyK.Slice(pointsArray, pointer.downX, pointer.downY, pointer.upX, pointer.upY);


            if(slicedPolygons.length > 1){
                this.add.text(13, 11, 'Level 1 complete!',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

                toBeSliced.push(bodies[i]);
                slicedPolygons.forEach(function(points){
                    toBeCreated.push(points)
                });
            }
        }   
        toBeSliced.forEach(function(body){ 
              body.gameObject.destroy();
              this.matter.world.remove(body)
        }.bind(this))
        
        toBeCreated.forEach(function(points){
            let polyObject = [];
            for(let i = 0; i < points.length / 2; i ++){
                polyObject.push({
                    x: points[i * 2] ,
                    y: points[i * 2 + 1] 
                })
            }
            let sliceCentre = Phaser.Physics.Matter.Matter.Vertices.centre(polyObject)
            let slicedBody = this.matter.add.fromVertices(sliceCentre.x, sliceCentre.y, polyObject, { isStatic: true });
            let topleft = this.matter.bodyBounds.getTopLeft(slicedBody); 
            slicedBody.gameObject = this.add.polygon(topleft.x, topleft.y, polyObject, 0xff0000);



            }.bind(this));

        }
    };
    

