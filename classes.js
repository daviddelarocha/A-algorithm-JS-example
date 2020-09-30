// Classes init
class Node {
    constructor(x, y, obstacle, g, h, f, pere) {
        this.x = x;
        this.y = y;
        this.obstacle = obstacle;
        this.g = g;
        this.h = h;
        this.f = f;
        this.pere = pere;
    }
}