//
//  iOSNativeUtilsHelper.m
//
//  Created by baichao hwang on 2019/12/19.
//

#include "iOSNativeUtilsHelper.h"

#if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
#import "AudioUtils.h"
#import "CalendarUtils.h"
#import "CameraUtils.h"
#endif

#import "NativeUtilsKeyWord.h"


void iOSNativeUtilsHelper::liveAudioDecibel() {
    NSLog(@"请求麦克风权限并且实时计算声音分贝。");
    if([[AudioUtils sharedSingleton] isAudioAllow]){
        NSLog(@"获得麦克风权限");
        [[AudioUtils sharedSingleton] liveAnalyAudio];
    }
}

void iOSNativeUtilsHelper::stopAudioRecord(){
    [[AudioUtils sharedSingleton] stopAudioRecord];
}

void iOSNativeUtilsHelper::liveCamera(){
    if([[CameraUtils sharedSingleton] isCameraAllow]){
        [[CameraUtils sharedSingleton] liveCamera];
    }
}

void iOSNativeUtilsHelper::stopCamera(){
    [[CameraUtils sharedSingleton] stopCamera];
}


void iOSNativeUtilsHelper::openNativeCalendar(std::string lastBirth) {
//void iOSNativeUtilsHelper::openNativeCalendar(std::string lastBirth) {
//    NSLog(@"请求麦克风权限并且实时计算声音分贝。");
//    if([[AudioUtils sharedSingleton] isAudioAllow]){
//        NSLog(@"获得麦克风权限");
//        [[AudioUtils sharedSingleton] liveAnalyAudio];
//    }
//    NSLog(@"11111111111111:::::: %@", lastBirth);
    [[CalendarUtils sharedSingleton] openCalendar:[NSString stringWithCString:lastBirth.c_str()
                                                                     encoding:[NSString defaultCStringEncoding]]];
}

void iOSNativeUtilsHelper::closeNativeCalendar(){
    [[CalendarUtils sharedSingleton] closeCalendar];
}

std::string iOSNativeUtilsHelper::getUDID(){
    NSString* UDID = [[NSUserDefaults standardUserDefaults] objectForKey:WR_USER_UDID];
    return [UDID UTF8String];
}

std::string iOSNativeUtilsHelper::getVersion(){
    NSString* version = [[NSUserDefaults standardUserDefaults] objectForKey:WR_APP_VERSION];
    return [version UTF8String];
}

