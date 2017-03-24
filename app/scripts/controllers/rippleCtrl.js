"use strict";
angular.module("attendance").controller("rippleCtrl",["$scope",function($scope){
    
    
    
    
    
    
       
 

/*
         * Water ripple effect done in HTML 5 canvas
         *
         * The MIT License (MIT)
         *
         * Copyright (c) 2015 TimeWaster - sebi@timewaster.de
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */
        window.onload = function() {

            /* --- config start --- */

            var waterImageId       = "waterImage",  // id of the image to use (Make sure to follow the same-origin rule!!!)
                waterCanvasId      = "waterCanvas", // id of the canvas to use
                framerate          = 40,            // which fps rate to use, this is not followed exactly
                waterDamper        = 0.99,          // how long the waves will roll, the higher this number the longer
                displacementDamper = 0.15,          // displacement "height", the higher this number the more the image is shifted
                luminanceDamper    = 0.8,           // wave visibility, the higher the number the more visible the waves wil be
                randomDroplets     = 4;             // in which frame interval random droplets are added, the lower the number, the more. set to 0 to switch off

            /* ---- config end ---- */

            var image           = document.getElementById(waterImageId),
                canvas          = document.getElementById(waterCanvasId),
                context         = canvas.getContext("2d"),
                width           = canvas.width,
                height          = canvas.height,
                waterCache1     = [],
                waterCache2     = [],
                imageDataSource,
                imageDataTarget,
                dropletcounter = 0;

            // draw source image into canvas, then set source image invisible
            context.drawImage(image, 0, 0);
            image.style.display = "none";

            // copy canvas into imageData caches
            imageDataSource = context.getImageData(0, 0, width, height);
            imageDataTarget = context.getImageData(0, 0, width, height);
            
            // initialize water caches (and make them 4 pixels bigger to have enough room for averaging calculation)
            for(var x = 0; x < width + 4; x++) {
                waterCache1[x] = [];
                waterCache2[x] = [];
                for(var y = 0; y < height + 4; y++) {
                    waterCache1[x][y] = 0;
                    waterCache2[x][y] = 0;
                }
            }

            // when the mouse moves over the canvas draw water drop into water cache
            canvas.onmousemove = function(event) {
                var mouseX = Math.floor(event.offsetX) + 2,
                    mouseY = Math.floor(event.offsetY) + 2;

                if(mouseX > 2 && mouseY > 2 && mouseX < width + 1 && mouseY < height + 1) {
                    setDroplet(mouseX, mouseY);
                }
            }

            function tick() {
                var waterCacheTemp;

                // draw random droplets
                if(randomDroplets) {
                    dropletcounter++;
                    if(dropletcounter >= randomDroplets) {
                        setDroplet(Math.floor(Math.random() * width) + 1, Math.floor(Math.random() * height) + 1);
                        dropletcounter = 0;
                    }
                }

                // main water animation
                for(var x = 2; x < width + 2; x++) {
                    for(var y = 2; y < height + 2; y++) {
                        manipulatePixel(x, y);
                    }
                }

                // switch imageData caches according to http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
                waterCacheTemp = waterCache1;
                waterCache1 = waterCache2;
                waterCache2 = waterCacheTemp;

                // write imageData cache to canvas
                context.putImageData(imageDataTarget, 0, 0);
            }
            
            function setDroplet(x, y) {
                waterCache1[x][y]     = 127;
                waterCache1[x + 1][y] = 127;
                waterCache1[x - 1][y] = 127;
                waterCache1[x][y + 1] = 127;
                waterCache1[x][y - 1] = 127;
            }

            function manipulatePixel(x, y) {
                var posTargetX = 0,
                    posTargetY = 0,
                    posTarget = 0,
                    posSourceX = 0,
                    posSourceY = 0,
                    posSource = 0,
                    luminance = 0;
                    
                // calculate water effect according to http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
                waterCache2[x][y] = ((waterCache1[x - 1][y] + waterCache1[x + 1][y] + waterCache1[x][y + 1] + waterCache1[x][y - 1] +
                                      waterCache1[x - 1][y - 1] + waterCache1[x + 1][y + 1] + waterCache1[x - 1][y + 1] + waterCache1[x + 1][y - 1] +
                                      waterCache1[x - 2][y] + waterCache1[x + 2][y] + waterCache1[x][y + 2] + waterCache1[x][y - 2]) / 6 - waterCache2[x][y]) * waterDamper;

                // correct target position to canvas coordinates
                posTargetX = x - 2;
                posTargetY = y - 2;

                // calculate source position for displacement effect
                posSourceX = Math.floor(waterCache2[x][y] * displacementDamper);
                if(posSourceX < 0) posSourceX += 1; // let the water smoothen itself, otherwise it will continue to ripple forever
                posSourceY = posTargetY + posSourceX;
                posSourceX += posTargetX;

                // keep source position in bounds of canvas
                if(posSourceX < 0) posSourceX = 0;
                if(posSourceX > width - 1) posSourceX = width - 1;
                if(posSourceY < 0) posSourceY = 0;
                if(posSourceY > height - 1) posSourceY = height - 1;

                // calculate byte positions in imageData caches
                posTarget = (posTargetX + posTargetY * width) * 4;
                posSource = (posSourceX + posSourceY * width) * 4;

                // calculate luminance change for this pixel
                luminance = Math.floor(waterCache2[x][y] * luminanceDamper);
                
                // manipulate target imageData cache
                imageDataTarget.data[posTarget]     = imageDataSource.data[posSource] + luminance;
                imageDataTarget.data[posTarget + 1] = imageDataSource.data[posSource + 1] + luminance;
                imageDataTarget.data[posTarget + 2] = imageDataSource.data[posSource + 2] + luminance;                
            }

            // start tick at specified fps
            window.setInterval(tick, Math.floor(1000 / framerate));
        };
    
    
/*    sketch = Sketch.create()
sketch.mouse.x = sketch.width / 10
sketch.mouse.y = sketch.height
skylines = []
dt = 1

#
# BUILDINGS
#
  
Building = ( config ) ->
  this.reset( config )

Building.prototype.reset = (config) ->
  this.layer = config.layer
  this.x = config.x
  this.y = config.y
  this.width = config.width
  this.height = config.height
  this.color = config.color  
  this.slantedTop = floor( random( 0, 10 ) ) == 0
  this.slantedTopHeight = this.width / random( 2, 4 )
  this.slantedTopDirection = round( random( 0, 1 ) ) == 0
  this.spireTop = floor( random( 0, 15 ) ) == 0
  this.spireTopWidth = random( this.width * .01, this.width * .07 )
  this.spireTopHeight = random( 10, 20 )
  this.antennaTop = !this.spireTop && floor( random( 0, 10 ) ) == 0
  this.antennaTopWidth = this.layer / 2
  this.antennaTopHeight = random(5, 20) 
    
Building.prototype.render = ->
  sketch.fillStyle = sketch.strokeStyle = this.color
  sketch.lineWidth = 2
  
  sketch.beginPath()
  sketch.rect( this.x, this.y, this.width, this.height )
  sketch.fill()
  sketch.stroke()
    
  if this.slantedTop
    sketch.beginPath()
    sketch.moveTo( this.x, this.y )
    sketch.lineTo( this.x + this.width, this.y )
    if this.slantedTopDirection
      sketch.lineTo( this.x + this.width, this.y - this.slantedTopHeight )
    else
      sketch.lineTo( this.x, this.y - this.slantedTopHeight )
    sketch.closePath()
    sketch.fill()
    sketch.stroke()
     
  if this.spireTop
    sketch.beginPath()
    sketch.moveTo( this.x + ( this.width / 2 ), this.y - this.spireTopHeight )
    sketch.lineTo( this.x + ( this.width / 2 ) + this.spireTopWidth, this.y )
    sketch.lineTo( this.x + ( this.width / 2 ) - this.spireTopWidth, this.y )
    sketch.closePath()
    sketch.fill()
    sketch.stroke()
   
  if this.antennaTop
    sketch.beginPath()
    sketch.moveTo( this.x + ( this.width / 2 ), this.y - this.antennaTopHeight )
    sketch.lineTo( this.x + ( this.width / 2 ), this.y )
    sketch.lineWidth = this.antennaTopWidth
    sketch.stroke()

#
# SKYLINES
#

Skyline = (config) -> 
  this.x = 0
  this.buildings = []
  this.layer = config.layer
  this.width =
    min: config.width.min
    max: config.width.max
  this.height =
    min: config.height.min
    max: config.height.max
  this.speed = config.speed
  this.color = config.color
  this.populate()
  return this
  
Skyline.prototype.populate = ->
  totalWidth = 0
  while totalWidth <= sketch.width + ( this.width.max * 2 )
    newWidth = round ( random( this.width.min, this.width.max ) )
    newHeight = round ( random( this.height.min, this.height.max ) )
    this.buildings.push( new Building(
      layer: this.layer
      x: if this.buildings.length == 0 then 0 else ( this.buildings[ this.buildings.length - 1 ].x + this.buildings[ this.buildings.length - 1 ].width )
      y: sketch.height - newHeight
      width: newWidth
      height: newHeight
      color: this.color
    ) )
    totalWidth += newWidth

Skyline.prototype.update = ->
  this.x -= ( sketch.mouse.x * this.speed ) * dt
      
  firstBuilding = this.buildings[ 0 ]
  if firstBuilding.width + firstBuilding.x + this.x < 0
    newWidth = round ( random( this.width.min, this.width.max ) )
    newHeight = round ( random( this.height.min, this.height.max ) )
    lastBuilding = this.buildings[ this.buildings.length - 1 ]    
    firstBuilding.reset(
      layer: this.layer
      x: lastBuilding.x + lastBuilding.width
      y: sketch.height - newHeight
      width: newWidth
      height: newHeight
      color: this.color
    )    
    this.buildings.push( this.buildings.shift() )

Skyline.prototype.render = ->
  i = this.buildings.length
  sketch.save()
  sketch.translate( this.x, ( sketch.height - sketch.mouse.y ) / 20 * this.layer )  
  this.buildings[ i ].render ( i ) while i--
  sketch.restore()

#
# SETUP
#
  
sketch.setup = ->    
  i = 5
  while i--
    skylines.push( new Skyline(
      layer: i + 1
      width:
        min: ( i + 1 ) * 30
        max: ( i + 1 ) * 40
      height:
        min: 150 - ( ( i ) * 35 )
        max: 300 - ( ( i ) * 35 )
      speed: ( i + 1 ) * .003
      color: 'hsl( 200, ' + ( ( ( i + 1 ) * 1 ) + 10 ) + '%, ' + ( 75 - ( i * 13 ) ) + '% )'
    ) )

#
# CLEAR
#
  
sketch.clear = ->
  sketch.clearRect( 0, 0, sketch.width, sketch.height )

#
# UPDATE
#
  
sketch.update = ->
  dt = if sketch.dt < .1 then .1 else sketch.dt / 16
  dt = if dt > 5 then 5 else dt
  i = skylines.length
  skylines[ i ].update( i ) while i--
  
#
# DRAW
#
  
sketch.draw = ->
  i = skylines.length
  skylines[ i ].render( i ) while i--

#
# Mousemove Fix
#  
    
$( window ).on 'mousemove', (e) ->
  sketch.mouse.x = e.pageX
  sketch.mouse.y = e.pageY*/
    
    

    }]);   
