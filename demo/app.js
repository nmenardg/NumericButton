/**
 * Created by nmenard on 2015-07-24.
 */
$('#rotation-btn').numericbutton();
$('#rotation-restricted-btn').numericbutton({
    min: 45,
    max: 269
});
$('#knob').numericbutton();
$('#time-btn').numericbutton({
    type: 'time',
    changedCallback: function(el, intensity){
        var red = 0;
        var green = 0;

        if(intensity < 50){
            red = 255/50 * intensity;
            green = 255;
        }else{
            red = 255;
            green = 255/50*(100-intensity)
        }

        console.log(red, green);

        el.find('.progress')
            .css('width', intensity+'%')
            .css('background-color', 'rgb('+red+', '+green+', 0)');
    }
});