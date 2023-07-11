let level2;
window.onload = function() {
    let gameConfig = {
        transparent: true,
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 600,
            height: 700
        },
        scene: scene2,
        physics: {
            default: "matter",
            matter: {
                gravity: {
                    y: 0
                },
                debug: true,
            }
        }
    }
    level2 = new Phaser.Game(gameConfig);
    window.focus();
}
let counter2 = 0;
this.levelText;
let counterText;
let timer;
let timerText;
class scene2 extends Phaser.Scene{
    constructor(){
        super();
    }


    create(){
    let graphics = this.add.graphics();
        this.path1 = new Phaser.Curves.Path(0, 200);
        this.path2 = new Phaser.Curves.Path(0, 400);


        for (let i = 0; i < 8; i++)
        {
            let path1 = this.path1.ellipseTo(35, 30, 180, 360, i % 2 === 0, 0); //black
            let path2 = this.path2.ellipseTo(35, 30, 180, 360, i % 2 === 0, 0); //white
        }

        graphics.lineStyle(40, 0xff0000, 1);
        this.path1.draw(graphics);
        this.path2.draw(graphics);
        this.isDrawing = false;

        //circles
        let black1 = this.add.circle(17, 225, 15, 0x000000, 1);
        let black2 = this.add.circle(555, 182, 15, 0x000000, 1);
        let white1 = this.add.circle(17, 425, 15, 0xFFFFFF, 1);
        let white2 = this.add.circle(555, 380, 15, 0x000000, 1);

        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.levelText = this.add.text(13, 11, 'Level 2',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter2, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

        // Create and start the timer
        timer = this.time.addEvent({
            delay: 100000, // 3 second
            paused: false
        });

        timerText = this.add.text(13, 53, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        }
               
    startDrawing(pointer){
        this.isDrawing = true;
        counter2 = counter2 + 1;
    }
    update(){
        timerText.setText(timer.getElapsedSeconds().toFixed(1));
        if (counter2 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter2, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});       
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
            this.levelText.setText('Level 2 complete!');
            timer.paused = !timer.paused;
        }
        this.isDrawing = false;
    }
};
