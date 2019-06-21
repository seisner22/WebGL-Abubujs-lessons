#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

uniform float radius, theta, n , alpha;

#define cpwr(z) pow(sqrt((z).x*(z).x + (z).y*(z).y), n)*vec2( cos(n*atan((z.y)/(z.x))), sin(n*atan((z.y)/(z.x))))
void main() {
    vec2 z = pixPos*vec2(4,4) + vec2(-2.,-2.);
    vec2 c = radius*vec2(cos(theta),sin(theta));


    outcolor = vec4(1.) ;
    
    for( int i=0 ;i<1000 ; i++){
        z = alpha*cpwr(z) + c ;
        if ( length(z) > 500. ){
            outcolor.rgb = vec3(0.) ;
            return ;
        }
    }
    return ;
}
