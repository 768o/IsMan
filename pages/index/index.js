const app = getApp();
var interval = null;
Page({
  data : {
    longPressing : false,//是否长按中
    time : {},
    curRank : 0,
    ranks : []
  },
  onLoad : function () {
    this.SetTime(0,0,0,0);
    this.UpdateRank();
  },
  longPress : function(e){
    this.SetTime(0,0,0,0);
    this.setData({
      longPressing : true,
    });
    this.StartTimeInterval();
  },
  touchEnd : function(){
    if(this.data.longPressing){
      clearInterval(interval);
      var self = this;
      var ranks = app.globalData.ranks;
      var int_time = app.globalData.int_time;
      var str_time = this.GetStrTime();
      var curTimeNumber = this.CurTimeToNumber();
      for(var i=0; i<ranks.length;i++){
        if (curTimeNumber > int_time[i]){
          int_time.splice(i, 0, curTimeNumber) 
          ranks.splice(i, 0, str_time)
          this.setData({
            curRank : i + 1,
            longPressing: false
          })
          this.UpdateRank()
          return
        }
      }
      ranks.push(str_time)
      int_time.push(curTimeNumber)
      this.setData({
        curRank : ranks.length,
        longPressing : false
      })
      this.UpdateRank()
    }
  },
  UpdateRank:function(){
    this.setData({
      ranks : app.globalData.ranks
    })
  },
  CurTimeToNumber:function(){
    return this.data.time.hour * 3600000 + this.data.time.minute * 60000 + this.data.time.second * 1000 + this.data.time.millisecond;
  },
  StartTimeInterval:function(){
    var self = this
    interval = setInterval(function(){
      self.Timer()
    }, 10)
  },
  Timer:function(){
    var millisecond = this.data.time.millisecond + 10;
    var second = this.data.time.second;
    var minute = this.data.time.minute;
    var hour = this.data.time.hour;
    if (millisecond >= 1000){
      millisecond = 0;
      second += 1;
    }
    if (second >= 60) {
      second = 0;
      minute += 1;
    }
    if (minute >= 60) {
        minute =  0;
        hour += 1;
    }
    this.SetTime(hour, minute, second, millisecond);
  },
  SetTime: function (hour, minute, second, millisecond) {
    var self = this;
    this.setData({
      time: {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
      }
    });
  },
  GetStrTime : function(){
    return this.data.time.hour + ":" + this.data.time.minute + ":" + this.data.time.second + ":" + this.data.time.millisecond;
  }
})
