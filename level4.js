let level4;
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
        scene: scene4,
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
    level4 = new Phaser.Game(gameConfig);
    window.focus();
}
let counter4 = 0;
this.levelText;
let counterText;
let timer;
let timerText;
class scene4 extends Phaser.Scene{
    constructor(){
        super();
    }


    create(){
        let graphics = this.add.graphics();
        this.path = new Phaser.Curves.Path(0, 300);

        for (let i = 0; i < 8; i++)
        {
            this.path.ellipseTo(35, 30, 180, 360, i % 2 === 0, 0);
        }

        graphics.lineStyle(40, 0xff0000, 1);
        this.path.draw(graphics);
        this.isDrawing = false;

        //circles
        let black1 = this.add.circle(17, 325, 15, 0x000000, 1);
        let black2 = this.add.circle(550, 280, 15, 0x000000, 1);

        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        
        
        //black mask
        let cover = this.add.rectangle(800,400,-2000,1000, 0x000000, 1);
        //torch
        let torch = this.add.circle(100, 100, 80, 0x000000, 1);
        torch.visible = false;
        const x = 400
        const y = 300
        cover.mask = new Phaser.Display.Masks.BitmapMask(this, torch);
        cover.mask.invertAlpha = true;
        this.input.on("pointermove", function (pointer){
            let x = pointer.x;
            let y = pointer.y
            torch.x = x;
            torch.y = y;
        }); 

        this.levelText = this.add.text(13, 11, 'Level 4',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter4, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});

        // Create and start the timer
        timer = this.time.addEvent({
            delay: 100000, // 3 second
            paused: false
        });

        timerText = this.add.text(13, 53, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        }
               
    startDrawing(pointer){
        this.isDrawing = true;
        counter4 = counter4 + 1;
    }
    update(){
        timerText.setText(timer.getElapsedSeconds().toFixed(1));
        if (counter4 > 0){
            counterText.setVisible(false);
            counterText = this.add.text(13, 32,'Attempts: ' + counter4, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});       
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
        let points = this.path.getPoints(100);
        let drawnLine = new Phaser.Geom.Line(pointer.downX, pointer.downY, pointer.upX, pointer.upY);
        let intersection = Phaser.Geom.Intersects.GetLineToPoints(
            drawnLine, points);
        if (intersection && Phaser.Geom.Line.Length(drawnLine) > 45 ){
            this.levelText.setText('Level 4 complete!');
            timer.paused = !timer.paused;
            
        }
        this.isDrawing = false;
    }
};
