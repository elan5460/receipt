const app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:{
      scan:"../../images/index/scan.png",
      history:"../../images/index/history.png",
      add:"../../images/index/add.png",
      arrow:"../../images/index/arrow.png"
    },
    titles:[
        // {
        //   id:"1",  //根据type判断js添加啥字样
        //   title:"向书晗陕西师范大学陕西师范大学陕西师范大学陕西师范大学",
        //   detail:"邮箱：345592674@qq.com"  //太长做截取处理
        // },
    ],
    page:0,//todo 用于分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options === "refresh"){
      wx.request({
        url: urlModel.url.InvoiceTitleList,
        data: {
          "sessionId":app.globalData.sessionId,
          "page":that.data.page
        },
        method:"POST",
        success: function(res) {
          // console.log(res)
          if (res.data.code === 0){
            var data = res.data.data;
            console.log(data);
            that.setData({
              titles:data.titles
            })
          }else{
            //todo 失败
          }
        }
      })
    }else{
      app.login().then(()=>{
        wx.request({
          url: urlModel.url.InvoiceTitleList,
          data: {
            "sessionId":app.globalData.sessionId,
            "page":that.data.page
          },
          method:"POST",
          success: function(res) {
            // console.log(res)
            if (res.data.code === 0){
              var data = res.data.data;
              console.log(data);
              that.setData({
                titles:data.titles
              })
            }else{
              //todo 失败
            }
          }
        })}).catch(()=>{})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page:0
    });
    this.onLoad("refresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    this.setData({
      page:that.data.page + 1
    });
    this.onLoad("refresh")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  toTitleDisplay: function (e) {
    var titleId = e.currentTarget.dataset.id;
    console.log(e,titleId);
    wx.navigateTo({
      url:"../titleDisplay/titleDisplay?id="+titleId
    })
  },
  addTitle:function () {
    wx.navigateTo({
      url:"../titleEdit/titleEdit"
    })
  },
  scanCode:function () {
    var that = this;
    wx.scanCode({
      success (res) {
        if (res.scanType != 'DATA_MATRIX' &&
            res.scanType != 'PDF_417' && res.scanType != 'WX_CODE'
        ){//一维码 todo 二维码
          console.log(res.result);
          wx.navigateTo({
            url:"../getInvoice/getInvoice?code="+res.result
          })
        }
      }
    })
  },
  toHistory:function () {
    wx.navigateTo({
      url:"../historyReceipt/historyReceipt"
    })
  }
});