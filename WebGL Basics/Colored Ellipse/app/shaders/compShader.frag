#version 300 es
precision highp float ;
precision highp int ;

uniform float radius, constant1, constant2 ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

void main() {

	if (length(pixPos - vec2(pixPos.y + constant1,constant2)) < radius){
		outcolor = vec4(pixPos.x,0.,pixPos.y,1.) ;
		}
	else {
		outcolor = vec4(constant1 - pixPos.y,0.,1. - pixPos.x,1.) ;
		}
}
