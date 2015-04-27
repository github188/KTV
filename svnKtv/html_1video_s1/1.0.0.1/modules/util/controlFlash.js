define(function(require, exports, module){
    function ControlFlash (){
        this.init ();
    }
    ControlFlash.prototype.init=function(){

    }
    ControlFlash.prototype.startMovie=function(oFlashMovie){
        console.log(oFlashMovie);
        oFlashMovie.mouseover (function(){
            console.log("执行");
            $obj.attr("play","true")
        });
    }
    ControlFlash.prototype.stopMovie=function(oFlashMovie){

        oFlashMovie[i].StopPlay();
    }
    ControlFlash.prototype.rewindMovie=function(oFlashMovie){
              oFlashMovie.Rewind();
    }
    ControlFlash.prototype.displayFrameCount=function(oFlashMovie){
        if (typeof oFlashMovie == "function") {
            alert("There are " + oFlashMovie.TotalFrames() + " frames in the movie.");
        } else {
            alert("There are " + oFlashMovie.TotalFrames + " frames in the movie.");
        }
    }
    ControlFlash.prototype.displayIsMoviePlaying=function(oFlashMovie){
        if (oFlashMovie.IsPlaying()) {
            alert("The movie is playing.");
        } else {
            alert("The movie is stopped.");
        }
    }
    module.exports = ControlFlash ;
})
