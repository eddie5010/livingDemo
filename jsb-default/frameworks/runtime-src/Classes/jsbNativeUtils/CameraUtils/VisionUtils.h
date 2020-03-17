//
//  VisionUtils.h
//  WRScience
//
//  Created by HBC on 2020/3/16.
//

#ifndef VisionUtils_h
#define VisionUtils_h


#import <Foundation/Foundation.h>
#import <Vision/Vision.h>
#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface VisionModel : NSObject
// 包含该面部特征的的数组
@property (nonatomic, strong) NSMutableArray *allPoints;
//
@property (nonatomic, strong) VNFaceObservation *observation;
// 脸部轮廊
@property (nonatomic, strong) VNFaceLandmarkRegion2D *faceContour;
// 左眼，右眼
@property (nonatomic, strong) VNFaceLandmarkRegion2D *leftEye;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *rightEye;
// 鼻子，鼻嵴
@property (nonatomic, strong) VNFaceLandmarkRegion2D *nose;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *noseCrest;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *medianLine;
// 外唇，内唇
@property (nonatomic, strong) VNFaceLandmarkRegion2D *outerLips;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *innerLips;
// 左眉毛，右眉毛
@property (nonatomic, strong) VNFaceLandmarkRegion2D *leftEyebrow;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *rightEyebrow;
// 左瞳,右瞳
@property (nonatomic, strong) VNFaceLandmarkRegion2D *leftPupil;
@property (nonatomic, strong) VNFaceLandmarkRegion2D *rightPupil;

@end

typedef NS_ENUM(NSUInteger,DetectFaceType) {
    DetectFaceTypeRectanglesRequest = 0, // 人脸矩形检测
    DetectFaceTypeLandmarksRequest, // 人脸特征识别
    DetectFaceTypeTextRectangles,   // 文字识别
};

typedef void (^VisionDatasBlock)(NSArray *datas);

@interface VisionUtils : VisionModel

@property (nonatomic, strong)VNDetectFaceRectanglesRequest *detectFaceRequest;
//@property (nonatomic, strong)VNImageRequestHandler *detectFaceRequestHandler;

+ (instancetype)sharedSingleton;
- (VNDetectFaceRectanglesRequest *)getDetectFaceRequest;
//- (VNImageRequestHandler *)getDetectFaceRequestHandler;



+ (VisionDatasBlock)xxblock;

/// 识别图片
+ (void)detectImageWithType:(DetectFaceType)type
                pixelBuffer:(CVPixelBufferRef)pixelBuffer
                      Block:(VisionDatasBlock)block;

/**
 * 获取鼻子中心位置信息
 */
+ (CGPoint)getNoseCenterPoint:(VNFaceLandmarkRegion2D *)noseCrest;

/**
 * 转换辅助方法
 */
+ (CGRect)convertRect:(CGRect)rect size:(CGSize)size;


/**
 * NSData转CVPixelBufferRef
 */
+ (CVPixelBufferRef)yuvPixelBufferWithData:(NSData *)dataFrame
                                     width:(size_t)w
                                    heigth:(size_t)h;
+ (CVPixelBufferRef) copyDataFromBuffer:(const unsigned char*)buffer
              toYUVPixelBufferWithWidth:(size_t)w
                                 Height:(size_t)h;

/**
 * CVPixelBufferRef转NSData
 */
+ (NSData *)dataWithYUVPixelBuffer:(CVPixelBufferRef)pixelBuffer;
+ (void) copyDataFromYUVPixelBuffer:(CVPixelBufferRef)pixelBuffer
                           toBuffer:(unsigned char*)buffer;

@end

NS_ASSUME_NONNULL_END

#endif /* VisionUtils_h */
