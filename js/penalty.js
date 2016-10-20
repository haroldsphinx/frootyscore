(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
function trace(a) {
    console.log(a)
}
$(window).resize(function() {
    sizeHandler()
});
function isIOS() {
    for (var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); a.length; )
        if (navigator.platform === a.pop())
            return s_bIsIphone = !0;
    return s_bIsIphone = !1
}
function getSize(a) {
    var d = a.toLowerCase()
        , b = window.document
        , c = b.documentElement;
    if (void 0 === window["inner" + a])
        a = c["client" + a];
    else if (window["inner" + a] != c["client" + a]) {
        var f = b.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var k = b.createElement("div");
        k.id = "vpw-test-d";
        k.style.cssText = "position:absolute;top:-1000px";
        k.innerHTML = "<style>@media(" + d + ":" + c["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        f.appendChild(k);
        c.insertBefore(f, b.head);
        a = 7 == k["offset" + a] ? c["client" + a] : window["inner" + a];
        c.removeChild(f)
    } else
        a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width")
            , b = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH)
            , c = CANVAS_WIDTH * b
            , b = CANVAS_HEIGHT * b
            , f = 0;
        b < a ? (f = a - b,
            b += f,
            c += CANVAS_WIDTH / CANVAS_HEIGHT * f) : c < d && (f = d - c,
            c += f,
            b += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        var f = a / 2 - b / 2
            , k = d / 2 - c / 2
            , h = CANVAS_WIDTH / c;
        if (k * h < -EDGEBOARD_X || f * h < -EDGEBOARD_Y)
            b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
                c = CANVAS_WIDTH * b,
                b *= CANVAS_HEIGHT,
                f = (a - b) / 2,
                k = (d - c) / 2,
                h = CANVAS_WIDTH / c;
        s_iOffsetX = -1 * k * h;
        s_iOffsetY = -1 * f * h;
        0 <= f && (s_iOffsetY = 0);
        0 <= k && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oSelectTeam && s_oSelectTeam.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", c + "px");
        $("#canvas").css("height", b + "px");
        0 > f ? $("#canvas").css("top", f + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", k + "px")
    }
}
function createBitmap(a, d, b) {
    var c = new createjs.Bitmap(a)
        , f = new createjs.Shape;
    d && b ? f.graphics.beginFill("#fff").drawRect(0, 0, d, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    c.hitArea = f;
    return c
}
function createSprite(a, d, b, c, f, k) {
    a = null !== d ? new createjs.Sprite(a,d) : new createjs.Sprite(a);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect(-b, -c, f, k);
    a.hitArea = d;
    return a
}
function randomFloatBetween(a, d, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b))
}
function rotateVector2D(a, d) {
    var b = d.getX() * Math.cos(a) + d.getY() * Math.sin(a)
        , c = d.getX() * -Math.sin(a) + d.getY() * Math.cos(a);
    d.set(b, c)
}
function tweenVectorsOnX(a, d, b) {
    return a + b * (d - a)
}
function shuffle(a) {
    for (var d = a.length, b, c; 0 !== d; )
        c = Math.floor(Math.random() * d),
            --d,
            b = a[d],
            a[d] = a[c],
            a[c] = b;
    return a
}
function bubbleSort(a) {
    var d;
    do {
        d = !1;
        for (var b = 0; b < a.length - 1; b++)
            a[b] > a[b + 1] && (d = a[b],
                a[b] = a[b + 1],
                a[b + 1] = d,
                d = !0)
    } while (d)
}
function compare(a, d) {
    return a.index > d.index ? -1 : a.index < d.index ? 1 : 0
}
function easeLinear(a, d, b, c) {
    return b * a / c + d
}
function easeInQuad(a, d, b, c) {
    return b * (a /= c) * a + d
}
function easeInSine(a, d, b, c) {
    return -b * Math.cos(a / c * (Math.PI / 2)) + b + d
}
function easeInCubic(a, d, b, c) {
    return b * (a /= c) * a * a + d
}
function easeOutCubic(a, d, b, c, f) {
    return b * ((a = a / c - 1) * a * a + 1) + d
}
function getTrajectoryPoint(a, d) {
    var b = new createjs.Point
        , c = (1 - a) * (1 - a)
        , f = a * a;
    b.x = c * d.start.x + 2 * (1 - a) * a * d.traj.x + f * d.end.x;
    b.y = c * d.start.y + 2 * (1 - a) * a * d.traj.y + f * d.end.y;
    return b
}
function formatTime(a) {
    a /= 1E3;
    var d = Math.floor(a / 60);
    a = Math.floor(a - 60 * d);
    var b = ""
        , b = 10 > d ? b + ("0" + d + ":") : b + (d + ":");
    return 10 > a ? b + ("0" + a) : b + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, d) {
    var b, c;
    b = getBounds(a, .9);
    c = getBounds(d, .98);
    return calculateIntersection(b, c)
}
function calculateIntersection(a, d) {
    var b, c, f, k, h, e, g, l;
    b = a.x + (f = a.width / 2);
    c = a.y + (k = a.height / 2);
    h = d.x + (e = d.width / 2);
    g = d.y + (l = d.height / 2);
    b = Math.abs(b - h) - (f + e);
    c = Math.abs(c - g) - (k + l);
    return 0 > b && 0 > c ? (b = Math.min(Math.min(a.width, d.width), -b),
        c = Math.min(Math.min(a.height, d.height), -c),
    {
        x: Math.max(a.x, d.x),
        y: Math.max(a.y, d.y),
        width: b,
        height: c,
        rect1: a,
        rect2: d
    }) : null
}
function getBounds(a, d) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var c = a.children, f = c.length, k, h;
        for (h = 0; h < f; h++)
            k = getBounds(c[h], 1),
            k.x < b.x && (b.x = k.x),
            k.y < b.y && (b.y = k.y),
            k.x + k.width > b.x2 && (b.x2 = k.x + k.width),
            k.y + k.height > b.y2 && (b.y2 = k.y + k.height);
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        var e, g;
        a instanceof createjs.Bitmap ? (f = a.sourceRect || a.image,
            h = f.width * d,
            e = f.height * d) : a instanceof createjs.Sprite ? a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image ? (f = a.spriteSheet.getFrame(a.currentFrame),
            h = f.rect.width,
            e = f.rect.height,
            c = f.regX,
            g = f.regY) : (b.x = a.x || 0,
            b.y = a.y || 0) : (b.x = a.x || 0,
            b.y = a.y || 0);
        c = c || 0;
        h = h || 0;
        g = g || 0;
        e = e || 0;
        b.regX = c;
        b.regY = g;
        f = a.localToGlobal(0 - c, 0 - g);
        k = a.localToGlobal(h - c, e - g);
        h = a.localToGlobal(h - c, 0 - g);
        c = a.localToGlobal(0 - c, e - g);
        b.x = Math.min(Math.min(Math.min(f.x, k.x), h.x), c.x);
        b.y = Math.min(Math.min(Math.min(f.y, k.y), h.y), c.y);
        b.width = Math.max(Math.max(Math.max(f.x, k.x), h.x), c.x) - b.x;
        b.height = Math.max(Math.max(Math.max(f.y, k.y), h.y), c.y) - b.y
    }
    return b
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var d = a.length, b, c; 0 < d; )
        c = Math.floor(Math.random() * d),
            d--,
            b = a[d],
            a[d] = a[c],
            a[c] = b;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            a.dispatchEvent(d)
        }
    }
};
(function() {
    function a(a) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in c ? document.body.className = c[a.type] : (document.body.className = this[d] ? "hidden" : "visible",
            "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", a) : (d = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (d = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (d = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var d = window.location.search.substring(1).split("&"), b = 0; b < d.length; b++) {
        var c = d[b].split("=");
        if (c[0] == a)
            return c[1]
    }
}
;function CSpriteLibrary() {
    var a, d, b, c, f, k;
    this.init = function(h, e, g) {
        b = d = 0;
        c = h;
        f = e;
        k = g;
        a = {}
    }
    ;
    this.addSprite = function(b, c) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: c,
            oSprite: new Image
        },
            d++)
    }
    ;
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        f.call(k)
    }
    ;
    this._onSpriteLoaded = function() {
        c.call(k);
        ++b == d && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var b in a)
            a[b].oSprite.oSpriteLibrary = this,
                a[b].oSprite.onload = function() {
                    this.oSpriteLibrary._onSpriteLoaded()
                }
                ,
                a[b].oSprite.src = a[b].szPath
    }
    ;
    this.getNumSprites = function() {
        return d
    }
}
;function CVector2(a, d) {
    var b, c;
    this._init = function(a, d) {
        b = a;
        c = d
    }
    ;
    this.add = function(a, d) {
        b += a;
        c += d
    }
    ;
    this.addV = function(a) {
        b += a.getX();
        c += a.getY()
    }
    ;
    this.scalarDivision = function(a) {
        b /= a;
        c /= a
    }
    ;
    this.subV = function(a) {
        b -= a.getX();
        c -= a.getY()
    }
    ;
    this.scalarProduct = function(a) {
        b *= a;
        c *= a
    }
    ;
    this.invert = function() {
        b *= -1;
        c *= -1
    }
    ;
    this.dotProduct = function(a) {
        return b * a.getX() + c * a.getY()
    }
    ;
    this.set = function(a, d) {
        b = a;
        c = d
    }
    ;
    this.setV = function(a) {
        b = a.getX();
        c = a.getY()
    }
    ;
    this.length = function() {
        return Math.sqrt(b * b + c * c)
    }
    ;
    this.length2 = function() {
        return b * b + c * c
    }
    ;
    this.normalize = function() {
        var a = this.length();
        0 < a && (b /= a,
            c /= a)
    }
    ;
    this.getNormalize = function(a) {
        this.length();
        a.set(b, c);
        a.normalize()
    }
    ;
    this.rot90CCW = function() {
        var a = b;
        b = -c;
        c = a
    }
    ;
    this.rot90CW = function() {
        var a = b;
        b = c;
        c = -a
    }
    ;
    this.getRotCCW = function(a) {
        a.set(b, c);
        a.rot90CCW()
    }
    ;
    this.getRotCW = function(a) {
        a.set(b, c);
        a.rot90CW()
    }
    ;
    this.ceil = function() {
        b = Math.ceil(b);
        c = Math.ceil(c)
    }
    ;
    this.round = function() {
        b = Math.round(b);
        c = Math.round(c)
    }
    ;
    this.toString = function() {
        return "Vector2: " + b + ", " + c
    }
    ;
    this.print = function() {
        trace("Vector2: " + b + ", " + c + "")
    }
    ;
    this.getX = function() {
        return b
    }
    ;
    this.getY = function() {
        return c
    }
    ;
    this._init(a, d)
}
;var CANVAS_WIDTH = 1360, CANVAS_HEIGHT = 640, EDGEBOARD_X = 275, EDGEBOARD_Y = 80, TEXT = "walibi0615bold", NUM_CROWD = 1, NUM_LEVEL = 6, NUM_KICK = 5, SPACE_BAR = 32, LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40, SHOT_INDICATOR_SPEED, DECREASE_SHOT_INDICATOR_SPEED, RANGE_WIDTH = 9, RANGE_HEIGHT = 4, LOW_PERCENT = 5, MED_PERCENT = 50, HIGH_PERCENT = 90, MATRIX_X_START = 380, MATRIX_X_END = 1040, MATRIX_Y_START = 235, MATRIX_Y_END = 430, ROUND = 0, MSG_BOX_WIDTH = 744, MSG_BOX_HEIGHT = 450, GOAL_WIDTH = 390, GOAL_HEIGHT = 145, PLAYER_WIDTH = 160, PLAYER_HEIGHT = 239, WALL_WIDTH = 119, WALL_HEIGHT = 179, BALL_WIDTH = 60, BALL_HEIGHT = 60, STEP_SPEED_BALL_HITTED = 2.4, FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, TOP_BARX = 784, TOP_BARY = 48, RIGHT_BARX = 44, RIGHT_BARY = 359, CURSOR_X = 41, CURSOR_Y = 41, PLAYER_X_POSITION_IN_SELECTION = CANVAS_WIDTH / 2, PLAYER_Y_POSITION_IN_SELECTION = 350, ARGENTINA = 0, BRAZIL = 1, GERMANY = 2, ENGLAND = 3, ITALY = 4, FRANCE = 5, FIRST_TIME = 0, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5;
var NUM_SAVE = 8
    , GOALKEEPER_X_POSITION = CANVAS_WIDTH / 2
    , GOALKEEPER_Y_POSITION = 390
    , GOALKEEPER_WIDTH = 91
    , GOALKEEPER_HEIGHT = 122
    , CENTER_INFO = {
    action: "center",
    width: 91,
    height: 122,
    x: CANVAS_WIDTH / 2,
    y: 420,
    frames: 4
}
    , CENTER_HIGH_INFO = {
    action: "center_high",
    width: 106,
    height: 163,
    x: CANVAS_WIDTH / 2,
    y: 420,
    frames: 9
}
    , DOWN_LEFT_INFO = {
    action: "down_left",
    width: 185,
    height: 118,
    x: CANVAS_WIDTH / 2 - 45,
    y: 420,
    frames: 16
}
    , DOWN_RIGHT_INFO = {
    action: "down_right",
    width: 185,
    height: 118,
    x: CANVAS_WIDTH / 2 + 45,
    y: 420,
    frames: 17
}
    , HIGH_LEFT_INFO = {
    action: "high_left",
    width: 295,
    height: 163,
    x: CANVAS_WIDTH / 2 - 100,
    y: 420,
    frames: 17
}
    , HIGH_RIGHT_INFO = {
    action: "high_right",
    width: 275,
    height: 163,
    x: CANVAS_WIDTH / 2 + 90,
    y: 420,
    frames: 17
}
    , MED_LEFT_INFO = {
    action: "med_left",
    width: 229,
    height: 113,
    x: CANVAS_WIDTH / 2 - 65,
    y: 420,
    frames: 16
}
    , MED_RIGHT_INFO = {
    action: "med_right",
    width: 229,
    height: 118,
    x: CANVAS_WIDTH / 2 + 65,
    y: 420,
    frames: 16
}
    , CENTER = 0
    , CENTER_HIGH = 1
    , DOWN_LEFT = 2
    , DOWN_RIGHT = 3
    , HIGH_LEFT = 4
    , HIGH_RIGHT = 5
    , MED_LEFT = 6
    , MED_RIGHT = 7
    , OUT = 8;
TEXT_SCORE = "SCORE: ";
TEXT_PAUSE = "PAUSE";
HELP_TEXT_DESKTOP = "Mark the position you want to play with the arrow mark";
HELP_TEXT_MOBILE = "Mark the position you want to play with the arrow mark";
HELP_TEXT = "You can login to facebook to play or share your score on facebook and win prizes from CHIVITA.";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Next Level!";
TEXT_SHARE_MSG1 = "You scored <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Another Challenge?";
function CPreloader() {
    var a, d, b, c, f, k, h;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        h = new createjs.Container;
        s_oStage.addChild(h)
    }
    ;
    this.unload = function() {
        h.removeAllChildren()
    }
    ;
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(k).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    }
    ;
    this._onImagesLoaded = function() {}
    ;
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    }
    ;
    this.attachSprites = function() {
        var e = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        h.addChild(e);
        e = s_oSpriteLibrary.getSprite("progress_bar");
        c = createBitmap(e);
        c.x = CANVAS_WIDTH / 2 - e.width / 2;
        c.y = CANVAS_HEIGHT - 145;
        h.addChild(c);
        a = e.width;
        d = e.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(c.x, c.y, 1, d);
        h.addChild(f);
        c.mask = f;
        b = new createjs.Text("","30px Arial","#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT - 150;
        b.shadow = new createjs.Shadow("#000",2,2,2);
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        h.addChild(b);
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = 0;
        h.addChild(k)
    }
    ;
    this.refreshLoader = function(e) {
        b.text = e + "%";
        f.graphics.clear();
        e = Math.floor(e * a / 100);
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(c.x, c.y, e, d)
    }
    ;
    this._init()
}
;function CMain(a) {
    var d, b = 0, c = 0, f = STATE_LOADING, k, h, e;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20),
            $("body").on("contextmenu", "#canvas", function(a) {
                return !1
            }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        h = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        d = !0
    }
    ;
    this.soundLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / c * 100));
        if (b === c) {
            h.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
                s_oCrowd = createjs.Sound.play("crowd", {
                    loop: -1
                }),
                    s_oSoundtrack = createjs.Sound.play("soundtrack", {
                        loop: -1
                    });
            this.gotoMenu()
        }
    }
    ;
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"],
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack"),
            createjs.Sound.registerSound("./sounds/press_but.ogg", "click"),
            createjs.Sound.registerSound("./sounds/applause.ogg", "applause"),
            createjs.Sound.registerSound("./sounds/crowd.ogg", "crowd"),
            createjs.Sound.registerSound("./sounds/goal.ogg", "goal"),
            createjs.Sound.registerSound("./sounds/keeper_save.ogg", "keeper_save"),
            createjs.Sound.registerSound("./sounds/kick.ogg", "kick"),
            createjs.Sound.registerSound("./sounds/miss_goal.ogg", "miss_goal"),
            createjs.Sound.registerSound("./sounds/select_team.ogg", "select_team"),
            createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over"),
            createjs.Sound.registerSound("./sounds/stop_indicator.ogg", "stop_indicator")) : (createjs.Sound.alternateExtensions = ["ogg"],
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"),
            createjs.Sound.registerSound("./sounds/press_but.mp3", "click"),
            createjs.Sound.registerSound("./sounds/applause.mp3", "applause"),
            createjs.Sound.registerSound("./sounds/crowd.mp3", "crowd"),
            createjs.Sound.registerSound("./sounds/goal.mp3", "goal"),
            createjs.Sound.registerSound("./sounds/keeper_save.mp3", "keeper_save"),
            createjs.Sound.registerSound("./sounds/kick.mp3", "kick"),
            createjs.Sound.registerSound("./sounds/miss_goal.mp3", "miss_goal"),
            createjs.Sound.registerSound("./sounds/select_team.mp3", "select_team"),
            createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"),
            createjs.Sound.registerSound("./sounds/stop_indicator.mp3", "stop_indicator")),
            c += 11)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("play_button", "./sprites/play_button.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team", "./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("bg_next_level", "./sprites/bg_next_level.jpg");
        s_oSpriteLibrary.addSprite("bg_win", "./sprites/bg_win.jpg");
        s_oSpriteLibrary.addSprite("you_win", "./sprites/you_win.png");
        s_oSpriteLibrary.addSprite("game_over", "./sprites/game_over.png");
        s_oSpriteLibrary.addSprite("ball_kick_left", "./sprites/ball_kick_left.png");
        s_oSpriteLibrary.addSprite("_oButNext", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("arrow_bar", "./sprites/arrow_bar.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_continue_small", "./sprites/but_continue_small.png");
        s_oSpriteLibrary.addSprite("argentina", "./sprites/flag_argentina.png");
        s_oSpriteLibrary.addSprite("brazil", "./sprites/flag_brazil.png");
        s_oSpriteLibrary.addSprite("germany", "./sprites/flag_germany.png");
        s_oSpriteLibrary.addSprite("england", "./sprites/flag_england.png");
        s_oSpriteLibrary.addSprite("goal", "./sprites/goal.png");
        s_oSpriteLibrary.addSprite("high_bar", "./sprites/high_bar.png");
        s_oSpriteLibrary.addSprite("right_bar", "./sprites/right_bar.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("icon_goal", "./sprites/icon_goal.png");
        s_oSpriteLibrary.addSprite("icon_kick", "./sprites/icon_kick.png");
        s_oSpriteLibrary.addSprite("goal_text", "./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("missed_text", "./sprites/missed_text.png");
        s_oSpriteLibrary.addSprite("out_text", "./sprites/out_text.png");
        s_oSpriteLibrary.addSprite("fblogin", "./sprites/fblogin.png");
        s_oSpriteLibrary.addSprite("rank", "./sprites/rank.png");
        s_oSpriteLibrary.addSprite("facebook", "./sprites/facebook.png");
        s_oSpriteLibrary.addSprite("twitter", "./sprites/twitter.png");
        s_oSpriteLibrary.addSprite("leaderboard", "./sprites/leaderboard.png");
        s_oSpriteLibrary.addSprite("rooney1_idle", "./sprites/players/rooney1_idle.png");
        s_oSpriteLibrary.addSprite("rooney1_idle2", "./sprites/players/rooney2_idle.png");
        s_oSpriteLibrary.addSprite("ibrahimovich1_idle", "./sprites/players/ibrahimovich1_idle.png");
        s_oSpriteLibrary.addSprite("ibrahimovich1_idle2", "./sprites/players/ibrahimovich2_idle.png");
        s_oSpriteLibrary.addSprite("pogba1_idle", "./sprites/players/pogba1_idle.png");
        s_oSpriteLibrary.addSprite("pogba1_idle2", "./sprites/players/pogba2_idle.png");
        s_oSpriteLibrary.addSprite("rooney1_shot", "./sprites/players/rooney1_shot.png");
        s_oSpriteLibrary.addSprite("ibrahimovich1_shot", "./sprites/players/ibrahimovich1_shot.png");
        s_oSpriteLibrary.addSprite("pogba1_shot", "./sprites/players/pogba1_shot.png");
        s_oSpriteLibrary.addSprite("goalkeeper_idle", "./sprites/players/goalkeeper_idle.png");
        s_oSpriteLibrary.addSprite("goalkeeper_center", "./sprites/players/goalkeeper_center.png");
        s_oSpriteLibrary.addSprite("goalkeeper_center_high", "./sprites/players/goalkeeper_center_high.png");
        s_oSpriteLibrary.addSprite("goalkeeper_down_left", "./sprites/players/goalkeeper_down_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_down_right", "./sprites/players/goalkeeper_down_right.png");
        s_oSpriteLibrary.addSprite("goalkeeper_high_left", "./sprites/players/goalkeeper_high_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_high_right", "./sprites/players/goalkeeper_high_right.png");
        s_oSpriteLibrary.addSprite("goalkeeper_med_left", "./sprites/players/goalkeeper_med_left.png");
        s_oSpriteLibrary.addSprite("goalkeeper_med_right", "./sprites/players/goalkeeper_med_right.png");
        s_oSpriteLibrary.addSprite("wall_idle", "./sprites/players/wall_idle.png");
        s_oSpriteLibrary.addSprite("wall_jump", "./sprites/players/wall_jump.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        for (var a = 0; a < NUM_CROWD; a++)
            s_oSpriteLibrary.addSprite("supporters_" + a, "./sprites/supporters/supporters_" + a + ".png");
        c += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / c * 100));
        if (b === c) {
            h.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
                s_oSoundtrack = createjs.Sound.play("soundtrack", {
                    loop: -1
                });
            this.gotoMenu()
        }
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    }
    ;
    this.gotoSelectTeam = function() {
        new CSelectTeam;
        f = STATE_MENU
    }
    ;
    this.gotoGame = function(a) {
        e = new CGame(k,a);
        f = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        d = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block")
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        d = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none")
    }
    ;
    this._update = function(a) {
        if (!1 !== d) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
                s_iCntTime -= 1E3,
                s_iCntFps = 0);
            f === STATE_GAME && e.update();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    k = a;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_iMode, s_szImage, s_bNumActive, s_iTeamSelected = ARGENTINA, s_szTeamSelectedSprite = "rooney1", s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundtrack, s_oCrowd, s_oCanvas;
function CTextButton(a, d, b, c, f, k, h) {
    var e, g, l, m, n;
    this._init = function(a, b, c, d, f, h, k) {
        e = [];
        g = [];
        var G = createBitmap(c)
            , A = Math.ceil(k / 20);
        n = new createjs.Text(d,"bold " + k + "px " + f,"#000000");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        var x = n.getBounds();
        n.x = c.width / 2 + A;
        n.y = Math.floor(c.height / 2) + x.height / 3 + A;
        m = new createjs.Text(d,"bold " + k + "px " + f,h);
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        x = m.getBounds();
        m.x = c.width / 2;
        m.y = Math.floor(c.height / 2) + x.height / 3;
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        l.regX = c.width / 2;
        l.regY = c.height / 2;
        l.addChild(G, n, m);
        s_oStage.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        l.off("mousedown");
        l.off("pressup");
        s_oStage.removeChild(l)
    }
    ;
    this.setVisible = function(a) {
        l.visible = a
    }
    ;
    this._initListener = function() {
        oParent = this;
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        e[a] = b;
        g[a] = c
    }
    ;
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP])
    }
    ;
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    }
    ;
    this.setTextPosition = function(a) {
        m.y = a;
        n.y = a + 2
    }
    ;
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    }
    ;
    this.setX = function(a) {
        l.x = a
    }
    ;
    this.setY = function(a) {
        l.y = a
    }
    ;
    this.getButtonImage = function() {
        return l
    }
    ;
    this.getX = function() {
        return l.x
    }
    ;
    this.getY = function() {
        return l.y
    }
    ;
    this._init(a, d, b, c, f, k, h);
    return this
}
;function CToggle(a, d, b, c) {
    var f, k, h, e = [], g;
    this._init = function(a, b, c, d) {
        k = [];
        h = [];
        var e = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = d;
        g = createSprite(e, "state_" + f, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        g.x = a;
        g.y = b;
        g.stop();
        s_oStage.addChild(g);
        this._initListener()
    }
    ;
    this.unload = function() {
        g.off("mousedown", this.buttonDown);
        g.off("pressup", this.buttonRelease);
        s_oStage.removeChild(g)
    }
    ;
    this._initListener = function() {
        g.on("mousedown", this.buttonDown);
        g.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        k[a] = b;
        h[a] = c
    }
    ;
    this.addEventListenerWithParams = function(a, b, c, d) {
        k[a] = b;
        h[a] = c;
        e = d
    }
    ;
    this.setActive = function(a) {
        f = a;
        g.gotoAndStop("state_" + f)
    }
    ;
    this.buttonRelease = function() {
        g.scaleX = 1;
        g.scaleY = 1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        f = !f;
        g.gotoAndStop("state_" + f);
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(h[ON_MOUSE_UP], e)
    }
    ;
    this.buttonDown = function() {
        g.scaleX = .9;
        g.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], e)
    }
    ;
    this.setPosition = function(a, b) {
        g.x = a;
        g.y = b
    }
    ;
    this.setVisible = function(a) {
        g.visible = a
    }
    ;
    this._init(a, d, b, c)
}
;function CGfxButton(a, d, b) {
    var c, f, k, h = [], e;
    this._init = function(a, b, d) {
        c = 1;
        f = [];
        k = [];
        e = createBitmap(d);
        e.x = a;
        e.y = b;
        e.regX = d.width / 2;
        e.regY = d.height / 2;
        s_oStage.addChild(e);
        this._initListener()
    }
    ;
    this.unload = function() {
        e.off("mousedown", this.buttonDown);
        e.off("pressup", this.buttonRelease);
        s_oStage.removeChild(e)
    }
    ;
    this.setVisible = function(a) {
        e.visible = a
    }
    ;
    this._initListener = function() {
        e.on("mousedown", this.buttonDown);
        e.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, b, c) {
        f[a] = b;
        k[a] = c
    }
    ;
    this.addEventListenerWithParams = function(a, b, c, d) {
        f[a] = b;
        k[a] = c;
        h = d
    }
    ;
    this.buttonRelease = function() {
        e.scaleX = c;
        e.scaleY = c;
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(k[ON_MOUSE_UP], h)
    }
    ;
    this.buttonDown = function() {
        e.scaleX = .9 * c;
        e.scaleY = .9 * c;
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], h)
    }
    ;
    this.setScale = function(a) {
        c = a;
        e.scaleX = a;
        e.scaleY = a
    }
    ;
    this.setPosition = function(a, b) {
        e.x = a;
        e.y = b
    }
    ;
    this.setX = function(a) {
        e.x = a
    }
    ;
    this.setY = function(a) {
        e.y = a
    }
    ;
    this.getButtonImage = function() {
        return e
    }
    ;
    this.getX = function() {
        return e.x
    }
    ;
    this.getY = function() {
        return e.y
    }
    ;
    this._init(a, d, b);
    return this
}
;function CMenu() {
    var a, d, b, c, f, k, h, e, g, l, m, n, q, r;
    this._init = function() {
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(g);
        var p = s_oSpriteLibrary.getSprite("play_button");
        f = CANVAS_WIDTH / 2 + 25;
        k = CANVAS_HEIGHT - 300;
        l = new CGfxButton(f,k,p);
        l.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        p = s_oSpriteLibrary.getSprite("facebook");
        b = p.height / 2 + 10;
        c = p.height + 10;
        q = CGfxButton(b, c, p);
        q.addEventListener(ON_MOUSE_UP, this._onFacebook, this, !1);
        p = s_oSpriteLibrary.getSprite("twitter");
        a = p.height / 2 + 10;
        d = 2.5 * p.height + 10;
        r = CGfxButton(a, d, p);
        r.addEventListener(ON_MOUSE_UP, this._onTwitter, this, !1);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            p = s_oSpriteLibrary.getSprite("audio_icon"),
                h = CANVAS_WIDTH - p.height / 2 - 10,
                e = p.height / 2 + 10,
                n = new CToggle(h,e,p,s_bAudioActive),
                n.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        m = new createjs.Shape;
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(m);
        createjs.Tween.get(m).to({
            alpha: 0
        }, 1E3).call(function() {
            m.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        l.unload();
        l = null ;
        m.visible = !1;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            n.unload(),
                n = null ;
        s_oStage.removeChild(g);
        s_oMenu = g = null
    }
    ;
    this.refreshButtonPos = function(a, b) {
        n.setPosition(h - a, b + e);
        l.setPosition(f, k - b)
    }
    ;
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onFacebook = function() {
        console.log("facebook click");
        FacebookShare()
    }
    ;
    this._onTwitter = function() {
        console.log("twitter click");
        TwitterShare()
    }
    ;
    this._onButPlayRelease = function() {
        $(s_oMain).trigger("start_session");
        this.unload();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        s_oMain.gotoSelectTeam()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null ;
function CSelectTeam() {
    var a, d, b, c, f = 0, k = 0, h = 0, e, g, l, m, n, q, r, p;
    this._init = function() {
        r = createBitmap(s_oSpriteLibrary.getSprite("bg_select_team"));
        s_oStage.addChild(r);
        var f = s_oSpriteLibrary.getSprite("but_continue");
        a = CANVAS_WIDTH / 2 + 300;
        d = CANVAS_HEIGHT - 110;
        m = new CGfxButton(a,d,f,s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this);
        f = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - f.height / 2 - 10;
        c = f.height / 2 + 10;
        p = new CGfxButton(b,c,f,s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = s_oSpriteLibrary.getSprite("leaderboard");
        _oLBBtn = new CGfxButton(f.width + 5,f.height + 10,f);
        _oLBBtn.addEventListener(ON_MOUSE_UP, this._onShowLeaderboard, this);
        g = new createjs.Container;
        s_oStage.addChild(g);
        l = new CPlayer(g);
        l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, s_szTeamSelectedSprite);
        f = s_oSpriteLibrary.getSprite("germany");
        q = new CToggle(CANVAS_WIDTH / 2 - 160,CANVAS_HEIGHT / 2,f,!0);
        q.addEventListenerWithParams(ON_MOUSE_UP, this._onModePrevious, this);
        f = s_oSpriteLibrary.getSprite("england");
        n = new CToggle(CANVAS_WIDTH / 2 + 160,CANVAS_HEIGHT / 2,f,!0);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onModeNext, this);
        e = new createjs.Text("rooney"," 25px " + TEXT,"#080863");
        e.x = CANVAS_WIDTH / 2 - 10;
        e.y = CANVAS_HEIGHT / 2 + 150;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        s_oStage.addChild(e);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this._onModeNext = function() {
        2 !== k && (f += 1,
            this._onModeToggle(f, 0))
    }
    ;
    this._onModePrevious = function() {
        0 !== f && (--f,
            this._onModeToggle(f, 0))
    }
    ;
    this._onModeJerseyPurple = function() {
        this._onModeToggle(f, 0)
    }
    ;
    this._onModeJerseyYellow = function() {
        this._onModeToggle(f, 1)
    }
    ;
    this._onModeToggle = function(a, b) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("select_team");
        switch (a) {
            case 0:
                k = ARGENTINA;
                e.text = "rooney";
                l.unload();
                jersey = 0 === b ? "rooney1" : "rooney2";
                l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, jersey);
                break;
            case 1:
                k = BRAZIL;
                e.text = "ibrahimovich";
                l.unload();
                jersey = 0 === b ? "ibrahimovich1" : "ibrahimovich2";
                l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, jersey);
                break;
            case 2:
                k = GERMANY;
                e.text = "pogba";
                l.unload();
                jersey = 0 === b ? "pogba1" : "pogba2";
                l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, jersey);
                break;
            case 3:
                k = ENGLAND;
                e.text = "ENGLAND";
                l.unload();
                l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "england");
                break;
            case 4:
                k = ITALY;
                e.text = "ITALY";
                l.unload();
                l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "italy");
                break;
            case 5:
                k = FRANCE,
                    e.text = "FRANCE",
                    l.unload(),
                    l.showIdle(PLAYER_X_POSITION_IN_SELECTION, PLAYER_Y_POSITION_IN_SELECTION, "france")
        }
        s_iTeamSelected = k;
        h = b
    }
    ;
    this._onExit = function() {
        s_oMain.gotoMenu()
    }
    ;
    this.unload = function() {
        q.unload();
        n.unload();
        l.unload();
        s_oSelectTeam = null ;
        s_oStage.removeAllChildren()
    }
    ;
    this.refreshButtonPos = function(e, f) {
        p.setPosition(b - e, f + c);
        m.setPosition(a, d - f)
    }
    ;
    this._onShowLeaderboard = function() {
        console.log("Show leaderboard request received");
        checkFBLoginState()
    }
    ;
    this._onButNextRelease = function() {
        this.unload();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        var a;
        switch (k) {
            case 0:
                a = 0 === h ? "rooney1" : "rooney2";
                break;
            case 1:
                a = 0 === h ? "ibrahimovich1" : "ibrahimovich2";
                break;
            case 2:
                a = 0 === h ? "pogba1" : "pogba2";
                break;
            case 3:
                a = "england";
                break;
            case 4:
                a = "italy";
                break;
            case 5:
                a = "france"
        }
        s_oMain.gotoGame(a)
    }
    ;
    s_oSelectTeam = this;
    this._init()
}
var s_oSelectTeam = null ;
function CGame(a, d) {
    var b = 0, c, f = 0, k = 0, h = 0, e = 0, g = -1, l = -1, m = 0, n = ROUND, q = FIRST_TIME, r, p, u = !1, v = !1, z = !1, t = !1, G = !1, A, x, L = null , M, C, D, N, I, R = GOALKEEPER_X_POSITION, P = GOALKEEPER_Y_POSITION, O, H, w, E = !1, J, y, F, S, U, V, W, Q = !1, K = [], B, T;
    this._init = function() {
        0 !== q || !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || (s_oSoundtrack.volume = 0,
            s_oCrowd = createjs.Sound.play("crowd", {
                loop: -1
            }));
        c = 1E3;
        l = g = -1;
        Q = t = z = v = !1;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        W = new CCrowd;
        0 === n ? this._initLevel() : (x = new CInterface(m),
            this.createViewThings());
        this._initKickPoints()
    }
    ;
    this._initLevel = function() {
        e = h = k = 0;
        l = g = -1;
        z = v = u = !1;
        J = new createjs.Container;
        s_oStage.addChild(J);
        r = new CLevel(m,f,J);
        0 === m && this.setLevelInfo()
    }
    ;
    this.setLevelInfo = function() {
        $(s_oMain).trigger("start_level", m);
        p = r.getLevelInfo(m);
        f = 0;
        k = p.goalToScore;
        h = p.kickLeft;
        x = new CInterface(m);
        this.createViewThings()
    }
    ;
    this.createViewThings = function() {
        F = r.getBallPosition(m, n);
        D = r.getPlayerPosition(m, n);
        B = r.getWallPosition(m, n);
        M = new createjs.Container;
        s_oStage.addChild(M);
        new CGoal(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2 + 20,M);
        O = new createjs.Container;
        s_oStage.addChild(O);
        I = new CGoalKeeper(O);
        I.showIdle(R, P);
        T = new createjs.Container;
        s_oStage.addChild(T);
        if (0 < B.num)
            for (var a = 0; a < B.num; a++)
                K[a] = new CWall(B.x,B.y,T,a),
                    K[a].showIdle(a);
        S = new createjs.Container;
        s_oStage.addChild(S);
        y = new CBall(F.x,F.y,S);
        N = new createjs.Container;
        s_oStage.addChild(N);
        C = new CPlayer(N);
        C.showIdle2(D.x, D.y, d);
        1 === r.getPlayerPosIndex(m, n) && C.changeAlpha();
        x.viewScore(b);
        x.viewGoalScored(f, k);
        x.viewKickLeft(h);
        x.viewScoreBonus(c, 1);
        x.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        0 === q ? (x.help(),
            q = 1) : u = !0
    }
    ;
    this.animatePlayer = function(a, b) {
        U = A[a][b].x;
        V = A[a][b].y;
        v = !0;
        switch (a) {
            case 0:
            case 1:
            case 7:
            case 8:
                l = OUT;
                break;
            case 2:
                g = LOW_PERCENT;
                0 === b ? l = OUT : 1 === b ? l = HIGH_LEFT : 2 === b ? l = MED_LEFT : 3 === b && (l = DOWN_LEFT);
                break;
            case 3:
                g = MED_PERCENT;
                0 === b ? l = OUT : 1 === b ? l = HIGH_LEFT : 2 === b ? l = MED_LEFT : 3 === b && (l = DOWN_LEFT);
                break;
            case 4:
                g = HIGH_PERCENT;
                0 === b ? l = OUT : 1 === b || 2 === b ? l = CENTER_HIGH : 3 === b && (l = CENTER);
                break;
            case 5:
                g = MED_PERCENT;
                0 === b ? l = OUT : 1 === b ? l = HIGH_RIGHT : 2 === b ? l = MED_RIGHT : 3 === b && (l = DOWN_RIGHT);
                break;
            case 6:
                g = LOW_PERCENT,
                    0 === b ? l = OUT : 1 === b ? l = HIGH_RIGHT : 2 === b ? l = MED_RIGHT : 3 === b && (l = DOWN_RIGHT)
        }
        C.showShot(D.x, D.y, d)
    }
    ;
    this.kickBall = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("kick");
        y.ballKicked(U, V)
    }
    ;
    this.showMessage = function(a) {
        v = !1;
        C.showIdle(D.x, D.y, d);
        var e = this;
        !0 === a ? (y.fadeOut(),
            a = createBitmap(s_oSpriteLibrary.getSprite("missed_text")),
            a.scaleX = 0,
            a.scaleY = 0,
            a.alpha = 0,
            a.x = CANVAS_WIDTH / 2,
            a.y = CANVAS_HEIGHT / 2,
            a.regX = 206.5,
            a.regY = 37,
            s_oStage.addChild(a),
            createjs.Tween.get(a).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, 500).wait(800).call(function() {
                e.controlIfCanContinue()
            })) : !0 === t ? (a = createBitmap(s_oSpriteLibrary.getSprite("missed_text")),
            a.scaleX = 0,
            a.scaleY = 0,
            a.alpha = 0,
            a.x = CANVAS_WIDTH / 2,
            a.y = CANVAS_HEIGHT / 2,
            a.regX = 206.5,
            a.regY = 37,
            s_oStage.addChild(a),
            createjs.Tween.get(a).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, 500).wait(800).call(function() {
                e.controlIfCanContinue()
            })) : l === OUT ? (a = createBitmap(s_oSpriteLibrary.getSprite("out_text")),
            a.scaleX = 0,
            a.scaleY = 0,
            a.alpha = 0,
            a.x = CANVAS_WIDTH / 2,
            a.y = CANVAS_HEIGHT / 2,
            a.regX = 130.5,
            a.regY = 35,
            s_oStage.addChild(a),
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("miss_goal"),
            y.fadeOut(),
            createjs.Tween.get(a).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, 500).wait(800).call(function() {
                e.controlIfCanContinue()
            })) : H !== l && l !== OUT && (a = createBitmap(s_oSpriteLibrary.getSprite("goal_text")),
            a.scaleX = 0,
            a.scaleY = 0,
            a.alpha = 0,
            a.x = CANVAS_WIDTH / 2,
            a.y = CANVAS_HEIGHT / 2,
            a.regX = 399,
            a.regY = 38,
            s_oStage.addChild(a),
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("goal"),
            y.fadeOut(),
            createjs.Tween.get(a).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, 500).wait(800).call(function() {
                e.controlIfCanContinue()
            }),
            f++,
            b += c,
            Q = !0)
    }
    ;
    this.controlWall = function() {
        var a = y.returnX()
            , b = y.returnY();
        0 < B.num && !0 === K[0].controlIfHitted(a, b, B.num) && (y.bounce(D.x, 0),
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && (createjs.Sound.play("keeper_save"),
            createjs.Sound.play("miss_goal"))
    }
    ;
    this.goalKeeperBounce = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            createjs.Sound.play("keeper_save"),
                createjs.Sound.play("miss_goal");
        y.bounce(D.x, 1)
    }
    ;
    this.controlIfCanContinue = function() {
        f >= k && 1 >= h ? (m++,
            n = 0,
            m === NUM_LEVEL ? (c = 0,
                L = CEndPanel(s_oSpriteLibrary.getSprite("bg_win"), s_oSpriteLibrary.getSprite("you_win")),
                L.win(b)) : (this.unload(),
                this._init())) : 1 >= h && this.gameOver();
        1 < h && (h--,
            n++,
            this.unload(),
            this._init())
    }
    ;
    this._initKickPoints = function() {
        A = [];
        for (var a = 0; a < RANGE_WIDTH; a++) {
            A[a] = [];
            for (var b = 0; b < RANGE_HEIGHT; b++) {
                var c = 0
                    , d = 0;
                A[a][b] = {
                    x: 0,
                    y: 0
                };
                c = Math.round((MATRIX_X_END - MATRIX_X_START) / RANGE_WIDTH * a + MATRIX_X_START) + 5;
                d = Math.round((MATRIX_Y_END - MATRIX_Y_START) / RANGE_HEIGHT * b + MATRIX_Y_START) + 5;
                A[a][b].x = c;
                A[a][b].y = d
            }
        }
    }
    ;
    this.unload = function() {
        x.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    }
    ;
    this.onExit = function() {
        $(s_oMain).trigger("end_level", m);
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            s_oCrowd.volume = 0,
                s_oSoundtrack.volume = 1;
        $(s_oMain).trigger("restart")
    }
    ;
    this.gameOver = function() {
        c = n = 0;
        L = CEndPanel(s_oSpriteLibrary.getSprite("bg_next_level"), s_oSpriteLibrary.getSprite("game_over"));
        L.show(b)
    }
    ;
    this.setUpdate = function() {
        u = !u
    }
    ;
    this.setCrowdOff = function() {
        Q = !1
    }
    ;
    this.update = function() {
        if (u) {
            if (v && (e = C.getFrame(),
                4 === e && !z)) {
                if (Math.floor(100 * Math.random()) <= g && 0 < l && 0 < g)
                    H = l,
                    l !== OUT && (t = !0);
                else {
                    do
                        H = Math.floor(Math.random() * NUM_SAVE);
                    while (H === l)
                }
                switch (H) {
                    case CENTER:
                        w = CENTER_INFO;
                        break;
                    case CENTER_HIGH:
                        w = CENTER_HIGH_INFO;
                        break;
                    case DOWN_LEFT:
                        w = DOWN_LEFT_INFO;
                        break;
                    case DOWN_RIGHT:
                        w = DOWN_RIGHT_INFO;
                        break;
                    case HIGH_LEFT:
                        w = HIGH_LEFT_INFO;
                        break;
                    case HIGH_RIGHT:
                        w = HIGH_RIGHT_INFO;
                        break;
                    case MED_LEFT:
                        w = MED_LEFT_INFO;
                        break;
                    case MED_RIGHT:
                        w = MED_RIGHT_INFO
                }
                I.showAction(w.x, w.y, w.action, w.frames, w.width, w.height);
                if (0 < B.num) {
                    for (var a = 0; a < B.num; a++)
                        K[a].showJump(a);
                    G = !0
                }
                this.kickBall();
                E = z = !0
            }
            E && I.getFrame() === w.frames && (I.stop(),
                E = !1);
            1 <= c - 3 && (c -= 3,
                x.viewScoreBonus(c, 0));
            !0 === Q && W.showAnim();
            if (0 < B.num && !0 === G && K[0].getFrame() === K[0].frames) {
                for (a = 0; a < B.num; a++)
                    K[a].showIdle();
                G = !1
            }
            y.update(B.num, t)
        }
    }
    ;
    SHOT_INDICATOR_SPEED = a.shot_indicator_spd;
    DECREASE_SHOT_INDICATOR_SPEED = a.decrease_shot_indicator_spd;
    s_oGame = this;
    this._init()
}
var s_oGame;
function CInterface(a) {
    var d, b, c, f;
    function k(a) {
        a || (a = window.event);
        switch (a.keyCode) {
            case SPACE_BAR:
                return P._handleClick(),
                    a.preventDefault(),
                    !1;
            case LEFT:
                return a.preventDefault(),
                    !1;
            case UP:
                return a.preventDefault(),
                    !1;
            case RIGHT:
                return a.preventDefault(),
                    !1;
            case DOWN:
                return a.preventDefault(),
                    !1
        }
    }
    var h, e, g, l, m, n, q, r, p, u, v, z, t = CANVAS_WIDTH / 2 - 350, G = CANVAS_WIDTH / 2 - 300, A = CANVAS_HEIGHT - 20, x = CANVAS_WIDTH / 2 + 180, L = CANVAS_HEIGHT - 45, M = CANVAS_WIDTH / 2 - 10, C = CANVAS_HEIGHT - 20, D = CANVAS_WIDTH / 2 - 80, N = CANVAS_HEIGHT - 50, I = CANVAS_WIDTH / 2 + 100, R = CANVAS_HEIGHT - 50, P = this, O = 0, H = 0, w, E, J = !0, y = 0, F;
    this._init = function() {
        y = 0;
        var g = s_oSpriteLibrary.getSprite("but_exit");
        c = CANVAS_WIDTH - g.height / 2 - 10;
        f = g.height / 2 + 10;
        e = new CGfxButton(c,f,g,s_oStage);
        e.addEventListener(ON_MOUSE_UP, this._onExit, this);
        d = CANVAS_WIDTH - g.width / 2 - 90;
        b = g.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            g = s_oSpriteLibrary.getSprite("audio_icon"),
                h = new CToggle(d,b,g,s_bAudioActive),
                h.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        l = new createjs.Container;
        s_oStage.addChild(l);
        g = TOP_BARX / RANGE_WIDTH;
        w = new CShotIndicatorController(g,!1);
        g = RIGHT_BARY / RANGE_HEIGHT;
        E = new CShotIndicatorController(g,!0);
        for (g = 0; g < a; g++)
            w.increaseSpeed(),
                E.increaseSpeed();
        F = new createjs.Shape;
        F.graphics.beginFill("Black").drawRect(0, 160, CANVAS_WIDTH, CANVAS_HEIGHT - 160);
        F.alpha = .01;
        s_oStage.addChild(F);
        F.on("mousedown", this._handleClick, this);
        s_bMobile || (document.onkeydown = k);
        this.controlState()
    }
    ;
    this._handleClick = function(a) {
        if (!0 === J)
            switch (y) {
                case 0:
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("stop_indicator");
                    w.endAnimation();
                    O = w.getPositionBallEnd();
                    y++;
                    P.controlState();
                    break;
                case 1:
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("stop_indicator"),
                        E.endAnimation(),
                        H = E.getPositionBallEnd(),
                        y++,
                        P.controlState()
            }
    }
    ;
    this.controlState = function() {
        switch (y) {
            case 0:
                w.startAnimation();
                break;
            case 1:
                E.startAnimation();
                break;
            case 2:
                w.hide(),
                    E.hide(),
                    s_oGame.animatePlayer(O, H)
        }
    }
    ;
    this.viewScoreBonus = function(a, b) {
        1 === b ? (r = new createjs.Text("Timer x " + a," 25px " + TEXT,"#000000"),
            r.x = t,
            r.y = 50,
            r.textAlign = "left",
            r.textBaseline = "alphabetic",
            r.lineWidth = 650,
            r.outline = 3,
            s_oStage.addChild(r),
            q = new createjs.Text("Timer x " + a," 25px " + TEXT,"#ffffff"),
            q.x = t,
            q.y = 50,
            q.textAlign = "left",
            q.textBaseline = "alphabetic",
            q.lineWidth = 650,
            s_oStage.addChild(q)) : (r.text = "Timer x " + a,
            q.text = "Timer x " + a)
    }
    ;
    this.viewScore = function(a) {
        n = new createjs.Text("SCORE: " + a," 25px " + TEXT,"#000000");
        n.x = G;
        n.y = A;
        n.textAlign = "left";
        n.textBaseline = "alphabetic";
        n.lineWidth = 650;
        n.outline = 3;
        s_oStage.addChild(n);
        m = new createjs.Text("SCORE: " + a," 25px " + TEXT,"#ffffff");
        m.x = G;
        m.y = A;
        m.textAlign = "left";
        m.textBaseline = "alphabetic";
        m.lineWidth = 650;
        s_oStage.addChild(m)
    }
    ;
    this.viewGoalScored = function(a, b) {
        z = createBitmap(s_oSpriteLibrary.getSprite("icon_goal"));
        z.x = D;
        z.y = N;
        s_oStage.addChild(z);
        u = new createjs.Text(a + "/" + b," 25px " + TEXT,"#000000");
        u.x = M;
        u.y = C;
        u.textAlign = "left";
        u.textBaseline = "alphabetic";
        u.lineWidth = 650;
        u.outline = 3;
        s_oStage.addChild(u);
        p = new createjs.Text(a + "/" + b," 25px " + TEXT,"#ffffff");
        p.x = M;
        p.y = C;
        p.textAlign = "left";
        p.textBaseline = "alphabetic";
        p.lineWidth = 650;
        s_oStage.addChild(p)
    }
    ;
    this.viewKickLeft = function(a) {
        var b, c = 0;
        l.removeAllChildren();
        l.y = R;
        v = createBitmap(s_oSpriteLibrary.getSprite("icon_kick"));
        v.x = I;
        v.y = 0;
        l.addChild(v);
        for (var d = 0; d < a; d++,
            c += 26)
            b = createBitmap(s_oSpriteLibrary.getSprite("ball_kick_left")),
                b.x = x + c,
                b.y = 0,
                l.addChild(b)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            h.unload(),
                h = null ;
        e.unload();
        s_oInterface = null
    }
    ;
    this.help = function() {
        J = !1;
        g = new createjs.Container;
        s_oStage.addChild(g);
        var a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2;
        a.regX = MSG_BOX_WIDTH / 2;
        a.regY = MSG_BOX_HEIGHT / 2;
        g.addChild(a);
        a = !1 === s_bMobile ? new createjs.Text(HELP_TEXT_DESKTOP," 25px " + TEXT,"#ffffff") : new createjs.Text(HELP_TEXT_MOBILE," 25px " + TEXT,"#ffffff");
        a.x = CANVAS_WIDTH / 2;
        a.y = 180;
        a.textAlign = "center";
        a.textBaseline = "alphabetic";
        a.lineWidth = 650;
        g.addChild(a);
        a = createBitmap(s_oSpriteLibrary.getSprite("high_bar"));
        a.x = CANVAS_WIDTH / 2;
        a.y = 300;
        a.regX = TOP_BARX / 2;
        a.regY = TOP_BARY / 2;
        a.scaleX = .8;
        a.scaleY = .8;
        g.addChild(a);
        a = createBitmap(s_oSpriteLibrary.getSprite("arrow_bar"));
        a.x = CANVAS_WIDTH / 2 - 130;
        a.y = 290;
        a.regX = CURSOR_X / 2;
        a.regY = CURSOR_Y / 2;
        a.scaleX = .8;
        a.scaleY = .8;
        g.addChild(a);
        a = new createjs.Text(HELP_TEXT," 25px " + TEXT,"#ffffff");
        a.x = CANVAS_WIDTH / 2;
        a.y = 380;
        a.textAlign = "center";
        a.textBaseline = "alphabetic";
        a.lineWidth = 650;
        g.addChild(a);
        g.on("mousedown", this._onButHelpRelease)
    }
    ;
    this.refreshButtonPos = function(a, g) {
        e.setPosition(c - a, g + f);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.setPosition(d - a, g + b);
        r.y = 50 + g;
        q.y = 50 + g;
        n.y = A - g;
        m.y = A - g;
        u.y = C - g;
        p.y = C - g;
        z.y = N - g;
        l.y = L - g
    }
    ;
    this._onButHelpRelease = function() {
        s_oStage.removeChild(g);
        g.off("mousedown", this._onButHelpRelease);
        J = !0;
        s_oGame.setUpdate()
    }
    ;
    this._onButRestartRelease = function() {
        s_oGame.restartGame()
    }
    ;
    this.onExitFromHelp = function() {
        null .unload()
    }
    ;
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        s_oGame.onExit()
    }
    ;
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null ;
function CEndPanel(a, d) {
    var b, c, f, k, h, e, g, l, m, n, q, r;
    this._init = function(a, d) {
        h = createBitmap(a);
        m = createBitmap(d);
        m.x = CANVAS_WIDTH / 2 - 400;
        m.y = CANVAS_HEIGHT / 2 - 200;
        q = new createjs.Text(""," 50px " + TEXT,"#000000");
        q.x = CANVAS_WIDTH / 2;
        q.y = CANVAS_HEIGHT / 2;
        q.textAlign = "center";
        q.textBaseline = "alphabetic";
        q.lineWidth = 650;
        q.outline = 3;
        n = new createjs.Text(""," 50px " + TEXT,"#ffe51f");
        n.x = CANVAS_WIDTH / 2;
        n.y = CANVAS_HEIGHT / 2;
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.lineWidth = 500;
        e = new createjs.Container;
        e.alpha = 0;
        e.visible = !1;
        e.addChild(h, q, n, m);
        s_oStage.addChild(e);
        var r = s_oSpriteLibrary.getSprite("but_restart");
        f = CANVAS_WIDTH / 2 + 300;
        k = CANVAS_HEIGHT - 130;
        g = new CGfxButton(f,k,r);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this);
        r = !0 === isUserConnected() ? s_oSpriteLibrary.getSprite("rank") : s_oSpriteLibrary.getSprite("fblogin");
        b = .25 * CANVAS_WIDTH;
        c = CANVAS_HEIGHT - 130;
        l = new CGfxButton(b,c,r);
        l.addEventListener(ON_MOUSE_UP, this._onShowLeaderboard, this);
        r = s_oSpriteLibrary.getSprite("facebook");
        _fbSprite = new CGfxButton(.9 * CANVAS_WIDTH,CANVAS_HEIGHT - 130,r);
        _fbSprite.addEventListener(ON_MOUSE_UP, FacebookShare, this);
        r = s_oSpriteLibrary.getSprite("twitter");
        _twSprite = new CGfxButton(.9 * CANVAS_WIDTH,CANVAS_HEIGHT - 220,r);
        _twSprite.addEventListener(ON_MOUSE_UP, TwitterShare, this);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.show = function(a) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        r = a;
        q.text = TEXT_SCORE + a;
        n.text = TEXT_SCORE + a;
        e.visible = !0;
        createjs.Tween.get(e).to({
            alpha: 1
        }, 500).call(function() {});
        isUserConnected() && sendScore(a);
        $(s_oMain).trigger("share_event", a);
        $(s_oMain).trigger("save_score", [a])
    }
    ;
    this.win = function(a) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("applause");
        r = a;
        q.text = TEXT_SCORE + a;
        q.x = CANVAS_WIDTH / 2 - 150;
        q.y = CANVAS_HEIGHT / 2 + 120;
        q.rotation = 17;
        n.text = TEXT_SCORE + a;
        n.x = CANVAS_WIDTH / 2 - 150;
        n.y = CANVAS_HEIGHT / 2 + 120;
        n.rotation = 17;
        e.visible = !0;
        createjs.Tween.get(e).to({
            alpha: 1
        }, 500).call(function() {});
        isUserConnected() && sendScore(a, !0);
        $(s_oMain).trigger("share_event", a);
        $(s_oMain).trigger("save_score", [a])
    }
    ;
    this._onShowLeaderboard = function() {
        console.log("Show leaderboard request received");
        setScore(r);
        checkFBLoginState()
    }
    ;
    this._onExit = function() {
        s_oStage.removeChild(e);
        g.unload();
        s_oGame.onExit()
    }
    ;
    this.refreshButtonPos = function(a, b) {
        g.setPosition(f, k - b)
    }
    ;
    this._init(a, d);
    return this
}
;function CGoal(a, d, b) {
    var c;
    this._init = function(a, b, d) {
        c = createBitmap(s_oSpriteLibrary.getSprite("goal"));
        c.x = a;
        c.y = b;
        c.regX = GOAL_WIDTH / 2;
        c.regY = GOAL_HEIGHT / 2;
        d.addChild(c)
    }
    ;
    this._init(a, d, b)
}
s_oBatter = null ;
function CPlayer(a) {
    var d, b = null , c = null ;
    this._init = function() {}
    ;
    this.showIdle = function(f, k, h) {
        d = {
            images: [s_oSpriteLibrary.getSprite(h + "_idle")],
            framerate: 10,
            frames: {
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                regX: PLAYER_WIDTH / 2,
                regY: PLAYER_WIDTH
            },
            animations: {
                idle: [0, 0, "idle"]
            }
        };
        b = new createjs.SpriteSheet(d);
        null === c ? c = new createjs.Sprite(b,"idle") : c.spriteSheet = b;
        c.x = f;
        c.y = k;
        c.currentAnimationFrame = 0;
        a.addChild(c)
    }
    ;
    this.showIdle2 = function(f, k, h) {
        d = {
            images: [s_oSpriteLibrary.getSprite(h + "_idle2")],
            framerate: 10,
            frames: {
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                regX: PLAYER_WIDTH / 2,
                regY: PLAYER_WIDTH
            },
            animations: {
                idle: [0, 7, "idle"]
            }
        };
        b = new createjs.SpriteSheet(d);
        null === c ? c = new createjs.Sprite(b,"idle") : c.spriteSheet = b;
        c.x = f;
        c.y = k;
        c.currentAnimationFrame = 0;
        a.addChild(c)
    }
    ;
    this.showShot = function(f, k, h) {
        d = {
            images: [s_oSpriteLibrary.getSprite(h + "_shot")],
            framerate: 15,
            frames: {
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                regX: PLAYER_WIDTH / 2,
                regY: PLAYER_WIDTH
            },
            animations: {
                idle: [3, 20, "idle"]
            }
        };
        b = new createjs.SpriteSheet(d);
        null === c ? c = new createjs.Sprite(b,"idle") : c.spriteSheet = b;
        c.x = f;
        c.y = k;
        c.currentAnimationFrame = 0;
        a.addChild(c)
    }
    ;
    this.changeAlpha = function() {
        c.alpha = .5
    }
    ;
    this.getFrame = function() {
        return c.currentFrame
    }
    ;
    this.unload = function() {
        a.removeAllChildren()
    }
    ;
    s_oPlayer = this;
    this._init(a)
}
s_oPlayer = null ;
function CGoalKeeper(a) {
    var d, b = null , c = null ;
    this._init = function() {}
    ;
    this.showIdle = function(f, k) {
        d = {
            images: [s_oSpriteLibrary.getSprite("goalkeeper_idle")],
            framerate: 15,
            frames: {
                width: GOALKEEPER_WIDTH,
                height: GOALKEEPER_HEIGHT,
                regX: GOALKEEPER_WIDTH / 2,
                regY: GOALKEEPER_WIDTH
            },
            animations: {
                idle: [0, 19, "idle"]
            }
        };
        b = new createjs.SpriteSheet(d);
        null === c ? c = new createjs.Sprite(b,"idle") : c.spriteSheet = b;
        c.x = f;
        c.y = k;
        a.addChild(c);
        c.gotoAndPlay("idle")
    }
    ;
    this.showAction = function(f, k, h, e, g, l) {
        d = {
            images: [s_oSpriteLibrary.getSprite("goalkeeper_" + h)],
            framerate: 15,
            frames: {
                width: g,
                height: l,
                regX: g / 2,
                regY: l
            },
            animations: {
                idle: [0, e]
            }
        };
        b = new createjs.SpriteSheet(d);
        null === c ? c = new createjs.Sprite(b,"idle") : c.spriteSheet = b;
        c.x = f;
        c.y = k;
        a.addChild(c);
        c.gotoAndPlay("idle")
    }
    ;
    this.stop = function() {
        c.paused = !0
    }
    ;
    this.getFrame = function() {
        return c.currentFrame
    }
    ;
    this.unload = function() {
        a.removeAllChildren()
    }
    ;
    s_oPlayer = this;
    this._init(a)
}
s_oPlayer = null ;
function CLevel(a, d, b) {
    var c, f, k = [], h = [], e = [], g = Array(NUM_LEVEL), l = Array(NUM_LEVEL), m = Array(NUM_LEVEL), n, q, r, p, u, v, z = [], t = [];
    this._init = function(a, b) {
        a++;
        1 < a && (this.viewNextLevelPanel(),
            this.refreshButtonPos(s_iOffsetX, s_iOffsetY));
        for (var c = 0; c < NUM_LEVEL; c++)
            g[c] = Array(NUM_KICK),
                l[c] = Array(NUM_KICK),
                m[c] = Array(NUM_KICK);
        k.push({
            goalToScore: 1,
            kickLeft: 5
        });
        k.push({
            goalToScore: 2,
            kickLeft: 5
        });
        k.push({
            goalToScore: 2,
            kickLeft: 5
        });
        k.push({
            goalToScore: 3,
            kickLeft: 5
        });
        k.push({
            goalToScore: 3,
            kickLeft: 5
        });
        k.push({
            goalToScore: 4,
            kickLeft: 5
        });
        h.push({
            x: 430,
            y: 530
        });
        h.push({
            x: 680,
            y: 530
        });
        h.push({
            x: 940,
            y: 530
        });
        e.push({
            x: 380,
            y: 500
        });
        e.push({
            x: 660,
            y: 500
        });
        e.push({
            x: 930,
            y: 500
        });
        g[0][0] = h[0];
        g[0][1] = h[0];
        g[0][2] = h[0];
        g[0][3] = h[0];
        g[0][4] = h[0];
        g[1][0] = h[0];
        g[1][1] = h[0];
        g[1][2] = h[0];
        g[1][3] = h[1];
        g[1][4] = h[1];
        g[2][0] = h[1];
        g[2][1] = h[0];
        g[2][2] = h[0];
        g[2][3] = h[0];
        g[2][4] = h[2];
        g[3][0] = h[1];
        g[3][1] = h[2];
        g[3][2] = h[0];
        g[3][3] = h[1];
        g[3][4] = h[2];
        g[4][0] = h[0];
        g[4][1] = h[1];
        g[4][2] = h[2];
        g[4][3] = h[2];
        g[4][4] = h[2];
        g[5][0] = h[2];
        g[5][1] = h[1];
        g[5][2] = h[1];
        g[5][3] = h[1];
        g[5][4] = h[1];
        l[0][0] = e[0];
        l[0][1] = e[0];
        l[0][2] = e[0];
        l[0][3] = e[0];
        l[0][4] = e[0];
        l[1][0] = e[0];
        l[1][1] = e[0];
        l[1][2] = e[0];
        l[1][3] = e[1];
        l[1][4] = e[1];
        l[2][0] = e[1];
        l[2][1] = e[0];
        l[2][2] = e[0];
        l[2][3] = e[0];
        l[2][4] = e[2];
        l[3][0] = e[1];
        l[3][1] = e[2];
        l[3][2] = e[0];
        l[3][3] = e[1];
        l[3][4] = e[2];
        l[4][0] = e[0];
        l[4][1] = e[1];
        l[4][2] = e[2];
        l[4][3] = e[2];
        l[4][4] = e[2];
        l[5][0] = e[2];
        l[5][1] = e[1];
        l[5][2] = e[1];
        l[5][3] = e[1];
        l[5][4] = e[1];
        t.push({
            x: 0,
            y: 0,
            num: 0
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 1
        });
        t.push({
            x: 750,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 1
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 2
        });
        t.push({
            x: 750,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 2
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 1
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 1
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 3
        });
        t.push({
            x: 525,
            y: CANVAS_HEIGHT / 2 - 25,
            num: 2
        });
        m[0][0] = t[0];
        m[0][1] = t[0];
        m[0][2] = t[0];
        m[0][3] = t[0];
        m[0][4] = t[0];
        m[1][0] = t[1];
        m[1][1] = t[1];
        m[1][2] = t[1];
        m[1][3] = t[2];
        m[1][4] = t[2];
        m[2][0] = t[4];
        m[2][1] = t[3];
        m[2][2] = t[2];
        m[2][3] = t[2];
        m[2][4] = t[2];
        m[3][0] = t[2];
        m[3][1] = t[1];
        m[3][2] = t[1];
        m[3][3] = t[5];
        m[3][4] = t[1];
        m[4][0] = t[1];
        m[4][1] = t[2];
        m[4][2] = t[2];
        m[4][3] = t[6];
        m[4][4] = t[6];
        m[5][0] = t[5];
        m[5][1] = t[2];
        m[5][2] = t[7];
        m[5][3] = t[5];
        m[5][4] = t[1]
    }
    ;
    this._onButContinueRelease = function() {
        this.unload();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        s_oGame.setLevelInfo()
    }
    ;
    this.getLevel = function(a) {
        return a
    }
    ;
    this.getPlayerPosIndex = function(a, b) {
        if (l[a][b] === e[0])
            return 0;
        if (l[a][b] === e[1])
            return 1;
        if (l[a][b] === e[2])
            return 2
    }
    ;
    this.getBallPosition = function(a, b) {
        return g[a][b]
    }
    ;
    this.getPlayerPosition = function(a, b) {
        return l[a][b]
    }
    ;
    this.getWallPosition = function(a, b) {
        return m[a][b]
    }
    ;
    this.getLevelInfo = function(a) {
        return k[a]
    }
    ;
    this.viewNextLevelPanel = function() {
        $(s_oMain).trigger("end_level");
        var a = 0;
        q = createBitmap(s_oSpriteLibrary.getSprite("bg_next_level"));
        b.addChild(q);
        var e = s_oSpriteLibrary.getSprite("but_continue");
        c = CANVAS_WIDTH / 2 + 300;
        f = CANVAS_HEIGHT - 150;
        n = new CGfxButton(c,f,e);
        n.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        r = new createjs.Text("NEXT LEVEL!!! "," 60px " + TEXT,"#000000");
        r.x = CANVAS_WIDTH / 2 - 350;
        r.y = 175;
        r.textAlign = "left";
        r.textBaseline = "alphabetic";
        r.lineWidth = 650;
        r.outline = 3;
        b.addChild(r);
        p = new createjs.Text("NEXT LEVEL!!! "," 60px " + TEXT,"#ffe51f");
        p.x = CANVAS_WIDTH / 2 - 350;
        p.y = 175;
        p.textAlign = "left";
        p.textBaseline = "alphabetic";
        p.lineWidth = 650;
        b.addChild(p);
        u = new createjs.Text("GOAL SCORED: "," 40px " + TEXT,"#000000");
        u.x = CANVAS_WIDTH / 2 - 300;
        u.y = 275;
        u.textAlign = "left";
        u.textBaseline = "alphabetic";
        u.lineWidth = 650;
        u.outline = 3;
        b.addChild(u);
        v = new createjs.Text("GOAL SCORED: "," 40px " + TEXT,"#ffe51f");
        v.x = CANVAS_WIDTH / 2 - 300;
        v.y = 275;
        v.textAlign = "left";
        v.textBaseline = "alphabetic";
        v.lineWidth = 650;
        b.addChild(v);
        for (e = 0; e < d; e++,
            a += 26)
            z.push(createBitmap(s_oSpriteLibrary.getSprite("ball_kick_left"))),
                z[e].x = CANVAS_WIDTH / 2 + 50 + a,
                z[e].y = 250,
                b.addChild(z[e])
    }
    ;
    this.refreshButtonPos = function(a, b) {
        n.setPosition(c, f - b)
    }
    ;
    this.unload = function() {
        n.unload();
        n = null ;
        s_oStage.removeChild(b);
        q = null
    }
    ;
    this._init(a, d)
}
;function CBall(a, d, b) {
    var c = 0, f = !1, k = !0, h, e, g, l = {
        x: 0,
        y: 0
    }, m = {
        x: 0,
        y: 0
    };
    this._init = function(a, b, c) {
        h = {
            images: [s_oSpriteLibrary.getSprite("ball")],
            framerate: 20,
            frames: {
                width: BALL_WIDTH,
                height: BALL_HEIGHT,
                regX: BALL_WIDTH / 2,
                regY: BALL_WIDTH / 2
            },
            animations: {
                idle: 0,
                thrown: [0, 6, "thrown"]
            }
        };
        var d = new createjs.SpriteSheet(h);
        e = createSprite(d, "idle", 0, 0, BALL_WIDTH, BALL_HEIGHT);
        e.x = a;
        e.y = b;
        e.rotation = 0;
        c.addChild(e);
        e.gotoAndStop("idle");
        l.x = e.x;
        l.y = e.y
    }
    ;
    this._calculateMid = function(a, b) {
        var c;
        c = Math.floor(50 * Math.random()) + 1;
        c = b.x < CANVAS_WIDTH / 2 ? b.y > CANVAS_HEIGHT / 2 ? new createjs.Point(Math.floor(CANVAS_WIDTH / 2 * Math.random()) + 100,CANVAS_HEIGHT / 2 - 200 - c) : new createjs.Point(Math.floor(CANVAS_WIDTH / 2 * Math.random()) + 100,CANVAS_HEIGHT / 2 - 200 + c) : b.x > CANVAS_WIDTH / 2 ? b.y > CANVAS_HEIGHT / 2 ? new createjs.Point(Math.floor(CANVAS_WIDTH / 2 * Math.random()) + 300,CANVAS_HEIGHT / 2 - 200 - c) : new createjs.Point(Math.floor(CANVAS_WIDTH / 2 * Math.random()) + 300,CANVAS_HEIGHT / 2 - 200 + c) : b.x > CANVAS_WIDTH / 2 ? new createjs.Point(CANVAS_WIDTH / 2 - 50,Math.floor(CANVAS_HEIGHT / 2 * Math.random() - 100) + 100) : new createjs.Point(CANVAS_WIDTH / 2 + 50,Math.floor(CANVAS_HEIGHT / 2 * Math.random() - 100) + 100);
        g = {
            start: a,
            end: b,
            traj: c
        }
    }
    ;
    this.fadeOut = function() {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 200).call(function() {
            e.gotoAndStop("idle")
        })
    }
    ;
    this.ballKicked = function(a, b) {
        m.x = a;
        m.y = b;
        g = {
            start: l,
            end: m,
            traj: m
        };
        f = !0;
        k = !1;
        e.gotoAndPlay("thrown")
    }
    ;
    this.returnX = function() {
        return e.x
    }
    ;
    this.returnY = function() {
        return e.y
    }
    ;
    this._updateBall = function(a, b) {
        c += STEP_SPEED_BALL_HITTED;
        e.rotation += 5;
        40 < c && (c = 0,
            f = !1,
            k = !0,
            s_oGame.showMessage(!1));
        if (!k) {
            var d;
            d = easeOutCubic(c, 0, 1, 40);
            d = getTrajectoryPoint(d, g);
            e.x = d.x;
            e.y = d.y;
            !0 === b && .7 >= e.scaleX && s_oGame.goalKeeperBounce();
            0 < a && .75 >= e.scaleX && s_oGame.controlWall();
            .4 <= e.scaleX && (e.scaleX -= .03,
                e.scaleY -= .03)
        }
    }
    ;
    this.bounce = function(a, b) {
        f = !1;
        0 === b ? a < CANVAS_WIDTH / 2 ? createjs.Tween.get(e).to({
            x: e.x + 100,
            y: CANVAS_HEIGHT + 50
        }, 500).call(function() {
            s_oGame.showMessage(!0)
        }) : createjs.Tween.get(e).to({
            x: e.x - 100,
            y: CANVAS_HEIGHT + 50
        }, 500).call(function() {
            s_oGame.showMessage(!0)
        }) : a < CANVAS_WIDTH / 2 ? createjs.Tween.get(e).to({
            x: e.x + 100,
            y: CANVAS_HEIGHT + 50
        }, 700).call(function() {
            s_oGame.showMessage(!1)
        }) : createjs.Tween.get(e).to({
            x: e.x - 100,
            y: CANVAS_HEIGHT + 50
        }, 700).call(function() {
            s_oGame.showMessage(!1)
        })
    }
    ;
    this.unload = function() {
        e = null ;
        b.removeAllChildren()
    }
    ;
    this.update = function(a, b) {
        f && this._updateBall(a, b)
    }
    ;
    s_oBall = this;
    this._init(a, d, b)
}
s_oBall = null ;
function CWall(a, d, b, c) {
    var f = null , k = null , h;
    this._init = function(a, c, d) {
        0 === d && (b.x = a,
            b.y = c)
    }
    ;
    this.showIdle = function(a) {
        var b = {
            images: [s_oSpriteLibrary.getSprite("wall_idle")],
            framerate: 10,
            frames: {
                width: WALL_WIDTH,
                height: WALL_HEIGHT,
                regX: WALL_WIDTH / 2,
                regY: 0
            },
            animations: {
                idle: [0, 23, "idle"]
            }
        };
        f = new createjs.SpriteSheet(b);
        null === k ? k = new createjs.Sprite(f,"idle") : k.spriteSheet = f;
        k.x = (WALL_WIDTH - 40) * a;
        k.y = 0;
        k.currentAnimationFrame = 0;
        h.addChild(k)
    }
    ;
    this.showJump = function(a) {
        null !== k && h.removeChild(k);
        var b = {
            images: [s_oSpriteLibrary.getSprite("wall_jump")],
            framerate: 15,
            frames: {
                width: WALL_WIDTH,
                height: WALL_HEIGHT,
                regX: WALL_WIDTH / 2
            },
            animations: {
                start: [0],
                jump: [0, 20, "start"]
            }
        }
            , b = new createjs.SpriteSheet(b);
        k = new createjs.Sprite(b,"jump");
        k.x = (WALL_WIDTH - 40) * a;
        h.addChild(k)
    }
    ;
    this.stopAction = function() {
        k.stop(0)
    }
    ;
    this.getFrame = function() {
        return k.currentFrame
    }
    ;
    this.getX = function() {
        return k.x
    }
    ;
    this.controlIfHitted = function(a, b, c) {
        if (b < h.y + WALL_HEIGHT && b > h.y && a > h.x && a < h.x + (WALL_WIDTH - 60) * c)
            return !0
    }
    ;
    this.unload = function() {
        k = null ;
        h.removeChild(k)
    }
    ;
    s_oPlayer = this;
    h = b;
    this._init(a, d, c)
}
s_oPlayer = null ;
function CCrowd() {
    var a = [];
    this._init = function() {
        for (var d = 0; d < NUM_CROWD; d++)
            a.push(createBitmap(s_oSpriteLibrary.getSprite("supporters_" + d))),
                a[d].x = 0,
                a[d].y = 90,
                a[d].visible = !1,
                s_oStage.addChild(a[d]);
        a[0].visible = !0
    }
    ;
    this.exult = function() {}
    ;
    this.showAnim = function() {}
    ;
    s_oPlayer = this;
    this._init()
}
s_oPlayer = null ;
function CShotIndicatorController(a, d) {
    var b, c, f, k, h = !0, e, g, l, m, n, q, r, p, u = !0, v = !0;
    this.init = function(a, d) {
        l = a;
        q = new createjs.Container;
        s_oStage.addChild(q);
        e = d;
        if (!1 === d) {
            var g = s_oSpriteLibrary.getSprite("high_bar");
            r = createBitmap(g);
            q.addChild(r);
            q.x = 290;
            q.y = CANVAS_HEIGHT / 2 - 170;
            g = s_oSpriteLibrary.getSprite("arrow_bar");
            p = createBitmap(g);
            p.x = 0;
            p.y = -10;
            q.addChild(p);
            f = 20;
            k = CANVAS_HEIGHT / 2 - 150;
            b = TOP_BARX - 50;
            c = CANVAS_HEIGHT / 2 - 150
        } else
            g = s_oSpriteLibrary.getSprite("right_bar"),
                g = createBitmap(g),
                q.addChild(g),
                q.x = CANVAS_WIDTH / 2 + 345,
                q.y = CANVAS_HEIGHT / 2 - 130,
                g = s_oSpriteLibrary.getSprite("arrow_bar"),
                p = createBitmap(g),
                p.x = 60,
                p.y = 0,
                p.rotation = 90,
                q.addChild(p),
                f = CANVAS_WIDTH / 2 + 375,
                k = 0,
                b = CANVAS_WIDTH / 2 + 375,
                c = RIGHT_BARY - 50;
        this.reset()
    }
    ;
    this.reset = function() {
        g = SHOT_INDICATOR_SPEED;
        m = new CVector2;
        m.set(f, k);
        n = new CVector2;
        n.set(b, c)
    }
    ;
    this.increaseSpeed = function() {
        g -= DECREASE_SHOT_INDICATOR_SPEED
    }
    ;
    this.show = function() {
        h = !0;
        q.visible = h
    }
    ;
    this.hide = function() {
        h = !1;
        q.visible = h
    }
    ;
    this.getPositionBallEnd = function() {
        return e ? Math.floor(p.y / l) : Math.floor(p.x / l)
    }
    ;
    this.startAnimation = function() {
        var a = this;
        e ? v ? createjs.Tween.get(p, {
            override: !0
        }).to({
            y: c
        }, g, createjs.Ease.quadInOut).call(function() {
            v = !v;
            a.startAnimation()
        }) : createjs.Tween.get(p, {
            override: !0
        }).to({
            y: k
        }, g, createjs.Ease.quadInOut).call(function() {
            v = !v;
            a.startAnimation()
        }) : u ? createjs.Tween.get(p, {
            override: !0
        }).to({
            x: b
        }, g, createjs.Ease.quadInOut).call(function() {
            u = !u;
            a.startAnimation()
        }) : createjs.Tween.get(p, {
            override: !0
        }).to({
            x: f
        }, g, createjs.Ease.quadInOut).call(function() {
            u = !u;
            a.startAnimation()
        })
    }
    ;
    this.endAnimation = function() {
        e ? createjs.Tween.get(p, {
            override: !0
        }).to({
            y: p.y
        }, 0).call(function() {}) : createjs.Tween.get(p, {
            override: !0
        }).to({
            x: p.x
        }, 0).call(function() {})
    }
    ;
    this.update = function() {}
    ;
    this.init(a, d)
}
;var userId = "null", userName, auth_token, leaderboardUrl = "", siteUrl = "", _score;
$(document).ready(function() {
    var a = new CMain({
        shot_indicator_spd: 1E3,
        decrease_shot_indicator_spd: 100
    });
    $(a).on("start_session", function(a) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeStartSession()
    });
    $(a).on("end_session", function(a) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeEndSession()
    });
    $(a).on("save_score", function(a, b) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeSaveScore({
            score: b
        })
    });
    $(a).on("start_level", function(a, b) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeStartLevel({
            level: b
        })
    });
    $(a).on("end_level", function(a, b) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeEndLevel({
            level: b
        })
    });
    $(a).on("show_interlevel_ad", function(a) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeShowInterlevelAD()
    });
    $(a).on("share_event", function(a, b) {
        "true" === getParamValue("ctl-arcade") && parent.__ctlArcadeShareEvent({
            img: TEXT_SHARE_IMAGE,
            title: TEXT_SHARE_TITLE,
            msg: TEXT_SHARE_MSG1 + b + TEXT_SHARE_MSG2,
            msg_share: TEXT_SHARE_SHARE1 + b + TEXT_SHARE_SHARE1
        })
    });
    isIOS() ? setTimeout(function() {
        sizeHandler()
    }, 200) : sizeHandler()
});
window.fbAsyncInit = function() {
    FB.init({
        appId: "232317573784129",
        xfbml: !0,
        version: "v2.5",
        status: !0
    });
    FB.Event.subscribe("auth.statusChange", function(a) {
        initializeFB()
    })
}
;
(function(a, d, b) {
    var c = a.getElementsByTagName(d)[0];
    a.getElementById(b) || (a = a.createElement(d),
        a.id = b,
        a.src = "//connect.facebook.net/en_US/sdk.js",
        c.parentNode.insertBefore(a, c))
})(document, "script", "facebook-jssdk");
function checkFBLoginState() {
    FB.getLoginStatus(function(a) {
        fbStatusChangeCallback(a)
    })
}
function setScore(a) {
    _score = a
}
function initializeFB() {
    FB.getLoginStatus(function(a) {
        "connected" === a.status ? (auth_token = a.authResponse.accessToken,
            FB.api("/me?fields=name,email", function(a) {
                userId = a.email;
                userName = a.name;
                console.log("UserConnected:FB User Profile: " + JSON.stringify(a));
                console.log(" (FB.api)userId is " + userId)
            })) : userId = "null"
    })
}
function isUserConnected() {
    if ("null" !== userId)
        return console.log(" userId is " + userId),
            !0;
    console.log(" userId is " + userId);
    return !1
}
function fbStatusChangeCallback(a) {
    console.log("statusChangeCallback");
    console.log(a);
    "connected" === a.status ? (auth_token = a.authResponse.accessToken,
        handleFBResponse(),
        console.log("post score and show leaderboard here")) : FB.login(function(a) {
        "connected" === a.status ? (auth_token = a.authResponse.accessToken,
            handleFBResponse(),
            console.log("post score and show leaderboard here")) : console.log("You need to login to facebook first")
    }, {
        scope: "public_profile,email"
    })
}
function handleFBResponse() {
    "null" === userId ? FB.api("/me?fields=name,email", function(a) {
        userId = a.email;
        userName = a.name;
        console.log("score: " + _score);
        sendScore(_score, !0);
        console.log("FB User Profile: " + JSON.stringify(a))
    }) : requestLeaderboard()
}
function sendScore(a, d) {
    var b = new XMLHttpRequest;
    b.open("POST", leaderboardUrl + "leaderboard/penalty", !0);
    b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("White space code: " + userName.charCodeAt(4));
    b.send("userId=" + userId + "&userName=" + userName + "&score=" + a + "&access_token=" + auth_token);
    b.onload = function(a) {
        200 == this.status && "success" === JSON.parse(b.responseText).status && d && requestLeaderboard()
    }
}
function requestLeaderboard(a, d) {
    var b = new XMLHttpRequest
        , c = leaderboardUrl + "leaderboard/penalty/" + userId + "|" + encodeURIComponent(userName) + "?offset=0&limit=100";
    a && (c += "&start=" + a);
    d && (c += "&end=" + d);
    b.open("GET", c, !0);
    b.onload = function(a) {
        if (200 == this.status) {
            a = JSON.parse(b.responseText);
            a.leaderboard.forEach(function(a) {
                a.splice(0, 0, 0)
            });
            console.log("leaderboard response: " + JSON.stringify(a.leaderboard));
            $("#rank").html("You're ranked: <b>" + a.rank + "</b> " + getRankPostScript(a.rank));
            var c = $("#leaderboard").DataTable({
                data: a.leaderboard,
                destroy: !0,
                searching: !1,
                info: !1,
                order: [[2, "desc"]],
                columns: [{
                    title: "SN"
                }, {
                    title: "Name"
                }, {
                    title: "Score"
                }]
            });
            c.on("order.dt", function() {
                c.column(0, {
                    order: "applied"
                }).nodes().each(function(a, b) {
                    a.innerHTML = b + 1
                })
            }).draw();
            $("#lbmodal").modal("show")
        }
    }
    ;
    b.send()
}
function alltime() {
    console.log("all-time");
    requestLeaderboard()
}
function weekly() {
    console.log("weekly");
    var a = moment().startOf("week").toDate()
        , d = moment().endOf("week").toDate();
    requestLeaderboard(a, d)
}
function monthly() {
    console.log("monthly");
    var a = moment().startOf("month").toDate()
        , d = moment().endOf("month").toDate();
    requestLeaderboard(a, d)
}
function getRankPostScript(a) {
    a %= 10;
    return 1 === a ? "st" : 2 === a ? "nd" : 3 == a ? "rd" : "th"
}
function FacebookShare() {
    console.log("facebook click");
    var a = "How many free kicks can you score? Get a highscore and you could win fantastic Barca prizes from Etisalat";
    _score && (a = "I just got " + _score + " points in the Barca Penalty challenge. Try and beat my highscore and you could win fantastic Barca prizes from Etisalat");
    FB.ui({
        method: "feed",
        link: siteUrl,
        caption: "Barca Penalty Shootout",
        picture: siteUrl + "/penalty/sprites/bg_menu.jpg",
        description: a
    }, function(a) {
        console.log("fb message posted")
    })
}
function TwitterShare() {
    console.log("twitter click");
    var a = "How many free kicks can you score? Get a highscore and you could win fantastic Barca prizes from Etisalat";
    _score && (a = "I just got " + _score + " points in the Barca Penalty Challenge .Try and beat my score and you could win fantastic Barca prizes from Etisalat");
    var d = ($(window).width() - 575) / 2
        , b = ($(window).height() - 400) / 2
        , a = "http://twitter.com/share?text=" + encodeURIComponent(a) + "&url=" + siteUrl;
    window.open(a, "twitter", "status=1,width=575,height=400,top=" + b + ",left=" + d);
    console.log("url: " + a)
}
;