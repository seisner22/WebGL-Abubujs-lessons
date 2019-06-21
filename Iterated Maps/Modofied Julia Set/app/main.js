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
 // If you can read this this worked!
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
	canvas_1.addEventListener('mousemove',  function(e){ console.log(e) } ) ;
	env.r = 1. ;
	env.th = -Math.PI ;
	env.num = 2. ;
	env.a = 1. ;
	
	env.txtr = new Abubu.Float32Texture( env.width, env.height ) ;
    /* Setup a solver */
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
		uniforms : {
			radius :{ type : 'f', value : env.r } ,
			theta : { type : 'f', value : env.th } ,
			n : { type : 'f', value : env.num } ,
			alpha : { type : 'f', value : env.a } ,
		} ,
        canvas : canvas_1,
    } ) ;

    renderer.render() ;
	
	var gui = new Abubu.Gui() ;
	var pnl = gui.addPanel() ;
	pnl.add(env,'r').step(0.001).onChange(function(){
		renderer.uniforms.radius.value = env.r ;
		renderer.render() ;
	}) ;		;
	setInterval(function() {
		if(renderer.uniforms.theta.value >= -2.9) {
			renderer.uniforms.theta.value = -3.5 ;
			renderer.render() ;
		}
		else {
		renderer.uniforms.theta.value += 0.001 ;
		renderer.render() ;
		}
	}, 50) ;
	pnl.add(env,'th').step(0.001).onChange(function(){
		renderer.uniforms.theta.value = env.th ;
		renderer.render() ;
	})		;
	pnl.add(env,'num').step(0.01).onChange(function(){
		renderer.uniforms.n.value = env.num ;
		renderer.render() ;
	})		;
	pnl.add(env,'a').step(0.01).onChange(function(){
		renderer.uniforms.alpha.value = env.a ;
		renderer.render() ;
	})		;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
