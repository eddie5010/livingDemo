//
//  CameraUtils.m
//  hello_world-mobile
//
//  Created by baichao hwang on 2019/12/18.
//

#import "CameraUtils.h"
#import "VCVideoCapturer.h"
#import "VisionUtils.h"

#include "NativeUtilsJSBind.h"

#define clamp(a) (a>255?255:(a<0?0:a))

static int CachePixelBuffMax = 3;

@interface CameraUtils ()  <VCVideoCapturerDelegate>

/** 视频采集 */
@property (nonatomic, strong) VCVideoCapturer *videoCapture;

@end

@implementation CameraUtils
{
    NSMutableArray* pixelBufferArray;
    size_t imageWidth;
    size_t imageHeight;
}

+ (instancetype)sharedSingleton {
    static CameraUtils *_sharedSingleton = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // 要使用self来调用
        _sharedSingleton = [[self alloc] init];
    });
    return _sharedSingleton;
}

/**
 * 摄像机是否授权
 */
-(BOOL)isCameraAllow {
    AVAuthorizationStatus videoStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (videoStatus == AVAuthorizationStatusAuthorized || videoStatus == AVAuthorizationStatusNotDetermined) {
        return TRUE;
    } else if (videoStatus == AVAuthorizationStatusDenied || videoStatus == AVAuthorizationStatusRestricted) {
        return FALSE;
    }
    return FALSE;
}


-(void)liveCamera {
    AVAuthorizationStatus videoStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (videoStatus == AVAuthorizationStatusAuthorized || videoStatus == AVAuthorizationStatusNotDetermined) {
        
        NSLog(@"相机已授权");
    }else if (videoStatus == AVAuthorizationStatusDenied || videoStatus == AVAuthorizationStatusRestricted) {
        NSLog(@"相机未授权");
        return;
    }
    
    // 初始化视频采集
    VCVideoCapturerParam *param = [[VCVideoCapturerParam alloc] init];
    param.sessionPreset = AVCaptureSessionPreset1280x720;
    param.frameRate=30;
    if ([[UIApplication sharedApplication] statusBarOrientation]==UIInterfaceOrientationLandscapeLeft){
        param.videoOrientation = AVCaptureVideoOrientationLandscapeLeft;
    }
    else if ([[UIApplication sharedApplication] statusBarOrientation]==UIInterfaceOrientationLandscapeRight) {
        param.videoOrientation = AVCaptureVideoOrientationLandscapeRight;
    }
    
    self.videoCapture = [[VCVideoCapturer alloc] initWithCaptureParam:param
                                                                error:nil];
    self.videoCapture.delegate = self;
    
    [self.videoCapture startCapture];
}

-(void)stopCamera {
    NSLog(@"停止摄像头信息采集");
    
    /**
     * 清理pixel缓存
     */
    [self clearPixelArray];
    
    [self.videoCapture stopCapture];
    [self.videoCapture.videoPreviewLayer removeFromSuperlayer];
}

- (void)clearPixelArray {
    [self->pixelBufferArray removeAllObjects];
}

-(void)cameraUpdate {
    
    /**
     * 检测人脸特征数据信息
     */
    if(!self->pixelBufferArray){
        NSLog(@"容器不存在");
        return;
    }
    if([self->pixelBufferArray count]<=0){
        NSLog(@"容器是空的");
        return;
    }
    NSData* firstObj = self->pixelBufferArray[0];
    
    CVImageBufferRef imageBuffer = [VisionUtils yuvPixelBufferWithData:firstObj
                                                                 width:self->imageWidth
                                                                heigth:self->imageHeight];
    CVPixelBufferLockBaseAddress(imageBuffer, 0);
    
    //    NSDate *datenow = [NSDate date];//现在时间,你可以输出来看下是什么格式
    //
    //    NSString *timeSp = [NSString stringWithFormat:@"%ld", (long)([datenow timeIntervalSince1970]*1000)];
    //    NSLog(@"time stamp 00000: %@", timeSp);
    
    /**
     * 检测人脸特征数据信息
     */
    VNDetectFaceRectanglesRequest *detectFaceRequest = [[VisionUtils sharedSingleton] getDetectFaceRequest];
    VNImageRequestHandler *detectFaceRequestHandler = [[VNImageRequestHandler alloc] initWithCVPixelBuffer:imageBuffer
                                                                                                   options:@{}];
    
    
    [detectFaceRequestHandler performRequests:@[detectFaceRequest]
                                        error:nil];
    
    if([detectFaceRequest results]){
        NSLog(@"鼻子的位置信息为：%lu",[[detectFaceRequest results] count]);
    }
    
    for (VNFaceObservation *faceObservation in [detectFaceRequest results]) {
        //boundingBox
        CGRect transFrame = [VisionUtils convertRect:faceObservation.boundingBox
                                                size:CGSizeMake(self->imageWidth, self->imageHeight)];
        
    }
    
    /**
     * 脸部特征信息使用完释放handler
     */
    CFRelease(detectFaceRequestHandler);
    
    
    /**
     * 数据交由上层JS端渲染
     */
    size_t width = CVPixelBufferGetWidth(imageBuffer);
    size_t height = CVPixelBufferGetHeight(imageBuffer);
    uint8_t* yBuffer =(uint8_t*) CVPixelBufferGetBaseAddressOfPlane(imageBuffer, 0);
    size_t yPitch = CVPixelBufferGetBytesPerRowOfPlane(imageBuffer, 0);
    uint8_t* cbCrBuffer = (uint8_t*)CVPixelBufferGetBaseAddressOfPlane(imageBuffer, 1);
    size_t cbCrPitch = CVPixelBufferGetBytesPerRowOfPlane(imageBuffer, 1);
    
    int bytesPerPixel = 3;
    uint8_t *rgbBuffer =(uint8_t*) malloc(width * height * bytesPerPixel);
    
    for(int y = 0; y < height; y++) {
        uint8_t *rgbBufferLine = &rgbBuffer[y * width * bytesPerPixel];
        uint8_t *yBufferLine = &yBuffer[y * yPitch];
        uint8_t *cbCrBufferLine = &cbCrBuffer[(y >> 1) * cbCrPitch];
        
        for(int x = 0; x < width; x++) {
            int16_t y = yBufferLine[x];
            int16_t cb = cbCrBufferLine[x & ~1] - 128;
            int16_t cr = cbCrBufferLine[x | 1] - 128;
            
            uint8_t *rgbOutput = &rgbBufferLine[x*bytesPerPixel];
            
            int16_t r = (int16_t)roundf( y + cr *  1.4 );
            int16_t g = (int16_t)roundf( y + cb * -0.343 + cr * -0.711 );
            int16_t b = (int16_t)roundf( y + cb *  1.765);
            
            rgbOutput[0] = clamp(r);
            rgbOutput[1] = clamp(g);
            rgbOutput[2] = clamp(b);
            //            rgbOutput[3] = 0xff;
        }
    }
    
    /// 输出数据
    updateCameraData(rgbBuffer, (int)width, (int)height, (long)width*height*bytesPerPixel);
    free(rgbBuffer);
    
    
    CVPixelBufferUnlockBaseAddress(imageBuffer, 0);
    CFRelease(imageBuffer);
    
    [self->pixelBufferArray removeObjectAtIndex:0];
    firstObj=nil;
    
    NSLog(@"缓存数据长度1111：%lu",[self->pixelBufferArray count]);
}

#pragma mark - 视频采集回调
- (void)videoCaptureOutputDataCallback:(CMSampleBufferRef)sampleBuffer
{
    if(!self->pixelBufferArray){
        self->pixelBufferArray=[[NSMutableArray alloc] initWithCapacity:0];
    }
    CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CVPixelBufferLockBaseAddress(imageBuffer,0);
    
    self->imageWidth = CVPixelBufferGetWidth(imageBuffer);
    self->imageHeight = CVPixelBufferGetHeight(imageBuffer);
    
    /**
     * 如果容器缓存超过预设帧数，则将较早缓存的数据释放
     */
    while ([self->pixelBufferArray count] >= CachePixelBuffMax) {
        [self->pixelBufferArray removeObjectAtIndex:0];
    }
    
    [self->pixelBufferArray addObject:[VisionUtils dataWithYUVPixelBuffer:imageBuffer]];
    
    CVPixelBufferUnlockBaseAddress(imageBuffer, 0);
    
    
    NSLog(@"容器长度为：%lu",[self->pixelBufferArray count]);
}


@end
