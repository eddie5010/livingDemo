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

@interface CameraUtils ()  <VCVideoCapturerDelegate>

/** 视频采集 */
@property (nonatomic, strong) VCVideoCapturer *videoCapture;

@end

@implementation CameraUtils 

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
    [self.videoCapture stopCapture];
    [self.videoCapture.videoPreviewLayer removeFromSuperlayer];
}

#pragma mark - 视频采集回调
- (void)videoCaptureOutputDataCallback:(CMSampleBufferRef)sampleBuffer
{
    NSLog(@"视频采集回调代理方法");
    CFRetain(sampleBuffer);
    //    dispatch_async(dispatch_get_main_queue(), ^{
    CVImageBufferRef imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer);
    CVPixelBufferLockBaseAddress(imageBuffer,0);
    
    //    size_t width = CVPixelBufferGetWidth(imageBuffer);
    //    size_t height = CVPixelBufferGetHeight(imageBuffer);
    //    uint8_t *yBuffer =(uint8_t*) CVPixelBufferGetBaseAddressOfPlane(imageBuffer, 0);
    //    size_t yPitch = CVPixelBufferGetBytesPerRowOfPlane(imageBuffer, 0);
    //    uint8_t *cbCrBuffer = (uint8_t*)CVPixelBufferGetBaseAddressOfPlane(imageBuffer, 1);
    //    size_t cbCrPitch = CVPixelBufferGetBytesPerRowOfPlane(imageBuffer, 1);
    //
    //    int bytesPerPixel = 3;
    //    uint8_t *rgbBuffer =(uint8_t*) malloc(width * height * bytesPerPixel);
    //
    //    for(int y = 0; y < height; y++) {
    //        uint8_t *rgbBufferLine = &rgbBuffer[y * width * bytesPerPixel];
    //        uint8_t *yBufferLine = &yBuffer[y * yPitch];
    //        uint8_t *cbCrBufferLine = &cbCrBuffer[(y >> 1) * cbCrPitch];
    //
    //        for(int x = 0; x < width; x++) {
    //            int16_t y = yBufferLine[x];
    //            int16_t cb = cbCrBufferLine[x & ~1] - 128;
    //            int16_t cr = cbCrBufferLine[x | 1] - 128;
    //
    //            uint8_t *rgbOutput = &rgbBufferLine[x*bytesPerPixel];
    //
    //            int16_t r = (int16_t)roundf( y + cr *  1.4 );
    //            int16_t g = (int16_t)roundf( y + cb * -0.343 + cr * -0.711 );
    //            int16_t b = (int16_t)roundf( y + cb *  1.765);
    //
    //            rgbOutput[0] = clamp(r);
    //            rgbOutput[1] = clamp(g);
    //            rgbOutput[2] = clamp(b);
    //            //            rgbOutput[3] = 0xff;
    //        }
    //    }
    /**
     * 检测人脸特征数据信息
     */
    VNDetectFaceRectanglesRequest *detectFaceRequest = [[VisionUtils sharedSingleton] getDetectFaceRequest];
    VNImageRequestHandler *detectFaceRequestHandler = [[VNImageRequestHandler alloc] initWithCVPixelBuffer:imageBuffer
                                                                                                   options:@{}];
    [detectFaceRequestHandler performRequests:@[detectFaceRequest]
                                        error:nil];
    
    /// 输出数据
    //    updateCameraData(rgbBuffer, (int)width, (int)height, (long)width*height*bytesPerPixel);
    CVPixelBufferUnlockBaseAddress(imageBuffer, 0);
    
    CFRelease(sampleBuffer);
    //});
}


@end
