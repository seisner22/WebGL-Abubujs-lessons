#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

void main() {
    float R = 1.3 ;
    float theta = acos(-1.) ;

    vec2 z =pixPos*4. + vec2(-2.,-2.) ;
    vec2 c0 = vec2(R*cos(theta),R*sin(theta)) ;
    
    outcolor = vec4(1.) ;
    for(int i=0; i<800; i++){
        z = vec2( z.x*z.x - z.y*z.y, 2.*z.x*z.y) + c0 ;
        if (length(z)>100.){
            outcolor.rgb = vec3(0.) ;
            return ;
        }
    }
    return ;
}
