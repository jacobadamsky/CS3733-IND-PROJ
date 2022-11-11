
export class Coordinate {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    addX(val) {
        this.x += val
    }
    addY(val) {
        this.y += val
    }
}
// not using now..
export class Cell {
    constructor(r, c, color, type) {
        this.row = r
        this.column = c
        this.color = color
        this.type = type //1 is door, 2 is wall, 3 is key
    }
    getColor() {
        return this.color
    }
    setColor(color) {
        this.color = color
    }
    setType(type) {
        this.type = type
    }
}
export class Key {
    constructor(color) {
        this.color = color
    }
}

export class Puzzle {
    constructor(level) {
        let nr = level.rows
        let nc = level.columns
        let wall = level.walls
        let door = level.doors
        let key = level.keys

        this.doors = door.length
        this.nr = nr
        this.nc = nc
        this.key = null

        this.cells = []
        for (let r = 0; r < nr; r++) {
            this.cells[r] = [];
            for (let c = 0; c < nc; c++) {
                this.cells[r][c] = new Cell(r, c, 'green', 0)
            }
        }
        for (let i = 0; i < door.length; i++) {
            this.cells[door[i].row][door[i].column].setColor(door[i].color)
            this.cells[door[i].row][door[i].column].setType(1)
        }
        for (let i = 0; i < wall.length; i++) {
            this.cells[wall[i].row][wall[i].column].setColor('black')
            this.cells[wall[i].row][wall[i].column].setType(2)
        }
        for (let i = 0; i < key.length; i++) {
            this.cells[key[i].row][key[i].column].setColor(key[i].color)
            this.cells[key[i].row][key[i].column].setType(3)
        }
    }
}

// Model knows the level (you need 3). Knows the Puzzle
export class Model {
    constructor(level, num) {
        this.levelNum = num
        this.moves = 0
        this.doorsDone = 0
        this.level = level
        this.puzzle = new Puzzle(level)
        this.ninjapos = new Coordinate(level.ninjase.row, level.ninjase.column)
    }
}
