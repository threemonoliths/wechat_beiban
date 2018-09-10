import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var  AMap: any; 
let pageNum = 2;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  pageNum = pageNum;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sanitizer: DomSanitizer
  ) {
  
  }
  ngOnInit() {
    this.getMap ();
  }

  push() {
    pageNum++;
    this.navCtrl.push(MapPage);
  }

  pop() {
    if (pageNum > 2) {
      pageNum--;
    }
    this.navCtrl.pop();
  }

  getMap(){
    let map = new AMap.Map('container', {
      resizeEnable: true,
      zoom:13,
      center: [116.294549,39.938246]
    });

    //标记北办位置
    var marker = new AMap.Marker({
      position: map.getCenter()

      
    });
    marker.setMap(map);
    // 设置鼠标划过点标记显示的文字提示
    marker.setTitle('北京市海淀区蓝靛厂南路59号玲珑花园6号楼2单元');

    // 设置label标签
    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
        content: "马钢北京办事处"
    });

    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    
})


    // 定位
    var my_marker = new AMap.Marker({
      position: map.getCenter()
    });
    marker.setMap(map);
    map.plugin('AMap.Geolocation', function () {
      let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      //geolocation.getCurrentPosition();
    });

 }
}
