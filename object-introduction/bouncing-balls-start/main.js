// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 显示剩余小球数
const h6 = document.querySelector('h6');

// 声明一个数组来存放小球
let balls = [];
while(balls.length <= 50){
  let size = random(10,20);
  let ball = new Ball(
    // 为了避免随机生成的坐标在画布中呈现的小球不完整，球距离边距至少有一个半径的距离
    random(0+size,width-size),
    random(0+size,height-size),
    random(-7,7),
    random(-7,7),
    true,
    randomColor(),
    size
  );
  balls.push(ball);
}
// 声明一个恶魔圈
let size = random(10,20);
let evilCircle = new EvilCircle(
  random(0+size,width-size),
  random(0+size,height-size),
  20, // 默认水平动速度
  20, // 默认竖直移动速度
  true,
  'rgba(255,255,255)', // 默认给白色
  size 
);


// 移动
evilCircle.setControls();

// 调用loop 在画布上生成小球并随时更新
loop();

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色

function randomColor(){
  return "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")";
}

// 循环自动更新试图
function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; // 设置画布颜色 半透明黑色
  ctx.fillRect(0,0,width,height); // 画出一个填满画布的矩形

  // 画出恶魔圈
  evilCircle.draw(ctx);
  // 恶魔圈碰撞检测
  evilCircle.collisionDetect(balls);
  // 剩余彩球数量
  evilCircle.remainBall(h6,balls);
  // 遍历小球数组，每个小球都执行绘画和更新
  for(let i = 0; i < balls.length; i++){
    // 如果小球存在
    if(balls[i].exists){
      balls[i].draw(ctx);
      balls[i].update();
      balls[i].collisionDetect(balls);
    }

  }
  
  // 再运行一次函数 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都
  //会运行一次这个函数，这样我们可以得到一个平滑的动画效果
  requestAnimationFrame(loop)
}


