// Classes init
class Node {
    constructor(x, y, obstacle, g, h, f) {
        this.x = x;
        this.y = y;
        this.obstacle = obstacle;
        this.g = g;
        this.h = h;
        this.f = f;
    }
}