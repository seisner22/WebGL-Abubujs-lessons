#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

uniforms float vertex;

void main() {
	if (length(pixPos - vertex) < 1.) {
		outcolor = vec4(0., 0., 0., 1.) ;
    return ;
}
