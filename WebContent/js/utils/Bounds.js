(function() {
    mapwork.Bounds = Bounds;
    
    var EXTEND = null;
    
    function Bounds(x1, y1, x2, y2) {
        if(EXTEND) {
            EXTEND.apply(this,arguments);
        }
        this.init(x1,y1,x2,y2);
    }
        
    Bounds.prototype = {
        init: function(x1, y1, x2, y2) {
            if(x1 === undefined) {
                this.setToNull();
            } else {
                if (x1 < x2) {
                    this._minx = x1;
                    this._maxx = x2;
                } else {
                    this._minx = x2;
                    this._maxx = x1;
                }
                if (y1 < y2) {
                    this._miny = y1;
                    this._maxy = y2;
                } else {
                    this._miny = y2;
                    this._maxy = y1;
                }
            }
        },
        setToNull: function() {
            this._minx = 0;
            this._miny = 0;
            this._maxx = -1;
            this._maxy = -1;
        },
        isNull: function() {
            return this._maxx < this._minx;
        },
        getWidth: function() {
            if (this.isNull())
                return 0;
            else
                return this._maxx - this._minx;
        },
        getHeight: function() {
            if (this.isNull())
                return 0;
            else
                return this._maxy - this._miny;
        },
        getMaxX: function() {
            return this._maxx;
        },
        getMinX: function() {
            return this._minx;
        },
        getMaxY: function() {
            return this._maxy;
        },
        getMinY: function() {
            return this._miny;
        },
        getCenterX: function() {
            return (this._minx + this._maxx)/2;
        },
        getCenterY: function() {
            return (this._miny + this._maxy)/2;
        },
        expandBy: function(distanceX,distanceY) {
            if (this.isNull())
                    return;
            this._minx -= distanceX;
            this._miny -= distanceY;
            this._maxx += distanceX;
            this._maxy += distanceY;
            if (this._minx > this._maxx || this._miny > this._maxy)
                    this.setToNull();
        },
        expandToIncludePoint: function(x,y) {
            if (this.isNull()) {
                this._minx = x;
                this._miny = y;
                this._maxx = x;
                this._maxy = y;
            } else {
                if (x < this._minx)
                        this._minx = x;
                if (y < this._miny)
                        this._miny = y;
                if (x > this._maxx)
                        this._maxx = x;
                if (y > this._maxy)
                        this._maxy = y;
            }
        },
        expandToIncludeBounds: function(bounds) {
            if (this.isNull()) {
                this._minx = bounds._minx;
                this._miny = bounds._miny;
                this._maxx = bounds._maxx;
                this._maxy = bounds._maxy;
            } else {
                if (bounds._minx < this._minx)
                    this._minx = bounds._minx;
                if (bounds._miny < this._miny)
                    this._miny = bounds._miny;
                if (bounds._maxx > this._maxx)
                    this._maxx = bounds._maxx;
                if (bounds._maxy > this._maxy)
                    this._maxy = bounds._maxy;
            }
        },
        translate: function(transX,transY) {
            if(this.isNull()) {
                return;
            } else {
                this.init(this._minx + transX, this._miny + transY, this._maxx + transX,
                                this._maxy + transY);
            }
        },
        intersectBounds: function(bounds) {
                if (this.isNull() || bounds.isNull())
                        return false;
                else
                    return bounds._minx <= this._maxx && bounds._maxx >= this._minx
                            && bounds._miny <= this._maxy && bounds._maxy >= this._miny;
        },
        intersectPoint: function(x, y) {
                return x <= this._maxx && x >= this._minx && y <= this._maxy && y >= this._miny;
        },

        intersectRect: function(minX,minY,maxX,maxY) {
                return this._minx <= maxX && this._maxx >= minX
                                && this._miny <= maxY && this._maxy >= minY;
        },
        
        intersection: function(bounds) {
            if (this.isNull() || bounds.isNull() || !this.intersectsBounds(bounds)) {
                    return new mapwork.Bounds(0,0,-1,-1);//setNull
            } else {
                    var intMinX = this._minx <= bounds._minx ? bounds._minx : this._minx;
                    var intMinY = this._miny <= bounds._miny ? bounds._miny : this._miny;
                    var intMaxX = this._maxx >= bounds._maxx ? bounds._maxx : this._maxx;
                    var intMaxY = this._maxy >= bounds._maxy ? bounds._maxy : this._maxy;
                    return new mapwork.Bounds(intMinX, intMaxX, intMinY, intMaxY);
            }
        },
        overlapPoint: function(x, y) {
                return this.intersectsPoint(x, y);
        },
        overlapBounds: function(bounds) {
                return this.intersectsBounds(bounds);
        },
        containPoint: function(x,y) {
            return x >= this._minx && x <= this._maxx && y >= this._miny && y <= this._maxy;
        },
        containBounds: function(bounds) {
                if (this.isNull() || bounds.isNull())
                    return false;
                else
                    return bounds._minx >= this._minx && bounds._maxx <= this._maxx
                                    && bounds._miny >= this._miny && bounds._maxy <= this._maxy;
        },
        equals: function(bounds) {
                if (this.isNull())
                    return bounds.isNull();
                else
                    return this._maxx == bounds.getMaxX()
                                    && this._maxy == bounds.getMaxY()
                                    && this._minx == bounds.getMinX()
                                    && this._miny == bounds.getMinY();
        },
        toString: function() {
                return "Bounds:(" + this._minx + "," + this._miny + " , " + this._maxx + "," + this._maxy + ")";
        }
    }
    
    if(EXTEND){
        mapwork.utils.inherits(Bounds, EXTEND);
    }
})();