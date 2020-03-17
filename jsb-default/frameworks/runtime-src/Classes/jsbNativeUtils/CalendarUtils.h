//
//  CalendarUtils.h
//  hello_world
//
//  Created by baichao hwang on 2019/12/18.
//

#ifndef CalendarUtils_h
#define CalendarUtils_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface CalendarUtils:NSObject
{
//    AVAudioRecorder *recorder;
//    NSTimer *levelTimer;
    
    //UIDatePicker
//    @property(nonatomic , strong)
//    NSCalendar *calendar;
//    NSDate *date;
//    NSDate *maximumDate;
//    UIDatePickerMode datePickerMode;
    UIDatePicker * datePicker;
    UIView *cellView;
    
   
}

+ (instancetype)sharedSingleton;

-(void)openCalendar:(NSString*) lastBirth;
-(void)closeCalendar;
//-(void)liveAnalyAudio;
//-(void)stopAudioRecord;

@end

#endif /* CalendarUtils_h */
