const app = getApp();
var islong = false;
Page({
  data: {
    show: false,
    back: false,
    hour: 0,
    minute : 0,
    second : 0,
    millisecond : 0,
    int : null,
    rank:0,
    data2:[]
  },
  onLoad: function () {
    
  },
  Start: function(e){
    this.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    this.setData({
      show : true,
      back: true,
    });
    this.startTimeInterval();
    islong = true;
  },
  End:function(){
    if(islong){
      var self = this;
      this.setData({
        show: false,
      });
      clearInterval(this.data.int);
      var ranks = app.globalData.ranks;
      var inttime = app.globalData.inttime;
      var strtime = this.data.hour + ":" + this.data.minute + ":" + this.data.second + ":" + this.data.millisecond;
      var curTimeNumber = this.curTimeNumber();
      for(var i=0; i<ranks.length;i++){
        if (curTimeNumber > inttime[i]){
          inttime.splice(i, 0, curTimeNumber) 
          
          ranks.splice(i, 0, strtime)
          this.setData({
            rank : i + 1
          })
          this.UpdateRank()
          return
        }
      }
      ranks.push(strtime)
      inttime.push(curTimeNumber)
      this.setData({
        rank: ranks.length
      })
      this.UpdateRank()
      islong = false
    }
  },
  UpdateRank:function(){
    this.setData({
      data2: app.globalData.ranks
    })
  },
  curTimeNumber:function(){
    return this.data.hour * 3600000 + this.data.minute * 60000 + this.data.second * 1000 + this.data.millisecond;
  },
  startTimeInterval:function(){
    var self = this;
    var intt = setInterval(function(){
      self.timer()
    }, 10)
    this.setData({
      int : intt
    });
  },
  timer:function(){
    var mil = this.data.millisecond;
    this.setData({
      millisecond : mil + 10
    })
    if (this.data.millisecond >= 1000){
      var sec = this.data.second;
      this.setData({
        millisecond: 0,
        second : sec + 1
      })
    }
    if (this.data.second >= 60) {
      var min = this.data.minute;
      this.setData({
        minute: min + 1,
        second : 0
      })
    }

    if (this.data.minute >= 60) {
      var hou = this.data.hour;
      this.setData({
        minute: 0,
        hour: hou +1
      })
    }
  }
})
