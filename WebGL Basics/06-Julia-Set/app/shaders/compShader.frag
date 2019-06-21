#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

uniform float n ;

#define cpwr(z) pow(sqrt((z).x*(z).x + (z).y*(z).y), n)*vec2( cos(n*atan((z.y)/(z.x))), sin(n*atan((z.y)/(z.x))))

void main() {
    vec2 c0 =pixPos*4. + vec2(-3.,-2.) ;
    vec2 z = c0 ;
    
    outcolor = vec4(1.) ;
    for(int i=0; i<100; i++){
        z = cpwr(z) + c0 ;
        if (length(z)> 10.){
            outcolor.rgb = vec3(0.) ;
            return ;
        }
    }
    return ;
}
