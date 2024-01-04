// 恶魔圈 与之接触的小球会从屏幕中消失

class EvilCircle extends Shape{

    color; //颜色 默认是白色
    size; //大小 

    constructor(x, y, velX, velY,exists, color, size){
        super(x, y, velX, velY, exists)
        this.color = color;
        this.size  = size;
    }
    /**
     * 在画布上画出恶魔圈
     * @param {*} ctx  画布
     */
    draw(ctx){
        // 先检测是否越界
        this.checkBounds();

        ctx.beginPath(); // 开始画图
        ctx.lineWidth = 3; // 设置线条的宽度
        ctx.strokeStyle = this.color; // 设置恶魔圈的颜色
        ctx.arc(this.x,this.y,this.size,0,2 * Math.PI) // 画一段圆弧 x,y：坐标 size：半径 0 - 360度
        ctx.stroke(); //结束绘画

    }
    /**
     *  监听键盘按下事件，移动恶魔圈子坐标
     */
    setControls(){
        window.onkeydown = (e) => {
            switch(e.key){
                case 'a': 
                    this.x -= this.velX; // 恶魔圈 向左移动
                    break;
                case 'd':
                    this.x += this.velX; // 恶魔圈 向右移动
                    break;
                case 'w':
                    this.y -= this.velY; // 恶魔圈 向上移动
                    break;
                case 's':
                    this.y += this.velY; // 恶魔圈 向下移动
                    break;
            }
        }
    }
    /**
     * 检查恶魔圈是否超出边界
     */
    checkBounds(){
        // x坐标是否超出边界
        if(this.x > width - this.size){
            this.x = width - this.size;
        }
        if(this.x < this.size){
            this.x = this.size
        }
        // y坐标是否超出边界
        if(this.y > height- this.size){
            this.y = height - this.size;
        }
        if(this.y < this.size){
            this.y = this.size
        }
    }

    /**
     * 碰撞检测，当碰撞到小球，将小球从屏幕中移除
     * @param {*} balls 小球数组
     */
    collisionDetect(balls){
        for(let i = 0; i < balls.length; i++){
            if(balls[i].exists){
                // 计算小球和恶魔圈之间的距离
                let distance = Math.sqrt(Math.pow(balls[i].x - this.x, 2) + Math.pow(balls[i].y - this.y, 2));
                // 如果二者距离小于二者半径之和，则移除小球
                if (distance < this.size + balls[i].size){
                    // 隐藏小球
                    balls[i].exists = false;
                }
            }

        }
    }

    /**
     * 计算彩球剩余数量
     * @param {*} element 
     * @param {*} balls 
     */
    remainBall(element,balls){
        let sum = 0;
        for(let i = 0; i < balls.length; i++){
          if (balls[i].exists){
            sum++;
          }
        }
        element.textContent = `剩余彩球数量：${sum}`
    }

}