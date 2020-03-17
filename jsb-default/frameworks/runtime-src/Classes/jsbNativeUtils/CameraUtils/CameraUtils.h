//
//  CameraUtils.h
//  hello_world
//
//  Created by baichao hwang on 2019/12/18.
//

#ifndef CameraUtils_h
#define CameraUtils_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface CameraUtils: UIViewController

+ (instancetype)sharedSingleton;

-(BOOL)isCameraAllow;
-(void)liveCamera;
-(void)stopCamera;

@end

#endif /* AudioUtils_h */
