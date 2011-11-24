var Canvas = function( obj ) {
	this.__construct( obj );
}

Canvas.prototype = {
	__construct: function( obj ) {
		if ( typeof obj == 'string' )
			this.canvas = document.getElementById( obj );
		else
			this.canvas = obj;

		if ( this.canvas.getContext ) {
			this.ctx = this.canvas.getContext('2d');
		} else {
			throw new Error('WTF!?');
		}
	},

	circle: function( x0, y0, z0, r ) {
		this.ctx.beginPath();
		this.ctx.arc( x0, y0, r, 0, 2*Math.PI, false );
		this.ctx.fill();
	}
}