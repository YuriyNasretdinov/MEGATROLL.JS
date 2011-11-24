var Physics = function() {
	this.construct.apply(this, arguments)
}

Physics.prototype = {
	
	sphere: {
		position: [0., 0., 0.],
		velocity: [0., 0., 0.],
		radius: 1,
		mass:   1
	},

	planes: [
		// [A, B, C, D]
	],

	forces: [
		// as there is 1 sphere, the forces must be supplied
		// in form as functions of position and velocity of a single sphere

		// and also return vector


		// function( position, velocity ) { return [x,y,z] }
	],

	dt: 1./120.,

	eps: 1e-10, // epsilon (too small value for computation)

	construct: function(sphere, planes, forces, dt) {
		
		this.sphere = sphere
		this.planes = planes
		this.forces = forces

		this.dt = dt
	},

	computeNextTick: function() {
		
		var sphere = this.sphere,
		    planes = this.planes,
		    R      = sphere.radius,
		    x      = sphere.position,
		    v      = sphere.velocity
		
		var newCoords = this._integrate(),
		    x_     = newCoords.position,
		    v_     = newCoords.velocity
		
		if( veceq(x, x_) ) return

		var intersections = []

		for(var i = 0; i < planes.length; i++ ) {
			
			var info = this._checkPlaneSphereIntersection(planes[i], R, x, v, x_, v_)

			if(info !== false) {
				intersections.push(info)
			}

		}


		if(!intersections.length) {
			
			sphere.position = x_
			sphere.velocity = v_
			return

		} else {
			
			throw new Error('Needs to be implemeted')

		}

	},


	_getForce: function(position, velocity) {
		
		var f = [0.,0.,0.], forces = this.forces

		for(var i = 0; i < forces.length; i++) {
			
			f = vecadd(f, forces[i](position, velocity))

		}

		return f
	},

	// return next position and velocity of a sphere
	_integrate: function() {
		
		var sphere = this.sphere,
		    m      = sphere.mass,
		    x      = sphere.position,
		    v      = sphere.velocity,
		    dt     = this.dt
		
		// compute a(t)

		var
			f = this._getForce(x, v)
			a = vecscale(f, 1/m)
		
		// compute v12 = v(t + dt/2) = v(t) + a(t) * dt/2
		var v12 = vecadd( v, vecscale(a, dt/2) )
		// calculate x_ = x(t + dt) = x(t) + v(t + dt/2) dt
		var x_ = vecadd( x, vecscale(v12, dt) )
		// calculate F(x(t+dt), v(t+dt/2))
		var f_ = this._getForce(x_, v12),
		    a_ = vecscale(f, 1/m)
		// calculate v(t + dt) = v(t + dt/2) + a(t + dt) * dt/2
		var v_ = v12 + vecscale(a_, dt/2)

		return {
			position: x_,
			velocity: v_
		}
	},

	_checkPlaneSphereIntersection: function(plane, R, x, v, x_, v_) {
		
		var A = plane[0],
		    B = plane[1],
		    C = plane[2],
		    D = plane[3]
		
		// plane normal vector
		var n  = [A,B,C],
		    dx = vecsub(x_, x)

		if( vecsmul(dx, n) > 0 ) n = vecscale(n, -1)

		var dx_len = vecabs(dx),
		    n_len  = vecabs(n)

		// check intersection between x and x_ + r

		// r = ( R / cos(alp) ) * dx / |dx|

		var cosalp = Math.abs(vecsmul(dx, n) / dx_len / n_len)

		if(cosalp < this.eps) return false

		var r = vecscale( dx, R / cosalp / dx_len )

		var a = x,
		    b = vecadd(x_, r),
		    a_n = vecsmul(a,n),
		    b_n = vecsmul(b,n)

		var sign_a = a_n - D > 0 ? 1 : -1,
		    sign_b = b_n - D > 0 ? 1 : -1
		
		if(sign_a == sign_b) return false

		// point of intersection of [a,b] with plane
		var r0 = vecadd( a, vecscale( vecsub(b,a), (D - a_n) / (b_n - a_n) ) ),
		// center of sphere lying on the plane
		    o = vecsub(r0, r),
		    oa = vecsub(a, o)

		// mirrored vector by n
		var n1 = vecvmul( vecvmul(oa, n), n ),
		if( vecsmul(oa, n1) < 0 ) n1 = vecscale(n1, -1)

		var sinalp = Math.sqrt( 1 - cosalp * cosalp ),
		    c = vecsub(oa, vecscale( n1, 2*vecabs(oa)*sinalp/vecabs(n1) ) )
		
		var new_v = vecadd( v, vecscale( vecsub(v_ - v), vecabs( vecsub(x, o) ) / dx_len ) )

		return {
			position: o,
			velocity: vecscale( c, vecabs(new_v) / vecabs(c) )
		}
	}


}