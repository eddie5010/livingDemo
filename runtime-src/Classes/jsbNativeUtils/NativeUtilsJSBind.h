//
//  NativeUtilsJSBind.h
//  WRScience
//
//  Created by HBC on 2020/2/19.
//

#ifndef NativeUtilsJSBind_h
#define NativeUtilsJSBind_h

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"

bool js_register_ns_NativeUtilsJSBind(se::Object* global);

// 原生端触发通知js端，实时传递声音分贝参数----全局方法
void liveAudioDecibelCB(float audioDecibel);

// 原生端触发通知js端，返回玩家设置的日历信息
void updateCalendarData(std::string data);

// Native端通知JS端更新摄像头采集的画面信息
void updateCameraData(uint8_t* pData,int width, int height, long len);

#endif /* NativeUtilsJSBind_h */
