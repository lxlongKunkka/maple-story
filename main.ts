namespace SpriteKind {
    export const Prop = SpriteKind.create()
}
function ClearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Food)) {
        value.destroy()
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    AttempJump()
})
function GenerateMap (lvl: number) {
    ClearGame()
    if (lvl == 1) {
        tiles.setTilemap(tilemap`level1`)
    } else if (lvl == 2) {
        tiles.setTilemap(tilemap`level4`)
    } else if (lvl == 3) {
        tiles.setTilemap(tilemap`level5`)
    }
    InitGame()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    info.changeLifeBy(1)
    CurrentLevel += 1
    if (CurrentLevel < LevelCount) {
        game.splash("Next Level unlocked")
        GenerateMap(CurrentLevel)
    } else {
        game.over(true, effects.blizzard)
    }
})
function AttempJump () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * Pixels_to_Meter
        hero.startEffect(effects.trail, 500)
        scene.cameraShake(2, 200)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Weapon > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . c e c c . . . 
            c 1 b d b c . . 
            b 1 d d d b . . 
            b 1 c d 1 1 b b 
            c c . c d 1 1 c 
            . . . 4 b 1 1 1 
            . . . c b 1 1 c 
            . . . c 1 b c c 
            `, hero, 240, -60)
        projectile.ay = Gravity
    }
})
function SpawnFood () {
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        if (Math.percentChance(50)) {
            fruits = sprites.create(img`
                . . . . c 7 . . 
                . e e c 7 7 e . 
                . e 2 c 7 2 e e 
                e 2 2 2 4 5 2 e 
                e 2 2 2 2 5 4 e 
                e 2 2 2 2 4 2 e 
                e e 2 2 2 2 e . 
                . e e e e e . . 
                `, SpriteKind.Food)
        } else {
            fruits = sprites.create(img`
                . . 7 7 7 7 8 8 
                . . e e 7 8 8 7 
                . e 2 4 7 7 e 7 
                e 2 5 7 7 7 e 7 
                e 4 2 7 7 2 2 e 
                e 2 2 2 4 2 e e 
                e 4 2 4 2 e e . 
                . e e e e . . . 
                `, SpriteKind.Food)
        }
        tiles.placeOnTile(fruits, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        egg = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 1 1 1 1 1 1 f f . . . . 
            . . f 1 1 1 1 1 1 1 1 1 f f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 f f f . 
            . . . f f f f f f f f f . . . . 
            `, SpriteKind.Prop)
        tiles.placeOnTile(egg, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function CreateHero () {
    info.setLife(6)
    info.setScore(0)
    hero = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `, SpriteKind.Player)
    shadow = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    scene.cameraFollowSprite(shadow)
    controller.moveSprite(hero, 100, 0)
    hero.ay = Gravity
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    otherSprite.destroy(effects.confetti, 500)
})
function InitGame () {
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        tiles.placeOnTile(hero, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(sprites.castle.tilePath2)) {
        tiles.setWallAt(value, true)
    }
    SpawnFood()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Prop, function (sprite, otherSprite) {
    Weapon += 1
    otherSprite.destroy(effects.confetti, 500)
    otherSprite.vy = -2 * Pixels_to_Meter
    otherSprite.ay = Gravity
})
let shadow: Sprite = null
let egg: Sprite = null
let fruits: Sprite = null
let projectile: Sprite = null
let Weapon = 0
let hero: Sprite = null
let Gravity = 0
let Pixels_to_Meter = 0
let LevelCount = 0
let CurrentLevel = 0
scene.setBackgroundColor(9)
CurrentLevel = 1
LevelCount = 3
Pixels_to_Meter = 32
Gravity = 9.8 * Pixels_to_Meter
CreateHero()
GenerateMap(CurrentLevel)
game.onUpdate(function () {
    shadow.x = hero.x + 30
    shadow.y = hero.y + 0
})
