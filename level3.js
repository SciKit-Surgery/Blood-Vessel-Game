window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 600,
            height: 900
        },
        scene: scene3,
        physics: {
            default: "matter",
            matter: {
                gravity: {
                    y: 0.5
                },
                debug: true,
            }
        }
    }
    level4 = new Phaser.Game(gameConfig);
    window.focus();
}
class scene3 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){

        this.matter.world.update30Hz();
        this.matter.world.setBounds(10, 10, level4.config.width - 20, level4.config.height - 10);
        this.matter.add.rectangle(level4.config.width / 3 - 10, level4.config.width / 5, 600, 100); // 2 = how high up the artery starts to fall
        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.add.text(13, 11, 'Level 3',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
    }
    startDrawing(){
        this.isDrawing = true;
    }
    keepDrawing(pointer){
        if(this.isDrawing){
            this.lineGraphics.clear();
            this.lineGraphics.lineStyle(1, 0x00ff00);
            this.lineGraphics.moveTo(pointer.downX, pointer.downY);
            this.lineGraphics.lineTo(pointer.x, pointer.y);
            this.lineGraphics.strokePath();
        }
    }
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
                toBeSliced.push(bodies[i]);
                slicedPolygons.forEach(function(points){
                    toBeCreated.push(points)

                })

            }
        }
        toBeSliced.forEach(function(body){
            this.matter.world.remove(body)
        }.bind(this))
        toBeCreated.forEach(function(points){
            let polyObject = [];
            for(let i = 0; i < points.length / 2; i ++){
                polyObject.push({
                    x: points[i * 2],
                    y: points[i * 2 + 1]
                })
            }
            let sliceCentre = Phaser.Physics.Matter.Matter.Vertices.centre(polyObject)
            let slicedBody = this.matter.add.fromVertices(sliceCentre.x, sliceCentre.y, polyObject, {
                isStatic: false
            });
            this.add.text(13, 11, 'Level 3 Complete!',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
    
        }.bind(this))
    }
};