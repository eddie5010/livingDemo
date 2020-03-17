window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  NativeUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95a78/dsv5MkLVsSCgYoCSn", "NativeUtils");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var g_utilInstance = null;
    var NativeUtils = function(_super) {
      __extends(NativeUtils, _super);
      function NativeUtils() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._utilObj = null;
        _this._UDID = null;
        _this._version = null;
        _this._isWechatInstalled = false;
        _this._hasGotWechatStatus = false;
        return _this;
      }
      NativeUtils_1 = NativeUtils;
      Object.defineProperty(NativeUtils, "instance", {
        get: function() {
          null == g_utilInstance && (g_utilInstance = new NativeUtils_1());
          return g_utilInstance;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NativeUtils.prototype, "utilObj", {
        get: function() {
          var self = this;
          if (!self._utilObj) {
            self._utilObj = new ns.NativeUtilsJSBind();
            ns.NativeUtilsJSBind.static_func();
          }
          return self._utilObj;
        },
        enumerable: true,
        configurable: true
      });
      NativeUtils.prototype.start = function() {
        var self = this;
      };
      NativeUtils.prototype.startAudioDecibel = function(CB) {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._startAudioDecibelJSB(CB) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._startAudioDecibelJSB = function(CB) {
        var self = this;
        console.log("\u5b9e\u65f6\u68c0\u6d4b\u8ba1\u7b97\u58f0\u97f3\u5206\u8d1d");
        var delegateObj = {
          onCallback: function(counter) {
            console.log("\u58f0\u97f3\u5206\u8d1d\u503c\u4e3a\uff1a", counter);
            CB && CB(counter);
          }.bind(this)
        };
        self.utilObj.setNumberCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.startAudioDecibel();
      };
      NativeUtils.prototype.stopAudio = function() {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._stopAudioJSB() : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype.audioUpdate = function() {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self.utilObj.audioUpdate() : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._stopAudioJSB = function() {
        var self = this;
        self.utilObj.stopAudioRecord();
      };
      NativeUtils.prototype.openNativeCalendar = function(lastBirth, CB) {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._openCalendarJSB(lastBirth, CB) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._openCalendarJSB = function(lastBirth, CB) {
        var self = this;
        console.log("\u8c03\u7528\u7cfb\u7edf\u65e5\u5386");
        var delegateObj = {
          onCallback: function(_setdate) {
            console.log("\u65e5\u5386\u6570\u636e\uff1a", _setdate);
            CB && CB(_setdate);
          }.bind(this)
        };
        self.utilObj.setStringCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.openNativeCalendar(lastBirth);
      };
      NativeUtils.prototype.closeNativeCalendar = function(CB) {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._closeCalendarJSB(CB) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._closeCalendarJSB = function(CB) {
        var self = this;
        console.log("\u5173\u95ed\u7cfb\u7edf\u65e5\u5386");
        var delegateObj = {
          onCallback: function(_setdate) {
            console.log("\u65e5\u5386\u6570\u636e\uff1a", _setdate);
            CB && CB(_setdate);
          }.bind(this)
        };
        self.utilObj.setStringCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.closeNativeCalendar();
      };
      Object.defineProperty(NativeUtils.prototype, "deviceID", {
        get: function() {
          var self = this;
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            if (self._UDID) return self._UDID;
            self._getUDIDJSB(null);
          } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return "";
          return "deviceid:not-native-device";
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NativeUtils.prototype, "version", {
        get: function() {
          var self = this;
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            if (self._version) return self._version;
            self._getVersionJSB();
          } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return "";
          return "web-version";
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NativeUtils.prototype, "isWechatInstalled", {
        get: function() {
          var self = this;
          if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
            if (self._hasGotWechatStatus) return self._isWechatInstalled;
            self._getWechatInstalledJSB();
          } else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) return true;
          return true;
        },
        enumerable: true,
        configurable: true
      });
      NativeUtils.prototype._getUDIDJSB = function(CB) {
        var self = this;
        var delegateObj = {
          onCallback: function(UDID) {
            console.log("js \u83b7\u53d6\u5230\u7684UDID\u4e3a\uff1a" + UDID);
            this._UDID = UDID;
            CB && CB(UDID);
          }.bind(this)
        };
        self.utilObj.setStringCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.getUDID();
      };
      NativeUtils.prototype._getVersionJSB = function() {
        var self = this;
        var delegateObj = {
          onCallback: function(version) {
            console.log("js \u83b7\u53d6\u5230\u7684version\u4e3a\uff1a" + version);
            this._version = version;
          }.bind(this)
        };
        self.utilObj.setStringCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.getVersion();
      };
      NativeUtils.prototype._getWechatInstalledJSB = function() {
        var self = this;
        var delegateObj = {
          onCallback: function(isWechatInstalled) {
            this._hasGotWechatStatus = true;
            console.log("js \u83b7\u53d6\u5230\u7684\u5fae\u4fe1\u662f\u5426\u5b89\u88c5\uff1f\uff1a" + isWechatInstalled);
            this._isWechatInstalled = isWechatInstalled;
          }.bind(this)
        };
        self.utilObj.setBoolCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.getWechatInstalledStatus();
      };
      NativeUtils.prototype.liveCamera = function(CB) {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._liveCameraJSB(CB) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._liveCameraJSB = function(CB) {
        var self = this;
        var delegateObj = {
          onCallback: function(pData, width, height, len) {
            CB && CB(pData, width, height, len);
          }.bind(this)
        };
        self.utilObj.setCameraCallback(delegateObj.onCallback, delegateObj);
        self.utilObj.liveCamera();
      };
      NativeUtils.prototype.stopCamera = function() {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self._stopCameraJSB() : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      NativeUtils.prototype._stopCameraJSB = function() {
        var self = this;
        self.utilObj.stopCamera();
      };
      NativeUtils.prototype.cameraUpdate = function() {
        var self = this;
        cc.sys.isBrowser || (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? self.utilObj.cameraUpdate() : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID);
      };
      var NativeUtils_1;
      NativeUtils = NativeUtils_1 = __decorate([ ccclass ], NativeUtils);
      return NativeUtils;
    }(cc.Component);
    exports.NativeUtils = NativeUtils;
    cc._RF.pop();
  }, {} ],
  SRabbitCoin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5181e+7ALxBlLJJB4Rb4wHF", "SRabbitCoin");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitCoin = function(_super) {
      __extends(SRabbitCoin, _super);
      function SRabbitCoin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.defaultCoinValue = 1;
        _this._hasGotValue = false;
        return _this;
      }
      SRabbitCoin.prototype.onLoad = function() {
        var self = this;
      };
      SRabbitCoin.prototype.start = function() {
        var self = this;
        self._hasGotValue = false;
      };
      SRabbitCoin.prototype.update = function(dt) {
        var self = this;
      };
      SRabbitCoin.prototype.showCoinWithAni = function() {
        var self = this;
        var _ani = self.node.getComponent(cc.Animation);
        _ani && _ani.setCurrentTime(0);
        self.node.active = true;
        self._hasGotValue = false;
      };
      SRabbitCoin.prototype.hideCoin = function() {
        var self = this;
        self.node.active = false;
      };
      Object.defineProperty(SRabbitCoin.prototype, "coin", {
        get: function() {
          var self = this;
          if (!self._hasGotValue) {
            self._hasGotValue = true;
            return self.defaultCoinValue;
          }
          return 0;
        },
        enumerable: true,
        configurable: true
      });
      __decorate([ property ], SRabbitCoin.prototype, "defaultCoinValue", void 0);
      SRabbitCoin = __decorate([ ccclass ], SRabbitCoin);
      return SRabbitCoin;
    }(cc.Component);
    exports.SRabbitCoin = SRabbitCoin;
    cc._RF.pop();
  }, {} ],
  SRabbitCommonDataDef: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1c3bB3KtFJLK7PFKtJ8EPm", "SRabbitCommonDataDef");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SpeedPerSecond = 40;
    exports.SpeedPerSecond = SpeedPerSecond;
    var SpeedDropPerSecond = 100;
    exports.SpeedDropPerSecond = SpeedDropPerSecond;
    var SpeedLineVScale = 5;
    exports.SpeedLineVScale = SpeedLineVScale;
    var JumpHighest = 650;
    exports.JumpHighest = JumpHighest;
    var CacheMapPosMaxCnt = 60;
    exports.CacheMapPosMaxCnt = CacheMapPosMaxCnt;
    var InputDataFrame = 100;
    var ItemNameGroup = function() {
      function ItemNameGroup() {}
      ItemNameGroup.Ground = "ground";
      ItemNameGroup.Monster = "monster";
      ItemNameGroup.Coin = "coin";
      ItemNameGroup.Target = "target";
      return ItemNameGroup;
    }();
    exports.ItemNameGroup = ItemNameGroup;
    var MoveDataObj;
    (function(MoveDataObj) {
      MoveDataObj[MoveDataObj["MoveOnly"] = 0] = "MoveOnly";
      MoveDataObj[MoveDataObj["Jump"] = 1] = "Jump";
    })(MoveDataObj = exports.MoveDataObj || (exports.MoveDataObj = {}));
    cc._RF.pop();
  }, {} ],
  SRabbitGameCameraCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10a2cH2uVpCyov0PnNhQOxA", "SRabbitGameCameraCtrl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitGameCameraCtrl = function(_super) {
      __extends(SRabbitGameCameraCtrl, _super);
      function SRabbitGameCameraCtrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.world = null;
        _this._viewSize = null;
        _this._targetBirthEdge = 0;
        _this._mapWidth = 0;
        _this._targetPos = null;
        _this._cameraPos = null;
        _this._cameraTmpX = 0;
        _this._designedWidth = 1624;
        return _this;
      }
      SRabbitGameCameraCtrl.prototype.onLoad = function() {
        var self = this;
        self._viewSize = cc.size(Math.round(cc.winSize.width), Math.round(cc.winSize.height));
      };
      SRabbitGameCameraCtrl.prototype.start = function() {
        var self = this;
        self._targetBirthEdge = self.target.getComponent("SRabbitPlayer").birthX;
        self._mapWidth = self.world.getComponent("SRabbitSceneViewRoot").mapWidth;
      };
      SRabbitGameCameraCtrl.prototype.update = function(dt) {
        var self = this;
        self._updateCameraPos();
      };
      SRabbitGameCameraCtrl.prototype._updateCameraPos = function() {
        var self = this;
        if (self._mapWidth <= 0 || self._targetBirthEdge <= 0) return;
        self._targetPos = self.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        self._cameraPos = self.node.parent.convertToNodeSpaceAR(self._targetPos);
        self._cameraTmpX = self._cameraPos.x + self._viewSize.width / 2 - self._targetBirthEdge;
        self._cameraTmpX + self._viewSize.width + (self._designedWidth - self._viewSize.width) / 2 < self._mapWidth && (self.node.x = self._cameraTmpX);
      };
      __decorate([ property(cc.Node) ], SRabbitGameCameraCtrl.prototype, "target", void 0);
      __decorate([ property(cc.Node) ], SRabbitGameCameraCtrl.prototype, "world", void 0);
      SRabbitGameCameraCtrl = __decorate([ ccclass ], SRabbitGameCameraCtrl);
      return SRabbitGameCameraCtrl;
    }(cc.Component);
    exports.default = SRabbitGameCameraCtrl;
    cc._RF.pop();
  }, {} ],
  SRabbitGameShareDataMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51ca6194DtBm7bucxRPCi44", "SRabbitGameShareDataMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var g_shareDataMgr = null;
    var SRabbitGameShareDataMgr = function(_super) {
      __extends(SRabbitGameShareDataMgr, _super);
      function SRabbitGameShareDataMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._backToLevelView = false;
        _this._levelDataArray = null;
        _this._currentLevelID = -1;
        return _this;
      }
      Object.defineProperty(SRabbitGameShareDataMgr, "instance", {
        get: function() {
          if (null == g_shareDataMgr) {
            g_shareDataMgr = new SRabbitGameShareDataMgr();
            g_shareDataMgr._initData();
            g_shareDataMgr._loadJson();
          }
          return g_shareDataMgr;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitGameShareDataMgr.prototype._initData = function() {
        var self = this;
        self._backToLevelView = false;
      };
      SRabbitGameShareDataMgr.prototype._loadJson = function() {
        var self = this;
        self._levelDataArray || (self._levelDataArray = []);
        self._levelDataArray.length = 0;
        for (var i = 0; i < 80; i++) {
          var _data = {
            levelID: i,
            levelName: i + 1 + "",
            getStar: 0,
            starMax: 3
          };
          self._levelDataArray[i] = _data;
        }
      };
      Object.defineProperty(SRabbitGameShareDataMgr.prototype, "allLevelData", {
        get: function() {
          var self = this;
          return self._levelDataArray;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitGameShareDataMgr.prototype, "levelDataCount", {
        get: function() {
          var self = this;
          return self._levelDataArray.length;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitGameShareDataMgr.prototype.getItemDataByLevelID = function(_ID) {
        var self = this;
        var _data = null;
        _ID >= 0 && _ID < self.levelDataCount && (_data = self._levelDataArray[_ID]);
        return _data;
      };
      Object.defineProperty(SRabbitGameShareDataMgr.prototype, "currentLevelID", {
        get: function() {
          var self = this;
          return self._currentLevelID;
        },
        set: function(_ID) {
          var self = this;
          self._currentLevelID = _ID;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitGameShareDataMgr.prototype, "nextLevelID", {
        get: function() {
          var self = this;
          if (self._currentLevelID + 1 < self.levelDataCount) return ++self._currentLevelID;
          return self._currentLevelID;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitGameShareDataMgr.prototype, "backToLevelView", {
        get: function() {
          var self = this;
          return this._backToLevelView;
        },
        set: function(toLevel) {
          var self = this;
          self._backToLevelView = toLevel;
        },
        enumerable: true,
        configurable: true
      });
      return SRabbitGameShareDataMgr;
    }(cc.Component);
    exports.SRabbitGameShareDataMgr = SRabbitGameShareDataMgr;
    cc._RF.pop();
  }, {} ],
  SRabbitGameView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16f37xr0WxNhJH8h8hAq/80", "SRabbitGameView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SRabbitGameShareDataMgr_1 = require("../Common/SRabbitGameShareDataMgr");
    var NativeUtils_1 = require("../Common/NativeUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitGameView = function(_super) {
      __extends(SRabbitGameView, _super);
      function SRabbitGameView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.liveCameraRoot = null;
        _this.liveSprite = null;
        _this.sceneRoot = null;
        _this._sceneScript = null;
        _this.playerNode = null;
        _this._playerScript = null;
        _this.backBtn = null;
        _this.playBtn = null;
        _this.coinNode = null;
        _this.coinLabel = null;
        _this.playProgressBar = null;
        _this.walkBtn = null;
        _this.jumpBtn = null;
        _this.settleRoot = null;
        _this._levelData = null;
        _this._isPlaying = false;
        _this._lastMoveTimeStamp = 0;
        _this._offsetToTarget = 0;
        _this._gotCoinCount = 0;
        _this.texture = null;
        return _this;
      }
      SRabbitGameView.prototype.onLoad = function() {
        var self = this;
        var _currentLevelID = SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.currentLevelID;
        self._levelData = SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.getItemDataByLevelID(_currentLevelID);
        console.log("\u8fdb\u5165\u6e38\u620f\u4e3b\u754c\u9762\uff0c\u5f53\u524d\u5173\u5361\u6570\u636e\u4e3a\uff1a0000000000");
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -640);
        self.liveSprite.node.active = false;
        self.walkBtn.node.active = false;
        self.jumpBtn.node.active = false;
        self._initData();
        self._adaptUI();
      };
      SRabbitGameView.prototype._adaptUI = function() {
        var self = this;
        var _spacingX = 20;
        var _safeArea = cc.sys.getSafeAreaRect();
        self.backBtn.node.x = _safeArea.x + .5 * self.backBtn.node.width + _spacingX;
        self.coinNode.x = _safeArea.x + _safeArea.width - .5 * self.coinNode.width - _spacingX;
      };
      SRabbitGameView.prototype._initData = function() {
        var self = this;
        self._isPlaying = false;
        self._gotCoinCount = 0;
        self._updateCoin(self._gotCoinCount);
      };
      SRabbitGameView.prototype._initScripts = function() {
        var self = this;
        self._sceneScript = self.sceneRoot.getComponent("SRabbitSceneViewRoot");
        if (self.playerNode) {
          self._playerScript = self.playerNode.getComponent("SRabbitPlayer");
          self._playerScript.setMapScript(self._sceneScript);
          self._playerScript.setGameViewScript(self);
          self._playerScript.setDieCB(function() {
            console.log("\u73a9\u5bb6\u6b7b\u4ea1\u56de\u8c03");
            this._isPlaying = false;
            this.stopGame();
            this._showSettle(false);
          }.bind(this));
          self._playerScript.setWinCB(function() {
            console.log("\u73a9\u5bb6\u80dc\u5229\u56de\u8c03");
            this._isPlaying = false;
            this.stopGame();
            this._showSettle(true);
          }.bind(this));
          self._playerScript.setCoinCB(function(coin) {
            console.log("\u73a9\u5bb6\u83b7\u5f97\u91d1\u5e01\uff1a" + coin);
            this._gotCoinCount += coin;
            console.log("\u73a9\u5bb6\u603b\u7684\u91d1\u5e01\uff1a" + this._gotCoinCount);
            this._updateCoin(this._gotCoinCount);
          }.bind(this));
        }
        var _settleScript = self.settleRoot.getComponent("SRabbitSettleView");
        _settleScript && _settleScript.setGameScript(self);
      };
      SRabbitGameView.prototype.start = function() {
        var self = this;
        self._initScripts();
        self._ctlShowStartUI(true);
        self._offsetToTarget = self._sceneScript.targetX - self._playerScript.rightX;
        self._activeLiveCamera();
      };
      SRabbitGameView.prototype._activeLiveCamera = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? NativeUtils_1.NativeUtils.instance.liveCamera(function(pData, width, height, len) {
          var self = this;
          self.texture || (self.texture = new cc.Texture2D());
          var spriteFrame = new cc.SpriteFrame();
          self.texture.initWithData(new Uint8Array(pData), cc.Texture2D.PixelFormat.RGB888, width, height);
          spriteFrame.setTexture(self.texture);
          spriteFrame.setRect(cc.rect(0, 0, width, height));
          self.liveSprite.spriteFrame = spriteFrame;
          self.liveSprite.node.width = width;
          self.liveSprite.node.height = height;
          self.liveSprite.node.active = true;
          self.liveSprite.node.scale = self.node.height / height;
        }.bind(this)) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID;
      };
      SRabbitGameView.prototype._stopCamera = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && WR && WR.NativeUtils && WR.NativeUtils.stopCamera();
      };
      SRabbitGameView.prototype.cameraUpdate = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && NativeUtils_1.NativeUtils.instance.cameraUpdate();
      };
      SRabbitGameView.prototype._activeAudioCollect = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? WR.NativeUtils.startAudioDecibel(function(decibel) {
          console.log("\u58f0\u97f3\u5b9e\u65f6\u5206\u8d1d\u4e3a\uff1a", decibel);
          this._analyseLiveAudioDecibel(decibel);
        }.bind(this)) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID;
      };
      SRabbitGameView.prototype._stopAudioCollect = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? WR.NativeUtils.stopAudio() : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID;
      };
      SRabbitGameView.prototype.audioUpdate = function() {
        var self = this;
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS && WR && WR.NativeUtils && WR.NativeUtils.audioUpdate();
      };
      SRabbitGameView.prototype.update = function(dt) {
        var self = this;
        self.cameraUpdate();
        if (!self.isPlaying) return;
        self._updatePlayProgress();
      };
      SRabbitGameView.prototype.backBtnFunc = function() {
        var self = this;
        self.stopGame();
        self._stopCamera();
        self._stopAudioCollect();
        cc.director.loadScene("SRabbitStartView", function() {}.bind(this));
      };
      SRabbitGameView.prototype.playBtnFunc = function() {
        var self = this;
        self._ctlShowStartUI(false);
        self.startGame();
      };
      SRabbitGameView.prototype.walkBtnFunc = function() {
        var self = this;
        self._localPlayerMoveHorizon();
      };
      SRabbitGameView.prototype.jumpBtnFunc = function() {
        var self = this;
        self._jumpFunc();
      };
      SRabbitGameView.prototype._jumpFunc = function() {
        var self = this;
        self._localPlayerMoveHorizon();
        self._playerScript && self._playerScript.jumpMove();
      };
      SRabbitGameView.prototype._localPlayerMoveHorizon = function() {
        var self = this;
        var _playerSpeed = 0;
        self._playerScript && (_playerSpeed = self._playerScript.speed);
        _playerSpeed > 0 && self._playerScript.move(_playerSpeed);
      };
      Object.defineProperty(SRabbitGameView.prototype, "isPlaying", {
        get: function() {
          var self = this;
          return self._isPlaying;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitGameView.prototype._showSettle = function(isWin) {
        var self = this;
        self.settleRoot.active = true;
        var _script = self.settleRoot.getComponent("SRabbitSettleView");
        _script.openSettle(isWin);
      };
      SRabbitGameView.prototype._ctlShowStartUI = function(isShow) {
        var self = this;
        self.playBtn.node.active = isShow;
        if (cc.sys.isBrowser) {
          self.walkBtn.node.active = !isShow;
          self.jumpBtn.node.active = !isShow;
        }
      };
      SRabbitGameView.prototype.startGame = function() {
        var self = this;
        self._isPlaying = true;
      };
      SRabbitGameView.prototype.stopGame = function() {
        var self = this;
      };
      SRabbitGameView.prototype.restartGame = function() {
        var self = this;
        self._gotCoinCount = 0;
        self._updateCoin(self._gotCoinCount);
        self._sceneScript && self._sceneScript.resetForNewGame();
        self._playerScript && self._playerScript.resetForNewGame();
        self._updatePlayProgress();
        self._ctlShowStartUI(true);
      };
      SRabbitGameView.prototype._analyseLiveAudioDecibel = function(decibel) {
        var self = this;
        console.log("\u5206\u8d1d\u503c\u4e3a\uff1a", decibel);
        if (decibel <= 40) return;
        decibel <= 70 ? self.walkBtnFunc() : self.jumpBtnFunc();
      };
      SRabbitGameView.prototype._updateCoin = function(count) {
        var self = this;
        count < 0 && (count = 0);
        self.coinLabel && (self.coinLabel.string = "\u91d1\u5e01\uff1a" + count);
      };
      SRabbitGameView.prototype._updatePlayProgress = function() {
        var self = this;
        if (self._offsetToTarget <= 0) return;
        var percent = 1 - (self._sceneScript.targetX - self._playerScript.rightX) / self._offsetToTarget;
        percent = percent < 0 ? 0 : percent;
        percent = percent > 1 ? 1 : percent;
        self.playProgressBar && (self.playProgressBar.getComponent(cc.ProgressBar).progress = percent);
      };
      __decorate([ property(cc.Node) ], SRabbitGameView.prototype, "liveCameraRoot", void 0);
      __decorate([ property(cc.Sprite) ], SRabbitGameView.prototype, "liveSprite", void 0);
      __decorate([ property(cc.Node) ], SRabbitGameView.prototype, "sceneRoot", void 0);
      __decorate([ property(cc.Node) ], SRabbitGameView.prototype, "playerNode", void 0);
      __decorate([ property(cc.Button) ], SRabbitGameView.prototype, "backBtn", void 0);
      __decorate([ property(cc.Button) ], SRabbitGameView.prototype, "playBtn", void 0);
      __decorate([ property(cc.Node) ], SRabbitGameView.prototype, "coinNode", void 0);
      __decorate([ property(cc.Label) ], SRabbitGameView.prototype, "coinLabel", void 0);
      __decorate([ property(cc.ProgressBar) ], SRabbitGameView.prototype, "playProgressBar", void 0);
      __decorate([ property(cc.Button) ], SRabbitGameView.prototype, "walkBtn", void 0);
      __decorate([ property(cc.Button) ], SRabbitGameView.prototype, "jumpBtn", void 0);
      __decorate([ property(cc.Node) ], SRabbitGameView.prototype, "settleRoot", void 0);
      SRabbitGameView = __decorate([ ccclass ], SRabbitGameView);
      return SRabbitGameView;
    }(cc.Component);
    exports.default = SRabbitGameView;
    cc._RF.pop();
  }, {
    "../Common/NativeUtils": "NativeUtils",
    "../Common/SRabbitGameShareDataMgr": "SRabbitGameShareDataMgr"
  } ],
  SRabbitGroundItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3bfe4DSzIxPv6X7CTqpwZE3", "SRabbitGroundItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitGroundItem = function(_super) {
      __extends(SRabbitGroundItem, _super);
      function SRabbitGroundItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._birthPos = null;
        return _this;
      }
      SRabbitGroundItem.prototype.onLoad = function() {
        var self = this;
        self._birthPos = cc.v2(self.node.x, self.node.y);
      };
      SRabbitGroundItem.prototype.start = function() {};
      SRabbitGroundItem.prototype.resetForNewGame = function() {
        var self = this;
        self.node.x = self._birthPos.x;
      };
      Object.defineProperty(SRabbitGroundItem.prototype, "birthXOffset", {
        set: function(newX) {
          var self = this;
          self._birthPos.x -= newX;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitGroundItem.prototype.update = function(dt) {
        var self = this;
        return;
      };
      SRabbitGroundItem = __decorate([ ccclass ], SRabbitGroundItem);
      return SRabbitGroundItem;
    }(cc.Component);
    exports.SRabbitGroundItem = SRabbitGroundItem;
    cc._RF.pop();
  }, {} ],
  SRabbitLevelDataDef: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2047IzG+RCx6pnZFbe8kEt", "SRabbitLevelDataDef");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SRabbitLevelDataDef = function() {
      function SRabbitLevelDataDef() {}
      return SRabbitLevelDataDef;
    }();
    exports.SRabbitLevelDataDef = SRabbitLevelDataDef;
    cc._RF.pop();
  }, {} ],
  SRabbitLevelItemNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aec8eEb7PZNXKm080XqwCFs", "SRabbitLevelItemNode");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitLevelItemNode = function(_super) {
      __extends(SRabbitLevelItemNode, _super);
      function SRabbitLevelItemNode() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this._CB = null;
        _this._itemData = null;
        return _this;
      }
      SRabbitLevelItemNode.prototype.start = function() {};
      SRabbitLevelItemNode.prototype.setData = function(_data) {
        var self = this;
        self._itemData = _data;
        self.levelLabel.string = self._itemData.levelName;
      };
      SRabbitLevelItemNode.prototype.getData = function() {
        var self = this;
        return self._itemData;
      };
      SRabbitLevelItemNode.prototype.setCB = function(_CB) {
        var self = this;
        self._CB = _CB;
      };
      SRabbitLevelItemNode.prototype.itemClickFunc = function() {
        var self = this;
        self._CB && self._CB(self._itemData);
      };
      __decorate([ property(cc.Label) ], SRabbitLevelItemNode.prototype, "levelLabel", void 0);
      SRabbitLevelItemNode = __decorate([ ccclass ], SRabbitLevelItemNode);
      return SRabbitLevelItemNode;
    }(cc.Component);
    exports.default = SRabbitLevelItemNode;
    cc._RF.pop();
  }, {} ],
  SRabbitLiveCameraViewRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80e57QVgvFLJKac0VYZr2VK", "SRabbitLiveCameraViewRoot");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitLiveCameraViewRoot = function(_super) {
      __extends(SRabbitLiveCameraViewRoot, _super);
      function SRabbitLiveCameraViewRoot() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.liveSprite = null;
        return _this;
      }
      SRabbitLiveCameraViewRoot.prototype.start = function() {};
      __decorate([ property(cc.Sprite) ], SRabbitLiveCameraViewRoot.prototype, "liveSprite", void 0);
      SRabbitLiveCameraViewRoot = __decorate([ ccclass ], SRabbitLiveCameraViewRoot);
      return SRabbitLiveCameraViewRoot;
    }(cc.Component);
    exports.default = SRabbitLiveCameraViewRoot;
    cc._RF.pop();
  }, {} ],
  SRabbitMonster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af19c8TyI5Lv5khsoo6JDQV", "SRabbitMonster");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MoveOffset = 50;
    var SRabbitMonster = function(_super) {
      __extends(SRabbitMonster, _super);
      function SRabbitMonster() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameViewRoot = null;
        _this._gameViewScript = null;
        _this.moveType = 0;
        _this._birthPos = null;
        _this._isLeft = true;
        _this._isUp = true;
        _this._leftEdge = 0;
        _this._rightEdge = 0;
        _this._upEdge = 0;
        _this._downEdge = 0;
        return _this;
      }
      SRabbitMonster.prototype.onLoad = function() {
        var self = this;
        self._isLeft = true;
        self._birthPos = cc.v2(self.node.x, self.node.y);
        self._updateEdge();
        self._gameViewScript = self.gameViewRoot.getComponent("SRabbitGameView");
      };
      SRabbitMonster.prototype.start = function() {};
      SRabbitMonster.prototype.resetForNewGame = function() {
        var self = this;
        self.node.x = self._birthPos.x;
      };
      Object.defineProperty(SRabbitMonster.prototype, "birthXOffset", {
        set: function(newX) {
          var self = this;
          self._birthPos.x -= newX;
          self._updateEdge();
        },
        enumerable: true,
        configurable: true
      });
      SRabbitMonster.prototype._updateEdge = function() {
        var self = this;
        self._leftEdge = self._birthPos.x - MoveOffset;
        self._rightEdge = self._birthPos.x + MoveOffset;
        self._upEdge = self._birthPos.y + 2 * MoveOffset;
        self._downEdge = self._birthPos.y;
      };
      SRabbitMonster.prototype.update = function(dt) {
        var self = this;
        self.moveType == MonsterMoveType.Left_Right ? self._autoMoveLeftRight() : self.moveType == MonsterMoveType.Only_Up && self._autoMoveUp();
      };
      SRabbitMonster.prototype._autoMoveLeftRight = function() {
        var self = this;
        var _speed = 1;
        if (self._isLeft) {
          var _newPos = self.node.x - _speed;
          if (_newPos < self._leftEdge) {
            self.node.x = self._leftEdge;
            self._isLeft = false;
          } else self.node.x = _newPos;
        } else {
          var _newPos = self.node.x + _speed;
          if (_newPos > self._rightEdge) {
            self.node.x = self._rightEdge;
            self._isLeft = true;
          } else self.node.x = _newPos;
        }
      };
      SRabbitMonster.prototype._autoMoveUp = function() {
        var self = this;
        var _speed = 1;
        if (self._isUp) {
          var _newPos = self.node.y + _speed;
          if (_newPos > self._upEdge) {
            self.node.y = self._upEdge;
            self._isUp = false;
          } else self.node.y = _newPos;
        } else {
          var _newPos = self.node.y - _speed;
          if (_newPos < self._downEdge) {
            self.node.y = self._downEdge;
            self._isUp = true;
          } else self.node.y = _newPos;
        }
      };
      __decorate([ property(cc.Node) ], SRabbitMonster.prototype, "gameViewRoot", void 0);
      __decorate([ property ], SRabbitMonster.prototype, "moveType", void 0);
      SRabbitMonster = __decorate([ ccclass ], SRabbitMonster);
      return SRabbitMonster;
    }(cc.Component);
    exports.SRabbitMonster = SRabbitMonster;
    var MonsterMoveType;
    (function(MonsterMoveType) {
      MonsterMoveType[MonsterMoveType["Left_Right"] = 0] = "Left_Right";
      MonsterMoveType[MonsterMoveType["Only_Up"] = 1] = "Only_Up";
    })(MonsterMoveType = exports.MonsterMoveType || (exports.MonsterMoveType = {}));
    cc._RF.pop();
  }, {} ],
  SRabbitPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "436beWKCYxONL8TjHPqIP5D", "SRabbitPlayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SRabbitCommonDataDef_1 = require("../Common/SRabbitCommonDataDef");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitPlayer = function(_super) {
      __extends(SRabbitPlayer, _super);
      function SRabbitPlayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._mapScript = null;
        _this._gameViewScript = null;
        _this._viewWidth = 0;
        _this._playerSize = null;
        _this._dieCB = null;
        _this._winCB = null;
        _this._coinCB = null;
        _this._lastStateTimeStamp = 0;
        _this._cacheMoveDataArray = null;
        _this._rigid = null;
        _this._updatePosIdx = 0;
        _this._initPos = null;
        return _this;
      }
      SRabbitPlayer.prototype.onLoad = function() {
        var self = this;
        self._initData();
      };
      SRabbitPlayer.prototype._initData = function() {
        var self = this;
        self._viewWidth = cc.winSize.width;
        self._playerSize = cc.size(self.node.width, self.node.height);
        self._lastStateTimeStamp = 0;
        self._cacheMoveDataArray = [];
        self._rigid = self.node.getComponent(cc.RigidBody);
        self._updatePosIdx = 0;
      };
      SRabbitPlayer.prototype.start = function() {
        var self = this;
        self._initPos = cc.v2(self.node.x, self.node.y);
      };
      SRabbitPlayer.prototype.update = function(dt) {
        var self = this;
        if (self._gameViewScript && self._gameViewScript.isPlaying) {
          if (self._checkDie()) {
            self._playerDie();
            return;
          }
          if (self._checkWin()) {
            self._playerWin();
            return;
          }
        }
        if (++self._updatePosIdx > 5) {
          self._updatePosIdx = 0;
          var _v = self._rigid.linearVelocity;
          _v.y -= 1;
          self._rigid.linearVelocity = _v;
        }
      };
      SRabbitPlayer.prototype._checkDie = function() {
        var self = this;
        if (self.node.y < -self._playerSize.height) {
          console.warn("\u89d2\u8272\u6b7b\u4ea1");
          return true;
        }
        return false;
      };
      SRabbitPlayer.prototype._checkWin = function() {
        var self = this;
        if (self.node.x + self._playerSize.width > self._mapScript.targetX && self.node.y >= self._mapScript.targetY) return true;
        return false;
      };
      SRabbitPlayer.prototype._playerDie = function() {
        var self = this;
        var _v = self._rigid.linearVelocity;
        _v.x = 0;
        self._rigid.linearVelocity = _v;
        self._dieCB && self._dieCB();
      };
      SRabbitPlayer.prototype._playerWin = function() {
        var self = this;
        self._winCB && self._winCB();
      };
      SRabbitPlayer.prototype._playerGotCoin = function(coinNode) {
        var self = this;
        if (!coinNode) return;
        var _script = coinNode.getComponent("SRabbitCoin");
        if (_script) {
          _script.hideCoin();
          var gotCoin = _script.coin;
          self._coinCB && self._coinCB(gotCoin);
        }
      };
      SRabbitPlayer.prototype.setMapScript = function(script) {
        var self = this;
        self._mapScript = script;
      };
      SRabbitPlayer.prototype.setGameViewScript = function(script) {
        var self = this;
        self._gameViewScript = script;
      };
      SRabbitPlayer.prototype.setDieCB = function(_CB) {
        var self = this;
        self._dieCB = _CB;
      };
      SRabbitPlayer.prototype.setWinCB = function(_CB) {
        var self = this;
        self._winCB = _CB;
      };
      SRabbitPlayer.prototype.setCoinCB = function(_CB) {
        var self = this;
        self._coinCB = _CB;
      };
      SRabbitPlayer.prototype.move = function(_speed) {
        var self = this;
        if (self._gameViewScript && self._gameViewScript.isPlaying) {
          self._updatePosIdx = 0;
          var v = self._rigid.linearVelocity;
          v.x = _speed * SRabbitCommonDataDef_1.SpeedLineVScale;
          self._rigid.linearVelocity = v;
        }
      };
      SRabbitPlayer.prototype.jumpMove = function() {
        var self = this;
        if (self._gameViewScript && self._gameViewScript.isPlaying) {
          self._updatePosIdx = 0;
          var _jumpSpeed = SRabbitCommonDataDef_1.SpeedDropPerSecond;
          var v = self._rigid.linearVelocity;
          v.y = _jumpSpeed * SRabbitCommonDataDef_1.SpeedLineVScale;
          self._rigid.linearVelocity = v;
        }
      };
      Object.defineProperty(SRabbitPlayer.prototype, "speed", {
        get: function() {
          var self = this;
          var _speed = SRabbitCommonDataDef_1.SpeedPerSecond;
          var newPos = self.node.x + _speed;
          newPos + self._playerSize.width > self._mapScript.mapWidth && (_speed = self._mapScript.mapWidth - self.node.x - self._playerSize.width);
          console.log("\u73a9\u5bb6\u79fb\u52a8\u7684\u8ddd\u79bb\uff1a", _speed);
          return _speed;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitPlayer.prototype, "birthX", {
        get: function() {
          var self = this;
          return self.node.x;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitPlayer.prototype, "leftX", {
        get: function() {
          var self = this;
          return self.node.x;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitPlayer.prototype, "rightX", {
        get: function() {
          var self = this;
          return self.node.x + self.node.width;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitPlayer.prototype.resetForNewGame = function() {
        var self = this;
        self._rigid.linearVelocity = cc.v2(0, -1);
        self._rigid.angularVelocity = 0;
        self.node.x = self._initPos.x;
        self.node.y = self._initPos.y;
      };
      SRabbitPlayer.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var self = this;
        otherCollider.node.name == SRabbitCommonDataDef_1.ItemNameGroup.Monster ? self._playerDie() : otherCollider.node.name == SRabbitCommonDataDef_1.ItemNameGroup.Target ? self._playerWin() : otherCollider.node.name == SRabbitCommonDataDef_1.ItemNameGroup.Coin && self._playerGotCoin(otherCollider.node);
        var _v = self._rigid.linearVelocity;
        _v.y = 0;
        self._rigid.linearVelocity = _v;
      };
      SRabbitPlayer.prototype.onEndContact = function(contact, selfCollider, otherCollider) {};
      SRabbitPlayer.prototype.onPreSolve = function(contact, selfCollider, otherCollider) {};
      SRabbitPlayer.prototype.onPostSolve = function(contact, selfCollider, otherCollider) {};
      SRabbitPlayer = __decorate([ ccclass ], SRabbitPlayer);
      return SRabbitPlayer;
    }(cc.Component);
    exports.SRabbitPlayer = SRabbitPlayer;
    cc._RF.pop();
  }, {
    "../Common/SRabbitCommonDataDef": "SRabbitCommonDataDef"
  } ],
  SRabbitSceneViewRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a4f2ddnQYNJfpBIRcUnr4pT", "SRabbitSceneViewRoot");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SRabbitCommonDataDef_1 = require("../Common/SRabbitCommonDataDef");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitSceneViewRoot = function(_super) {
      __extends(SRabbitSceneViewRoot, _super);
      function SRabbitSceneViewRoot() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.map = null;
        _this.targetNode = null;
        _this.coinRoot = null;
        _this._mapPosX = 0;
        _this._viewWidth = 0;
        _this._cacheMoveArray = null;
        _this._isMoving = false;
        return _this;
      }
      SRabbitSceneViewRoot.prototype.onLoad = function() {
        var self = this;
        self._initData();
      };
      SRabbitSceneViewRoot.prototype._initData = function() {
        var self = this;
        self._mapPosX = 0;
        self._viewWidth = cc.winSize.width;
        self._cacheMoveArray = [];
        self._isMoving = false;
      };
      SRabbitSceneViewRoot.prototype.start = function() {
        var self = this;
      };
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "halfViewWidth", {
        get: function() {
          var self = this;
          return self._viewWidth / 2;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "mapPosX", {
        get: function() {
          var self = this;
          console.log("\u5730\u56feX\u5750\u6807: ========", self._mapPosX);
          return self._mapPosX;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "mapWidth", {
        get: function() {
          var self = this;
          if (!self.map) return cc.winSize.width;
          return self.map.width;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "targetX", {
        get: function() {
          var self = this;
          if (!self.targetNode) return cc.winSize.width;
          return self.targetNode.x;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "targetY", {
        get: function() {
          var self = this;
          return self.targetNode.y;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(SRabbitSceneViewRoot.prototype, "speed", {
        get: function() {
          var self = this;
          var _speed = 0;
          console.log("map width: ", self.mapWidth);
          console.log("map x: ", self.mapPosX);
          _speed = self.mapWidth + self.mapPosX - self._viewWidth;
          _speed < 0 && (_speed = 0);
          _speed > SRabbitCommonDataDef_1.SpeedPerSecond && (_speed = SRabbitCommonDataDef_1.SpeedPerSecond);
          console.log("\u5730\u56fe\u79fb\u52a8\u8ddd\u79bb\uff1a", _speed);
          return _speed;
        },
        enumerable: true,
        configurable: true
      });
      SRabbitSceneViewRoot.prototype.move = function(_speed) {
        var self = this;
        self._cachePos(_speed);
      };
      SRabbitSceneViewRoot.prototype._cachePos = function(newX) {};
      SRabbitSceneViewRoot.prototype.resetForNewGame = function() {
        var self = this;
        for (var i = 0; i < self.coinRoot.childrenCount; i++) {
          var coin = self.coinRoot.children[i];
          if (coin) {
            var coinScript = coin.getComponent("SRabbitCoin");
            coinScript && coinScript.showCoinWithAni();
          }
        }
      };
      __decorate([ property(cc.Node) ], SRabbitSceneViewRoot.prototype, "map", void 0);
      __decorate([ property(cc.Node) ], SRabbitSceneViewRoot.prototype, "targetNode", void 0);
      __decorate([ property(cc.Node) ], SRabbitSceneViewRoot.prototype, "coinRoot", void 0);
      SRabbitSceneViewRoot = __decorate([ ccclass ], SRabbitSceneViewRoot);
      return SRabbitSceneViewRoot;
    }(cc.Component);
    exports.default = SRabbitSceneViewRoot;
    cc._RF.pop();
  }, {
    "../Common/SRabbitCommonDataDef": "SRabbitCommonDataDef"
  } ],
  SRabbitSettleView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08939GwKzFDL4jDt1JREqNu", "SRabbitSettleView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SRabbitSettleView = function(_super) {
      __extends(SRabbitSettleView, _super);
      function SRabbitSettleView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.winNode = null;
        _this.loseNode = null;
        _this.retruBtn = null;
        _this._gameScript = null;
        return _this;
      }
      SRabbitSettleView.prototype.start = function() {
        var self = this;
      };
      SRabbitSettleView.prototype.setGameScript = function(_script) {
        var self = this;
        self._gameScript = _script;
      };
      SRabbitSettleView.prototype.openSettle = function(isWin) {
        var self = this;
        self.winNode.active = isWin;
        self.loseNode.active = !isWin;
        self.node.active = true;
      };
      SRabbitSettleView.prototype._closeSettle = function() {
        var self = this;
        self.node.active = false;
        self.winNode.active = false;
        self.loseNode.active = false;
      };
      SRabbitSettleView.prototype.retryBtnClickFunc = function() {
        var self = this;
        self._gameScript && self._gameScript.restartGame();
        self._closeSettle();
      };
      __decorate([ property(cc.Node) ], SRabbitSettleView.prototype, "winNode", void 0);
      __decorate([ property(cc.Node) ], SRabbitSettleView.prototype, "loseNode", void 0);
      __decorate([ property(cc.Button) ], SRabbitSettleView.prototype, "retruBtn", void 0);
      SRabbitSettleView = __decorate([ ccclass ], SRabbitSettleView);
      return SRabbitSettleView;
    }(cc.Component);
    exports.default = SRabbitSettleView;
    cc._RF.pop();
  }, {} ],
  SRabbitStartView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfe44YNr/1O44sydfxAs9oF", "SRabbitStartView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SRabbitGameShareDataMgr_1 = require("../Common/SRabbitGameShareDataMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MaxRowCount = 10;
    var SRabbitStartView = function(_super) {
      __extends(SRabbitStartView, _super);
      function SRabbitStartView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startNode = null;
        _this.startBackBtn = null;
        _this.startStartBtn = null;
        _this.levelNode = null;
        _this.levelBackBtn = null;
        _this.levelScrollView = null;
        _this.levelContentLayout = null;
        _this._levelItemPrefab = null;
        _this._itemCreateIndex = 0;
        _this._itemCB = null;
        return _this;
      }
      SRabbitStartView.prototype.onLoad = function() {
        var self = this;
        var _levelDataArray = SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.allLevelData;
        self._itemCB = function(levelData) {
          console.log("ssssssssss======= " + levelData.levelID);
          SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.currentLevelID = levelData.levelID;
          cc.director.loadScene("SRabbitGameView", function(err) {
            console.error(err);
          });
        }.bind(this);
        self._loadPrefabs();
        console.log("===============");
        self._switchStartLevel(SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.backToLevelView);
        if (cc.sys.isMobile && window.jsb) {
          WR && null != WR.SubModuleManager && WR.SubModuleManager.hideLoadingView();
          WR && WR.AdapterUtils && WR.AdapterUtils.adaptCanvas(this.node.getComponent(cc.Canvas));
        }
      };
      SRabbitStartView.prototype.start = function() {
        var self = this;
      };
      SRabbitStartView.prototype.update = function(dt) {
        var self = this;
        self._levelItemPrefab && self._itemCreateIndex < SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.levelDataCount && self._frameCreateLevelItems();
      };
      SRabbitStartView.prototype.startBackFunc = function() {
        var self = this;
        console.log("back button clicked. \u56de\u5230\u4e3b\u5e73\u53f0");
        if (cc.sys.isMobile && window.jsb && WR && null != WR.SceneManager) {
          cc.log("\u56de\u5230\u4e3b\u5e73\u53f0");
          cc.js.unregisterClass(cc.js.getClassByName("SRabbitStartView"));
          cc.js.unregisterClass(cc.js.getClassByName("SRabbitLevelItemNode"));
          cc.loader.release("prefabs/levelItemNode");
          WR.SceneManager.gotoMain();
        }
      };
      SRabbitStartView.prototype.startStartFunc = function() {
        var self = this;
        self._switchStartLevel(true);
      };
      SRabbitStartView.prototype.levelBackFunc = function() {
        var self = this;
        self._switchStartLevel(false);
      };
      SRabbitStartView.prototype._switchStartLevel = function(isLevel) {
        var self = this;
        self.startNode.active = !isLevel;
        self.levelNode.active = isLevel;
        SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.backToLevelView = isLevel;
      };
      SRabbitStartView.prototype._loadPrefabs = function() {
        var self = this;
        cc.loader.loadRes("prefabs/levelItemNode", function(err, prefab) {
          if (err) return;
          this._levelItemPrefab = prefab;
        }.bind(self));
      };
      SRabbitStartView.prototype._frameCreateLevelItems = function() {
        var self = this;
        var _startTime = new Date().getTime();
        while (self._itemCreateIndex < SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.levelDataCount) {
          var _itemData = SRabbitGameShareDataMgr_1.SRabbitGameShareDataMgr.instance.getItemDataByLevelID(self._itemCreateIndex);
          if (!_itemData) {
            self._itemCreateIndex++;
            return;
          }
          var _itemNode = cc.instantiate(self._levelItemPrefab);
          var _itemHeight = _itemNode.height;
          var _itemScript = _itemNode.getComponent("SRabbitLevelItemNode");
          _itemScript.setData(_itemData);
          _itemScript.setCB(self._itemCB);
          self.levelContentLayout.node.addChild(_itemNode);
          var _layout = self.levelContentLayout.getComponent(cc.Layout);
          var _row = Math.ceil(self._itemCreateIndex / MaxRowCount);
          self.levelContentLayout.node.height = _itemHeight * _row + (_row - 1) * _layout.spacingY + _layout.paddingTop + _layout.paddingBottom;
          self._itemCreateIndex++;
          var _tmpTime = new Date().getTime();
          if (_tmpTime - _startTime > 5) break;
        }
      };
      __decorate([ property(cc.Node) ], SRabbitStartView.prototype, "startNode", void 0);
      __decorate([ property(cc.Button) ], SRabbitStartView.prototype, "startBackBtn", void 0);
      __decorate([ property(cc.Button) ], SRabbitStartView.prototype, "startStartBtn", void 0);
      __decorate([ property(cc.Node) ], SRabbitStartView.prototype, "levelNode", void 0);
      __decorate([ property(cc.Button) ], SRabbitStartView.prototype, "levelBackBtn", void 0);
      __decorate([ property(cc.ScrollView) ], SRabbitStartView.prototype, "levelScrollView", void 0);
      __decorate([ property(cc.Layout) ], SRabbitStartView.prototype, "levelContentLayout", void 0);
      SRabbitStartView = __decorate([ ccclass ], SRabbitStartView);
      return SRabbitStartView;
    }(cc.Component);
    exports.default = SRabbitStartView;
    cc._RF.pop();
  }, {
    "../Common/SRabbitGameShareDataMgr": "SRabbitGameShareDataMgr"
  } ]
}, {}, [ "NativeUtils", "SRabbitCommonDataDef", "SRabbitGameShareDataMgr", "SRabbitLevelDataDef", "SRabbitCoin", "SRabbitGameCameraCtrl", "SRabbitGameView", "SRabbitGroundItem", "SRabbitLiveCameraViewRoot", "SRabbitMonster", "SRabbitPlayer", "SRabbitSceneViewRoot", "SRabbitSettleView", "SRabbitLevelItemNode", "SRabbitStartView" ]);