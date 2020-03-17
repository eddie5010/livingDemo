//
//  AudioUtils.h
//  hello_world
//
//  Created by baichao hwang on 2019/12/18.
//

#ifndef AudioUtils_h
#define AudioUtils_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface AudioUtils:NSObject
{
    AVAudioRecorder *recorder;
    NSTimer *levelTimer;
}

+ (instancetype)sharedSingleton;

-(BOOL)isAudioAllow;
-(void)liveAnalyAudio;
-(void)stopAudioRecord;

@end

#endif /* AudioUtils_h */
