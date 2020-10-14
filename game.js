function init() {
    myTime = null;

    lamb = document.getElementById("lamb");
    wolf = document.getElementById("wolf");

    lamb_place = document.getElementById("lamb_place");
    wolf_place = document.getElementById("wolf_place");

    board = document.getElementById("board");
    boardHeight = board.offsetHeight;;
    boardWidth = board.offsetWidth;;


    X_MAX = board.offsetLeft + boardWidth;
    X_MIN = board.offsetLeft;
    Y_MIN = board.offsetTop + 0.1 * boardHeight;
    Y_MAX = board.offsetTop + 0.9 * boardHeight;

    Lamb_X_STEP = 100;
    Lamb_Y_STEP = 1;
    Wolf_X_STEP = 2;
    Wolf_Y_STEP = 1;

    Lamb_Direction = 1;
    Wolf_Direction = 1;

    Lamb_Move = 0;
    Wolf_Move = 1;


    KEYUP = 38;
    KEYDOWN = 40;
    KEYLEFT = 37;
    KEYRIGHT = 39;
}

function timerUpdate() // update loop for game
{

    // change in offset for lamb and wolf
    let dy_lamb = 0;
    let dx_lamb = Lamb_Direction * Lamb_Move * Lamb_X_STEP;
    let dy_wolf = 0;
    let dx_wolf = Wolf_Direction * Wolf_Move * Wolf_X_STEP;

    //wait for next key press to move lamb
    Lamb_Move = 0;

    setNewPosition(lamb, dx_lamb, dy_lamb);
    setNewPosition(wolf, dx_wolf, dy_wolf);


    myTime = setTimeout('timerUpdate()', 10);
    /*
        document.getElementById("wolf_x_position").innerHTML = "Wolf: " + x_wolf;
        document.getElementById("lamb_x_position").innerHTML = "Lamb: " + x_lamb;
        */
}

// when key is pressed  (user input)
function keyDownHandler(e) {
    Lamb_Move = 1;

    if (e.keyCode == KEYRIGHT) {
        Lamb_Direction = 1;
    } // right key
    if (e.keyCode == KEYLEFT) {
        Lamb_Direction = -1;
    } // left key
    /*
    if (e.keyCode == KEYUP && y_velocity < -70) {
        y_velocity = 70;
    } // up key
    */
};

function restart() {
    //init directions and mouvement
    Lamb_Direction = 1;
    Wolf_Direction = 1;

    Lamb_Move = 0;
    Wolf_Move = 1;


    clearTimeout(myTime);


    //calculate initial lamb and wolf position
    let Lamb_X_INIT = board.offsetLeft + 0.8 * boardWidth;
    let Lamb_Y_INIT = board.offsetTop + 0.8 * boardHeight;
    let Wolf_X_INIT = board.offsetLeft - 0.2 * boardWidth;
    let Wolf_Y_INIT = board.offsetTop + 0.8 * boardHeight;

    //set initial positions
    lamb.style.left = Lamb_X_INIT + "px";
    lamb.style.top = Lamb_Y_INIT + "px";
    wolf.style.left = Wolf_X_INIT + "px";
    wolf.style.top = Wolf_Y_INIT + "px";

    //init position display
    lamb_place.innerHTML = "...";
    wolf_place.innerHTML = "...";


    // Add an event listener to the keypress event.
    document.addEventListener("keydown", keyDownHandler, false);

    timerUpdate();
}

function setNewPosition(element, dx, dy) {

    // Get current positions
    let x_element = element.offsetLeft;
    let y_element = element.offsetTop;

    x_element = x_element + dx;
    y_element = y_element + dy;

    //keep within board
    if (x_element >= X_MAX) x_element = X_MAX;
    if (x_element <= X_MIN) x_element = X_MIN;
    if (y_element >= Y_MAX) x_element = Y_MAX;
    if (y_element <= Y_MIN) x_element = Y_MIN;
    if (x_element >= X_MAX && element == wolf) {
        Wolf_Direction = -1;

    }
    if (x_element <= X_MIN && element == wolf) {
        Wolf_Direction = 1;
    }
    if (y_element < Y_MIN) x_element = Y_MIN;
    // Store positions	
    element.style.left = x_element + "px";
    element.style.top = y_element + "px";
}