#version 300 es
precision highp float ;
precision highp int ;

out vec4 outcolor ; // output color of the shader
in vec2 pixPos ;

void main() {
    vec2 c0 =pixPos*4. + vec2(-3.,-2.) ;
    vec2 z = c0 ;
    
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
