#version 300 es
precision highp float ; 
precision highp int ; 

in vec4 position;
out vec2 pixPos ;
void main() {
    pixPos = position.xy ;  // calculate position of each pixel and send to fragment shader
    
	gl_Position = vec4(position.xy,position.z,1.0);
}
