#version 300 es
precision highp float ;
precision highp int ;

uniform sampler2D   inTrgt ;
uniform float       dt ;
uniform float       period ;
uniform float		diffCoef ;
uniform float		lx ;
uniform float		epsilon ;
uniform float		aa ;
uniform float		bb ;
uniform float		period2 ;
uniform float		click_x ;
uniform float		click_y ;
uniform bool		button1 ;
uniform bool		button2 ;
uniform bool		button3 ; 		


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

    laplacian = ( (1./90.)*texture(inTrgt, cc - vec2(3.,3.)*ii ) - (3./20.)*texture(inTrgt, cc - vec2(2.,2.)*ii) + (3./2.)*texture(inTrgt, cc - ii)
                - (49./18.)*texture(inTrgt, cc) + (3./2.)*texture(inTrgt, cc + ii) - (3./20.)*texture(inTrgt, cc + vec2(2.,2.)*ii) + (1./90.)*texture(inTrgt, cc + vec2(3.,3.)*ii))*ddx
               + ( (1./90.)*texture(inTrgt, cc - vec2(3.,3.)*jj ) - (3./20.)*texture(inTrgt, cc - vec2(2.,2.)*jj) + (3./2.)*texture(inTrgt, cc - jj)
                - (49./18.)*texture(inTrgt, cc) + (3./2.)*texture(inTrgt, cc + jj) - (3./20.)*texture(inTrgt, cc + vec2(2.,2.)*jj) + (1./90.)*texture(inTrgt, cc + vec2(3.,3.)*jj) ) *ddx ;

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
	

    if (length(pixPos)<0.1 && time > period && button1 == true){
        u = 1.0 ;
        time = 0. ;
    }

	if (length(pixPos - vec2(click_x/size.x, 1. - click_y/size.y))<0.1 && time > period2 && button2 == true){
		u = 1.0 ;
		time = 0. ;
	}

	if (length(pixPos - vec2(click_x/size.x, 1. - click_y/size.y))<1.0 && time > period2 && button3 == true){
		u = 1.0 ;
		time = 0. ;
	}
	
	

    outTrgt = vec4(u,v,time,1.) ;
    return ;
}
