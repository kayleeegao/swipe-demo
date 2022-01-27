//滑动吸附+移动端滑动手势判断
var swipe = document.querySelector("#vertical_swipe"); 
var count = 0;
function boxTouchStart(e){
	var touch = e.touches[0]; //获取触摸对象
	startX = touch.pageX;
	startY = touch.pageY;
}
function boxTouchMove(e){
	var touch = e.touches[0];
	moveX = touch.pageX - startX;
	moveY = touch.pageY - startY;
	//判断移动端滑动手势
	if (( Math.abs(moveY) > Math.abs(moveX) && moveY > 0)||( Math.abs(moveY) > Math.abs(moveX) && moveY < 0 )) {
		//上下滑动
        if (count == 0 && moveY>0) {
            return false;
        }
        else if (count == 2 && moveY<0) {
            return false;
        }
	}
}

function boxTouchEnd(e) {
    //根据滑动手势调用滑动到目标屏函数
    var section1 = document.getElementById("section1");
    var section2 = document.getElementById("section2");
    var section3 = document.getElementById("section3");
    if ( Math.abs(moveY) > Math.abs(moveX) && moveY < 0 ) {//下滑
        if (count==0) {
            scrollToMyDiv(section2);
            $("#model").removeClass("animate__animated animate__slideOutRight").addClass("animate__animated animate__slideInRight visible")
        }
        else if (count == 1) {
            scrollToMyDiv(section3);
            $("#model").removeClass("animate__animated animate__slideInRight").addClass("animate__animated animate__slideOutRight hidden")

        }
        count++;
    }
    else if ( Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {//上滑
        if (count == 1) {
            scrollToMyDiv(section1);
            $("#model").removeClass("animate__animated animate__slideInRight").addClass("animate__animated animate__slideOutRight hidden")

        }
        else if (count == 2) {
            scrollToMyDiv(section2);
            $("#model").removeClass("animate__animated animate__slideOutRight").addClass("animate__animated animate__slideInRight visible")
        }
        count--;
    }
    else {
        return false;
    }

}

swipe.addEventListener("touchstart", boxTouchStart, false);
swipe.addEventListener("touchmove", boxTouchMove, false);
swipe.addEventListener("touchend", boxTouchEnd, false);

function scrollToMyDiv(element) {
    window.scrollTo({top:element.offsetTop, left: 0, behavior: 'smooth'});
}


function responsive() {
    //提取屏幕body宽度
    screenWidth = $("body").width();

    //section1中的高度
    section1Height = (screenWidth * 900 / 640);
    $("#section1").css("height", (section1Height + "px"));
    section2Height = (screenWidth * 2118 / 1278);
    $("#section2").css("height", (section2Height + "px"));

    //两个笑脸硬币的位置
    $("#model").css({ "margin-top": 0.02*section2Height + "px", "height": 0.5 * section2Height + "px" });
    
    //section3中的高度
    section3Height = (screenWidth * 2257 / 1282);
    $("#section3").css({
        "height": section3Height + "px",
        "background-image": "url(./images/SUXD.gif), url(./images/SUXD.gif), url(./images/p3_background.png)",
        "background-repeat": "no-repeat, no-repeat, no-repeat",
        "background-position": "top " + 0.05 * section3Height + "px left " + 0.01 * screenWidth + "px, top " + 0.4 * section3Height + "px left " + 0.48 * screenWidth + "px, top left",
        "background-size": "60% auto, 60% auto, 100% auto"
    });
    //square section中的高度
    squareSectionHeight = (screenWidth * 1356 / 1279);
    $("#square_section").css("height", (squareSectionHeight + "px"));

}

$(document).ready(function() {
    responsive();
})

$(window).resize(function() {
    responsive();
})