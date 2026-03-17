// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
var PauseMenuSel = 0;
var PauseBtns = document.querySelectorAll("#pause-btns > button");
function focusButton() {
    let i = 0;
    let fFlag = false;
    PauseBtns.forEach(btn => {
        if (fFlag)
            return;
        if (i < PauseMenuSel) {
            if (btn.style.display !== "none")
                i++;
            return;
        }
        if (btn.style.display === "none")
            return;
        fFlag = true;
        return btn.focus();
    });
}
function getAttr(instance, attr) {
    return instance[attr];
}
function setAttr(instance, attr, value) {
    instance[attr] = value;
}
export var Enum;
(function (Enum) {
    let BlockShape;
    (function (BlockShape) {
        BlockShape[BlockShape["I"] = 0] = "I";
        BlockShape[BlockShape["O"] = 1] = "O";
        BlockShape[BlockShape["T"] = 2] = "T";
        BlockShape[BlockShape["S"] = 3] = "S";
        BlockShape[BlockShape["Z"] = 4] = "Z";
        BlockShape[BlockShape["J"] = 5] = "J";
        BlockShape[BlockShape["L"] = 6] = "L";
    })(BlockShape = Enum.BlockShape || (Enum.BlockShape = {}));
    class CustomBlockShape {
        static get length() {
            let i = 0;
            for (const _ of Object.keys(Blocks))
                i++;
            return i;
        }
        constructor(symbol, block) {
            this.Symbol = symbol;
            this.Block = block;
            this.index = CustomBlockShape.length;
            Blocks[this.index] = block;
        }
        Symbol;
        Block;
        index;
    }
    Enum.CustomBlockShape = CustomBlockShape;
    let Operation;
    (function (Operation) {
        Operation[Operation["Addition"] = 0] = "Addition";
        Operation[Operation["Subtraction"] = 1] = "Subtraction";
        Operation[Operation["Multiplication"] = 2] = "Multiplication";
        Operation[Operation["Division"] = 3] = "Division";
    })(Operation = Enum.Operation || (Enum.Operation = {}));
    const ops = { ["+"]: Operation.Addition, ["-"]: Operation.Subtraction, ["*"]: Operation.Multiplication, ["/"]: Operation.Division };
    function OperationFromString(op) {
        return ops[op] ?? Operation.Addition;
    }
    Enum.OperationFromString = OperationFromString;
    class Level {
        constructor(id, speed, nameFormat = "Level ${id}") {
            this.Id = id;
            this.Name = nameFormat
                .replaceAll("\$\{id\}", id.toString())
                .replaceAll("\$\{speed\}", speed.toString());
            this.Speed = speed;
        }
        Id;
        Speed;
        Name;
    }
    Enum.Level = Level;
    Enum.Levels = [
        new Level(1, 1.0),
        new Level(2, 1.2),
        new Level(3, 1.5),
        new Level(4, 2.0),
        new Level(5, 2.5),
        new Level(6, 3.0)
    ];
    let ThemeStyle;
    (function (ThemeStyle) {
        ThemeStyle[ThemeStyle["Dark"] = 0] = "Dark";
        ThemeStyle[ThemeStyle["Light"] = 1] = "Light";
    })(ThemeStyle = Enum.ThemeStyle || (Enum.ThemeStyle = {}));
    let UIThemeKey;
    (function (UIThemeKey) {
        UIThemeKey[UIThemeKey["olc"] = 0] = "olc";
        UIThemeKey[UIThemeKey["rosewater"] = 1] = "rosewater";
        UIThemeKey[UIThemeKey["flamingo"] = 2] = "flamingo";
        UIThemeKey[UIThemeKey["pink"] = 3] = "pink";
        UIThemeKey[UIThemeKey["mauve"] = 4] = "mauve";
        UIThemeKey[UIThemeKey["red"] = 5] = "red";
        UIThemeKey[UIThemeKey["maroon"] = 6] = "maroon";
        UIThemeKey[UIThemeKey["peach"] = 7] = "peach";
        UIThemeKey[UIThemeKey["yellow"] = 8] = "yellow";
        UIThemeKey[UIThemeKey["green"] = 9] = "green";
        UIThemeKey[UIThemeKey["teal"] = 10] = "teal";
        UIThemeKey[UIThemeKey["sky"] = 11] = "sky";
        UIThemeKey[UIThemeKey["sapphire"] = 12] = "sapphire";
        UIThemeKey[UIThemeKey["blue"] = 13] = "blue";
        UIThemeKey[UIThemeKey["lavender"] = 14] = "lavender";
        UIThemeKey[UIThemeKey["text"] = 15] = "text";
        UIThemeKey[UIThemeKey["subtext1"] = 16] = "subtext1";
        UIThemeKey[UIThemeKey["subtext0"] = 17] = "subtext0";
        UIThemeKey[UIThemeKey["overlay2"] = 18] = "overlay2";
        UIThemeKey[UIThemeKey["overlay1"] = 19] = "overlay1";
        UIThemeKey[UIThemeKey["overlay0"] = 20] = "overlay0";
        UIThemeKey[UIThemeKey["surface2"] = 21] = "surface2";
        UIThemeKey[UIThemeKey["surface1"] = 22] = "surface1";
        UIThemeKey[UIThemeKey["surface0"] = 23] = "surface0";
        UIThemeKey[UIThemeKey["base"] = 24] = "base";
        UIThemeKey[UIThemeKey["mantle"] = 25] = "mantle";
        UIThemeKey[UIThemeKey["crust"] = 26] = "crust";
        UIThemeKey[UIThemeKey["accent"] = 27] = "accent";
    })(UIThemeKey = Enum.UIThemeKey || (Enum.UIThemeKey = {}));
})(Enum || (Enum = {}));
class Utils {
    static OverflowOperate(n0, n1, underflow, overflow, operation = Enum.Operation.Addition) {
        if (typeof operation === "string")
            operation = Enum.OperationFromString(operation);
        if (operation === Enum.Operation.Addition)
            n0 += n1;
        else if (operation === Enum.Operation.Subtraction)
            n0 -= n1;
        else if (operation === Enum.Operation.Multiplication)
            n0 *= n1;
        else if (operation === Enum.Operation.Division)
            n0 /= n1;
        if (n0 < underflow)
            return overflow;
        if (n0 > overflow)
            return underflow;
        return n0;
    }
    static RandomRange(min, max) {
        return Math.floor(Math.random() * max - min) + min;
    }
    static PickRandomFromArray(arr) {
        return arr[this.RandomRange(0, arr.length - 1)];
    }
    static PickRandomFromDict(dict) {
        return dict[this.PickRandomFromArray(Object.keys(dict))];
    }
    static MergeDicts(x, d) {
        for (const [k, v] of Object.entries(d)) {
            x[k] ??= v;
        }
        return x;
    }
}
class Canvas2D {
    constructor(canvas, ctx) {
        this.Canvas = canvas;
        this.Context = ctx ?? canvas.getContext("2d");
    }
    Canvas;
    Context;
    ClearCanvas() {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    }
}
class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    X;
    Y;
}
class ColorPalette {
    constructor(name, blocktheme, uitheme, style = Enum.ThemeStyle.Dark) {
        this.Name = name;
        this.BlockTheme = blocktheme;
        this.Style = style;
        if (uitheme?.Name === undefined || uitheme?.Style === undefined)
            uitheme?.setPropertiesFromPalette(this);
        this.UITheme = uitheme;
    }
    Name;
    BlockTheme;
    UITheme;
    Style;
}
class UITheme {
    constructor(name, data, style) {
        this.name = name;
        this.Data = data;
        this.style = style;
    }
    name;
    get Name() {
        return this.name;
    }
    Data;
    style;
    get Style() {
        return this.style;
    }
    setPropertiesFromPalette(palette) {
        this.name ??= palette.Name;
        this.style ??= palette.Style;
    }
}
class Color {
    constructor(r, g, b, opacity = 1.0) {
        this._rgb = `rgba(${r},${g},${b}`;
        this.Opacity = opacity;
    }
    static fromHex(hex) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        let o = 255;
        if (hex.length > 6)
            o = parseInt(hex.substring(6, 8), 16);
        return new Color(r, g, b, o / 255);
    }
    /*
     * Adapted version of https://gist.github.com/mjackson/5311256 > hslToRgb()
     */
    static fromHSLA(h, s, l, a) {
        s /= 100;
        l /= 100;
        if (s === 0) {
            l *= 255;
            return new Color(l, l, l, a);
        }
        else {
            function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            return new Color(hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3), a);
        }
    }
    _rgb;
    Opacity;
    get RGBA() {
        return `${this._rgb},${this.Opacity})`;
    }
    WithOpacity(opacity) {
        let o = this.Opacity;
        this.Opacity = opacity;
        const s = this.RGBA;
        this.Opacity = o;
        return s;
    }
    toString() {
        return this.RGBA;
    }
}
class Game {
    static ColorPalettes = [
        new ColorPalette("Catpuccin Macchiato", {
            [Enum.BlockShape.I]: Color.fromHex("#91d7e3"),
            [Enum.BlockShape.J]: Color.fromHex("#eed49f"),
            [Enum.BlockShape.L]: Color.fromHex("#c6a0f6"),
            [Enum.BlockShape.O]: Color.fromHex("#a6da95"),
            [Enum.BlockShape.S]: Color.fromHex("#ed8796"),
            [Enum.BlockShape.T]: Color.fromHex("#b7bdf8"),
            [Enum.BlockShape.Z]: Color.fromHex("#f5a97f")
        }, new UITheme(undefined, {
            [Enum.UIThemeKey.olc]: Color.fromHSLA(0, 0, 100, .25),
            [Enum.UIThemeKey.rosewater]: Color.fromHex("#f4dbd6"),
            [Enum.UIThemeKey.flamingo]: Color.fromHex("#f0c6c6"),
            [Enum.UIThemeKey.pink]: Color.fromHex("#f5bde6"),
            [Enum.UIThemeKey.mauve]: Color.fromHex("#c6a0f6"),
            [Enum.UIThemeKey.red]: Color.fromHex("#ed8796"),
            [Enum.UIThemeKey.maroon]: Color.fromHex("#ee99a0"),
            [Enum.UIThemeKey.peach]: Color.fromHex("#f5a97f"),
            [Enum.UIThemeKey.yellow]: Color.fromHex("#eed496"),
            [Enum.UIThemeKey.green]: Color.fromHex("#a6da95"),
            [Enum.UIThemeKey.teal]: Color.fromHex("#8bd5ca"),
            [Enum.UIThemeKey.sky]: Color.fromHex("#91d7e3"),
            [Enum.UIThemeKey.sapphire]: Color.fromHex("#7dc4e4"),
            [Enum.UIThemeKey.blue]: Color.fromHex("#8aadf4"),
            [Enum.UIThemeKey.lavender]: Color.fromHex("#b7bdf8"),
            [Enum.UIThemeKey.text]: Color.fromHex("#cad3f5"),
            [Enum.UIThemeKey.subtext1]: Color.fromHex("#b8c0e0"),
            [Enum.UIThemeKey.subtext0]: Color.fromHex("#a5adcb"),
            [Enum.UIThemeKey.overlay2]: Color.fromHex("#939ab7"),
            [Enum.UIThemeKey.overlay1]: Color.fromHex("#8087a2"),
            [Enum.UIThemeKey.overlay0]: Color.fromHex("#6e738d"),
            [Enum.UIThemeKey.surface2]: Color.fromHex("#5b6078"),
            [Enum.UIThemeKey.surface1]: Color.fromHex("#494d64"),
            [Enum.UIThemeKey.surface0]: Color.fromHex("#363a4f"),
            [Enum.UIThemeKey.base]: Color.fromHex("#24273a"),
            [Enum.UIThemeKey.mantle]: Color.fromHex("#1e2030"),
            [Enum.UIThemeKey.crust]: Color.fromHex("#181926"),
            [Enum.UIThemeKey.accent]: Color.fromHex("#b7bdf8")
        }), Enum.ThemeStyle.Dark)
    ];
    static PixelSize = 32;
    static Width = 10;
    static Height = 20;
    static BaseSpeedMs = 1000.0;
    static GhostBlockOpacity = 0.25;
    static Paused = true;
    static CurrentBlock;
    static GameCanvas = new Canvas2D(document.getElementById("game"));
    static BlockCanvas = new Canvas2D(document.getElementById("block"));
    static StaleCanvas = new Canvas2D(document.getElementById("stale"));
    static Level;
    static get Running() {
        return this._running;
    }
    static _running;
    static _data;
    static _time;
    static _thread_id;
    static GridDrawn = false;
    static get CenterPoint() {
        return new Point(this.GameCanvas.Canvas.width / 2, this.GameCanvas.Canvas.height / 2);
    }
    static get GameOffset() {
        return new Point(this.CenterPoint.X - (this.Width * this.PixelSize) / 2, this.CenterPoint.Y - (this.Height * this.PixelSize) / 2);
    }
    static get Speed() {
        return this.BaseSpeedMs / this.Level.Speed;
    }
    static get Data() {
        return this._data;
    }
    static get Time() {
        return this._time;
    }
    static Reset() {
        this._running = false;
        this.TogglePause(true);
        this._time = 0;
        this.Level = Enum.Levels[0];
        if (!this.GridDrawn)
            this.DrawGrid();
        Game.BlockCanvas.ClearCanvas();
        Game.StaleCanvas.ClearCanvas();
        this._data = [];
        for (let y = 0; y < this.Height; y++) {
            this._data[y] = [];
            for (let x = 0; x < this.Width; x++)
                this._data[y][x] = 0;
        }
    }
    static NewGame() {
        this.Reset();
    }
    static GameTick() {
        if (Game.Paused)
            return;
        if (Game.CurrentBlock && !Game.CurrentBlock.Move(0, 1)) {
            Game.CurrentBlock.Stamp();
        }
    }
    static StartGame() {
        if (this._running)
            return;
        this._running = true;
        this.TogglePause(false);
        this.CurrentBlock = this.RandomBlock();
        this.CurrentBlock.Draw();
        if (this._thread_id !== null)
            clearInterval(this._thread_id);
        this._thread_id = setInterval(this.GameTick, this.Speed);
    }
    static RandomBlock() {
        return new BlockInstance(Utils.PickRandomFromDict(Blocks));
    }
    static DrawGrid() {
        this.GridDrawn = true;
        this.GameCanvas.Context.strokeStyle = "#18192680";
        this.GameCanvas.Context.lineWidth = 1;
        for (let x = 0; x <= this.Width; x++) {
            this.GameCanvas.Context.beginPath();
            this.GameCanvas.Context.moveTo(this.GameOffset.X + x * this.PixelSize, this.GameOffset.Y);
            this.GameCanvas.Context.lineTo(this.GameOffset.X + x * this.PixelSize, this.GameOffset.Y + this.Height * this.PixelSize);
            this.GameCanvas.Context.stroke();
        }
        for (let y = 0; y <= this.Height; y++) {
            this.GameCanvas.Context.beginPath();
            this.GameCanvas.Context.moveTo(this.GameOffset.X, this.GameOffset.Y + y * this.PixelSize);
            this.GameCanvas.Context.lineTo(this.GameOffset.X + this.Width * this.PixelSize, this.GameOffset.Y + y * this.PixelSize);
            this.GameCanvas.Context.stroke();
        }
    }
    static EraseShape(self, x, y, shape) {
        if (this !== self && self !== this.CurrentBlock)
            return;
        if (self instanceof BlockInstance) {
            x ??= self.X;
            y ??= self.Y;
            shape ??= self.CurrentShape;
        }
        else {
            x ??= 0;
            y ??= 0;
            shape ??= [];
        }
        for (const [oY, row] of shape.entries()) {
            for (const [oX, col] of row.entries()) {
                if (col === 0)
                    continue;
                this._data[y + oY][x + oX] = 0;
            }
        }
    }
    static WriteShape(self, x, y, shape) {
        if (this !== self && self !== this.CurrentBlock)
            return;
        let data;
        if (self instanceof BlockInstance) {
            x ??= self.X;
            y ??= self.Y;
            shape ??= self.CurrentShape;
            data = self.Data;
        }
        else {
            x ??= 0;
            y ??= 0;
            shape ??= [];
            data = new BlockData("white");
        }
        for (const [oY, row] of shape.entries()) {
            for (const [oX, col] of row.entries()) {
                if (col === 0)
                    continue;
                this._data[y + oY][x + oX] = data;
            }
        }
    }
    static EraseLine(self, y) {
        if (this !== self && self !== this.CurrentBlock)
            return;
        if (self instanceof BlockInstance)
            y ??= self.Y;
        else
            y ??= 0;
        for (let x = 0; x < this.Width; x++) {
            this._data[y][x] = 0;
        }
    }
    static RedrawCanvas() {
        this.StaleCanvas.ClearCanvas();
        for (let y = 0; y < this.Height; y++) {
            for (let x = 0; x < this.Width; x++) {
                const col = this._data[y][x];
                if (col === 0)
                    continue;
                this.StaleCanvas.Context.fillStyle = (col instanceof BlockData) ? col.Color.RGBA : "white";
                this.StaleCanvas.Context.fillRect(Game.GameOffset.X + x * this.PixelSize, Game.GameOffset.Y + y * this.PixelSize, this.PixelSize, this.PixelSize);
            }
        }
    }
    static BlockStamped(self) {
        if (self !== this.CurrentBlock)
            return;
        for (let y = 0; y < this.Height; y++) {
            if (this._data[y].every(col => col !== 0)) {
                this.EraseLine(this, y);
                for (let oY = y - 1; oY >= 0; oY--) {
                    for (let x = 0; x < this.Width; x++) {
                        this._data[oY + 1][x] = this._data[oY][x];
                    }
                }
            }
        }
        this.RedrawCanvas();
        this.CurrentBlock = this.RandomBlock();
        if (!this.CurrentBlock.IsValidPosition()) {
            this.Reset();
        }
        this.CurrentBlock.Draw();
    }
    static TogglePause(paused) {
        if (paused === undefined)
            this.Paused = !this.Paused;
        else
            this.Paused = paused;
        if (this.Paused)
            document.getElementById("pause-ind")?.classList.add("paused");
        else
            document.getElementById("pause-ind")?.classList.remove("paused");
        document.querySelectorAll(".game-canvas").forEach(canvas => {
            if (this.Paused)
                canvas.classList.add("paused");
            else
                canvas.classList.remove("paused");
        });
        if (!this._running) {
            document.getElementById("pause-text").innerText = "Game Over!";
            document.getElementById("pause-resume").style.display = "none";
            document.getElementById("pause-restart").innerText = "Start";
        }
        else {
            document.getElementById("pause-text").innerText = "Paused...";
            document.getElementById("pause-resume").style.display = "initial";
            document.getElementById("pause-restart").innerText = "Restart";
        }
        if (this.Paused) {
            PauseMenuSel = 0;
            focusButton();
        }
    }
}
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
const settingsWin = document.getElementById("settings");
const Settings = {
    GhostBlockOpacity: settingsWin?.querySelector("#settings-ghost-opacity")
};
function updateSettings() {
    for (const [k, el] of Object.entries(Settings)) {
        if (el instanceof HTMLInputElement) {
            switch (el.type) {
                case "number":
                    if (el.classList.contains("percent"))
                        el.valueAsNumber = getAttr(Game, k) * 100;
                    else
                        el.valueAsNumber = getAttr(Game, k);
                    el.addEventListener("change", () => {
                        const min = parseFloat(el.dataset.min ?? "0");
                        const max = parseFloat(el.dataset.max ?? "100");
                        el.valueAsNumber = clamp(el.valueAsNumber, min, max);
                        setAttr(Game, k, el.classList.contains("percent") ? el.valueAsNumber / max : el.valueAsNumber);
                    });
                    break;
                default:
                    el.value = getAttr(Game, k);
                    break;
            }
        }
    }
}
updateSettings();
class BlockData {
    constructor(color = Color.fromHex("#FFFFFFFF")) {
        if (typeof color === "string")
            color = Color.fromHex(color + "FF");
        this.Color = color;
    }
    Color;
}
class Block {
    constructor(blockShapes, blockData) {
        this.Shapes = blockShapes;
        this.Data = blockData;
    }
    Shapes;
    Data;
}
class BlockInstance extends Block {
    constructor(block) {
        super(block.Shapes, block.Data);
        this._x = Math.floor(Game.Width / 2 - this.CurrentShape[0].length / 2);
    }
    _x = 0;
    _y = 0;
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get CurrentShape() {
        return this.Shapes[this.Rotation];
    }
    Rotation = 0;
    IsValidPosition(x = this._x, y = this._y, shape = this.CurrentShape) {
        for (const [oY, row] of shape.entries()) {
            for (const [oX, col] of row.entries()) {
                if (col === 0)
                    continue;
                if (Game.Data[y + oY] === undefined || Game.Data[x + oX] === undefined)
                    return false;
                if (Game.Data[y + oY][x + oX] !== 0)
                    return false;
            }
        }
        return true;
    }
    Move(x = 0, y = 0) {
        x += this._x;
        y += this._y;
        if (!this.IsValidPosition(x, y))
            return false;
        this._x = x;
        this._y = y;
        this.Draw();
        return true;
    }
    Rotate(reverse = false) {
        let dir = (reverse) ? -1 : 1;
        const oldRot = this.Rotation;
        this.Rotation = Utils.OverflowOperate(this.Rotation, dir, 0, 3);
        if (!this.IsValidPosition()) {
            this.Rotation = oldRot;
            return false;
        }
        this.Draw();
        return true;
    }
    _draw(canvas = Game.BlockCanvas, x = this._x, y = this._y) {
        for (const [oY, row] of this.CurrentShape.entries()) {
            for (const [oX, col] of row.entries()) {
                if (col === 0)
                    continue;
                canvas.Context.fillRect(Game.GameOffset.X + x * Game.PixelSize + oX * Game.PixelSize, Game.GameOffset.Y + y * Game.PixelSize + oY * Game.PixelSize, Game.PixelSize, Game.PixelSize);
            }
        }
    }
    Draw(canvas = Game.BlockCanvas) {
        if (!this.IsValidPosition())
            return;
        if (canvas === Game.BlockCanvas)
            canvas.ClearCanvas();
        canvas.Context.fillStyle = this.Data.Color.RGBA;
        this._draw(canvas);
        // Draw ghost block
        if (canvas === Game.BlockCanvas && this.LowestValidY > this._y) {
            canvas.Context.fillStyle = this.Data.Color.WithOpacity(Game.GhostBlockOpacity);
            this._draw(canvas, undefined, this.LowestValidY);
        }
    }
    Stamp() {
        this.Draw(Game.StaleCanvas);
        Game.WriteShape(this, this._x, this._y, this.CurrentShape);
        Game.BlockStamped(this);
    }
    InstantDrop() {
        this.Move(0, this.LowestValidY - this._y);
        this.Stamp();
    }
    get LowestValidY() {
        let y = this._y;
        while (true) {
            y++;
            if (!this.IsValidPosition(undefined, y)) {
                y--;
                break;
            }
        }
        return y;
    }
    get LowestPoint() {
        let lowestPoint = { x: 0, y: 0 };
        for (const [oY, row] of this.CurrentShape.entries()) {
            if (oY < lowestPoint.y)
                continue;
            for (const [oX, col] of row.entries()) {
                if (col === 0)
                    continue;
                lowestPoint = { x: oX, y: oY };
            }
        }
        return lowestPoint;
    }
}
const Blocks = {
    [Enum.BlockShape.I]: new Block([
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    ], new BlockData("#91d7e3")),
    [Enum.BlockShape.O]: new Block([
        [
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1]
        ]
    ], new BlockData("#eed49f")),
    [Enum.BlockShape.T]: new Block([
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ], new BlockData("#c6a0f6")),
    [Enum.BlockShape.S]: new Block([
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ]
    ], new BlockData("#a6da95")),
    [Enum.BlockShape.Z]: new Block([
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    ], new BlockData("#ed8796")),
    [Enum.BlockShape.J]: new Block([
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ], new BlockData("#b7bdf8")),
    [Enum.BlockShape.L]: new Block([
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ]
    ], new BlockData("#f5a97f"))
};
class ModEngine {
    static ModList = {};
    static LoadMod(mod) {
        if (this.ModList[mod.Namespace] !== undefined)
            return false;
        this.ModList[mod.Namespace] = mod;
        mod.Load();
        return true;
    }
}
class Mod {
    constructor(ns, name, desc = "", onLoad, blocks) {
        this.Namespace = ns;
        this.Name = name;
        this.Description = desc;
        this.Blocks = blocks;
        this.Load = onLoad;
    }
    ;
    Name;
    Description;
    Namespace;
    Blocks;
    Load;
}
function onResize() {
    document.querySelectorAll(".game-canvas").forEach(canvas => {
        if (window.innerWidth >= window.innerHeight) {
            canvas.style.height = "100%";
            canvas.style.width = "auto";
        }
        else {
            canvas.style.height = "auto";
            canvas.style.width = "100%";
        }
    });
}
const resizeObserver = new ResizeObserver(onResize);
resizeObserver.observe(document.body);
window.addEventListener("resize", onResize);
window.addEventListener("keydown", event => {
    if (event.defaultPrevented)
        return;
    if (!Game.Running || Game.Paused) {
        switch (event.key) {
            case "ArrowLeft": break;
            case "ArrowRight": break;
            case "Escape": break;
            case " ": break;
            case "z": break;
            case "c": break;
            default: return;
        }
        let len = 0;
        PauseBtns.forEach(btn => {
            if (btn.style.display !== "none")
                len++;
        });
        switch (event.key) {
            case "ArrowLeft":
                PauseMenuSel = Utils.OverflowOperate(PauseMenuSel, -1, 0, len - 1);
                return focusButton();
            case "ArrowRight":
                PauseMenuSel = Utils.OverflowOperate(PauseMenuSel, 1, 0, len - 1);
                return focusButton();
            case "z":
            case "c":
                document.activeElement?.click();
                return;
            case " ":
            case "Escape":
                if (!Game.Running)
                    return;
                break;
            default: return;
        }
    }
    if (Game.Paused && event.key !== "Escape")
        return;
    switch (event.key) {
        // case " ":
        //     Game.CurrentBlock = Game.RandomBlock();
        //     Game.CurrentBlock.Draw();
        //     break;
        // case "Enter":
        //     Game.CurrentBlock?.Stamp();
        //     break;
        case "ArrowLeft":
            Game.CurrentBlock?.Move(-1, 0);
            break;
        case "ArrowRight":
            Game.CurrentBlock?.Move(1, 0);
            break;
        case "ArrowDown":
            Game.CurrentBlock?.Move(0, 1);
            break;
        case "ArrowUp":
            Game.CurrentBlock?.Rotate();
            break;
        case "z":
            Game.CurrentBlock?.Rotate(true);
            break;
        case " ":
            Game.CurrentBlock?.InstantDrop();
            break;
        case "Enter":
        case "Escape":
            Game.TogglePause();
            break;
        default: return console.log(event.key);
    }
    event.preventDefault();
}, true);
Game.DrawGrid();
Game.NewGame();
// Game.StartGame();
document.getElementById("pause-resume")?.addEventListener("click", () => {
    if (!Game.Running) {
        Game.StartGame();
        return;
    }
    Game.TogglePause(false);
});
document.getElementById("pause-restart")?.addEventListener("click", () => {
    Game.Reset();
    Game.StartGame();
});
document.getElementById("pause-mods")?.addEventListener("click", () => {
    document.getElementById("mods")?.classList.add("active");
});
document.getElementById("mods-back")?.addEventListener("click", () => {
    document.getElementById("mods")?.classList.remove("active");
});
document.getElementById("pause-settings")?.addEventListener("click", () => {
    document.getElementById("settings")?.classList.add("active");
});
document.getElementById("settings-back")?.addEventListener("click", () => {
    document.getElementById("settings")?.classList.remove("active");
});
export default { Enum, Game, Color, BlockData, Block, BlockInstance };
