define([    'shader!vertShader.vert',
            'shader!compShader.frag',
            'Abubu/Abubu'
            ],
function(   vertShader,
            compShader,
            Abubu
            ){
"use strict" ;

/*========================================================================
 * Global Parameters
 *========================================================================
 */
var log = console.log ;
var env = {} ;
window.env = env ;

/*========================================================================
 * Initialization of the GPU and Container
 *========================================================================
 */
function loadWebGL()
{
    env.width = 512 ;
    env.height = 512 ;

/*------------------------------------------------------------------------
 * Access and setup canvas 
 *------------------------------------------------------------------------
 */
    var canvas_1 = document.getElementById("canvas_1") ;
    canvas_1.width = env.width ;
    canvas_1.height = env.height ;
	env.r = 1. ;
	env.c1 = 0. ;
	env.c2 = 0. ;

    /* Setup geometry */
    env.geometry = {} ;
    env.geometry.vertices =  [
            1.,     1.,    0.,
            0.0,    1.,    0.,
            1.,     0.0,    0.,
			0.0,	0.0,	0.,
			0.5,	-0.5,	0.,
        ] ;
    env.geometry.noVertices= 5 ; // No of vertices
    env.geometry.noCoords  = 3 ; // No of coordinates
    env.geometry.premitive = 'triangle_strip' ;

    /* Setup a solver */
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
		uniforms :{
			radius :{ type : 'f', value : env.r },
			constant1 :{ type : 'f', value : env.c1 },
			constant2 :{ type : 'f', value : env.c2 },
		},
        geometry : env.geometry ,
        canvas : canvas_1,
    } ) ;

    renderer.render() ;
	
	var gui = new Abubu.Gui() ;
	var pnl = gui.addPanel() ;
	pnl.add(env, 'c1').step(0.01).onChange(function() {
		renderer.uniforms.constant1.value = env.c1 ;
		renderer.render() ;
	} ) ;
	pnl.add(env, 'r').step(0.01).onChange(function() {
		renderer.uniforms.radius.value = env.r ;
		renderer.render() ;
	} ) ;
	pnl.add(env, 'c2').step(0.01).onChange(function() {
		renderer.uniforms.constant2.value = env.c2 ;
		renderer.render() ;
	} ) ;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
