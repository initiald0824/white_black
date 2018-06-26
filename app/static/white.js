// 滑动速度
var speed = 8;
// 得分
var score = 0;
// 计时器
var time;

// 一行中每一色块随机设置颜色，一块黑色，其余白色
function setLine(blocks) {
    // 随机设置一块为黑色
    var blackIndex = Math.ceil(4 * Math.random()) - 1;
    for (var i = 0; i < blocks.length; i++) {
        if (i == blackIndex) {
            var c = (blocks[blackIndex]);
            var ctx = c.getContext("2d");
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fill();
            // console.log('ctx', ctx.getImageData(0, 0, c.width, c.height).data);
        } else {
            var c = (blocks[i]);
            var ctx = c.getContext("2d");
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fill();
            // console.log('ctx', ctx.getImageData(0, 0, c.width, c.height).data);
        }
    }
}

// 初始化游戏
function init() {
    $(".line").each(function() {
        // 为行中每一块色块着色
        setLine($(this).children());
    });
}

// 色块绑定点击事件
function tap() {
    $("#game").click(function(e) {
        // 黑色
        var c = $(e.target)[0];
        if (c.tagName !== 'CANVAS') {
            over();
            clearInterval(time);
        }
        var ctx = c.getContext("2d");
        if (Array.from(ctx.getImageData(50, 50, 1, 1).data).toString() == [0, 0, 0, 255].toString()) {
            // 删除本行
            $(e.target).parent().remove();
            // 加一分
            score += 1;
            speedup();
        } else {
            // 白色游戏结束
            over();
            clearInterval(time);
        }
    })
}

function autoClick() {
    var length = $('#blocks').find(".line").length;
    var canvasList = $($('#blocks').find(".line").get(length-1)).children();
    for (var i = 0; i < canvasList.length; i++) {
        var c = canvasList[i];
        var ctx = c.getContext("2d");
        if (Array.from(ctx.getImageData(50, 50, 1, 1).data).toString() == [0, 0, 0, 255].toString()) {
            c.click();
        }
    }
}

// 色块往下滑动
function move() {
    // console.log(speed);
    // 高度
    var btop = parseInt($("#blocks").position().top);

    // 色块触底则游戏结束
    if ($($("#blocks").find(".line")).length == 5) {
        over();
        clearInterval(time);
    } else {
        // 脱离顶部之前
        if (btop + speed < 0) {
            $("#blocks").css("top", btop + speed + "px");
            // } else if (btop + speed == 0) {
        } else {
            // 新增一行
            $("#blocks").css("top", "-120px");
            var line = $('<div class="line"><canvas class="block"></canvas><canvas class="block"></canvas><canvas class="block"></canvas><canvas class="block"></canvas></div>');
            $("#blocks").prepend(line);
            // 新增行着色
            setLine(($($("#blocks").find(".line").get(0))).children());
            autoClick();
        }
    }
}

// 截取图片
function screenshot() {

}

// 加速
function speedup() {
    if (score % 10 == 0) {
        speed += 3;
    }
}

// 游戏结束
function over() {
    alert("game over!\n score=" + score);
    start();
}

// 开始游戏
function start() {
    window.location.reload();
}

// 主程序
$(document).ready(function() {
    // 初始化
    init();
    // 开始游戏，色块移动
    time = setInterval(move, 50);
    // autoClick = setInterval(autoClick, 600);
    // 点击事件
    tap();
});
