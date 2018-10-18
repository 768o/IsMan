const app = getApp();
Page({
  data: {
    show: false,
    back: false,
    textareac : false,
    hour: 0,
    minute : 0,
    second : 0,
    nickName:"默认",
    millisecond : 0,
    int : null,
    rank:0,
    data2:[{
      Name:"null",
      Time:"0:0:0:0"
    }, {
        Name: "null",
        Time: "0:0:0:0"
    }]
  },
  onLoad: function () {
    var self = this;
    wx.request({
      url: 'http://193.112.7.152/api/values/Get',
      success(res){
        console.log(res.data);
        self.setData({
          data2:res.data
        })
        console.log(self.data.data2)
      }
    })
  },
  Start: function(e){
    console.log(e)
    this.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    this.setData({
      show : true,
      back: true,
      textareac : true
    });
    this.starttimer();
  },
  onGotUserInfo:function(e){
    console.log(e)
    if (e.detail.userInfo != null) {    //用户点击允许授权
    this.setData({
      nickName : e.detail.userInfo.nickName,
    })
    }
  },
  End:function(){
    var self = this;
    this.setData({
      show: false,
      textareac : false
    });
    clearInterval(this.data.int);
    var name = self.data.nickName || "NAN"
    wx.request({
      url: "http://193.112.7.152/api/values/Post?name=" + name
        + "&time=" + self.data.hour+":"+self.data.minute+":"+self.data.second+":"+  self.data.millisecond,
      success(res) {
        console.log(res)
        self.setData({
          rank:res.data + 1
        })
        self.onLoad()
      }
    })
  },
  starttimer(){
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
