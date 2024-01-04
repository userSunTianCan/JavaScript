// 图形模型
class Shape{
    x;
    y; // 图形的坐标
    velX;
    velY;// 图形水平和竖直速度
    exists; // 图形是否存在于程序中
  
    constructor(x, y, velX, velY, exists){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.exists = exists;
    }
  }