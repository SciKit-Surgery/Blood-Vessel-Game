let level6;
window.onload = function() {
    let gameConfig = {
        transparent: true,
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 800,
            height: 700
        },
        scene: scene6,
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
    level6 = new Phaser.Game(gameConfig);
    window.focus();

}
let counter6 = 0;
let counterText; // variable for text object
var timerText;
this.counterText = null;
this.linePoints = [];
class scene6 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
        
    }



create(){

    let path = [{x:800, y:-20}, {x:600, y:40}, {x:450, y:-20}, {x:300, y:20}, {x:150, y:-20}, {x:0, y:20}, {x:0, y:80}, {x:150, y:40}, {x:300, y:80}, {x:450, y:40}, {x:600, y:80}, {x:800, y:40}];
        this.polygon = this.matter.add.fromVertices(level6.config.width/2, 250, path, { isStatic: true });
        this.polygon.gameObject = this.add.polygon(level6.config.width/2, 250, path, 0xff0000);
        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.add.text(13, 11, 'Level 6',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter6, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        timerText = this.add.text(13, 53, 'Time: 0', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

    
}   
    
    startDrawing(pointer){
        this.isDrawing = true;
        counter6 = counter6 + 1;
    }
    update(){
        //update counter
        if (counter6 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter6, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
            //update time
            var elapsedSeconds = Math.floor(this.time.now / 1000);
            timerText.setText('Time: ', + elapsedSeconds);
        }
         
    }

    keepDrawing(pointer){
        if(this.isDrawing){
            this.lineGraphics.clear();
            this.lineGraphics.lineStyle(15, 'black');
            this.lineGraphics.moveTo(pointer.downX, pointer.downY);
            this.lineGraphics.lineTo(pointer.x, pointer.y);
            this.lineGraphics.closePath();
            this.lineGraphics.strokePath();

        }
    }
    
    updateLine(){
        //this.lineGraphics.clear();
        this.lineGraphics.lineStyle(15, 'black');
        this.lineGraphics.moveTo(linePoints[0].x, linePoints[0].y);
        for(var i = 1; i < linePoints.length; i++) {
            this.lineGraphics.lineTo(linePoints[i].x, linePoints[i].y);
        }
        this.lineGraphics.strokePath();
    }
    
    stopDrawing(pointer){
        //this.lineGraphics.clear();
        //this.isDrawing = false;
        let bodies = this.matter.world.localWorld.bodies;
        //let toBeSliced = [];
        //let toBeCreated = [];
        for(let i = 0; i < bodies.length; i++){
            let vertices = bodies[i].parts[0].vertices;
            let pointsArray = [];
            vertices.forEach(function(vertex){
                pointsArray.push(vertex.x, vertex.y)
            });
            let slicedPolygons = PolyK.Slice(pointsArray, pointer.downX, pointer.downY, pointer.upX, pointer.upY);


            if(slicedPolygons.length == 1 && slicedPolygons.length < 1){
                this.lineGraphics.clear();
                this.isDrawing = true;
                }
                else if (slicedPolygons.length > 1){
                    this.add.text(13, 11, 'Level 6 complete!',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
                    this.isDrawing = false;
                }


                //toBeSliced.push(bodies[i]);
                //slicedPolygons.forEach(function(points){
                  //  toBeCreated.push(points)
                };
            
        
                
        //toBeSliced.forEach(function(body){ 
              //body.gameObject.destroy();
              //this.matter.world.remove(body)
        //}.bind(this))
        
        //toBeCreated.forEach(function(points){
          //  let polyObject = [];
            //for(let i = 0; i < points.length / 2; i ++){
              //  polyObject.push({
                //    x: points[i * 2] ,
                  //  y: points[i * 2 + 1] 
                //}}
            //}
           // let sliceCentre = Phaser.Physics.Matter.Matter.Vertices.centre(polyObject)
            //let slicedBody = this.matter.add.fromVertices(sliceCentre.x, sliceCentre.y, polyObject, { isStatic: true });
            //let topleft = this.matter.bodyBounds.getTopLeft(slicedBody); 
            //slicedBody.gameObject = this.add.polygon(topleft.x, topleft.y, polyObject, 0xff0000);



           // }.bind(this));
       
       }
    };
    

