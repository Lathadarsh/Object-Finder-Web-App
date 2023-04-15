status = "";
objects = [];
function preload() {

}

function setup() {
    canvas = createCanvas(380, 360);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 360);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 360);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            percentage = Math.floor(objects[i].confidence * 100);
            fill("red");
            stroke("red");
            noFill();
            text(objects[i].label + "" + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                document.getElementById('status').innerHTML = "Object mentioned found";
                objectDetector.detect(gotResult);
                var synth= window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utterThis);
                document.getElementById('number').innerHTML = "No. of Objects detected = " + objects.length;
            }
            else{
                document.getElementById('status').innerHTML = "Object mentioned not found"
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById('name').value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}