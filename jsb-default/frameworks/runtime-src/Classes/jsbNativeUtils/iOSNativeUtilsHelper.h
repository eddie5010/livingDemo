//
//  iOSNativeUtilsHelper.h
//
//  Created by baichao hwang on 2019/12/19.
//

#ifndef iOSNativeUtilsHelper_h
#define iOSNativeUtilsHelper_h

#ifdef __OBJC__
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#endif

#include <string>


/**
 *  这个类桥接C++与OC
 */
class iOSNativeUtilsHelper {
public:
    static void liveAudioDecibel();
    static void stopAudioRecord();
    
    static void liveCamera();
    static void stopCamera();
    
    static void openNativeCalendar(std::string lastBirth);
    static void closeNativeCalendar();
    
    static std::string getUDID();
    static std::string getVersion();
    
};

#endif /* iOSNativeUtilsHelper_h */
