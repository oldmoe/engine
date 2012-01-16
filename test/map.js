var Map = Class.create({

    tileW: 64,
    tileH: 31,
    width: 15,
    height: 30,
    tan30: 0.577350269,

    initialize: function(data) {
        // build lookup table for gridY corrections
        this.buildGridYCorrectionsTable();
        // init canvas and set proper listeners
        this.values = data.values;
        this.entry = data.entry;
    },

    buildGridYCorrectionsTable: function() {
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

    locateTileBounds: function(gridX, gridY) {
        var x, y;
        if (gridY % 2 == 0)
            x = (gridX-0.5) * this.tileW;
        else
            x = gridX * this.tileW;
        y = ((gridY/2)-0.5) * this.tileH;
        // top => top-left corner
        // bottom => bottom-right corner
        return {
            'topX': x,
            'topY': y,
            'bottomX': x + this.tileW,
            'bottomY': y + this.tileH
        };
    },

    getGridYCorrection: function(x, y) {
        x = Math.round(x/4) * 4;
        y = Math.round(y/4) * 4;
        return this.gridYCorrections[x][y];
    },

    findTile: function(x, y) {
        var gridX, gridY, remX, remY;
        gridY = Math.floor(y/this.tileH);
        remX = x % this.tileW;
        remY = y % this.tileH;
        var correction = this.getGridYCorrection(remX, remY);
        gridY = gridY*2 + correction;
        if (gridY % 2 == 0) {
            gridX = Math.floor((x/this.tileW) + 0.5);
        } else {
            gridX = Math.floor(x/this.tileW);
        }
        return [gridX, gridY];
    },
    
});