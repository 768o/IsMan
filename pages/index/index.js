Page({
  data: {
    show: false,
    back: false,
    textareac : false,
    hour: 0,
    minute : 0,
    second : 0,
    millisecond : 0,
    int : null
  },
  onLoad: function () {

  },
  Start: function(){
    this.setData({
      show : true,
      back: true,
      textareac : true
    });
    this.starttimer();
  },
  End:function(){
    this.setData({
      show: false,
      textareac : false
    });
  },
  starttimer(){
    var self = this;
    this.setData({
      int : setInterval(self.timer(), 50)
    })
  },
  timer:function(){
    var mil = this.data.millisecond;
    this.setData({
      millisecond : mil + 50
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
