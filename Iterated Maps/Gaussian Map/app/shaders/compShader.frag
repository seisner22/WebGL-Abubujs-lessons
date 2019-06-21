#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

uniform float alpha, beta1, beta2 ;
uniform int count ;

void main() {
	vec2 x = pixPos*vec2(4.,4.) + vec2(-2.,-2.) ;
	vec2 beta = vec2(beta1, beta2) ;
	
	float iter ;
	for(int i=0 ;i<count ; i++) {
		iter = float(i) ;
		x = vec2(x.x, -alpha*exp(x.y*x.y)) + beta ;
		if( length(x) > 2.1 ){
			break ;
		}
	}
	outcolor = vec4(iter - log(log(length(x)))/300.) ;
    return ;
}
