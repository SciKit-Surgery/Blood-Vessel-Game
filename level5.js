//import Phaser from 'phaser'
//const KEY_PHASER_LOGO = 'phaser-logo'
class scene5 extends Phaser.Scene{
    constructor(){
        super("PlayGame");
        this.light = null
    }

    preload(){
        this.load.image(KEY_PHASER_LOGO, 'blood.jpg');
    }

    create()
    {
        const x = 600
        const y = 500

        const reveal = this.add.image(x, y, KEY_PHASER_LOGO)
        this.cover = this.add.image(x, y, KEY_PHASER_LOGO)
        this.cover.setTint(0x004c99)

        const width = this.cover.width
        const height = this.cover.height

        const rt = this.make.renderTexture({
            width,
            height,
            add: false
        })

        const maskImage = this.make.image({
            x,
            y,
            key: rt.texture.key,
            add: false
        })

        this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
        this.cover.mask.invertAlpha = true

        reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

        this.light = this.add.circle(0, 0, 30, 0x000000, 1)
        this.light.visible = false

        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this)

        this.renderTexture = rt
    }

    handlePointerMove(pointer)
    {
        const x = pointer.x - this.cover.x + this.cover.width * 0.5
        const y = pointer.y - this.cover.y + this.cover.height * 0.5

        this.renderTexture.clear()
        this.renderTexture.draw(this.light, x, y)
    }
};