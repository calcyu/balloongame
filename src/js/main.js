function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function randBallValue() {
    const x = rand(10, 90)//水平偏移量
    const h = rand(0, 360)//色相
    const s = rand(15, 50)//尺寸
    const d = rand(10, 10)//持续时间
    const delay = rand(0, 0)//延迟时间
    return `--x: ${x}; --h: ${h}; --s: ${s}; --d: ${d}; --delay: ${delay};`;
}
function createBall(ball) {
    return ` <div id="ball_${ball.key}" key="${ball.key}" class="balloon" style="${randBallValue()}--anima: ${ball.anima}">
      <div class="balloon__handle"></div>
      <div class="txt">${ball.txt}</div>
    </div> `;
}
function restartBall(ball) {
    ball.isRunning = true;
    ball.txt = randTxt();
    ball.anima = ball.anima === "float" ? "float2" : "float";
    $("#" + ball.id)
        .attr("style", `${randBallValue()} --anima: ${ball.anima}`);
    $(`#${ball.id}>.txt`).text(ball.txt);
    $("#" + ball.id).addClass("balloon-animation");
}
function stopBall(ball) {
    ball.isRunning = false;
    $("#" + ball.id).removeClass("balloon-animation");
    stopedBalls.push(ball);
}

function randTxt() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function setScore(value) {
    score += value
    if (score > 100) {
        score = 100;
    } else if (score < 0) {
        score = 0;
    }
    $("#score")
        .attr("style", `--score: ${score}`);
    if (score >= 100) {
        $("#msgBox span").text("恭喜你，挑战成功！");
        $("#msgBox").show();
        isPlaying = false;
    } else if (score <= 0) {
        $("#msgBox span").text("挑战失败，加油！");
        $("#msgBox").show();
        isPlaying = false;
    }
}
let count = 0;
const num = 6;//每秒多少个汽球 6/s
let runningBalls = [];
let stopedBalls = [];
let score = 1;//初始分数
setScore(0);
let isPlaying = true;
setInterval(() => {
    if (!isPlaying)
        return;
    if (count < num) {
        const ball = { id: "ball_" + count, key: count, isRunning: true, anima: "float", txt: randTxt() };
        runningBalls[count] = ball;
        $("#box").append(createBall(ball));
        $("#" + ball.id).addClass("balloon-animation");
        $("#" + ball.id).on("animationend", (e) => {
            const ball = runningBalls[$(e.target).attr("key")];
            stopBall(ball);

            console.log("end");
            setScore(-1);
        })
        count++;
    } else {
        let ball = stopedBalls.pop();
        if (ball && !ball.isRunning) {
            restartBall(ball);
        }
    }
}, 1000 / num);
$("body").keypress((e) => {
    for (let index = 0; index < runningBalls.length; index++) {
        const ball = runningBalls[index];
        if (ball.txt == e.key.toUpperCase()) {
            stopBall(ball);
            setScore(1);//对了加1分
            break;
        }
        if (index == runningBalls.length) {
            setScore(-1);//错了扣1分
        }
    }
})