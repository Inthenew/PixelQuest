var Rect = function (top, left, width, height) {
    this.top = top || 0;
    this.left = left || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
};

Rect.prototype = {
    set: function (top, left, width, height) {
        this.top = top || this.top;
        this.left = left || this.left;
        this.width = width || this.width;
        this.height = height || this.height;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    },

    union: function(toUnion) {
        var union = new Rect();
        union.left = Math.min(this.left, toUnion.left);
        union.top = Math.min(this.top, toUnion.top);
        union.width = Math.max(this.left + this.width, toUnion.left + toUnion.width) - union.left;
        union.height = Math.max(this.top + this.height, toUnion.top + toUnion.height) - union.top;
        return union;
    },

    intersect: function(rect) {
        var rectI = new Rect()
        rectI.left = Math.max(this.left, rect.left)
        rectI.top = Math.max(this.top, rect.top)
        rectI.right = Math.min(this.right, rect.right)
        rectI.bottom = Math.min(this.bottom, rect.bottom)
        return rectI
    }
}



var AABB = function (rect) {
    this.top = rect.top;
    this.left = rect.left;
    this.width = rect.width;
    this.height = rect.height;
    this.right = rect.right;
    this.bottom = rect.bottom;
};

AABB.prototype = {
    colliding: function (other) {
        return !(
            this.top > other.bottom ||
            this.right < other.left ||
            this.bottom < other.top ||
            this.left > other.right
        );
    },

    containing: function (other) {
        return (
            this.left <= other.left &&
            other.left < this.width &&
            this.top <= other.top &&
            other.top < this.height
        );
    },

    inside: function (other) {
        return (
            ((other.top <= this.top) && (this.top <= other.bottom)) &&
            ((other.top <= this.bottom) && (this.bottom <= other.bottom)) &&
            ((other.left <= this.left) && (this.left <= other.right)) &&
            ((other.left <= this.right) && (this.right <= other.right))
        );
    }
};
