//
//  CalendarUtils.m
//  hello_world-mobile
//
//  Created by baichao hwang on 2019/12/18.
//

#import "CalendarUtils.h"

#include "NativeUtilsJSBind.h"


@implementation CalendarUtils
{
    //UIDatePicker
    //    @property(nonatomic , strong) UIDatePicker * datepicker_text;
}


+ (instancetype)sharedSingleton {
    static CalendarUtils *_sharedSingleton = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // 要使用self来调用
        _sharedSingleton = [[self alloc] init];
    });
    return _sharedSingleton;
}

//-(BOOL)isAudioAllow {
//    return TRUE;
//}

-(void)openCalendar:(NSString*)lastBirth {
    NSLog(@"开启系统日历=========  %@",lastBirth);
    
    [self setupDateKeyPan:lastBirth];
}

-(void)closeCalendar{
    NSLog(@"OC ====== 关闭系统日历");
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    
    [datePicker removeTarget:self
                      action:@selector(dateChange:)
            forControlEvents:UIControlEventValueChanged];
    
    //设置时间格式
    formatter.dateFormat = @"yyyy-MM-dd";
    NSString *dateStr = [formatter  stringFromDate:datePicker.date];
    
    if(dateStr!=nil){
        updateCalendarData([dateStr UTF8String]);
    }
    
    UIWindow* keyWindow =[UIApplication sharedApplication].keyWindow;
    float _height = keyWindow.frame.size.height;
    [UIView animateWithDuration:0.3 animations:^{
        cellView.frame = CGRectMake ( 0,  _height, keyWindow.frame.size.width , keyWindow.frame.size.height);
    }];
    
    
}



- (void)setupDateKeyPan:(NSString*)lastBirth {
    UIWindow* keyWindow =[UIApplication sharedApplication].keyWindow;
    float _height = keyWindow.frame.size.height;
    if(cellView==nil){
        cellView = [[UIView alloc] init];
    }
    
    
    [keyWindow addSubview:cellView];
    cellView.frame = CGRectMake ( 0,  _height, keyWindow.frame.size.width , _height*0.4);
    cellView.layer.cornerRadius = 15;
    cellView.backgroundColor = [UIColor colorWithRed:1
                                               green:1
                                                blue:1
                                               alpha:0.8];
    [UIView animateWithDuration:0.3 animations:^{
        cellView.frame = CGRectMake ( 0,  _height*0.6, keyWindow.frame.size.width , keyWindow.frame.size.height);
    }];
    
    
    float _width = 320;
    float _x = keyWindow.frame.size.width/2-_width/2;
    
    if(datePicker==nil){
        datePicker = [[UIDatePicker alloc] initWithFrame:CGRectMake(_x,  20, _width, _height*0.4 - 40)];
        
        //        datePicker.text =[UIColor grayColor];
        [datePicker setValue:[UIColor blackColor]
                      forKey:@"textColor"];
    }
    
    
    //设置地区: zh-中国
    datePicker.locale = [NSLocale localeWithLocaleIdentifier:@"zh"];
    
    //设置日期模式(Displays month, day, and year depending on the locale setting)
    datePicker.datePickerMode = UIDatePickerModeDate;
    // 设置当前显示时间
    if(!lastBirth.length){
        [datePicker setDate:[NSDate date]
                   animated:YES];
    }
    else {
        NSDateFormatter *format = [[NSDateFormatter alloc] init];
        // 设置日期格式 为了转换成功
        format.dateFormat = @"yyyy-MM-dd";
        [datePicker setDate:[format dateFromString:lastBirth]
                   animated:YES];
    }
    
    // 设置显示最大时间（此处为当前时间）
    [datePicker setMaximumDate:[NSDate date]];
    
    //设置时间格式
    //监听DataPicker的滚动
    [datePicker addTarget:self
                   action:@selector(dateChange:)
         forControlEvents:UIControlEventValueChanged];
    
    [cellView addSubview:datePicker];
}


- (void)dateChange:(UIDatePicker *)datePicker {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    //设置时间格式
    formatter.dateFormat = @"yyyy-MM-dd";
    NSString *dateStr = [formatter  stringFromDate:datePicker.date];
    updateCalendarData([dateStr UTF8String]);
}





@end
