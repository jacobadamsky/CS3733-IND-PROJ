
import { setPickup } from '../App.js'
import { Coordinate } from '../model/Model'

var BOXSIZE = 100;
const OFFSET = 8;

export class Square {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE * cell.column + OFFSET, BOXSIZE * cell.row + OFFSET, BOXSIZE - 2 * OFFSET, BOXSIZE - 2 * OFFSET)
}

export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    ctx.font = '30px serif'
    ctx.fillStyle = 'black'
    ctx.fillText(model.moves, 960, 380)
    ctx.fillText("Level " + model.levelNum, 925, 50)

    let nr = model.puzzle.nr
    let nc = model.puzzle.nc

    document.getElementById("pickkey").disabled = (model.puzzle.cells[model.ninjapos.x][model.ninjapos.y].type == 3) ? false : true
    let coord = new Coordinate(model.ninjapos.x - 1, model.ninjapos.y)
    document.getElementById("w").disabled = (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2 || (model.puzzle.key == null && model.puzzle.cells[coord.x][coord.y].type == 1) || (model.puzzle.key != null && model.puzzle.cells[coord.x][coord.y].type == 1 && (model.puzzle.cells[coord.x][coord.y].color != model.puzzle.key.color))) ? true : false
    coord = new Coordinate(model.ninjapos.x, model.ninjapos.y - 1)
    document.getElementById("a").disabled = (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2 || (model.puzzle.key == null && model.puzzle.cells[coord.x][coord.y].type == 1) || (model.puzzle.key != null && model.puzzle.cells[coord.x][coord.y].type == 1 && (model.puzzle.cells[coord.x][coord.y].color != model.puzzle.key.color))) ? true : false
    coord = new Coordinate(model.ninjapos.x + 1, model.ninjapos.y)
    document.getElementById("s").disabled = (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2 || (model.puzzle.key == null && model.puzzle.cells[coord.x][coord.y].type == 1) || (model.puzzle.key != null && model.puzzle.cells[coord.x][coord.y].type == 1 && (model.puzzle.cells[coord.x][coord.y].color != model.puzzle.key.color))) ? true : false
    coord = new Coordinate(model.ninjapos.x, model.ninjapos.y + 1)
    document.getElementById("d").disabled = (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2 || (model.puzzle.key == null && model.puzzle.cells[coord.x][coord.y].type == 1) || (model.puzzle.key != null && model.puzzle.cells[coord.x][coord.y].type == 1 && (model.puzzle.cells[coord.x][coord.y].color != model.puzzle.key.color))) ? true : false

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)
            switch (cell.type) {
                case 0:
                    ctx.fillStyle = 'gray'
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    continue;
                case 1:
                    ctx.fillStyle = cell.color
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    ctx.fillStyle = 'white'
                    ctx.beginPath()
                    ctx.rect(sq.x + sq.size * .25, sq.y + sq.size * .25, sq.size * .5, sq.size * .5)
                    ctx.fill()
                    ctx.stroke()
                    continue;
                case 2:
                    ctx.fillStyle = 'black'
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    continue;
                case 3:
                    ctx.fillStyle = 'gray'
                    ctx.beginPath()
                    ctx.rect(sq.x, sq.y, sq.size, sq.size)
                    ctx.fill()
                    ctx.stroke()
                    ctx.fillStyle = cell.color
                    ctx.beginPath()
                    ctx.rect(sq.x + sq.size * .25, sq.y + sq.size * .25, sq.size * .5, sq.size * .5)
                    ctx.fill()
                    ctx.stroke()
                    continue;
                default:
                    continue;
            }
        }
    }
    let cell1 = model.puzzle.cells[model.ninjapos.x][model.ninjapos.y]
    let sq1 = computeSquare(cell1)
    ctx.fillStyle = 'purple'
    ctx.beginPath()
    ctx.rect(2 * OFFSET * (model.ninjapos.y) + OFFSET + model.ninjapos.y * sq1.size, BOXSIZE * model.ninjapos.x + OFFSET, sq1.size, sq1.size)
    ctx.fill()
    ctx.stroke()

    if (model.puzzle.key != null) {
        ctx.fillStyle = model.puzzle.key.color
        ctx.beginPath()
        ctx.rect(2 * OFFSET * (model.ninjapos.y) + OFFSET + 10 + model.ninjapos.y * sq1.size, BOXSIZE * model.ninjapos.x + OFFSET + 10, sq1.size - 60, sq1.size - 60)
        ctx.fill()
        ctx.stroke()
    }

    if (model.puzzle.doors == model.doorsDone) {
        if (nc % 2 == 1) {
            ctx.fillStyle = 'purple'
            ctx.rect(15 + 50 * nc / 2, OFFSET * 2 * nr + BOXSIZE * nr - 30, 220, 40)
            ctx.fill()
            ctx.stroke();
            ctx.fillStyle = 'black'
            ctx.fillText("Level Complete!", 25 + 50 * nc / 2, OFFSET * 2 * nr + BOXSIZE * nr, 200)
        }
        else {
            ctx.fillStyle = 'purple'
            ctx.rect(-10 + 50 * nc / 2, OFFSET * 2 * nr + BOXSIZE * nr - 30, 220, 40)
            ctx.fill()
            ctx.fillStyle = 'black'
            ctx.fillText("Level Complete!", 50 * nc / 2, OFFSET * 2 * nr + BOXSIZE * nr, 200)
            ctx.stroke()
        }
    }
}
