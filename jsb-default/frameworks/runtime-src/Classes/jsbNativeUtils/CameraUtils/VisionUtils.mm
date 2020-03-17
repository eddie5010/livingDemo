//
//  VisionUtils.m
//  WRScience-mobile
//
//  Created by HBC on 2020/3/16.
//


#import "VisionUtils.h"

@implementation VisionModel

- (NSMutableArray*)allPoints{
    if (!_allPoints) {
        _allPoints = [NSMutableArray array];
    }
    return _allPoints;
}

@end

@interface VisionUtils ()<AVCaptureVideoDataOutputSampleBufferDelegate>
@property(nonatomic,copy,class) VisionDatasBlock xxblock;
//@property(nonatomic,strong) UIView *superView;
//@property(nonatomic,strong) AVCaptureSession *session;/// 采集会话
//@property(nonatomic,strong) AVCaptureDeviceInput *videoInput;/// 视频输入流
//@property(nonatomic,strong) AVCaptureVideoDataOutput *dataOutput;/// 输出元数据流
//@property(nonatomic,strong) AVCaptureVideoPreviewLayer *previewLayer;/// 摄像头采集内容展示区域
@end

@implementation VisionUtils

+ (instancetype)sharedSingleton {
    static VisionUtils *_sharedSingleton = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // 要使用self来调用
        _sharedSingleton = [[self alloc] init];
    });
    return _sharedSingleton;
}

- (VNDetectFaceRectanglesRequest *)getDetectFaceRequest {
    if (!self.detectFaceRequest) {
        self.detectFaceRequest = [[VNDetectFaceRectanglesRequest alloc] initWithCompletionHandler:^(VNRequest * _Nonnull request, NSError * _Nullable error) {
            NSLog(@"获取到的人脸特征数据 count: %d",request.results.count);
        }];
    }
    return self.detectFaceRequest;
}

- (VNImageRequestHandler *)getDetectFaceRequestHandler {
    if (!self.detectFaceRequestHandler) {
//        self.detectFaceRequestHandler = [[VNImageRequestHandler alloc] initWithData:nullptr
//                                                                            options:nullptr];
    }
    return self.detectFaceRequestHandler;
}




//static VisionUtils *tool = nil;
static VisionDatasBlock _xxblock = nil;
+ (VisionDatasBlock)xxblock{
    if (_xxblock == nil) {
        _xxblock = ^void(NSArray*datas){ };
    }
    return _xxblock;
}
+ (void)setXxblock:(VisionDatasBlock)xxblock{
    if (xxblock != _xxblock) {
        _xxblock = [xxblock copy];
    }
}
/// 识别图片
+ (void)detectImageWithType:(DetectFaceType)type
                pixelBuffer:(CVPixelBufferRef)pixelBuffer
                      Block:(VisionDatasBlock)block {
    self.xxblock = block;
    
    VNImageRequestHandler *handler = [[VNImageRequestHandler alloc] initWithCVPixelBuffer:pixelBuffer
                                                                                  options:@{}];
    VNImageBasedRequest *request = [self detectRequestWithType:type
                                                   pixelBuffer:pixelBuffer];
    // 发送识别请求
    [handler performRequests:@[request]
                       error:nil];
}

+ (VNImageBasedRequest*)detectRequestWithType:(DetectFaceType)type
                                  pixelBuffer:(CVPixelBufferRef)pixelBuffer {
    VNImageBasedRequest *detectRequest = [[VNImageBasedRequest alloc]init];
    if (type == DetectFaceTypeRectanglesRequest) {
        detectRequest = [[VNDetectFaceRectanglesRequest alloc] initWithCompletionHandler:^(VNRequest * _Nonnull request, NSError * _Nullable error) {
            [self VNDetectFaceRectanglesRequest:request
                                    pixelBuffer:pixelBuffer];
        }];
    }else if (type == DetectFaceTypeLandmarksRequest) {
        detectRequest = [[VNDetectFaceLandmarksRequest alloc] initWithCompletionHandler:^(VNRequest * _Nonnull request, NSError * _Nullable error) {
            [self VNDetectFaceLandmarksRequest:request];
        }];
    }else if (type == DetectFaceTypeTextRectangles) {
        detectRequest = [[VNDetectTextRectanglesRequest alloc] initWithCompletionHandler:^(VNRequest * _Nonnull request, NSError * _Nullable error) {
            
        }];
        ((VNDetectTextRectanglesRequest*)detectRequest).reportCharacterBoxes = YES;// 设置识别具体文字
    }
    return detectRequest;
}

#pragma mark - 处理相关
// 处理人脸识别回调
+ (void)VNDetectFaceRectanglesRequest:(VNRequest*)request
                          pixelBuffer:(CVPixelBufferRef)pixelBuffer{
    _xxblock(({
        size_t width = CVPixelBufferGetWidth(pixelBuffer);
        size_t height = CVPixelBufferGetHeight(pixelBuffer);
        CGSize imageSize = CGSizeMake(width, height);
        NSMutableArray *temps = [NSMutableArray array];
        for (VNFaceObservation *observation in request.results) {
            NSValue *ractValue = [NSValue valueWithCGRect:convertRect(observation.boundingBox, imageSize)];
            [temps addObject:ractValue];
        }
        temps;
    }));
}
/**
 * 处理人脸特征回调
 * 仅获取鼻子相关数据
 */
+ (void)VNDetectFaceLandmarksRequest:(VNRequest *)request {
    _xxblock(({
        NSMutableArray *temps = [NSMutableArray array];
        NSArray *keys = getAllKeys([VNFaceLandmarks2D class], true);
        NSArray *modelKeys = getAllKeys([VisionModel class], true);
        for (VNFaceObservation *observation in request.results) {
            // 创建特征存储对象
            VisionModel *model = [[VisionModel alloc]init];
            for (NSString *key in keys) {
                // 过滤属性
                if ([key isEqualToString:@"noseCrest"] && [modelKeys containsObject:key]) {
                    // 得到对应细节具体特征
                    VNFaceLandmarkRegion2D *region2D = [observation.landmarks valueForKey:key];
                    [model.allPoints addObject:region2D];
                    // 特征存储对象进行存储
                    [model setValue:region2D
                             forKey:key];
                }
            }
            model.observation = observation;
            [temps addObject:model];
        }
        temps;
    }));
}


#pragma mark - 内部方法
static inline CGRect convertRect(CGRect rect, CGSize size){
    CGFloat w = rect.size.width * size.width;
    CGFloat h = rect.size.height * size.height;
    CGFloat x = rect.origin.x * size.width;
    CGFloat y = size.height - (rect.origin.y * size.height) - h;
    return CGRectMake(x, y, w, h);
}
/// 获取对象属性keys
static inline NSArray * getAllKeys(Class clazz, bool isProperty){
    NSMutableArray *keys = [NSMutableArray array];
    unsigned int count = 0;
    Ivar *vars = NULL;
    objc_property_t *propertys = NULL;
    const char *name;
    if (isProperty) {
        propertys = class_copyPropertyList(clazz, &count);
    }else{
        vars = class_copyIvarList(clazz, &count);
    }
    for (int i = 0; i < count; i++) {
        name = isProperty ? property_getName(propertys[i]) : ivar_getName(vars[i]);
        [keys addObject:[NSString stringWithUTF8String:name]];
    }
    free(vars);
    return keys.copy;
}

#pragma mark - 公用方法

+ (CGPoint)getNoseCenterPoint:(VNFaceLandmarkRegion2D *)noseCrest {
    // 遍历所有特征
    //    for (VNFaceLandmarkRegion2D *landmarks2D in points) {
    //        CGPoint points[noseCrest.pointCount];
    CGPoint point = CGPointZero;
    // 转换特征的所有点
    for (int i=0; i<noseCrest.pointCount; i++) {
        if(i!=3){
            continue;
        }
        point = noseCrest.normalizedPoints[i];
        //            CGFloat rectWidth = newImage.size.width * observation.boundingBox.size.width;
        //            CGFloat rectHeight = newImage.size.height * observation.boundingBox.size.height;
        //            points[i] = CGPointMake(point.x * rectWidth + observation.boundingBox.origin.x * newImage.size.width, observation.boundingBox.origin.y * newImage.size.height + point.y * rectHeight);
        NSLog(@"point is: [%f,%f]",point.x,point.y);
    }
    return point;
}



#pragma mark - AVCaptureVideoDataOutputSampleBufferDelegate
/// 获取输出
- (void)captureOutput:(AVCaptureFileOutput *)output
didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
       fromConnection:(AVCaptureConnection *)connection {
    @autoreleasepool {
        CVPixelBufferRef BufferRef = CMSampleBufferGetImageBuffer(sampleBuffer);
        VNDetectFaceRectanglesRequest *detectFaceRequest = [[VNDetectFaceRectanglesRequest alloc] init];
        VNImageRequestHandler *detectFaceRequestHandler = [[VNImageRequestHandler alloc]initWithCVPixelBuffer:BufferRef
                                                                                                      options:@{}];
        [detectFaceRequestHandler performRequests:@[detectFaceRequest]
                                            error:nil];
        /// 输出数据
        _xxblock(detectFaceRequest.results);
    }
}

@end
