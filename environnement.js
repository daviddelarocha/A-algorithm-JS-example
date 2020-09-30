//constantes et variables globales
const canvas_width = 800, canvas_height = 600, node_size = 25;
const n_columns = canvas_width/node_size, n_rows = canvas_height/node_size;
var nodes = new Array(n_columns);
var openList = new Array(), closedList = new Array();
var currentNode, destinationNode;
//fonctions utiles
function obstacles() {
    let i = 0, n = (int)(n_columns * n_rows)/5, x, y;
    while (i < n) {
        x = Math.floor(Math.random() * (n_columns - 2)) + 1;
        y = Math.floor(Math.random() * (n_rows - 2)) + 1;
        nodes[x][y].obstacles = true;
        fill(10, 10, 10);
        square(x * node_size, y * node_size, node_size);
        i++;
    }
}
function minF(L) {
    let i = 0, min;
    min = L[0];
    while (i < L.length) {
        if (L[i].f < min.f) {
            min = L[i];
        }
        i++;
    }
    return min;
}
//drawing loop
function setup() {   
    //variables
    let i, j; 
    //initial draw
    createCanvas(canvas_width, canvas_height);
    background(100);
    fill(255);
    stroke(0);
    //initialisation des nodes
    for (i = 0; i < n_columns; i++) {
        nodes[i] = new Array(n_columns);
        for (j = 0; j < n_rows; j++) {
            nodes[i][j] = new Node(i, j, false, Infinity, 
                Math.sqrt(Math.pow(i - (n_columns - 1), 2) + Math.pow(j - (n_rows - 1), 2)), 
                Infinity, null);
            square(i * node_size, j * node_size, node_size);
        }
    }
    obstacles();
    //initialisation de l'algorithme A*
    nodes[0][0].g = 0;
    nodes[0][0].f = nodes[0][0].h;
    openList.push(nodes[0][0]);
    destinationNode = nodes[n_columns - 1][n_rows - 1];
    fill(200, 50, 50);
    square(destinationNode.x * node_size, destinationNode.y * node_size, node_size);
}

function draw() {
    let i, j;
    //algorithme A*
    if (openList.length > 0) {
        currentNode = minF(openList);
        if (currentNode == destinationNode) {
            openList.length = 0;
        } else {
            openList.splice(openList.indexOf(currentNode), 1);
            for (i = currentNode.x - 1; i <= (currentNode.x + 1); i += 1) {
                for (j = currentNode.y - 1; j <= (currentNode.y + 1); j += 2) {
                    if(i >= 0 && i < n_columns && j >= 0 && j < n_rows) {
                        let voisin = nodes[i][j];
                        if(voisin != currentNode) {
                            let tentative_g = currentNode.g 
                                + Math.sqrt(Math.pow(currentNode.x - i, 2) + Math.pow(currentNode.y - j, 2));
                            if (tentative_g < voisin.g) {
                                closedList.push(currentNode);
                                voisin.pere = currentNode;
                                console.log(voisin.pere, voisin);
                                voisin.g = tentative_g;
                                voisin.f = voisin.g + voisin.h;
                                if (!openList.includes(voisin) && !voisin.obstacles) {
                                    openList.push(voisin);
                                }
                            }
                        }
                    }
                }
            }
        }
        fill(254, 219, 103);
        i = 0;
        while (i < closedList.length) {
            square(closedList[i].x * node_size, closedList[i].y * node_size, node_size);
            i++;
        }
        fill(200, 50, 50);
        square(nodes[0][0].x * node_size, nodes[0][0].y * node_size, node_size);
        square(destinationNode.x * node_size, destinationNode.y * node_size, node_size);
        fill(224, 189, 73);
        square(currentNode.x * node_size, currentNode.y * node_size, node_size);
    } else {
        fill(50, 200, 50);
        let comeFrom = currentNode.pere;
        while (comeFrom != null) {
            square(comeFrom.x * node_size, comeFrom.y * node_size, node_size);
            comeFrom = comeFrom.pere;
        }
        fill(200, 50, 50);
        square(nodes[0][0].x * node_size, nodes[0][0].y * node_size, node_size);
        square(destinationNode.x * node_size, destinationNode.y * node_size, node_size);
    }
    //draw
}
