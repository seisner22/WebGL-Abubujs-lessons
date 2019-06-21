define([    'shader!vertShader.vert',
            'shader!compShader.frag',
            'shader!initShader.frag',
            'Abubu/Abubu'
            ],
function(   vertShader,
            compShader,
            initShader,
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
    env.size  = 512 ;
    env.width = env.size ;
    env.height = env.size ;

    env.dt = 0.05 ;

/*------------------------------------------------------------------------
 * Access and setup canvas 
 *------------------------------------------------------------------------
 */
    var canvas_1 = document.getElementById("canvas_1") ;
    canvas_1.width = env.width ;
    canvas_1.height = env.height ;
    env.period = 100 ;
    env.skip = 40 ;
 
    env.ftrgt = new Abubu.Float32Texture(env.width, env.height ) ;
    env.strgt = new Abubu.Float32Texture(env.width, env.height ) ;

    env.init = new Abubu.Solver({
            fragmentShader : initShader.value,
            vertexShader : vertShader.value ,
            targets : { 
                outTrgt1 : { location : 0, target : env.ftrgt } ,
                outTrgt2 : { location : 1, target : env.strgt } ,
            } 
        } ) ;
    env.init.render() ;
    
    /* Setup a solver */
    env.fsol = new Abubu.Solver({
        fragmentShader  : compShader.value ,
        vertexShader    : vertShader.value ,
        uniforms : {
            inTrgt  : { type : 's', value : env.ftrgt   } ,
            dt      : { type : 'f', value : env.dt      } ,
            period  : { type : 'f', value : env.period  } ,
        } ,
        renderTargets: { 
            outTrgt : { location : 0 , target : env.strgt } ,
        }
    } ) ;

    env.ssol = new Abubu.Solver({
        fragmentShader  : compShader.value ,
        vertexShader    : vertShader.value ,
        uniforms : {
            inTrgt  : { type : 's', value : env.strgt   } ,
            dt      : { type : 'f', value : env.dt      } ,
            period  : { type : 'f', value : env.period  } ,
        } ,
        renderTargets: { 
            outTrgt : { location : 0 , target : env.ftrgt } ,
        }
    } ) ;

    env.plot = new Abubu.Plot2D({
            target : env.strgt,
            channel: 'r' ,
            minValue : 0. ,
            maxValue : 1. ,
            colorbar : true ,
            canvas : canvas_1, 
    } ) ;


    env.initialize = function(){
        env.init.render() ;
        env.plot.init() ;
        env.time = 0 ;
        env.breaked = false ;
    }

    env.running = false ;
    env.solve = function(){
        env.running = !env.running ;
    }

    env.initialize() ;
    createGUI() ;
    render() ;
}/*  End of loadWebGL  */

function render(){
    if(env.running){
        for(var i=0; i<env.skip ; i++){
            env.time += env.dt*2. ;
            env.fsol.render() ;
            env.ssol.render() ;
        }
    }
    env.plot.render() ;
    requestAnimationFrame(render) ;
}
function createGUI(){
    env.gui = new Abubu.Gui() ;
    env.pnl = env.gui.addPanel() ;
    env.pnl.add(env, 'period').onChange(function(){
        env.fsol.uniforms.period.value = env.period ;        
        env.ssol.uniforms.period.value = env.period ;        
    } );
    env.pnl.add(env, 'skip') ;
    env.pnl.add(env, 'time').listen(); 
    env.pnl.add(env, 'initialize') ;
    env.pnl.add(env, 'solve').name('Sove/Stop') ;
}

loadWebGL() ;

} ) ;   // End of require 
