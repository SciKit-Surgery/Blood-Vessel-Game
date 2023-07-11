window.onload = function() {
    let gameConfig = {
        transparent: true,
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
    level3 = new Phaser.Game(gameConfig);
    window.focus();
}
let counter3 = 0;
this.levelText;
let counterText;
let timer;
let timerText;
class scene3 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    create(){
        this.matter.world.update30Hz();
        this.matter.world.setBounds(10, 10, level3.config.width - 20, level3.config.height - 10);
        this.rect = this.matter.add.rectangle(level3.config.width / 3 - 10, level3.config.width / 5, 600, 100, {fillStyle:'red' }); // 2 = how high up the artery starts to fall
        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.levelText = this.add.text(13, 11, 'Level 3',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter3, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

        // Create and start the timer
        timer = this.time.addEvent({
            delay: 100000, // 3 second
            paused: false
        });

        timerText = this.add.text(13, 53, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        }

    startDrawing(){
        this.isDrawing = true;
        counter3 = counter3 + 1;
    }

    update(){
        timerText.setText(timer.getElapsedSeconds().toFixed(1));
        if (counter3 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter3, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        }
    }

    keepDrawing(pointer){
        if(this.isDrawing){
            let vector = new Phaser.Math.Vector2(pointer.x - pointer.downX, pointer.y - pointer.downY);
            vector.limit(100); // maximum Length
            this.lineGraphics.clear();
            this.lineGraphics.lineStyle(5, 'black');
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
                timer.paused = !timer.paused;
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

            this.levelText.setText('Level 3 complete!');

    
        }.bind(this))
    }
};