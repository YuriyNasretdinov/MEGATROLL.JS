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
		
		this.ctx.fillStyle = "red";
		this.ctx.strokeStyle = "black";
	},

	circle: function( x0, y0, z0, r ) {
		this.ctx.beginPath();
		this.ctx.arc( x0, (this.canvas.height - y0), r, 0, 2*Math.PI, false );
		this.ctx.fill();
	},

	plane: function( A, B, C, D ) {
		this.ctx.beginPath();
		this.ctx.moveTo( 0, (this.canvas.height - D/B) );
		this.ctx.lineTo( this.canvas.width, this.canvas.height - ( D - A*this.canvas.width )/B );
		this.ctx.closePath();
		this.ctx.stroke();
	},

	clear: function() {
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
	}
}