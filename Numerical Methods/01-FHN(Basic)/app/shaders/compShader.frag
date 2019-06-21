#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTrgt ;
uniform float       dt ;
uniform float       period ;

#define lx          8.0
#define diffCoef    0.001

#define aa       0.1 
#define bb       0.3 
#define epsilon 0.01
#define delta   0.

out vec4 outTrgt ; // output color of the shader

in vec2 pixPos ;
void main() {
    vec2 size = vec2(textureSize( inTrgt,0 )) ;
    float ddx = size.x/lx ;
    ddx *= ddx ;

/*------------------------------------------------------------------------
 * Calculating laplacian
 *------------------------------------------------------------------------
 */
    vec2 cc = pixPos ;
    vec2 ii = vec2(1.,0.)/size ;
    vec2 jj = vec2(0.,1.)/size ;

    // Let's implement laplacian operator here
    vec4 laplacian ;

    laplacian = ( texture(inTrgt, cc - ii ) 
                - 2.*texture(inTrgt, cc)
                + texture(inTrgt, cc + ii ) ) *ddx
               + ( texture(inTrgt, cc - jj ) 
                - 2.*texture(inTrgt, cc)
                + texture(inTrgt, cc + jj ) ) *ddx ;

/*------------------------------------------------------------------------
 *  calculate time derivatives & do an Euler update
 *------------------------------------------------------------------------
 */
    vec4  C = texture( inTrgt, cc ) ;
    float u = C.r ;
    float v = C.g ;
    float time = C.b ;

    float du2dt = laplacian.r*diffCoef + u*(1.-u)*(u-aa)-v ;
    float dv2dt = epsilon*(bb*u-v+delta) ;


    u += du2dt*dt ;
    v += dv2dt*dt ;
    time += dt ;

    if (length(pixPos)<0.1 && time > period ){
        u = 1.0 ;
        time = 0. ;
    }

    outTrgt = vec4(u,v,time,1.) ;
    return ;
}
