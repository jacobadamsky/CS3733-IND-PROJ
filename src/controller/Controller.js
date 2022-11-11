
import { Coordinate, Cell, Key } from '../model/Model.js'
import { redrawCanvas } from '../boundary/Boundary.js'

export function tryKey(model, canvasRef) {
    let coord = model.ninjapos
    if (model.puzzle.cells[coord.x][coord.y].type == 3) {
        if (model.puzzle.key != null) {
            let temp = model.puzzle.key.color
            model.puzzle.key = new Key(model.puzzle.cells[coord.x][coord.y].color)
            model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, temp, 3)
            model.moves += 1
        }
        else {
            model.puzzle.key = new Key(model.puzzle.cells[coord.x][coord.y].color)
            model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, 'gray', 0)
            model.moves += 1
        }
    }
    redrawCanvas(model, canvasRef.current);
}

export function tryMove(num, model, canvasRef) {
    if (model.puzzle.doors == model.doorsDone) {
        return;
    }
    let coord = new Coordinate(0, 0)
    switch (num) {
        case 1: //W
            coord = new Coordinate(model.ninjapos.x - 1, model.ninjapos.y)
            if (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2) {
                break;
            }
            if (model.puzzle.cells[coord.x][coord.y].type == 1) {
                if (model.puzzle.key == null) {
                    break
                }
                else if (model.puzzle.key.color == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, 'gray', 0);
                    model.puzzle.key = null
                    model.doorsDone += 1
                }
                else {
                    break;
                }
            }
            model.moves += 1
            model.ninjapos = coord
            redrawCanvas(model, canvasRef.current);
            break;
        case 2: //A
            coord = new Coordinate(model.ninjapos.x, model.ninjapos.y - 1)
            if (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2) {
                break;
            }
            if (model.puzzle.cells[coord.x][coord.y].type == 1) {

                if (model.puzzle.key == null) {
                    break
                }
                else if (model.puzzle.key.color == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, 'gray', 0);
                    model.puzzle.key = null
                    model.doorsDone += 1
                }
                else {
                    break;
                }
            }
            model.moves += 1
            model.ninjapos = coord
            redrawCanvas(model, canvasRef.current);
            break;
        case 3: //S
            coord = new Coordinate(model.ninjapos.x + 1, model.ninjapos.y)
            if (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2) {
                break;
            }
            if (model.puzzle.cells[coord.x][coord.y].type == 1) {

                if (model.puzzle.key == null) {
                    break
                }
                else if (model.puzzle.key.color == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, 'gray', 0);
                    model.puzzle.key = null
                    model.doorsDone += 1
                }
                else {
                    break;
                }
            }
            model.moves += 1
            model.ninjapos = coord
            redrawCanvas(model, canvasRef.current);
            break;
        case 4: //D
            coord = new Coordinate(model.ninjapos.x, model.ninjapos.y + 1)
            if (coord.x < 0 || coord.y < 0 || coord.x >= model.puzzle.nr || coord.y >= model.puzzle.nc || model.puzzle.cells[coord.x][coord.y].type == 2) {
                break;
            }
            if (model.puzzle.cells[coord.x][coord.y].type == 1) {
                if (model.puzzle.key == null) {
                    break
                }
                else if (model.puzzle.key.color == model.puzzle.cells[coord.x][coord.y].color) {
                    model.puzzle.cells[coord.x][coord.y] = new Cell(coord.x, coord.y, 'gray', 0);
                    model.puzzle.key = null
                    model.doorsDone += 1
                }
                else {
                    break;
                }
            }
            model.moves += 1
            model.ninjapos = coord
            redrawCanvas(model, canvasRef.current);
            break;
        default:
            break;
    }
}
