## Processing  2D彩带 一,颜色识别

效果gif

#### 一、准备:
>1. **了解 processing.video类库中的 摄像头Capture**
>2. **PImage pixels相关属性**
>3. **dsit()**

**(1) processing.video Capture**

   Capture用于存储和操作来自附加捕获设备(如照相机)的视频帧的数据类型。使用Capture.list()显示所有外部设备(相机)的名称。
```processing
// 构造方法
Capture(parent)
Capture(parent, requestConfig)  //通常使用
Capture(parent, requestWidth, requestHeight)
Capture(parent, requestWidth, requestHeight, frameRate)
Capture(parent, requestWidth, requestHeight, cameraName)
Capture(parent, requestWidth, requestHeight, cameraName, frameRate)

// 参数
parent         PApplet: 是谁在调用摄像头,通常使用“this”,至当前程序
requestConfig String[]: 配置信息的字符串数组
requestWidth       int: 宽度
requestHeight      int: 宽度
frameRate          int: 每秒要读取的帧数
cameraName      String:相机的名称

// 函数
start()     // 开始从所选设备捕获帧
available() // 在新的视频帧可用时返回“true”
start()     // 开始从所选设备捕获帧
stop()      // 停止从附加设备捕获帧
read()      // 读取当前视频帧
list( )     // 获取所有可用捕获设备(相机)的列表

// 事件函数
captureEvent()  // 每当设备具有一个可用的新帧时，都会调用captureEvent()
```
具体使用如下:
```processing
import processing.video.*;   //引用类库
Capture cam;                 //声明cam

void setup() {
  size(200, 200);
  String[] cameras = Capture.list();     //获取可用相机列表
  printArray(cameras );                  //控制台显示相机列表和其属性
  cam = new Capture(this, cameras[0]);   //使用第一个相机
  cam.start();                           //开始捕获帧
}

void draw() {
  image(cam, 0, 0);
}

//可用的新帧时,读取新帧
void captureEvent(Capture c) {
  c.read();
}
```
了解更多 [https://processing.org/reference/libraries/video/](https://processing.org/reference/libraries/video/)


**(2)PImage**

用于存储图像的数据类型。会使用到pixels[] , width , height , loadPixels()

```
pixels[] //包含图像中每个像素的颜色的数组
Width    //图像宽度
Height   //图像高度
```
**在使用pixels[]数组之前，一定确保对图像使用loadPixels()方法，以确保正确加载了像素数据**
loadPixels()  将图像的像素数据加载到其像素[]数组中,这里看下这几个属性的使用,如下:
```processing
/*
 *   将图片黑白处理
 *   亮度大于中间值的像素变成白色
 *   亮度小于中间值的像素变成黑色
 */
PImage img;  //声明img

void setup() {
  size(100, 100);
  img= loadImage("test.jpg");              //加载图片
  int dimension = img.width * img.height;  //计算 pixels长度

  img.loadPixels();                        // 加载pixels
  for (int i = 0; i < dimension; i ++) {
    color col=img.pixels[i];
    if (brightness(col)>128) {
      img.pixels[i]=color(255);            //亮度 > 128 --> 白色
    } else {
      img.pixels[i]=color(0);              //亮度 < 128 --> 黑色
    }
  }
  img.updatePixels();                      // 更新pixels
}

void draw() {
  image(img, 0, 0); //显示照片
}
```
了解更多 [https://processing.org/reference/PImage.html](https://processing.org/reference/PImage.html)


**(3)dist 计算两点之间的距离**
```processing
float distance2D = dist(x1, y1, x2, y2);          // 2d 返回(x1,y1)与(x2,y2)的距离
float distance3D = dist(x1, y1, z1, x2, y2, z2);  // 3d 返回(x1,y1,z1)与(x2,y2,z2)的距离
```
***
#### 二、原理分析

**1.计算颜色相似度,判断并记录符合条件的像素的x,y 坐标**
针对单独一帧图像分析,我们需要将这一帧的每一个pixel颜色进行对比判断,看颜色是否符合trackColor(跟踪颜色)选取范围,将符合一定范围的颜色判断是跟踪的颜色.
我们先分析下 pixels[]颜色数组,pixels[]储存了副画面的每个像素的颜色信息,pixels[]的长度 width*height,如果我们想获取(3,2)point的颜色就是pixels[13],用当前的 纵坐标(y)*宽度(width)+横坐标(x),原理如下:

**2,计算颜色与目标颜色(trackColor)之间的相似度**
color(R,G,B)与三维坐标(x,y,z)很相似,如果我们将RGB转换到三维中,效果如图所示,将currentColor(当前颜色)与trackColor(跟踪颜色)看成两个点,其实可以看出,那当”两点”之间的距离越短的时候,颜色就越相近,这样就可以使用dist函数返回颜色的相似度.

现在我们了解了如何找到图像(x,y)的颜色与和如何求两个颜色相似度.将符合的x,y 坐标记录下来,接下来我们就先来实现这部分代码:

代码如下:
```processing
video.loadPixels();   // 使用pixels之前,一定要先加载
// for循环嵌套遍历 像素
for (int x = 0; x < video.width; x++ ) {
  for (int y = 0; y < video.height; y++ ) {
    int loc = x + y * video.width;
    // 当前颜色
    color currentColor = video.pixels[loc];
    float r1 = red(currentColor);
    float g1 = green(currentColor);
    float b1 = blue(currentColor);
    // 目标颜色
    float r2 = red(trackColor);
    float g2 = green(trackColor);
    float b2 = blue(trackColor);
    // 相似度(越小越相近)
    float d = dist(r1, g1, b1, r2, g2, b2);
    // 颜色符合进行接下来的处理
    if (d < threshold) {
      /*
       * 后续处理
       */
    }
  }
}

```
下一步,整理符合条件的(x,y),通过算法处理,计算出跟踪颜色的范围和稳定的位置.我们来分析下其中原理.

img

每次循环,当第一次检测到跟踪颜色,创建一个Box,用minx,maxx,miny,maxy,属性来计算这个box的大小distThreshold 来存储距离临界值.计算每次检测到的跟踪颜色的(x,y)与box的中心点的距离,如果小于distThreshold 则添加进来.从新计算box的大小.distThreshold 决定的box的最大size.最后box的中心点就是我们跟踪颜色的位置啦.
***
#### 三、代码实现

**先看下代码的结构,创建了两个processing文件,ColorTrack.pde是程序的主要流程,Box.pde来定义的Box类,用来整合处理颜色的(x,y)坐标.**

1.在**ColorTrack.pde**里写出这些代码结构,我们等下来丰富它.
```processing
// 导入video类库
import processing.video.*;
Capture video;
Box box;

//程序初始化
void setup() {
video=new Capture(this, Capture.list()[0]);
  //if (video!=null)size(video.width, video.height);
  size(640, 480);
  video.start();
}
//程序逻辑
void draw() {
}

// 鼠标点击选取 trackColor(跟踪颜色)
void mousePressed() {}

// 摄像头有可用的新帧,事件函数
void captureEvent(Capture video) {
  video.read();
}
```
下面开始丰富丰富程序,在程序开始定义threshold(颜色相似临界值),distThreshold(距Box中心点距离临界值),trackColor(跟踪颜色)变量
```processing
float threshold = 35;                  // 颜色相似临界值
float distThreshold = 50;              // 距Box中心点距离临界值
color trackColor= color(255, 0, 0);         // 跟踪颜色
```
**setup()** 初始化里,设置摄像头属性和窗口大小
```processing
void setup() {
  // 摄像头初始化
  printArray(Capture.list());
  video=new Capture(this, Capture.list()[0]);
  //if (video!=null)size(video.width, video.height);
  size(640, 480);
  video.start();
}
```
**draw()** 主体程序填入以下代码
```processing
void draw() {
  // 显示摄像头画面
  image(video, 0, 0, video.width, video.height);
  // 是否是第一次检测到跟踪颜色
  boolean found = false;
  // 开始循环遍历每个像素
  video.loadPixels();   // 使用pixels之前,一定要先加载
  for (int x = 0; x < video.width; x++ ) {
    for (int y = 0; y < video.height; y++ ) {
      int loc = x + y * video.width;
      // 当前颜色
      color currentColor = video.pixels[loc];
      float r1 = red(currentColor);
      float g1 = green(currentColor);
      float b1 = blue(currentColor);
      // 目标颜色
      float r2 = red(trackColor);
      float g2 = green(trackColor);
      float b2 = blue(trackColor);
      // 相似度(越小越相近)
      float d = dist(r1, g1, b1, r2, g2, b2);
      // 颜色符合进行接下来的处理
      if (d < threshold) {
        // 如果是第一个,创建Box,否则就是已经创建了Box
        //  判断(x,y)是否在 distThreshold 范围内,执行add()
        if (!found) {
          box = new Box(x, y);
          found = true;
        } else {
          if (box.isNear(x, y)) {
            box.add(x, y);
            break;
          }
        }
      }
    }
  }

  // 创建了Box并且size > 500时,显示Box
  if (box!=null && box.size() > 500) {
    box.show();
    PVector center=box.getCenter();
    ellipse(center.x, center.y, 10, 10);
  }
}

```
**mousePressed()** 选择跟踪颜色:
```processing
void mousePressed() {
  // 鼠标点击位置坐标
  int loc = mouseX + mouseY*video.width;
  trackColor = video.pixels[loc];
}
```

**加下来看下Box.pde的代码机构:**
```processing
class Box {
  // 属性
  float minx,miny,maxx,maxy;

  // 构造函数
  Box(float x, float y) {}

  // 显示Box大小
  void show() {}

  // 添加新的(x,y),并从新计算Box大小
  void add(float x, float y) {}

  // 返回 Box大小
  float size() {}

  // 返回 中心点
  PVector getCenter(){}

  // 返回 (x,y)是否在 distThreshold 内
  boolean isNear(float x, float y) {}
}

```

具体实现代码:

```processing
class Box {
  // 左上(minx,miny)
  float minx;
  float miny;
  // 右下(maxx,maxy)
  float maxx;
  float maxy;

  // 构造函数
  Box(float x, float y) {
    minx = x;
    miny = y;
    maxx = x;
    maxy = y;
  }

  // 显示Box大小
  void show() {
    stroke(0);
    fill(255);
    strokeWeight(2);
    rectMode(CORNERS);
    rect(minx, miny, maxx, maxy);
  }

  // 添加新的(x,y),并从新计算Box大小
  void add(float x, float y) {
    // 左上 取小
    minx = min(minx, x);
    miny = min(miny, y);
    // 右下 取大
    maxx = max(maxx, x);
    maxy = max(maxy, y);
  }

  // 返回 Box大小
  float size() {
    return (maxx-minx)*(maxy-miny);
  }

  // 返回 中心点
  PVector getCenter(){
    return new PVector((minx+maxx)/2,(miny+maxy)/2);
  }

  // 返回 (x,y)是否在 distThreshold 内
  boolean isNear(float x, float y) {
     float cx = (minx+maxx)/2;
     float cy = (miny+maxy)/2;
     float d = dist(cx, cy, x, y);

    if (d < distThreshold) {
      return true;
    } else {
      return false;
    }
  }
}
```
