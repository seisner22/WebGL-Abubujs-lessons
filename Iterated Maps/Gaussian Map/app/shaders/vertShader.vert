#version 300 es
precision highp float ; 
precision highp int ; 

in vec4 position;

out vec2 pixPos ;
void main() {
    pixPos = position.xy ;
    gl_Position = vec4(position.xy*2.-1.,0.,1.0);
}
