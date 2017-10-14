/**
 * Created by nmenard on 2015-07-24.
 */
(function($){
    $.fn.numericbutton = function(options){
        var self = this;
        var settings = $.extend({
            type: 'rotation',
            changedCallback: function(el, rotation){},
            min: 0,
            max: 100
        }, options);

        if(settings.type === 'rotation'){
            rotateMode(self, settings);
        } else if(settings.type === 'time'){
            timeMode(self, settings);
        }

        return self;
    };

    function rotateMode(self, settings){
        var dragged = null;
        var initialY = 0;
        var body = $('body');

        var rotate = function(angle, element){
            if(angle < settings.min){
                angle = settings.min;
            } else if(angle > settings.max){
                angle = settings.max;
            }
            element.data('rotation', angle);
            element.css('transform', 'rotate('+angle*3.6+'deg)');
            settings.changedCallback(element, angle);
        };

        var bodyMouseMove = function(e){
            if(dragged){
                var angle = initialY - e.pageY;
                rotate(angle, dragged);
            }
        };

        var bodyMouseUp = function(e){
            dragged = null;
            body.off('mouvemove', bodyMouseMove);
            body.off('mouseup mouseleave', bodyMouseUp);
        };

        if(settings.min != 0){
            rotate(settings.min, self);
        }

        self.on('mousedown', function(e){
            dragged = self;
            initialY = e.pageY + (dragged.data('rotation') || 0);
            body.on('mousemove', bodyMouseMove);
            body.on('mouseup mouseleave', bodyMouseUp);
        });
    }

    function timeMode(self, settings){
        var pressed = null;
        var body = $('body');
        var interval = null;

        var bodyMouseUp = function(e){
            pressed = null;
            body.off('mouseup mouseleave', bodyMouseUp);
            clearInterval(interval);
        };

        self.on('mousedown', function(e){
            pressed = self;

            pressed.data('intensity', 0);

            interval = setInterval(function(){
                var intensity = pressed.data('intensity')+1;
                if(intensity >= 100){
                    intensity = 100;
                    bodyMouseUp(null);
                }
                self.data('intensity', intensity);
                settings.changedCallback(self, intensity);
            }, 30);
            body.on('mouseup mouseleave', bodyMouseUp);
        });
    }
}(jQuery));
