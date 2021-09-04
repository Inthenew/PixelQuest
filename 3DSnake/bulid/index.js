var ok;
/* First weapon */
var Redstaff;
var Greenstaff;
var onmouseoverRedStaff;
var onmouseleaveRedStaff;
var onmouseoverGreenStaff;
var onmouseleaveGreenStaff;
var equipSword;
var zombies;
require([
    'dojo/dom',
    'dojo/fx',
    'dojo/domReady!'
], function (dom, fx) {
    $("#textBox").hide();
    $("#gold").hide();
    $("#redStaffStats").hide();
    $("body").css({
        margin: 0,
        overflowY: 'hidden',
        /* Hide vertical scrollbar */
        overflowX: 'hidden',
        /* Hide horizontal scrollbar */
        height: '100%',
        backgroundColor: 'rgb(0, 255, 255)'
    })
    alert("click to start!");
    /* have you joined the game? */
    var been = false;
    /* when click to continue gets clicked */
    var dot = 'https://inthenew.github.io/PixelQuest/3DSnake//bulid/models'

    function game() {
        if (not(been)) {
            been = true;
            if (on_desktop()) {
                var mapOn = "start";
                var inPrompt = false;
                var beenInShop = false;
                var greenstaffBEEN = false;
                var redstaffBEEN = false;
                var width2 = window.innerWidth;
                var height2 = window.innerHeight;
                var questOn = 1;
                var TimesEquipedSWORD = 0;

                var quest = {
                    one: {
                        images: {map: '<img id="questone" src="' + dot + '/New Piskel (49).gif">'}
                    },
                    two: {
                        images: {
                            map: '<img id="map3" src=`${dot}/pixil-frame-0.png`>',
                            boss: '<img id="boss1" src="' + dot + '/sprite_0 copy.png">'
                        }
                    }
                }

                class Player {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.face = "left";
                        this.player = {
                            position: {
                                x: this.x,
                                y: this.y
                            },
                            width: 50,
                            height: 50
                        };
                        this.health = 10;
                        this.alive = true;
                    }

                    die() {
                        document.getElementById('img').remove();
                        this.alive = false;
                    }

                    draw() {
                        var html = '<img id="img" src="' + dot + '/0.gif">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            zIndex: 209,
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                    }

                    KeyDown(e, house, width, height) {
                        if (this.alive) {
                            if (!inPrompt) {
                                switch (e.keyCode) {
                                    case 87: /*w*/
                                        this.face = "up";
                                        this.updateImage('<img id="img" src="' + dot + '/0-1.gif">', this.y, false, 30, false);
                                        if (this.checkCollision(house, width, height)) {
                                            this.y += 30;
                                            fx.slideTo({
                                                node: document.getElementById("img"),
                                                top: this.y,
                                                left: this.x
                                            }).play();
                                        }
                                        break;
                                    case 83: /*s*/
                                        this.face = "down";
                                        this.updateImage('<img id="img" src="' + dot + '/0-3.gif">', this.y, true, 30, false);
                                        if (this.checkCollision(house, width, height)) {
                                            this.y -= 30;
                                            fx.slideTo({
                                                node: document.getElementById("img"),
                                                top: this.y,
                                                left: this.x
                                            }).play();
                                        }
                                        break;
                                    case 68: /*d*/
                                        this.face = "right";
                                        this.updateImage('<img id="img" src="' + dot + '/0-2.gif">', this.x, true, 30, true);
                                        if (this.checkCollision(house, width, height)) {
                                            this.x -= 30;
                                            fx.slideTo({
                                                node: document.getElementById("img"),
                                                top: this.y,
                                                left: this.x
                                            }).play();
                                        }
                                        break;
                                    case 65: /*a*/
                                        this.face = "left";
                                        var img = document.getElementById("img").getBoundingClientRect();
                                        this.updateImage('<img id="img" src="' + dot + '/0.gif">', this.x, false, 30, true);
                                        if (this.checkCollision(house, width, height)) {
                                            this.x += 30;
                                            fx.slideTo({
                                                node: document.getElementById("img"),
                                                top: this.y,
                                                left: this.x
                                            }).play();
                                        }
                                        break;
                                }
                            }
                        }
                    }

                    Animate() {
                        if (this.alive) {
                        }
                    }

                    updateImage(to, e, b, p, c) {
                        if (this.alive) {
                            document.getElementById('img').remove();
                            var html = to;
                            this.drawing = $(html);
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y
                            });
                            $("body").append(this.drawing);
                                if (b) {
                                    e += p
                                } else {
                                    e -= p
                                }
                                if (c) {
                                    this.x = e;
                                } else {
                                    this.y = e;
                                }
                                var img = document.getElementById("img").getBoundingClientRect();
                                fx.slideTo({
                                    node: document.getElementById("img"),
                                    top: this.y,
                                    left: this.x
                                }).play();
                        }
                    }

                    checkCollision(house, width, height) {
                        if (this.alive) {
                            if (mapOn === "start") {
                                var ToTheRight = false;
                                var ToTheLeft = false;
                                var difference;
                                if (this.x - house.x > 0) {
                                    /*To the right*/
                                    ToTheRight = true;
                                    difference = this.x - house.x;
                                } else {
                                    /*To the left*/
                                    ToTheLeft = true;
                                    difference = house.x - this.x;
                                }
                                var AABB = {
                                    collide: function (player, el2, offset) {
                                        var rect1 = player;
                                        var rect2 = el2.getBoundingClientRect();

                                        return !(
                                            rect1.y > rect2.bottom - offset ||
                                            rect1.x + 100 < rect2.left + offset ||
                                            rect1.y + 100 < rect2.top + offset ||
                                            rect1.x > rect2.right - offset
                                        );
                                    }
                                };
                                if (AABB.collide(player, document.getElementById("Sign"), 20)) {
                                    return true;
                                }
                                var diffY = Math.abs(this.y - house.y);
                                if (ToTheRight) {
                                    if (difference <= 200 && difference > 160 && diffY < height - 100) {
                                        /*Your At The Door*/
                                        dude.draw();
                                        inPrompt = true;
                                        show_Prompt();
                                    }
                                    if (difference < 300 && diffY < height - 100) {
                                        return true;
                                    } else {
                                        if (this.x > screen.availWidth - 50) {
                                            mapOn = "quest";
                                            questOn = 1;
                                            map.l.hide();
                                            sign.drawing.hide();
                                            house.drawing.hide();
                                            map1.drawing.show();
                                            $(".Zombies").show();
                                            for (var i = 0; i < zombies.length; i++) {
                                                zombies[i].needToBeHidden = false;
                                            }
                                            player.x = 10;
                                            return true;
                                        }
                                        if (this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                        return false;
                                    }
                                } else {
                                    if (difference < 30 && diffY < height - 100) {
                                        return true;
                                    } else {
                                        if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                        return false;
                                    }
                                }
                            } else if (mapOn === "shop") {
                                if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                                    return true;
                                } else if (this.y < 50) {
                                    /* He left the shop */
                                    /* delete map */
                                    $("#shop").hide();
                                    $(".door").hide();
                                    $(".wall").hide();
                                    $(".wall2").hide();
                                    if (not(redstaff.Used)) {
                                        $(".RedStaff").hide();
                                    }
                                    if (not(greenstaff.Used)) {
                                        $(".GreenStaff").hide();
                                    }
                                    if (not(sword.Used)) {
                                        $("#sword").hide();
                                    }
                                    map.l.show();
                                    house.drawing.show();
                                    $("#Sign").show();
                                    mapOn = "start";
                                    player.x = 1000;
                                }
                            } else if (mapOn === "quest") {
                                if (questOn === 1) {
                                    if (this.y < 0 || this.y > screen.availHeight - 80) {
                                        return true;
                                    } else if (this.x < 0) {
                                        /* He left the quests */
                                        /* delete map */
                                        player.x = window.innerWidth - 70;
                                        $("#questone").hide();
                                        $(".Zombies").hide();
                                        for (var i = 0; i < zombies.length; i++) {
                                            zombies[i].needToBeHidden = true;
                                        }
                                        map.l.show();
                                        house.drawing.show();
                                        $("#Sign").show();
                                        mapOn = "start";
                                        return;
                                    } else if (this.x > screen.availWidth - 50) {
                                        for (var i = 0; i < zombies.length; i++) {
                                            if (zombies[i].alive) {
                                                questOn = 1;
                                                return true;
                                            }
                                        }
                                        /*enterd second quest!*/
                                        boss.drawing.show();
                                        fx.slideTo({
                                            node: document.getElementById('img'),
                                            left: window.innerWidth - 70,
                                            top: player.y
                                        })
                                        player.x = window.innerWidth - 70;
                                        $("#questone").hide();
                                        questOn = 2;
                                    }
                                    var AABB = {
                                        collide: function (player, el2, offset) {
                                            var rect1 = player;
                                            var rect2 = el2.getBoundingClientRect();

                                            return !(
                                                rect1.y > rect2.bottom - offset ||
                                                rect1.x + 100 < rect2.left + offset ||
                                                rect1.y + 100 < rect2.top + offset ||
                                                rect1.x > rect2.right - offset
                                            );
                                        }
                                    };
                                    for (var i = 0; i < zombies.length; i++) {
                                        if (zombies[i].alive) {
                                            if (AABB.collide(player, document.getElementById("Zombie" + i), 60)) {
                                                return true;
                                            }
                                        }
                                    }
                                } else if (questOn === 2) {
                                    if (this.y < 0 || this.y > screen.availHeight - 80) {
                                        return true;
                                    } else if (this.x < 0) {
                                        /*Left the quest!*/
                                        boss.drawing.hide();
                                        mapOn = "quest";
                                        questOn = 1;
                                        map.l.hide();
                                        sign.drawing.hide();
                                        house.drawing.hide();
                                        map1.drawing.show();
                                        $(".Zombies").show();
                                        for (var i = 0; i < zombies.length; i++) {
                                            zombies[i].needToBeHidden = false;
                                        }
                                        player.x = window.innerWidth - 70;
                                    } else if (this.x > screen.availWidth - 50) {
                                        /*enterd third quest!*/
                                        return true;
                                    }
                                    var AABB = {
                                        collide: function (player, el2, offset) {
                                            var rect1 = player;
                                            var rect2 = el2.getBoundingClientRect();

                                            return !(
                                                rect1.y > rect2.bottom - offset ||
                                                rect1.x + 100 < rect2.left + offset ||
                                                rect1.y + 100 < rect2.top + offset ||
                                                rect1.x > rect2.right - offset
                                            );
                                        }
                                    };
                                    if(AABB.collide(player, document.getElementById('boss1'), 20)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }

                //
                class Zombie {
                    constructor(x, y, i) {
                        this.x = x;
                        this.y = y;
                        this.zombie = i;
                        this.Timout = 200;
                        this.TimoutDone = false;
                        this.needToBeHidden = true;
                        this.health = 10;
                        this.alive = true;
                        this.face = "down";
                    }

                    /* IMPROTANT: Zombies!!!!!!!!!! */
                    draw() {
                        this.html = '<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + 'src="' + dot + '/Zombie.gif">';
                        this.drawing = $(this.html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 150,
                            height: 150
                        });
                        $("body").append(this.drawing);
                    }

                    die() {
                        var p = this;
                        document.getElementById(`Zombie${String(p.zombie)}`).remove();
                        this.alive = false;
                    }

                    NumberToFace(number) {
                        if (number === 1) {
                            this.face = "up";
                        } else if (number === 2) {
                            this.face = "down";
                        } else if (number === 3) {
                            this.face = "left";
                        } else if (number === 4) {
                            this.face = "right";
                        }
                        return this.face;
                    }

                    checkCollision() {
                        if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                            return true;
                        }
                        var AABB = {
                            collide: function (player, el2, offset) {
                                var rect1 = player.getBoundingClientRect();
                                var rect2 = el2.getBoundingClientRect();

                                return !(
                                    rect1.top > rect2.bottom - offset ||
                                    rect1.right < rect2.left + offset ||
                                    rect1.bottom < rect2.top + offset ||
                                    rect1.left > rect2.right - offset
                                );
                            }
                        };
                        var AABB2 = {
                            collide: function (player, el2, offset) {
                                var rect1 = player;
                                var rect2 = el2.getBoundingClientRect();

                                return !(
                                    rect1.y > rect2.bottom - offset ||
                                    rect1.x + 100 < rect2.left + offset ||
                                    rect1.y + 100 < rect2.top + offset ||
                                    rect1.x > rect2.right - offset
                                );
                            }
                        };
                        if (AABB2.collide(player, document.getElementById("Zombie" + String(this.zombie)), 60)) {
                            player.health -= 3;
                            if (player.health <= 0) {
                                player.die();
                            }
                            return true;
                        }
                        for (var i = 0; i < zombies.length; i++) {
                            if (zombies[i].alive) {
                                if (i !== this.zombie) {
                                    if (AABB.collide(document.getElementById("Zombie" + this.zombie), document.getElementById("Zombie" + i), 60)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }

                    move() {
                        if (this.alive) {
                            /* Were to go */
                            this.face = this.NumberToFace(Math.floor(Math.random() * 5));
                            /* Move based off it */
                            if (this.face === "up") {
                                /* update image */
                                this.y -= 10;
                                if (this.checkCollision()) {
                                    this.y += 10;
                                }
                                this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="' + dot + '/New Piskel-4.png">');
                            } else if (this.face === "down") {
                                /* update image */
                                this.y += 10;
                                if (this.checkCollision()) {
                                    this.y -= 10;
                                }
                                this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="' + dot + '/Zombie.gif">');
                            } else if (this.face === "left") {
                                /* update image */
                                this.x -= 10;
                                if (this.checkCollision()) {
                                    this.x += 10;
                                }

                                this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="' + dot + '/New Piskel-2.png">');
                            } else if (this.face === "right") {
                                /* update image */
                                this.x += 10;
                                if (this.checkCollision()) {
                                    this.x -= 10;
                                }
                                this.updateImage('<img class="Zombies" id="Zombie' + String(this.zombie) + '"' + ' src="' + dot + '/New Piskel-3.png">');
                            }
                        }
                    }

                    updatePosition() {
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 150,
                            height: 150
                        });
                    }

                    updateImage(to) {
                        document.getElementById('Zombie' + String(this.zombie)).remove();
                        this.html = to;
                        this.drawing = $(this.html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 150,
                            height: 150
                        });
                        $("body").append(this.drawing);
                        if (this.needToBeHidden) {
                            this.drawing.hide();
                        }
                    }
                }

                //
                var PromptShowing = true;

                function hide_Prompt() {
                    $(".d").hide();
                    PromptShowing = false;
                }

                function show_Prompt() {
                    $(".d").show();
                    PromptShowing = true;
                }

                function add_text(text) {
                    text = String(text);
                    $("#text").text(text)
                }

                //
                //
                //
                class Boss {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                    }

                    draw() {
                        this.html = quest.two.images.boss;
                        this.drawing = $(this.html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        })
                        $("body").append(this.drawing);
                    }
                }
                //
                //
                //
                // unnamed.gif
                class Map {
                    constructor() {
                        this.html = '<img id="map" src="' + dot + '/unnamed.gif">';
                        this.l = $(this.html);
                        this.l.css({
                            position: "absolute",
                            width: window.innerWidth,
                            height: window.innerHeight
                        });
                        $("body").append(this.l);
                    }
                }

                var map = new Map();

                class House {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                    }

                    draw() {
                        var html = '<img id="house" src="' + dot + '/0-4.gif" width="400" height="400">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                    }
                }

                document.onmousedown = function (e) {
                    e.preventDefault();
                }

                class ShopDude {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.beenDrawn = false;
                    }

                    draw() {
                        if (this.beenDrawn)
                            document.getElementById("dude").remove();
                        var html = '<img id="dude" src="' + dot + '/0 copy 2.gif" width="200" height="200">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }

                    remove() {
                        document.getElementById("dude").remove();
                    }
                }

                var dude = new ShopDude(600, 250);
                var text_on = "Hello Adventurers!";
                add_text(text_on);
                hide_Prompt();

                class Shop {
                    constructor() {
                        this.x = 0;
                        this.y = 0;
                        this.beenDrawn = false;
                    }

                    draw() {
                        var html = '<img id="shop" src="' + dot + '/0.png">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            zIndex: 0,
                            left: this.x,
                            top: this.y,
                            width: window.innerWidth,
                            height: window.innerHeight
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }
                }

                class Door {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.beenDrawn = false;
                    }

                    draw() {
                        var html = '<img class="door" src="' + dot + '/images.gif" width="400" height="500">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }
                }

                class Wall {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.beenDrawn = false;
                    }

                    draw() {
                        var html = '<img class="wall" src="' + dot + '/images copy.gif">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: window.innerWidth,
                            height: 1000
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }
                }

                class WallTurned {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.beenDrawn = false;
                    }

                    draw() {
                        var html = '<img class="wall2" src="' + dot + '/images copy 2.gif">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            height: window.innerHeight,
                            width: 1000
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }
                }

                class RedStaff {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.price = 5;
                        this.Used = false;
                    }

                    draw() {
                        var html = '<img class="RedStaff" onclick="Redstaff()"  onmouseover="onmouseoverRedStaff()" onmouseleave="onmouseleaveRedStaff()"  src="' + dot + '/New Piskel (43).gif" on>';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 70,
                            height: 100
                        });
                        $("body").append(this.drawing);
                    }

                    update() {
                        if (this.Used) {
                            var img = document.getElementById('img').getBoundingClientRect();
                            if (player.face === "right") {
                                this.x = img.left + 50;
                            } else if (player.face === "left") {
                                this.x = img.left - 10;
                            } else if (player.face === "up") {
                                this.x = img.left + 50;
                            } else if (player.face === "down") {
                                this.x = img.left - 15;
                            }
                            this.y = img.top;
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y,
                                width: 70,
                                height: 100
                            });
                        }
                    }
                }


                class RedStaffBULLET {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.justShot = false;
                        this.movedShot = false;
                        this.distaceShot = 0;
                        this.beenDrawn = false;
                        this.shotDirection = "left";
                    }

                    draw() {
                        var html = '<img class="RedStaffB" id="RedStaffB" src="' + dot + '/New Piskel (1).gif">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }

                    update() {
                        if (this.beenDrawn) {
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y
                            });
                        }
                        if (redstaff.Used) {
                            if (this.justShot) {
                                if (not(this.movedShot)) {
                                    this.distaceShot += 30;
                                    $(".RedStaffB").show();
                                    if (player.face === "left") {
                                        this.x = (player.x - 10) - this.distaceShot;
                                        this.y = player.y;
                                        this.shotDirection = "left";
                                    } else if (player.face === "right") {
                                        this.x = (player.x + 50) + this.distaceShot;
                                        this.y = player.y;
                                        this.shotDirection = "right";
                                    } else if (player.face === "up") {
                                        this.x = player.x + 50;
                                        this.y = player.y - this.distaceShot;
                                        this.shotDirection = "up";
                                    } else if (player.face === "down") {
                                        this.x = player.x - 15;
                                        this.y = player.y + this.distaceShot;
                                        this.shotDirection = "down";
                                    }
                                    this.movedShot = true;
                                } else {
                                    this.distaceShot += 30;
                                    $(".RedStaffB").show();
                                    if (this.shotDirection === "left") {
                                        this.x -= this.distaceShot;
                                    } else if (this.shotDirection === "right") {
                                        this.x += this.distaceShot;
                                    } else if (this.shotDirection === "up") {
                                        this.y -= this.distaceShot;
                                    } else if (this.shotDirection === "down") {
                                        this.y += this.distaceShot;
                                    }
                                    this.movedShot = true;
                                }
                            } else {
                                $(".RedStaffB").hide();
                                this.x = player.x;
                                this.y = player.y;
                            }
                        }
                    }

                    checkCollision(house, width, height) {
                        if (mapOn === "start") {
                            var ToTheRight = false;
                            var ToTheLeft = false;
                            var difference;
                            if (this.x - house.x > 0) {
                                /*To the right*/
                                ToTheRight = true;
                                difference = this.x - house.x;
                            } else {
                                /*To the left*/
                                ToTheLeft = true;
                                difference = house.x - this.x;
                            }
                            //
                            var AABB = {
                                collide: function (player, el2, offset) {
                                    var rect1 = player.getBoundingClientRect();
                                    var rect2 = el2.getBoundingClientRect();

                                    return !(
                                        rect1.top > rect2.bottom - offset ||
                                        rect1.right < rect2.left + offset ||
                                        rect1.bottom < rect2.top + offset ||
                                        rect1.left > rect2.right - offset
                                    );
                                }
                            };
                            if (AABB.collide(document.getElementById("RedStaffB"), document.getElementById("Sign"), 20)) {
                                return true;
                            }
                            //
                            var diffY = Math.abs(this.y - house.y);
                            if (ToTheRight) {
                                if (difference < 300 && diffY < height - 100) {
                                    return true;
                                } else {
                                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    return false;
                                }
                            } else {
                                if (difference < 30 && diffY < height - 100) {
                                    return true;
                                } else {
                                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    return false;
                                }
                            }
                        } else if (mapOn === "shop") {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                                return true;
                            }
                        } else if (mapOn === "quest") {
                            if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                                return true;
                            }
                            var AABB = {
                                collide: function (player, el2, offset) {
                                    var rect1 = player.getBoundingClientRect();
                                    var rect2 = el2.getBoundingClientRect();

                                    return !(
                                        rect1.top > rect2.bottom - offset ||
                                        rect1.right < rect2.left + offset ||
                                        rect1.bottom < rect2.top + offset ||
                                        rect1.left > rect2.right - offset
                                    );
                                }
                            };
                            for (var i = 0; i < zombies.length; i++) {
                                if (zombies[i].alive) {
                                    if (AABB.collide(document.getElementById("RedStaffB"), document.getElementById(`Zombie${i}`), 0)) {
                                        zombies[i].health -= 2;
                                        if (zombies[i].health <= 0) {
                                            zombies[i].die();
                                            gold++;
                                            $(".gold").text(String(gold))
                                        }
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }

                class GreenStaff {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.price = 7;
                        this.Used = false;
                    }

                    draw() {
                        var html = '<img class="GreenStaff" onclick="Greenstaff()" onmouseover="onmouseoverGreenStaff()"    onmouseleave="onmouseleaveGreenStaff()" src="' + dot + '/unnamed.png">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 70,
                            height: 100,
                            transform: 'rotate(-40deg)'
                        });
                        $("body").append(this.drawing);
                    }

                    update() {
                        if (this.Used) {
                            var img = document.getElementById('img').getBoundingClientRect();
                            if (player.face === "right") {
                                this.x = img.left + 50;
                            } else if (player.face === "left") {
                                this.x = img.left - 10;
                            } else if (player.face === "up") {
                                this.x = img.left + 50;
                            } else if (player.face === "down") {
                                this.x = img.left - 15;
                            }
                            this.y = img.top;
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y,
                                width: 70,
                                height: 100
                            });
                        }
                    }
                }

                class GreenStaffB {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.justShot = false;
                        this.movedShot = false;
                        this.distaceShot = 0;
                        this.beenDrawn = false;
                        this.shotDirection = "left";
                    }

                    draw() {
                        var html = '<img id="GreenStaffB" class="GreenStaffB" src="' + dot + '/unnamed-2.gif">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 40,
                            height: 80
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }

                    update() {
                        if (this.beenDrawn) {
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y,
                                width: 40,
                                height: 80
                            });
                        }
                        if (greenstaff.Used) {
                            if (this.justShot) {
                                if (this.shotDirection === "left") {
                                    this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="' + dot + '/unnamed-2.gif">');
                                } else if (this.shotDirection === "right") {
                                    this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="' + dot + '/unnamed-4.gif">');
                                } else if (this.shotDirection === "up") {
                                    this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="' + dot + '/unnamed-3.gif">');
                                } else if (this.shotDirection === "down") {
                                    this.updateImage('<img id="GreenStaffB" class="GreenStaffB" src="' + dot + '/unnamed-1.gif">');
                                }
                                this.drawing.css({
                                    position: "absolute",
                                    left: this.x,
                                    top: this.y,
                                    width: 40,
                                    height: 80
                                });
                                if (not(this.movedShot)) {
                                    this.distaceShot += 30;
                                    $(".GreenStaffB").show();
                                    if (player.face === "left") {
                                        this.x = (player.x - 10) - this.distaceShot;
                                        this.y = player.y;
                                        this.shotDirection = "left";
                                    } else if (player.face === "right") {
                                        this.x = (player.x + 50) + this.distaceShot;
                                        this.y = player.y;
                                        this.shotDirection = "right";
                                    } else if (player.face === "up") {
                                        this.x = player.x + 50;
                                        this.y = player.y - this.distaceShot;
                                        this.shotDirection = "up";
                                    } else if (player.face === "down") {
                                        this.x = player.x - 15;
                                        this.y = player.y + this.distaceShot;
                                        this.shotDirection = "down";
                                    }
                                    this.movedShot = true;
                                } else {
                                    this.distaceShot += 30;
                                    $(".GreenStaffB").show();
                                    if (this.shotDirection === "left") {
                                        this.x -= this.distaceShot;
                                    } else if (this.shotDirection === "right") {
                                        this.x += this.distaceShot;
                                    } else if (this.shotDirection === "up") {
                                        this.y -= this.distaceShot;
                                    } else if (this.shotDirection === "down") {
                                        this.y += this.distaceShot;
                                    }
                                    this.movedShot = true;
                                }
                            } else {
                                $(".GreenStaffB").hide();
                                this.x = player.x;
                                this.y = player.y;
                            }
                        }
                    }

                    checkCollision(house, width, height) {
                        if (mapOn === "start") {
                            var ToTheRight = false;
                            var ToTheLeft = false;
                            var difference;
                            if (this.x - house.x > 0) {
                                /*To the right*/
                                ToTheRight = true;
                                difference = this.x - house.x;
                            } else {
                                /*To the left*/
                                ToTheLeft = true;
                                difference = house.x - this.x;
                            }
                            //
                            var AABB = {
                                collide: function (player, el2, offset) {
                                    var rect1 = player.getBoundingClientRect();
                                    var rect2 = el2.getBoundingClientRect();

                                    return !(
                                        rect1.top > rect2.bottom - offset ||
                                        rect1.right < rect2.left + offset ||
                                        rect1.bottom < rect2.top + offset ||
                                        rect1.left > rect2.right - offset
                                    );
                                }
                            };
                            if (AABB.collide(document.getElementById("GreenStaffB"), document.getElementById("Sign"), 20)) {
                                return true;
                            }
                            //
                            var diffY = Math.abs(this.y - house.y);
                            if (ToTheRight) {
                                if (difference < 300 && diffY < height - 100) {
                                    return true;
                                } else {
                                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    return false;
                                }
                            } else {
                                if (difference < 30 && diffY < height - 100) {
                                    return true;
                                } else {
                                    if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80 || this.y < 0) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                    return false;
                                }
                            }
                        } else if (mapOn === "shop") {
                            if (this.x > screen.availWidth - 50 || this.x < 0 || this.y > screen.availHeight - 80) {
                                return true;
                            }
                        } else if (mapOn === "quest") {
                            if (this.x > screen.availWidth - 50 || this.y < 0 || this.x < 0 || this.y > screen.availHeight - 80) {
                                return true;
                            }
                            var AABB = {
                                collide: function (player, el2, offset) {
                                    var rect1 = player.getBoundingClientRect();
                                    var rect2 = el2.getBoundingClientRect();

                                    return !(
                                        rect1.top > rect2.bottom - offset ||
                                        rect1.right < rect2.left + offset ||
                                        rect1.bottom < rect2.top + offset ||
                                        rect1.left > rect2.right - offset
                                    );
                                }
                            };
                            for (var i = 0; i < zombies.length; i++) {
                                if (zombies[i].alive) {
                                    if (AABB.collide(document.getElementById("GreenStaffB"), document.getElementById(`Zombie${i}`), 0)) {
                                        zombies[i].health -= 0.1;
                                        zombies[i].health -= 3;
                                        if (zombies[i].health <= 0) {
                                            zombies[i].die();
                                            gold++;
                                            $(".gold").text(String(gold))
                                        }
                                        return true;
                                    }
                                }
                            }
                        }
                    }

                    updateImage(to) {
                        document.getElementById('GreenStaffB').remove();
                        var html = to;
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                    }
                }

                var greenstaff = new GreenStaff(300, 100);
                var greenstaffB = new GreenStaffB(300, 100);
                Greenstaff = function () {
                    $(".gold").text(gold);
                    if (greenstaffBEEN) {
                        equip(greenstaff);
                        return;
                    }
                    if (not(greenstaff.Used)) {
                        if (gold >= greenstaff.price) {
                            show_Prompt();
                            add_text("Success!");
                            text_on = "Success!";
                            gold -= greenstaff.price;
                            $(".gold").text(gold);
                            /* The Character needs to not move*/
                            inPrompt = true;
                            equip(greenstaff);
                            greenstaffBEEN = true;
                        } else {
                            show_Prompt();
                            add_text("You need: " + Math.abs(gold - greenstaff.price) + " more gold!")
                            text_on = "You need: " + Math.abs(gold - greenstaff.price) + " more gold!";
                            $(".gold").text(gold);
                            /* The Character needs to nor move*/
                            inPrompt = true;
                        }
                    }
                }

                class Sign {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                    }

                    draw() {
                        var html = '<img id="Sign" src="' + dot + '/Untitled document.png">';
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: 100,
                            height: 100
                        });
                        $("body").append(this.drawing);
                    }
                }


                class Sword {
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.beenDrawn = false;
                        this.Used = false;
                        this.justHit = false;
                        this.face = "left";
                    }

                    draw() {
                        this.html = '<img id="sword"  onclick="equipSword();" src="' + dot + '/imgbin_pixel-art-graphics-sprite-pixelation-png.png">';
                        this.width = this.html.width;
                        this.height = this.html.height;
                        this.drawing = $(this.html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y
                        });
                        $("body").append(this.drawing);
                        this.beenDrawn = true;
                    }

                    update() {
                        if (this.Used) {
                            var img = document.getElementById('img').getBoundingClientRect();
                            if (player.face === "right") {
                                this.x = img.left + 50;
                                this.face = "right";
                            } else if (player.face === "left") {
                                this.x = img.left - 10;
                                this.face = "left";
                            } else if (player.face === "up") {
                                this.x = img.left + 50;
                                this.face = "up";
                            } else if (player.face === "down") {
                                this.x = img.left - 15;
                                this.face = "down";
                            }

                            this.y = document.getElementById('img').style.top;
                            this.drawing.css({
                                position: "absolute",
                                left: this.x,
                                top: this.y,
                                width: 70,
                                height: 100
                            });
                            if (this.justHit) {
                                var AABB = {
                                    collide: function (player, el2, offset) {
                                        var rect1 = player.getBoundingClientRect();
                                        var rect2 = el2.getBoundingClientRect();

                                        return !(
                                            rect1.top > rect2.bottom - offset ||
                                            rect1.right < rect2.left + offset ||
                                            rect1.bottom < rect2.top + offset ||
                                            rect1.left > rect2.right - offset
                                        );
                                    }
                                };

                                for (var i = 0; i < zombies.length; i++) {
                                    if (zombies[i].alive) {
                                        if (AABB.collide(document.getElementById("sword"), document.getElementById(`Zombie${i}`), 40)) {
                                            zombies[i].health -= 0.5;
                                            if (zombies[i].health <= 0) {
                                                zombies[i].die();
                                                gold++;
                                                $(".gold").text(String(gold))
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }

                equipSword = function () {
                    if (not(sword.Used)) {
                        equip(sword);
                    }
                }

                //
                class questOneMap {
                    constructor() {
                        this.x = 0;
                        this.y = 0;
                    }

                    draw() {
                        var html = quest.one.images.map;
                        this.drawing = $(html);
                        this.drawing.css({
                            position: "absolute",
                            left: this.x,
                            top: this.y,
                            width: window.innerWidth,
                            height: window.innerHeight
                        });
                        $("body").append(this.drawing);
                    }
                }

                //
                function equip(weapon) {
                    weapon.Used = true;
                    if (weapon === greenstaff) {
                        if (redstaff.Used) {
                            redstaff.Used = false;
                            redstaff.drawing.css({
                                position: "absolute",
                                left: 160,
                                top: 100,
                                width: 70,
                                height: 100
                            })
                        }
                        if (sword.Used) {
                            sword.Used = false;
                            sword.drawing.css({
                                position: "absolute",
                                left: 380,
                                top: 100
                            })
                        }
                    } else if (weapon === redstaff) {
                        if (greenstaff.Used) {
                            greenstaff.Used = false;
                            greenstaff.drawing.css({
                                position: "absolute",
                                left: 300,
                                top: 100,
                                width: 70,
                                height: 100
                            })
                        }
                        if (sword.Used) {
                            sword.Used = false;
                            sword.drawing.css({
                                position: "absolute",
                                left: 380,
                                top: 100
                            })
                        }
                    } else if (weapon === sword) {
                        if (TimesEquipedSWORD >= 0) {
                            if (redstaff.Used) {
                                redstaff.Used = false;
                                redstaff.drawing.css({
                                    position: "absolute",
                                    left: 160,
                                    top: 100,
                                    width: 70,
                                    height: 100
                                })
                            }
                            if (greenstaff.Used) {
                                greenstaff.Used = false;
                                greenstaff.drawing.css({
                                    position: "absolute",
                                    left: 300,
                                    top: 100,
                                    width: 70,
                                    height: 100
                                })
                            }
                            TimesEquipedSWORD++;
                        }
                    }
                }

                //
                var map1 = new questOneMap();
                map1.draw();
                map1.drawing.hide();
                //
                //
                var shop = new Shop();
                var sign = new Sign(1700, 300);
                sign.draw();
                var door = new Door((window.innerWidth / 2) - 300, 0);
                var door2 = new Door((window.innerWidth / 2), 0);
                var wall = new Wall(0, 0);
                var wall2 = new WallTurned(0, 0);
                var wall3 = new Wall(0, window.innerHeight - 100);
                var wall4 = new WallTurned(window.innerWidth - 100, 0);
                var redstaff = new RedStaff(160, 100);
                var redstaffB = new RedStaffBULLET(160, 100);
                var gold = 0;
                document.getElementById("price").innerHTML = "Price: " + String(redstaff.price);
                onmouseoverRedStaff = () => {
                    if (not(redstaffBEEN)) {
                        document.getElementById("price").innerHTML = "Price: " + String(redstaff.price);
                        $("#redStaffStats").show()
                    }
                }

                onmouseleaveRedStaff = () => {
                    $("#redStaffStats").hide();
                }
                onmouseoverGreenStaff = () => {
                    if (not(greenstaffBEEN)) {
                        document.getElementById("price").innerHTML = "Price: " + String(greenstaff.price);
                        $("#redStaffStats").show();
                    }
                }
                onmouseleaveGreenStaff = () => {
                    $("#redStaffStats").hide();
                }
                $(".gold").text(gold);
                document.onclick = function (e) {
                    if (!inPrompt) {
                        if (redstaff.Used) {
                            redstaffB.justShot = true;
                            var t = setTimeout(function () {
                                redstaffB.justShot = false;
                                redstaffB.distaceShot = 0;
                                redstaffB.movedShot = false;
                                $(".RedStaffB").hide();
                            }, 1000)
                            var int = setInterval(function () {
                                if (redstaffB.checkCollision(house, 400, 400)) {
                                    clearInterval(int);
                                    clearTimeout(t);
                                    redstaffB.justShot = false;
                                    redstaffB.distaceShot = 0;
                                    redstaffB.movedShot = false;
                                    $(".RedStaffB").hide();
                                }
                            })
                        } else if (greenstaff.Used) {
                            greenstaffB.justShot = true;
                            var t = setTimeout(function () {
                                greenstaffB.justShot = false;
                                greenstaffB.distaceShot = 0;
                                greenstaffB.movedShot = false;
                                $(".GreenStaffB").hide();
                            }, 1000)
                            var int = setInterval(function () {
                                if (greenstaffB.checkCollision(house, 400, 400)) {
                                    clearInterval(int);
                                    clearTimeout(t);
                                    greenstaffB.justShot = false;
                                    greenstaffB.distaceShot = 0;
                                    greenstaffB.movedShot = false;
                                    $(".GreenStaffB").hide();
                                }
                            })
                        } else if (sword.Used) {
                            if (not(sword.justHit)) {
                                if (sword.face === "right") {
                                    sword.drawing.css({
                                        position: "absolute",
                                        left: sword.x,
                                        top: sword.y,
                                        width: sword.width,
                                        height: sword.height,
                                        transform: 'rotate(45deg)'
                                    })
                                } else if (sword.face === "left") {
                                    sword.drawing.css({
                                        position: "absolute",
                                        left: sword.x,
                                        top: sword.y,
                                        width: sword.width,
                                        height: sword.height,
                                        transform: 'rotate(-45deg)'
                                    })
                                }
                                sword.justHit = true;
                                setTimeout(function () {
                                    sword.justHit = false;
                                    sword.drawing.css({
                                        position: "absolute",
                                        left: sword.x,
                                        top: sword.y,
                                        width: sword.width,
                                        height: sword.height,
                                        transform: 'rotate(0deg)'
                                    })
                                }, 200)
                            }
                        }
                    }
                }
                //
                //
                /* This is When you Buy it! */
                Redstaff = () => {
                    $(".gold").text(gold);
                    if (redstaffBEEN) {
                        equip(redstaff);
                        return;
                    }
                    if (not(redstaff.Used)) {
                        if (gold >= redstaff.price) {
                            show_Prompt();
                            add_text("Success!");
                            text_on = "Success!";
                            gold -= redstaff.price;
                            $(".gold").text(gold);
                            /* The Character needs to not move*/
                            inPrompt = true;
                            equip(redstaff);
                            redstaffBEEN = true;
                        } else {
                            show_Prompt();
                            add_text("You need: " + Math.abs(gold - redstaff.price) + " more gold!")
                            text_on = "You need: " + Math.abs(gold - redstaff.price) + " more gold!";
                            $(".gold").text(gold);
                            /* The Character needs to nor move*/
                            inPrompt = true;
                        }
                    }
                }
                ok = function () {
                    if (text_on === "You need: " + Math.abs(gold - redstaff.price) + " more gold!") {
                        hide_Prompt();
                        text_on = "Hello Adventurers!";
                        add_text(text_on);
                        /* The Character needs to move again */
                        inPrompt = false;
                        return;
                    } else if (text_on === "Success!") {
                        hide_Prompt();
                        text_on = "Hello Adventurers!";
                        add_text(text_on);
                        /* The Character needs to move again */
                        inPrompt = false;
                        return;
                    }

                    if (text_on === "You need: " + Math.abs(gold - greenstaff.price) + " more gold!") {
                        hide_Prompt();
                        text_on = "Hello Adventurers!";
                        add_text(text_on);
                        /* The Character needs to move again */
                        inPrompt = false;
                        return;
                    } else if (text_on === "Success!") {
                        hide_Prompt();
                        text_on = "Hello Adventurers!";
                        add_text(text_on);
                        /* The Character needs to move again */
                        inPrompt = false;
                        return;
                    }

                    if (text_on === "Hello Adventurers!") {
                        text_on = "I am the shopkeeper!";
                    } else if (text_on === "I am the shopkeeper!") {
                        text_on = "Welcome to the shop";
                    } else {
                        /* To Enter Shop */
                        /* We needs to hide prompt */
                        hide_Prompt();
                        /* We need to set the text back */
                        text_on = "Hello Adventurers!";
                        /* The Character needs to move again */
                        inPrompt = false;
                        /* The shopKeeper needs to be removed */
                        dude.remove();
                        /* We have to say he has not been drawn, so javascript does not try to remove something that does not exist (The html id of dude) */
                        dude.beenDrawn = false;
                        /* Hides map and buliding*/
                        map.l.hide();
                        house.drawing.hide();
                        $("#Sign").hide();
                        mapOn = "shop";
                        if (not(beenInShop)) {
                            $("#shop").show();
                            $(".door").show();
                            $(".wall").show();
                            $(".wall2").show();
                            $("#sword").show();
                            /* show weapons */
                            $(".RedStaff").show();
                            $(".GreenStaff").show();
                            beenInShop = true;
                        } else {
                            /* show a map we already made */
                            $("#shop").show();
                            $(".door").show();
                            $(".wall").show();
                            $(".wall2").show();
                            $("#sword").show();
                            /* show weapons */
                            $(".RedStaff").show();
                            $(".GreenStaff").show();
                        }
                    }
                    add_text(text_on)
                }

                //
                var player = new Player(window.innerWidth / 2, window.innerHeight / 2);
                player.draw();
                var house = new House(500, 10);
                house.draw();
                //
                //
                /* To Make new map */
                /*add shop*/
                shop.draw();
                shop.drawing.hide();
                /* add stick 1 */
                door.draw();
                door.drawing.hide();
                /* add stick 2 */
                door2.draw();
                door2.drawing.hide();
                /* add wall */
                wall.draw();
                wall.drawing.hide();
                /* add wall */
                wall2.draw();
                wall2.drawing.hide();
                /* add wall */
                wall3.draw();
                wall3.drawing.hide();
                /* add wall */
                wall4.draw();
                wall4.drawing.hide();
                /* add RedStaff */
                redstaff.draw();
                redstaffB.draw();
                redstaff.drawing.hide();
                /* add green staff */
                greenstaff.draw();
                greenstaff.drawing.hide();
                greenstaffB.draw();
                $(".RedStaffB").hide();
                $(".GreenStaffB").hide();
                //
                //
                var sword = new Sword(10, 10);
                sword.draw();
                equip(sword);
                zombies = [new Zombie(100, 200, 0), new Zombie(500, 500, 1), new Zombie(700, 700, 2), new Zombie(20, 900, 3), new Zombie(1000, 300, 4)];
                for (var i = 0; i < zombies.length; i++) {
                    zombies[i].draw();
                }
                $(".Zombies").hide();
                var boss = new Boss(window.innerWidth / 2, window.innerHeight / 2);
                boss.draw();
                boss.drawing.hide();
                setInterval(function () {
                    if (player.alive) {
                        for (var i = 0; i < zombies.length; i++) {
                            if (zombies[i].alive) {
                                zombies[i].move();
                            }
                        }
                    }
                }, zombies[0].Timout)
                var lastH = 0;

                function updatePlayerHealth() {
                    if (player.health !== lastH) {
                        $(".health").text(String(player.health));
                        lastH = player.health;
                    }
                    if (not(player.alive)) {
                        $(".health").text(String(0));
                        lastH = player.health;
                    }
                }

                setInterval(function () {
                    if (player.alive) {
                        if (player.health !== 10) {
                            player.health += 2;

                        }
                    }
                }, 10000)

                function animate() {
                    if (player.alive) {
                        requestAnimationFrame(animate);
                        width2 = window.innerWidth;
                        height2 = window.innerHeight;
                        player.Animate();
                        redstaff.update();
                        redstaffB.update();
                        greenstaff.update();
                        greenstaffB.update();
                        sword.update();
                        for (var i = 0; i < zombies.length; i++) {
                            zombies[i].updatePosition();
                        }
                    }
                    updatePlayerHealth();
                }


                animate();
                $("body").keydown(function (e) {
                    player.KeyDown(e, house, 400, 400);
                })
            } else {
                alert("You need a computer/need to be full screen")
            }
        }
    }


    var pickedCancel = false;
    document.addEventListener('mousedown', function () {
            if (BigScreen.enabled) {
                var instructions = this
                BigScreen.request(document.body /*renderer.domElement*/, function () {
                    $("body").css({
                        margin: 0,
                        overflowY: 'hidden',
                        /* Hide vertical scrollbar */
                        overflowX: 'hidden',
                        /* Hide horizontal scrollbar */
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)'
                    })
                    $("#gold").show();
                    game();
                }, function () {
                }, function () {
                    if (not(pickedCancel)) {
                        $("body").css({
                            margin: 0,
                            overflowY: 'hidden',
                            /* Hide vertical scrollbar */
                            overflowX: 'hidden',
                            /* Hide horizontal scrollbar */
                            height: '100%',
                            backgroundColor: 'rgb(255, 255, 255)'
                        })
                        $("#gold").show();
                        if (not(been) && confirm('Full screen failed: No FullScreen? (ok: yes; cancel: try again)') && not(pickedCancel)) {
                            pickedCancel = true;
                            game();
                        } else {

                        }
                    }
                });

            } else {
                // We fall back to alternative controls
                if (not(pickedCancel)) {
                    $("body").css({
                        margin: 0,
                        overflowY: 'hidden',
                        /* Hide vertical scrollbar */
                        overflowX: 'hidden',
                        /* Hide horizontal scrollbar */
                        height: '100%',
                        backgroundColor: 'rgb(255, 255, 255)'
                    })
                    $("#gold").show();
                    if (not(been) && confirm('Full screen failed: No FullScreen? (ok: yes; cancel: try again)') && not(pickedCancel)) {
                        pickedCancel = true;
                        game();
                    } else {

                    }
                }
            }
        }
    )
});
