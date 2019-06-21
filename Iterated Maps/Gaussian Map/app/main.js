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
	env.a = 1. ;
	env.b1 = 0. ;
	env.b2 = 0. ;
	env.i = 2 ;
 
    /* Setup a solver */
	env.txtr = new Abubu.Float32Texture( env.width, env.height ) ;
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
		uniforms : {
			alpha : {type : 'f', value : env.a},
			beta1 : {type : 'f', value : env.b1},
			beta2 : {type : 'f', value : env.b2},
			count : {type : 'i', value : env.i},
		},
		renderTargets : {
		outcolor : { location : 0 , target : env.txtr } },
    } ) ;
	env.colormap = 'rainbowHotSpring' ;
	env.disp  = new Abubu.Plot2D({
		target : env.txtr ,
		channel : 'r' ,
		colormap : env.colormap,
		minValue : 0 ,
		maxValue : 30 ,
		colorbar : true ,
		canvas : canvas_1 ,
	} ) ;
	env.disp.initialize() ;
    renderer.render() ;
	env.disp.render() ;
	
	var gui = new Abubu.Gui ;
	var pnl = gui.addPanel() ;
	pnl.add(env, 'a').step(0.001).onChange(function() {
		renderer.uniforms.alpha.value = env.a ;
		renderer.render() ;
		env.disp.render() ;
	}) ;
	pnl.add(env, 'b1').step(0.01).onChange(function() {
		renderer.uniforms.beta1.value = env.b1 ;
		renderer.render() ;
		env.disp.render() ;
	}) ;
	pnl.add(env, 'b2').step(0.01).onChange(function() {
		renderer.uniforms.beta2.value = env.b2 ;
		renderer.render() ;
		env.disp.render() ;
	}) ;
	pnl.add(env, 'i').step(1).onChange(function() {
		renderer.uniforms.count.value = env.i ;
		renderer.render() ;
		env.disp.render() ;
	}) ;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
