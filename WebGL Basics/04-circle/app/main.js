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
	
	env.geometry = {} ;
    env.geometry.vertices =  [
            1.,    	0.,    	0.,
        ] ;
    env.geometry.noVertices= 1 ; // No of vertices
    env.geometry.noCoords  = 3 ; // No of coordinates
    env.geometry.premitive = 'triangle_strip' ;

 
    /* Setup a solver */
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
        canvas : canvas_1,
		geometry : env.geometry,
    } ) ;

    renderer.render() ;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
