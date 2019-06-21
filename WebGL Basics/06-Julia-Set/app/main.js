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
	env.num = 2. ;
 
    /* Setup a solver */
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
		uniforms : {
			n : {type : 'f', value : env.num},
		},
        canvas : canvas_1,
    } ) ;
	
	var gui = new Abubu.Gui() ;
	var pnl = gui.addPanel() ;
	pnl.add(env, 'num').step(0.01).onChange(function() {
		renderer.uniforms.n.value = env.num ;
		renderer.render() ;
	} ) ;
	setInterval(function() {
		if(renderer.uniforms.n.value >= 4) {
			renderer.uniforms.n.value = -4 ;
			env.num = -4 ;
			renderer.render() ;
		}
		else {
		renderer.uniforms.n.value += 0.01 ;
		env.num += 0.01 ;
		renderer.render() ;
		}
	}, 20) ;
    renderer.render() ;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
