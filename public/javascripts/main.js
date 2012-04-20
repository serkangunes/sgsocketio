var complexText;
var socket;

$(function ()
{
    socket = io.connect();

    var stage = new Kinetic.Stage({
        container: "container",
        width: 500,
        height: 500
    });
    var layer = new Kinetic.Layer();

    socket.on("clock", function(currentTime){
        console.log(currentTime);

        stage.clear();

        var text = getText(currentTime, stage);
        layer.add(text);
        stage.add(layer);
    });

});

function getText(text, stage){
    return new Kinetic.Text({
          x: stage.getWidth() / 2,
          y: 130,
          stroke: "green",
          strokeWidth: 5,
          fill: "#ddd",
          fontSize: 40,
          fontFamily: "Calibri",
          textFill: "#888",
          textStroke: "#444",
          padding: 15,
          text: text,
          align: "center",
          verticalAlign: "middle",
          fontStyle: "italic"
        });
}
