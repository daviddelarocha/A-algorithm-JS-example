//constantes et variables globales
const canvas_width = 800, canvas_height = 600, node_size = 50;
const n_columns = canvas_width/node_size, n_rows = canvas_height/node_size;
var nodes = new Array(n_columns);
var openList = new Array(), closedList = new Array();
var currentNode, destinationNode;
//fonctions utiles
function minF(L) {
    let i = 0, min;
    min = L[0];
    while (i < L.length) {
        if (L[i].f < min.f) {
            min = L[i];
        }
    }
    return min;
}
//drawing loop
function setup() {   
    //variables
    let i, j, x, y; 
    //initial draw
    createCanvas(canvas_width, canvas_height);
    background(100);
    fill(255);
    stroke(0);
    //initialisation des nodes
    x = 0; y = 0;
    for (i = 0; i < n_columns; i++) {
        nodes[i] = new Array(n_columns);
        for (j = 0; j < n_rows; j++) {
            nodes[i][j] = 
                new Node(i, j, false, Infinity, Math.abs(i - (n_columns - 1)) + Math.abs(j - (n_rows - 1)), Infinity);
            square(x, y, node_size);
            y += node_size;
        }
        y = 0;
        x += node_size;
    }
    //initialisation de l'algorithme A*
    nodes[0][0].g = 0;
    nodes[0][0].f = nodes[0][0].h;
    openList.push(nodes[0][0]);
    destinationNode = nodes[n_columns - 1][n_rows - 1];
    fill(200, 50, 50);
    square(destinationNode.x * node_size, destinationNode.y * node_size, node_size);
}

function draw() {
    //algorithme A*
    if (openList.length > 1) {
        currentNode = nodes[0][0];
        if (currentNode == destinationNode) {
            openList.length = 0;
            alert("We've reached it!");
        } else {
            openList.filter(item => item !== currentNode);
            let i, j;
            for (i = currentNode.x - 1; i <= (currentNode.x + 1); i += 1) {
                for (j = currentNode.y - 1; j <= (currentNode.y + 1); j += 2) {
                    if(i > 0 && i < n_columns && j > 0 && j < n_rows) {
                        let voisin = nodes[i][j];
                        if(voisin != currentNode) {
                            let tentative_g = 
                                currentNode.g + (Math.abs(currentNode.x - i) + Math.abs(currentNode.y - j));
                            if (tentative_g < voisin.g) {
                                voisin.g = tentative_g;
                                voisin.f = voisin.g + voisin.h;
                                if (!openList.includes(voisin)) {
                                    openList.push(voisin);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //draw
    fill(50, 50, 200);
    square(currentNode.x * node_size, currentNode.y * node_size, node_size);
}