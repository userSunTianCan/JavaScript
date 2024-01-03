// 小球模型
class Ball{

    x;
    y; // 小球的坐标
    velX;
    velY;// 小球水平和竖直速度
    color; //小球的颜色
    size; //小球的大小
  
    constructor(x, y, velX, velY, color, size){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size  = size;
    }
    
    /**
     *  画出小球
     *  @param ctx 画布
     */
    draw(ctx){
      ctx.beginPath(); // 开始画图
      ctx.fillStyle = this.color; // 设置小球的颜色
      ctx.arc(this.x,this.y,this.size,0,2 * Math.PI) // 画一段圆弧 x,y：坐标 size：半径 0 - 360度
      ctx.fill(); //结束绘画
    }
  
    /**
     *  更新小球
     */
    update(){
      // 如果小球触碰到画布边缘，则施加相反的速度。
      if (this.x + this.size >= width || this.x - this.size <= 0 ){
        this.velX = - this.velX;
      }
  
      if (this.y + this.size >= height || this.y - this.size <= 0){
        this.velY = - this.velY;
      }
  
      this.x += this.velX;
      this.y += this.velY
    }

    /**
     *  碰撞检测 当小球碰撞到其他求 变色
     */
    collisionDetect(balls){
        for(let i = 0; i < balls.length; i++){
            //小球不是当前球
            if(this !== balls[i]){
                //计算两个圆之间的距离 x y 差 平方 后 开根号
                let distance = Math.sqrt(Math.pow(balls[i].x - this.x, 2) + Math.pow(balls[i].y - this.y, 2));
                // 如果二者距离小于二者半径之和，则小球碰撞，应当变色。
                if (distance < this.size + balls[i].size){
                    this.color = balls[i].color =  randomColor();
                }
            }
        }
    }
  }