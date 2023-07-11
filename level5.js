let level5;
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
        scene: scene5,
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
    level5 = new Phaser.Game(gameConfig);
    window.focus();

}
let counter5 = 0;
let counterText; // variable for text object
this.levelText;
this.counterText = null;
this.light = null;
this.linePoints = [];
let timer;
let timerText;
class scene5 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
        
    }

create(){
    let graphics = this.add.graphics();
        this.path1 = new Phaser.Curves.Path(0, 150);
        this.path2 = new Phaser.Curves.Path(0, 450);


        for (let i = 0; i < 8; i++)
        {
            let path1 = this.path1.ellipseTo(60, 60, 200, 400, i % 2 === 0, 0); //black
            let path2 = this.path2.ellipseTo(60, 40, 180, 320, i % 2 === 0, 0); //white
        }

        graphics.lineStyle(40, 0xff0000, 1);
        this.path1.draw(graphics);
        this.path2.draw(graphics);
        this.isDrawing = false;

        //circles
        let black1 = this.add.circle(17, 212, 15, 0x000000, 1);
        let black2 = this.add.circle(780, 525, 15, 0x000000, 1);
        let white1 = this.add.circle(17, 478, 15, 0x000000, 1);
        let white2 = this.add.circle(780, 235, 15, 0xFFFFFF, 1);

        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        
        this.levelText = this.add.text(13, 11, 'Level 5',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter5, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        
        // Create and start the timer
        timer = this.time.addEvent({
            delay: 100000, // 3 second
            paused: false
        });


        timerText = this.add.text(13, 53, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        }

    startDrawing(pointer){
        this.isDrawing = true;
        counter5 = counter5 + 1;
    }
    update(){
        timerText.setText(timer.getElapsedSeconds().toFixed(1));
        //update counter
        if (counter5 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter5, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
            //update time
            //var elapsedSeconds = Math.floor(this.time.now / 1000);
            //timerText.setText('Time: ', + elapsedSeconds);
        }
         
    }

    keepDrawing(pointer){
        if(this.isDrawing){
            let vector = new Phaser.Math.Vector2(pointer.x - pointer.downX, pointer.y - pointer.downY);
            vector.limit(100); // maximum Length
            this.lineGraphics.clear();
            this.lineGraphics.lineStyle(15, 'black');
            this.lineGraphics.moveTo(pointer.downX, pointer.downY);
            this.lineGraphics.lineTo(pointer.downX + vector.x, pointer.downY + vector.y);           
            this.lineGraphics.stroke();

        }
    }
    
    stopDrawing(pointer){
        let vector = new Phaser.Math.Vector2(pointer.x - pointer.downX, pointer.y - pointer.downY);
        vector.limit(100); // --> Length limit
        let points = this.path1.getPoints(100);
        let drawnLine = new Phaser.Geom.Line(pointer.downX, pointer.downY, pointer.upX, pointer.upY);
        let intersection = Phaser.Geom.Intersects.GetLineToPoints(
            drawnLine, points);
        if (intersection && Phaser.Geom.Line.Length(drawnLine) > 45 ){
            this.levelText.setText('Level 5 complete!');
            timer.paused = !timer.paused;
        }
        this.isDrawing = false;
    }
};
