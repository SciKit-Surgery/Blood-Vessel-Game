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
this.levelText;
this.counterText = null;
this.light = null;
this.linePoints = [];
class scene6 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
        
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

        this.lineGraphics = this.add.graphics();
        this.input.on("pointerdown", this.startDrawing, this);
        this.input.on("pointerup", this.stopDrawing, this);
        this.input.on("pointermove", this.keepDrawing, this);
        this.isDrawing = false;
        this.levelText = this.add.text(13, 11, 'Level 6',{fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        counterText = this.add.text(13, 32, 'Attempts: ' + counter6, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
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
            //var elapsedSeconds = Math.floor(this.time.now / 1000);
            //timerText.setText('Time: ', + elapsedSeconds);
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
    
    stopDrawing(pointer){
        let points = this.path.getPoints(100);
        let drawnLine = new Phaser.Geom.Line(pointer.downX, pointer.downY, pointer.upX, pointer.upY);
        let intersection = Phaser.Geom.Intersects.GetLineToPoints(
            drawnLine, points);
        if (intersection && Phaser.Geom.Line.Length(drawnLine) > 45 ){
            this.levelText.setText('Level 4 complete!');
        }
        this.isDrawing = false;
    }
};
