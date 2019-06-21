#version 300 es
precision highp float ; 
precision highp int ; 

in vec4 position;

void main() {
    gl_Position = vec4(position.x*2.-1.,position.y*2.-1.,-1.,1.0);
}
