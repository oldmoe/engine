var Map = Class.create({

    tileW : 64,
    tileH : 37,
    // meaningless initial values
    width : 15,
    height : 30,
    layers : 1,
    tan30 : 0.577350269,
    cos30:  0.866025404,
    sin30: 0.5,
    grid : [],
    neighborsEven : {
        N: [-2,0],
        S: [2,0],
        E: [0,1],
        W: [0,-1],
        NE: [-1,0],
        NW: [-1,-1],
        SE: [1,0],
        SW: [1,-1]
    },
    neighborsOdd : {
        N: [-2,0],
        S: [2,0],
        E: [0,1],
        W: [0,-1],
        NE: [-1,1],
        NW: [-1,0],
        SE: [1,1],
        SW: [1,0]
    },
    rangeCycle : ['SE', 'SW', 'NW', 'NE'],
    neighbors : [],

    initialize : function(data) {
        // build lookup table for gridY corrections
        this.buildGridYCorrectionsTable();
        // init canvas and set proper listeners
        this.values = data.values;
        this.entries = data.entry;
        this.height = data.values.length;
        this.width = data.values[0].length;
        this.layers = data.values[0][0].length;
        for (var i = 0; i < this.height; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.width; j++) {
                this.grid[i][j] = [];
                for (var z = 0; z < this.layers; z++) {
                    this.grid[i][j][z] = [];
                }
            }
        }
        this.x = 0;
        this.y = 0;
        this.neighbors[0] = this.neighborsEven;
        this.neighbors[1] = this.neighborsOdd;
    },

    buildGridYCorrectionsTable : function() {
        var ry, rx;
        this.gridYCorrections = {};
        for (var x = 0; x <= this.tileW; x += 4) {
            this.gridYCorrections[x] = {};
            for (var y = 0;  y <= this.tileH; y +=4) {
                if (x <= this.tileW/2 && y <= this.tileH/2) {
                    rx = x;
                    ry = this.tileH/2 - y;
                    this.gridYCorrections[x][y] = (ry/rx > this.tan30) ? (0) : (1);
                } else if (x > this.tileW/2 && y <= this.tileH/2) {
                    rx = this.tileW - x;
                    ry = this.tileH/2 - y;
                    this.gridYCorrections[x][y] = (ry/rx > this.tan30) ? (0) : (1);
                } else if (x <= this.tileW/2 && y > this.tileH/2) {
                    rx = this.tileW/2 - x;
                    ry = this.tileH - y;
                    this.gridYCorrections[x][y] = (ry/rx > this.tan30) ? (1) : (2);
                } else if (x > this.tileW/2 && y > this.tileH/2) {
                    rx = x - this.tileW/2;
                    ry = this.tileH - y;
                    this.gridYCorrections[x][y] = (ry/rx > this.tan30) ? (1) : (2);
                }
            }
            // workaround for the missing pixel
            this.gridYCorrections[x][y] = this.gridYCorrections[x][y-4];
        }
    },

    locateTileBounds : function(gridX, gridY) {
        var x, y;
        if (gridY % 2 == 0)
            x = (gridX-0.5) * this.tileW;
        else
            x = gridX * this.tileW;
        y = ((gridY/2)-0.5) * this.tileH;
        // top => top-left corner
        // bottom => bottom-right corner
        // NW, NE, SE and SW are centerpoints on tile borders
        var qrtW = this.tileW / 4;
        var qrtH = Math.ceil(this.tileH / 4);
        var bounds = {
            topX: x,
            topY: y,
            bottomX: x + this.tileW,
            bottomY: y + this.tileH
        };
        bounds.NW = {
            x: x + qrtW,
            y: y + qrtH
        };
        bounds.NE = {
            x: bounds.bottomX - qrtW,
            y: y + qrtH
        };
        bounds.SE = {
            x: bounds.bottomX - qrtW,
            y: bounds.bottomY - qrtH
        };
        bounds.SW = {
            x: x + qrtW,
            y: bounds.bottomY - qrtH
        };
        return bounds;
    },

    getGridYCorrection : function(x, y) {
        x = Math.round(x/4) * 4;
        y = Math.round(y/4) * 4;
        if (this.gridYCorrections[x]) {
            return this.gridYCorrections[x][y];
        } else {
            return null;
        }
    },

    findTile : function(x, y) {
        var gridX, gridY, remX, remY;
        gridY = Math.floor(y/this.tileH);
        remX = x % this.tileW;
        remY = y % this.tileH;
        var correction = this.getGridYCorrection(remX, remY);
        if (correction == null)
            return null;
        gridY = gridY*2 + correction;
        if (gridY % 2 == 0) {
            gridX = Math.floor((x/this.tileW) + 0.5);
        } else {
            gridX = Math.floor(x/this.tileW);
        }
        return [gridX, gridY];
    },

    tileValue : function(gridX, gridY, z) {
        if (this.values[gridY] && this.values[gridY][gridX]) {
            return this.values[gridY][gridX][z];
        }
        return -111;
    },

    /* iterates all tiles in give range in a clock-wise cycle going outward.
     * starts at the North tile, then going SE -> SW -> NW -> NE back to N
     * */
    neighborUnits : function(gridX, gridY, range, layers) {
        var origin = [gridY, gridX];
        var currentY = Math.abs(origin[0]);
        var current = origin.clone();
        var units = [], nextDir = null;
        for (var r = 1; r <= range; ++r) {
            var tiles = r * 8;
            current[0] += this.neighbors[currentY % 2].N[0];
            current[1] += this.neighbors[currentY % 2].N[1];
            for (var t = 0; t < tiles; ++t) {
                currentY = Math.abs(current[0]);
                nextDir = this.rangeCycle[Math.floor(t/(r*2))];
                if (this.neighbors[currentY % 2]) {
                    current[0] += this.neighbors[currentY % 2][nextDir][0];
                    current[1] += this.neighbors[currentY % 2][nextDir][1];
                    for (var z = 0; z < layers.length; ++z) {
                        if (this.grid[current[0]] && this.grid[current[0]][current[1]] && this.grid[current[0]][current[1]][layers[z]].length > 0)
                            units = units.concat(this.grid[current[0]][current[1]][layers[z]]);
                    }
                }
            }
            currentY = Math.abs(current[0]);
        }
        return units;
    }
    
});