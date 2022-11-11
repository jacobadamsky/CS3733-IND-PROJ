import React from 'react';
import { level1, level2, level3 } from './model/Levels.js'
import { redrawCanvas } from './boundary/Boundary.js'
import { Model, Coordinate } from './model/Model.js'
import { tryMove, tryKey } from './controller/Controller.js'

export let pickup = false

export function setPickup(val) {
    pickup = val;
}
const upbutton = {
    position: "absolute",
    left: 950,
    top: 80,
    width: 40,
}

const leftbutton = {
    position: "absolute",
    left: 900,
    top: 120,
    width: 40,
}

const downbutton = {
    position: "absolute",
    left: 950,
    top: 120,
    width: 40,
}

const rightbutton = {
    position: "absolute",
    left: 1000,
    top: 120,
    width: 40,
}

const pickupkey = {
    position: "absolute",
    left: 900,
    top: 160,
    width: 140,
}

const selLevel1 = {
    position: "absolute",
    left: 870,
    top: 280,
    width: 60,
}

const selLevel2 = {
    position: "absolute",
    left: 940,
    top: 280,
    width: 60,
}

const selLevel3 = {
    position: "absolute",
    left: 1010,
    top: 280,
    width: 60,
}

const reset = {
    position: "absolute",
    left: 940,
    top: 320,
    width: 60,
}
let defaultState1 = true, defaultState2 = false, defaultState3 = false
let w = false, a = false, s = false, d = false

function App() {
    const [model, setModel] = React.useState(new Model(level1, 1));
    const [redraw, forceRedraw] = React.useState(0);
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
        redrawCanvas(model, canvasRef.current)
    }, [model, redraw])

    let sl1onclick = function () {
        if (model.levelNum == 1) {
            return;
        }
        defaultState1 = true
        defaultState2 = false
        defaultState3 = false
        setModel(new Model(level1, 1))
    }
    let sl2onclick = function () {
        if (model.levelNum == 2) {
            return;
        }
        defaultState1 = false
        defaultState2 = true
        defaultState3 = false
        setModel(new Model(level2, 2))
    }

    let sl3onclick = function () {
        if (model.levelNum == 3) {
            return;
        }
        defaultState1 = false
        defaultState2 = false
        defaultState3 = true
        setModel(new Model(level3, 3))
    }
    return (
        <main>
            <canvas tabIndex="1"
                className="App-canvas"
                ref={canvasRef}
                width="1200"
                height="800" />
            <button id="w" style={upbutton} disabled={w} onClick={() => tryMove(1, model, canvasRef)}>W</button>
            <button id="a" style={leftbutton} disabled={a} onClick={() => tryMove(2, model, canvasRef)}>A</button>
            <button id="s" style={downbutton} disabled={s} onClick={() => tryMove(3, model, canvasRef)}>S</button>
            <button id="d" style={rightbutton} disabled={d} onClick={() => tryMove(4, model, canvasRef)}>D</button>
            <button id="pickkey" style={pickupkey} disabled={pickup} onClick={() => tryKey(model, canvasRef)} >Pick up key</button>
            <button id="level1" style={selLevel1} disabled={defaultState1} onClick={() => sl1onclick()}>Level 1</button>
            <button id="level2" style={selLevel2} disabled={defaultState2} onClick={() => sl2onclick()}>Level 2</button>
            <button id="level3" style={selLevel3} disabled={defaultState3} onClick={() => sl3onclick()}>Level 3</button>
            <button id="reset" style={reset} onClick={() => setModel(new Model(model.level, model.levelNum))}>Reset</button>
        </main>
    );
}

export default App;