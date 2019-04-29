
## Processing 2d彩带 

#### 准备
>1. **PVector 向量**
>2. **ArrayList 数据列表**
>3. **bezierVertex() 贝塞尔曲线**

**1、PVector 向量** 

是二维或三维的向量，向量就是具有大小和方向的量,PVector是用于描述位置、速度或加速度。
```processing
//构造函数	
PVector()
PVector(x, y)
PVector(x, y, z)

//参数
x	// x坐标
y	// y坐标
z	// z坐标

//涉及到的成员函数(不是全部)
add(vector)   // 加法
sub(vector)   // 减法
mult()        // 乘以标量
div()         // 除以标量
copy()        // 获取PVector的副本
mag()         // 计算PVector的大小(标量)
normalize()   // 将向量标准化为长度1(方向向量)
heading()     // 计算此向量的旋转角度
rotate()      // 旋转一个角度

PVector类的静态函数
PVector.add(v1,v2)   //计算v1加v2,并返回新的PVector
PVector.sub(v1,v2)   //计算v1减v2,并返回新的PVector
```
PVector简单的使用示例:
```processing
PVector v1=new PVector(10,10);
PVector v2=new PVector(20,20);
PVector v3=new PVector(15,30);

v1.add(v2);    // v1=(30,30)   (10+20,10+20);
v3.mult(2);    // v3=(30,60)   (15*2,30*2);

float len=v1.mag();       // len = 42.426407
float angle=v2.heading(); // angle = 0.7853982
```
**2、ArrayList  数据列表**
ArrayList存储可变数量的对象。这类似于对象数组，但是使用ArrayList，可以轻松地从ArrayList中添加和删除项，并且可以动态调整大小,非常方便。
```processing
构造函数：
ArrayList<Type>()
ArrayList<Type>(initialCapacity)

参数
Type	        Class Name: 要放在ArrayList中的对象的数据类型
initialCapacity	    int: 定义列表的初始容量;默认为空

// 涉及成员函数
Size()			//获取ArrayList的大小
Add()			 //向ArrayList添加新元素
get(index)		//获取索引为index的元素	
Remove(index)	 //移除索引为index的元素	
```
用PVector来做个简单示例
```processing
ArrayList<PVector> vevtors= new ArrayList<PVector>();
vevtors.add(new PVector(10,10));
vevtors.add(new PVector(20,20));
PVector vector = vevtors.get(0);  // 从ArrayList中获取索引为0的PVector
int total = vevtors.size();       // total = 2

// 遍历vevtors显示
for (int i = 0; i < vevtors.size(); i++) {
  PVector v = vevtors.get(i);
  point(v.x,v.y);
}

vevtors.remove(0);        // 移出元素0
println(vevtors.size());  // 1
```
**3、bezierVertex() 贝塞尔曲线**
指定贝塞尔曲线的顶点坐标。每个bezierVertex()内都定义了Bezier曲线上的两个控制点和一个锚点的位置。第一次在beginShape()调用中使用bezierVertex()时，必须在开始加上vertex()来设置第一个锚点。
```processing
构造函数：
	
bezierVertex(x2, y2, x3, y3, x4, y4)			//2D
bezierVertex(x2, y2, z2, x3, y3, z3, x4, y4, z4) //3D
//参数
	
x2	float: 第一个控制点的x坐标
y2	float: 第一个控制点的y坐标
z2	float: 第一个控制点的z坐标

x3	float: 第二个控制点的x坐标
y3	float: 第二个控制点的y坐标
z3	float: 第二个控制点的z坐标

x4	float: 锚点的x坐标
y4	float: 锚点的y坐标
z4	float: 锚点的z坐标
```
这里两个图形的示例
```processing
//示例1
noFill();
beginShape();
vertex(30, 20);
bezierVertex(80, 0, 80, 75, 30, 75);
endShape();

// 示例2
float offset=20;
beginShape();
// 曲线 1
vertex(30, 20);        //锚点    
bezierVertex(80, 0,    //控制点
             80, 75,   //控制点
             30, 75);  //锚点
            
// 曲线 2 (向左平移offset,并将顺序反向)
vertex(30-offset, 75);        //锚点（绘制一段直线）
bezierVertex( 80-offset, 75,  //控制点
              80-offset, 0,   //控制点
              30-offset, 20); //锚点

vertex(30, 20); //回到原点（直线）

endShape();
```
***
#### 原理分析
接来分析下生成彩带的逻辑,为了方便,先用鼠标来模拟跟踪颜色
我们需要一个队列来记录鼠标位置的历史信息,为生成图形做准备,就像下面这样

这里面,我一共记录的30帧鼠标的历史位置,再loop循环中,每当记录新的位置,就会将最将”老”的信息,挤出队列.为了让大家直观,我做了动画演示下其中的原理.

图里是将长度限制为10,如果size()<10时,将所有的元素添加到数组队列,size()>10时,
就会先remove(0),移除掉最老的元素,也就是第一个(index为0的元素),add()新的元素,就像水管一样,数组列表里的数据不断地在更新。
下面是示例的代码。
```processing
ArrayList<PVector> mouse;  // 鼠标坐标队列
int amount = 30;           // 记录历史个数
void setup() {
  size(300, 300);
  mouse=new ArrayList<PVector>();
  smooth();
  noFill();
  stroke(0);
}
void draw() {
  background(255);
  /*
   * 如果 size()>amount 直接添加坐标
   *     size()<amount 先移除最开始的坐标( remove(0) )
   *                   再添加当前的坐标  ( add(new)  )
   */                  
  if (mouse.size()<amount) {
    mouse.add(new PVector(mouseX, mouseY));
  } else {
    mouse.remove(0);
    mouse.add(new PVector(mouseX, mouseY));
  }
  // 显示鼠标轨迹
  beginShape();
  for (PVector p : mouse) {
    vertex(p.x, p.y);
  }
  endShape();
}
```
再把轨迹在原坐标的基础上添加上一个随机量，做成5条，大家来看看效果，这里就不显示代码了，在文章结尾的链接里有相关的源码。

下面来看看如何把这些直来直去的线，变成曲线，让彩带更加生动。

**第一步**、定义几个参数，pos为当前点的位置坐标，leftMid是pos与前一个pos的中点，rightMid是pos与后一个pos的中点。

**第二步**、规定leftMid与rightMid的连线方向是当前pos的方向，PVector. sub（leftMid,rightMid）得到的dir就是由leftMid指向rightMide的向量，再将dir.Normalize()等到长度为1的方向向量，这个过程称为向量的标准化。标准化就是为了，根据这个方向，找到距离pos长度为radius的两侧的彩带端点leftSide与rightSide，就leftSide来说，将方向向量旋转-90°得到这个方向的向量，在乘上radius，向量的长度就变成了radius，再用pos+这个向量就得到了leftSide， leftSide=pos+dir.rotate(-90°).mult(radius)，rightSide同理。

**第三步**、将前后的leftSide与rightSide都连接起来，找到各个线段的中点，得到的中点和之前的方法一样。现在得到了pos连线的轮廓扩展，接线来就是绘制曲线bezier。

**第四步**、在beginShape（）里，这里先绘制的左侧的边，确定第一个锚点（上一个的nextLeftSideMid），依次是两个控制点（leftSide与当前的nextLeftSideMid），最后一个锚点（nextLeftSideMid），因为我们只需要3个顶点，所以将最后的锚点和第二个控制点设置成同一个。接着来绘制右侧的边，第一个锚点（但前的nextRightSideMid），两个控制点（rightSide与上一个的nextRightSideMid）最后一个锚点（上一个的nextRightSideMid），原理同上。最后定义一个锚点（上一个的nextLeftSideMid），是为了让图形闭合。

为了让彩带更加的具有交互性，我们让速度影像radius的大小（彩带宽度），这样不同的速度就会绘制出不一样宽度的彩带。

#### 代码实现：
创建4个processing文件，分别是Ribbon2D.pde，RibbonParticle.pde，Ribbon.pde，RibbonManager.pde
```processing
Ribbon2D.pde           // 主程序代码
RibbonParticle.pde // 定义 彩带片段 类
Ribbon.pde               // 定义 彩带 类
RibbonManager.pde   // 定义 彩带管理 类
```
在**Ribbon2D.pde**文件里填入一下代码：
```processing
// 彩带参数
int ribbonAmount = 5;                  // 彩带条数
int ribbonParticleAmount = 20;   // 彩带粒子数量
float randomness = .2;                 // 舞动程度
color []ribbonColors ={               // 彩带颜色组
  color(236, 164, 43), 
  color(242, 200, 80), 
  color(255, 111, 21), 
  color(248, 244, 207)};

RibbonManager ribbonManager;

// 初始化设置
void setup() {
  size(640, 480);
  noStroke();
  smooth();
  frameRate(30);

  ribbonManager = new RibbonManager(ribbonAmount, ribbonParticleAmount, randomness);

  // 彩带最大宽度 default = 8
  ribbonManager.setRadiusMax(12);
  // 彩带宽度和distance(或速度)的比率 default = 10
  ribbonManager.setRadiusDivide(10);  
  // 重力 default = .03
  ribbonManager.setGravity(.2);       
}

// 运行程序
void draw() {
  background(5, 1, 10);
  ribbonManager.update(mouseX, mouseY);
}
```
**RibbonParticle.pde**里是之前讲解的彩带片段原理，先看下代码结构：
```processing
class RibbonParticle {
  // 参数

  // 构造函数
  RibbonParticle(float x, float y, float _randomness, Ribbon _ribbon) {
    randomness = _randomness;
    radius =10;
    ribbon =_ribbon;
    /*
     * 初始化
     */
  }

  // 数据更新 
  void calc(RibbonParticle before, RibbonParticle next, int particleMax, int i) {
    /*
     * 计算各个位置，宽度数据
     */
  }
}

```
接下来看下详细的代码：
```processing
class RibbonParticle {
  // 位置,速度
  PVector pos, vel;

  // pos 与前一个的pos的中点,与后一个的pos的中点
  PVector left_mid, right_mid;

  // 宽度 左侧端点,右侧端点
  PVector left_side, right_side;

  // 当前left_side与下一个的left_side的中点 , 
  //    right_side与下一个的right_side的中点
  PVector next_left_side_mid, next_right_side_mid;

  float radius;         // 宽度
  float randomness;  // 彩带舞动程度

  Ribbon ribbon;

  /*
   * 构造函数
   *                   x : 坐标x
   *                   y : 坐标y
   * _randomness : 舞动程度
   *          Ribbon : 父级,为属于同一个Ribbon的Particle设置属性
   */
  RibbonParticle(float x, float y, float _randomness, Ribbon _ribbon) {
    randomness = _randomness;
    radius =10;
    ribbon =_ribbon;

    // 初始化
    pos = new PVector(x, y);
    vel = new PVector();

    left_mid = new PVector();
    right_mid = new PVector();

    left_side = new PVector();
    right_side = new PVector();

    next_left_side_mid = new PVector();
    next_right_side_mid = new PVector();
  }

  /*
   * 数据更新
   *         before : 前一个Particle
   *             next : 后一个Particle
   * particleMax : Particle的最大个数
   *                   i : 当前Particle处于列表的index
   */
  void calc(RibbonParticle before, RibbonParticle next, int particleMax, int i) {

    float div=2;
    // 与前一个的中点
    left_mid=PVector.add(before.pos, pos).div(div); 
    // 与后一个的中点 
    right_mid=PVector.add(pos, next.pos).div(div);   
    
    // 中点的向量
    PVector dir=PVector.sub(right_mid, left_mid);
    // 中点的距离
    float distance=dir.mag(); 
    // 中点的方向
    dir.normalize();

    // 重力
    vel.y += ribbon.gravity; 
    pos.add(vel);

    // X轴的随机变化
    float randX=random(-randomness/2, randomness/2) * distance;
    // Y轴的随机变化
    float randY=random(-randomness/2, randomness/2) * distance;
    pos.add(randX,randY);

    // 彩带前半段受速度影响,后半段每次计算变窄(之前的0.9),
    if (i < particleMax / 2) {
      radius *= 0.9;
    } else {
      radius = distance / ribbon.radiusRatio;
    }
    
    // 限制最大宽度
    if (radius>ribbon.radiusMax) radius = ribbon.radiusMax;

    if ( i==3 || i == particleMax-3 ) {
      if (radius > 1) radius = 1;
    }
    
    // 宽度 左侧端点
    left_side = PVector.add(pos, dir.copy().rotate(-PI/2).mult(radius) );
    // 宽度 右侧侧端点
    right_side = PVector.add(pos, dir.copy().rotate(PI/2).mult(radius) );

    // left_side与下一个的left_side的中点
    next_left_side_mid = PVector.add(next.left_side, left_side).div(div);
    // right_side与下一个的right_side的中点
    next_right_side_mid = PVector.add(next.right_side, right_side).div(div);
  }
}
```
**Ribbon.pde**内是定义的彩带类，用来将彩带片段整理成整条的彩带，结构如下
```processing
class Ribbon {
  //属性
  ArrayList<RibbonParticle> particles = new  ArrayList<RibbonParticle> ();  //粒子数组
  
  // 构造函数
  Ribbon(int amount, color col, float randomness) { }
  
  // 运行
  void run(float x, float y) { }
  
  // 添加彩带粒子
  void addParticle(float x, float y) { }
  
  // 绘制彩带
  void display() {   
    /*
     * 彩带粒子更新数据
     */ 
     
    /*
     * 彩带显示
     */ 
  }
}
```
具体代码：
```processing
// 彩带类
class Ribbon {
  int amount;                         // 粒子最大数
  float randomness = 0.2;     // 随机程度
  float radiusMax = 8;          // 彩带最大宽度
  float radiusRatio = 10.0;  // 彩带宽度和distance(或速度)的比率
  float gravity = .2;            // 所受重力 
  color col;                          // 彩带颜色

  //粒子数组
  ArrayList<RibbonParticle> particles = new  ArrayList<RibbonParticle> ();
  
  // 构造函数
  Ribbon(int amount, color col, float randomness) {
    this.amount = amount;
    this.col = col;
    this.randomness = randomness;
  }
  
  // 运行
  void run(float x, float y) {
    addParticle(x, y); // 添加Particle
    display();              // 显示
  }
  
  // 添加彩带粒子
  void addParticle(float x, float y) {
    // 如果(已生成数<最大数)添加粒子,否则更新数组 
    if (particles.size() < amount) {
      particles.add(new RibbonParticle(x, y, randomness, this));
    } else {
      particles.remove(0);
      particles.add(new RibbonParticle(x, y, randomness, this));
    }
  }
  
  // 绘制彩带
  void display() {
    
    // 彩带粒子更新数据
    for (int i=1; i<particles.size()-1; i++) {
      // 去掉数组第一个和最后的粒子,第一个没有previous,最后没有next
      particles.get(i).calc(particles.get(i-1), particles.get(i+1), amount, i);
    }
    
    noStroke();
    fill(col);
    
    // 绘制
    for (int i = particles.size()-1; i > 1-1; i--) { 
      RibbonParticle bef= particles.get(i-1);  // 前一个
      RibbonParticle self= particles.get(i);  // 当前自己
      if ( i < particles.size()-3 ) {
        beginShape();
        /* 左侧的边 */
        // 前一个 左边中点
        vertex(bef.next_left_side_mid.x, bef.next_left_side_mid.y); 
        bezierVertex(
          self.left_side.x,                 // 自身 左侧端点
          self.left_side.y, 
          self.next_left_side_mid.x, // 自身 左边中点
          self.next_left_side_mid.y, 
          self.next_left_side_mid.x, // 自身 左边中点
          self.next_left_side_mid.y
          );
        
        /* 右侧的边 */
        // 自身 右边中点
        vertex( self.next_right_side_mid.x, self.next_right_side_mid.y); 
        bezierVertex(                                                   
          self.right_side.x,               // 自身 右侧端点
          self.right_side.y, 
          bef.next_right_side_mid.x, // 前一个 右边中点
          bef.next_right_side_mid.y, 
          bef.next_right_side_mid.x, // 前一个 右边中点
          bef.next_right_side_mid.y
          );
        // 回到第一个点
        vertex(bef.next_left_side_mid.x, bef.next_left_side_mid.y);  // 前一个 左边中点
        endShape();
      }
    }
  }
}
```
**RibbonManager .pde**是用来管理的所有的彩带的类，结构如下：
```processing
class RibbonManager {
  // 参数
  
  // 构造函数
  RibbonManager(int ribbonAmount, int particleAmount, float randomness) { }
  
  // 添加彩带
  void addRibbon() { }
  
  // 更新数据
  void update(float currX, float currY) { }
  
  // 统一设置 彩带最大宽度
  void setRadiusMax(float value) { }
  
  // 统一设置 彩带宽度和distance(或速度)的比率
  void setRadiusDivide(float value) { }
  
  // 统一设置 重力
  void setGravity(float value) { }

}
```
具体的代码：
```processing
class RibbonManager {

  int ribbonAmount;      // 彩带条数
  int particleAmount;    // 彩带粒子数量
  float randomness;      // 舞动程度
  Ribbon []ribbons;      
  
  // 构造函数
  RibbonManager(int ribbonAmount, int particleAmount, float randomness) {
    this.ribbonAmount = ribbonAmount;
    this.particleAmount = particleAmount;
    this.randomness = randomness;
    addRibbon();
  }
  
  // 添加彩带
  void addRibbon() {
    ribbons = new Ribbon[ribbonAmount];
    for (int i = 0; i < ribbonAmount; i++){
      // 从颜色组里随机选取颜色
      color ribbonCol = ribbonColors[int(random(ribbonColors.length))];
      ribbons[i] = new Ribbon(particleAmount, ribbonCol, randomness);
    }
  }
  
  // 更新数据
  void update(float currX, float currY) {
    for (int i = 0; i < ribbonAmount; i++) {
      ribbons[i].run(currX, currY);
    }
  }
  
  // 统一设置 彩带最大宽度
  void setRadiusMax(float value) { 
    for (int i = 0; i < ribbonAmount; i++) { 
      ribbons[i].radiusMax = value;
    }
  }
  // 统一设置 彩带宽度和distance(或速度)的比率
  void setRadiusDivide(float value) { 
    for (int i = 0; i < ribbonAmount; i++) { 
      ribbons[i].radiusRatio = value;
    }
  }
  // 统一设置 重力
  void setGravity(float value) { 
    for (int i = 0; i < ribbonAmount; i++) { 
      ribbons[i].gravity = value;
    }
  }

}
```
