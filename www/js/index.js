var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  onDeviceReady: function (status) {
    console.log(status);
  },
};

if (cordova.platformId == "android") {
  StatusBar.backgroundColorByHexString("#643328");
}

app.initialize();
