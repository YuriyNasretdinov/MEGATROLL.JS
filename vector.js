function sqr( x ) {
	return x*x;
}

function vecadd( v1, v2 ) {
	return [ v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2] ];
}

function vecsub( v1, v2 ) {
	return [ v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2] ];
}

function vecscale( v, c ) {
	return [ v[0]*c, v[1]*c, v[2]*c ];
}

function vecsmul( v1, v2 ) {
	return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
}

function vecvmul( v1, v2 ) {
	x = v1[1]*v2[2] - v1[2]*v2[1];
	y = v1[2]*v2[0] - v1[0]*v2[2];
	z = v1[0]*v2[1] - v1[1]*v2[0];
	return [ x, y, z ];
}

function vecabs( v ) {
	return Math.sqrt( sqr(v[0]) + sqr(v[1]) + sqr(v[2]) );
}