Page({
  data: {
    show: false,
    back: false,
    textareac : false
  },
  onLoad: function () {

  },
  Start: function(){
    this.setData({
      show : true,
      back: true,
      textareac : true
    });
  },
  End:function(){
    this.setData({
      show: false,
      textareac : false
    });
  }
})
