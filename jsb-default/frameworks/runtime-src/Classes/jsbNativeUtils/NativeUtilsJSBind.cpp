//
//  NativeUtilsJSBind.cpp
//  WRScience-mobile
//
//  Created by HBC on 2020/2/19.
//

#include "NativeUtilsJSBind.h"
#include "cocos/scripting/js-bindings/manual/jsb_module_register.hpp"
#include "cocos/scripting/js-bindings/manual/jsb_global.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "cocos/scripting/js-bindings/event/EventDispatcher.h"
#include "cocos/scripting/js-bindings/manual/jsb_classtype.hpp"
#include "cocos/scripting/js-bindings/manual/jsb_conversions.hpp"

#include "cocos2d.h"
#include "platform/CCApplication.h"
#include "iOSNativeUtilsHelper.h"
//#include "iOSWechatHelper.h"
#include <queue>

USING_NS_CC;

static se::Object* __jsb_ns_NativeUtilsJSBind_proto = nullptr;
static se::Class* __jsb_ns_NativeUtilsJSBind_class = nullptr;

static std::function<void(float)> _numberCB;
static std::function<void(std::string)> _stringCB;
static std::function<void(bool)> _boolCB;
static std::function<void(uint8_t*, int, int, int)> _cameraCB;

/**
 * 多线程共用这个字段 volatile
 */
//static volatile bool hasRender=false;
//static uint8_t* cameraData=nullptr;

/**
 * 采集声音数据
 */
static float staticAudioDecibel=0;

/**
 * 采集摄像头数据
 */
static bool isCollectting=false;
struct CameraData {
    uint8_t* pData;
    int width;
    int height;
    int length;
};
std::mutex m_vqMtx; // mutex for critical section
std::queue<CameraData> m_cameraQueue;
const int CAMERA_CACHE_FRAME=30;

namespace ns {
class NativeUtilsJSBind
{
public:
    NativeUtilsJSBind()
    {
        
    }
    void startAudioDecibel() {
        iOSNativeUtilsHelper::liveAudioDecibel();
    }
    void stopAudioRecord(){
        iOSNativeUtilsHelper::stopAudioRecord();
    }
    void audioUpdate(){
        if(_numberCB){
            printf("声音分贝为--JSB：%f",staticAudioDecibel);
            _numberCB(staticAudioDecibel);
        }
    }
    
    void liveCamera(){
        isCollectting=true;
        iOSNativeUtilsHelper::liveCamera();
    }
    void stopCamera(){
        iOSNativeUtilsHelper::stopCamera();
        isCollectting=false;
        clearCameraQueue();
    }
    
    /**
     * 清除x队列
     */
    void clearCameraQueue()
    {
        std::lock_guard<std::mutex> lck(m_vqMtx);
        while(!m_cameraQueue.empty()) {
            CameraData cd = std::move(m_cameraQueue.front());
            CC_SAFE_DELETE_ARRAY(cd.pData);
            m_cameraQueue.pop();
        }
        CCLOGERROR("clearCameraQueue m_cameraQueue size %lu", m_cameraQueue.size());
    }
    
    void cameraUpdate(){
        
//        printf("JS端请求获取摄像机数据： %lu",m_cameraQueue.size());
        if(m_cameraQueue.size() > 0){
            CameraData cd =std::move(m_cameraQueue.front());
            if(_cameraCB){
                _cameraCB(cd.pData,cd.width,cd.height,cd.length);
            }
            CC_SAFE_DELETE_ARRAY(cd.pData);
            m_cameraQueue.pop();
        }
    }
    
    void openNativeCalendar(std::string lastBirth){
        iOSNativeUtilsHelper::openNativeCalendar(lastBirth);
    }
    void closeNativeCalendar(){
        iOSNativeUtilsHelper::closeNativeCalendar();
    }
    
    void getUDID(){
        std::string udid = iOSNativeUtilsHelper::getUDID();
        if(_stringCB){
            _stringCB(udid);
        }
    }
    
    void getVersion(){
        std::string udid = iOSNativeUtilsHelper::getVersion();
        if(_stringCB){
            _stringCB(udid);
        }
    }
    
    void getWechatInstalledStatus(){
//        bool isInstalled = iOSWechatHelper::isAppInstalled();
//        if(_boolCB){
//            _boolCB(isInstalled);
//        }
    }
    
    static void static_func() {
    }
    
    void setNumberCallback(const std::function<void(float)>& cb) {
        _numberCB = cb;
    }
    
    void setStringCallback(const std::function<void(std::string)>& cb) {
        _stringCB = cb;
    }
    
    void setBoolCallback(const std::function<void(bool)>& cb) {
        _boolCB = cb;
    }
    
    void setCameraCallback(const std::function<void(uint8_t*, int, int, int)>& cb){
        _cameraCB=cb;
    }
    
};
}


static bool js_NativeUtilsJSBind_setNumberCallback(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
        
        se::Value jsFunc = args[0];
        se::Value jsTarget = argc > 1 ? args[1] : se::Value::Undefined;
        
        if (jsFunc.isNullOrUndefined())
        {
            cobj->setNumberCallback(nullptr);
        }
        else
        {
            assert(jsFunc.isObject() && jsFunc.toObject()->isFunction());
            
            // 如果当前 NativeUtilsJSBind 是可以被 new 出来的类，我们 使用 se::Object::attachObject 把 jsFunc 和 jsTarget 关联到当前对象中
            s.thisObject()->attachObject(jsFunc.toObject());
            s.thisObject()->attachObject(jsTarget.toObject());
            
            cobj->setNumberCallback([jsFunc, jsTarget](float counter){
                
                // CPP 回调函数中要传递数据给 JS 或者调用 JS 函数，在回调函数开始需要添加如下两行代码。
                se::ScriptEngine::getInstance()->clearException();
                se::AutoHandleScope hs;
                
                se::ValueArray args;
                args.push_back(se::Value(counter));
                
                se::Object* target = jsTarget.isObject() ? jsTarget.toObject() : nullptr;
                jsFunc.toObject()->call(args, target);
            });
        }
        
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_setNumberCallback)

static bool js_NativeUtilsJSBind_setStringCallback(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
        
        se::Value jsFunc = args[0];
        se::Value jsTarget = argc > 1 ? args[1] : se::Value::Undefined;
        
        if (jsFunc.isNullOrUndefined())
        {
            cobj->setStringCallback(nullptr);
        }
        else
        {
            assert(jsFunc.isObject() && jsFunc.toObject()->isFunction());
            
            // 如果当前 NativeUtilsJSBind 是可以被 new 出来的类，我们 使用 se::Object::attachObject 把 jsFunc 和 jsTarget 关联到当前对象中
            s.thisObject()->attachObject(jsFunc.toObject());
            s.thisObject()->attachObject(jsTarget.toObject());
            
            cobj->setStringCallback([jsFunc, jsTarget](std::string counter){
                
                // CPP 回调函数中要传递数据给 JS 或者调用 JS 函数，在回调函数开始需要添加如下两行代码。
                se::ScriptEngine::getInstance()->clearException();
                se::AutoHandleScope hs;
                
                se::ValueArray args;
                args.push_back(se::Value(counter));
                
                se::Object* target = jsTarget.isObject() ? jsTarget.toObject() : nullptr;
                jsFunc.toObject()->call(args, target);
            });
        }
        
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_setStringCallback)

static bool js_NativeUtilsJSBind_setBoolCallback(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
        
        se::Value jsFunc = args[0];
        se::Value jsTarget = argc > 1 ? args[1] : se::Value::Undefined;
        
        if (jsFunc.isNullOrUndefined())
        {
            cobj->setBoolCallback(nullptr);
        }
        else
        {
            assert(jsFunc.isObject() && jsFunc.toObject()->isFunction());
            
            // 如果当前 NativeUtilsJSBind 是可以被 new 出来的类，我们 使用 se::Object::attachObject 把 jsFunc 和 jsTarget 关联到当前对象中
            s.thisObject()->attachObject(jsFunc.toObject());
            s.thisObject()->attachObject(jsTarget.toObject());
            
            cobj->setBoolCallback([jsFunc, jsTarget](bool isWechatInstalled){
                
                // CPP 回调函数中要传递数据给 JS 或者调用 JS 函数，在回调函数开始需要添加如下两行代码。
                se::ScriptEngine::getInstance()->clearException();
                se::AutoHandleScope hs;
                
                se::ValueArray args;
                args.push_back(se::Value(isWechatInstalled));
                
                se::Object* target = jsTarget.isObject() ? jsTarget.toObject() : nullptr;
                jsFunc.toObject()->call(args, target);
            });
        }
        
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_setBoolCallback)


static bool js_NativeUtilsJSBind_setCameraCallback(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
        
        se::Value jsFunc = args[0];
        se::Value jsTarget = argc > 1 ? args[1] : se::Value::Undefined;
        
        if (jsFunc.isNullOrUndefined())
        {
            cobj->setCameraCallback(nullptr);
        }
        else
        {
            assert(jsFunc.isObject() && jsFunc.toObject()->isFunction());
            
            // 如果当前 NativeUtilsJSBind 是可以被 new 出来的类，我们 使用 se::Object::attachObject 把 jsFunc 和 jsTarget 关联到当前对象中
            s.thisObject()->attachObject(jsFunc.toObject());
            s.thisObject()->attachObject(jsTarget.toObject());
            
            cobj->setCameraCallback([=](uint8_t* pData, int width, int height, int len){
//                hasRender=true;
                /**
                 * 子线程调用这个回调，需要这样处理
                 */
                //                cocos2d::Application::getInstance()->getScheduler()->performFunctionInCocosThread([=]{
                
                // CPP 回调函数中要传递数据给 JS 或者调用 JS 函数，在回调函数开始需要添加如下两行代码。
                se::ScriptEngine::getInstance()->clearException();
                se::AutoHandleScope hs;
                
                se::ValueArray args;
                
//                printf("999999999999999999999\n");
                //data.copy(pData, len);
                static cocos2d::Data data;
                data.copy(pData, len);
                se::Value sv;
                Data_to_seval(data, &sv);
                
                
                
                args.push_back(sv);
                args.push_back(se::Value(width));
                args.push_back(se::Value(height));
                args.push_back(se::Value(len));
                
                se::Object* target = jsTarget.isObject() ? jsTarget.toObject() : nullptr;
                jsFunc.toObject()->call(args, target);
                // data.clear();
                //free(pData);
//                hasRender=false;
                //                });
                
            });
        }
        
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_setCameraCallback)

static bool js_NativeUtilsJSBind_finalize(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    delete cobj;
    return true;
}
SE_BIND_FINALIZE_FUNC(js_NativeUtilsJSBind_finalize)

static bool js_NativeUtilsJSBind_constructor(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = new ns::NativeUtilsJSBind();
    s.thisObject()->setPrivateData(cobj);
    return true;
}
SE_BIND_CTOR(js_NativeUtilsJSBind_constructor, __jsb_ns_NativeUtilsJSBind_class, js_NativeUtilsJSBind_finalize)

static bool js_NativeUtilsJSBind_startAudioDecibel(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->startAudioDecibel();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_startAudioDecibel)



static bool js_NativeUtilsJSBind_stopAudioRecord(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->stopAudioRecord();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_stopAudioRecord)

static bool js_NativeUtilsJSBind_audioUpdate(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->audioUpdate();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_audioUpdate)

static bool js_NativeUtilsJSBind_liveCamera(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->liveCamera();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_liveCamera)


static bool js_NativeUtilsJSBind_stopCamera(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->stopCamera();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_stopCamera)

static bool js_NativeUtilsJSBind_cameraUpdate(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->cameraUpdate();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_cameraUpdate)


static bool js_NativeUtilsJSBind_openNativeCalendar( se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1){
        ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
        se::Value lastBirth = args[0];
        std::string aa =lastBirth.toString();
        cobj->openNativeCalendar(lastBirth.toString());
    }
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_openNativeCalendar)


static bool js_NativeUtilsJSBind_closeNativeCalendar(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->closeNativeCalendar();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_closeNativeCalendar)

static bool js_NativeUtilsJSBind_getUDID(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->getUDID();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_getUDID)

static bool js_NativeUtilsJSBind_getVersion(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->getVersion();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_getVersion)

static bool js_NativeUtilsJSBind_getWechatInstalledStatus(se::State& s)
{
    ns::NativeUtilsJSBind* cobj = (ns::NativeUtilsJSBind*)s.nativeThisObject();
    cobj->getWechatInstalledStatus();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_getWechatInstalledStatus)


static bool js_NativeUtilsJSBind_static_func(se::State& s)
{
    ns::NativeUtilsJSBind::static_func();
    return true;
}
SE_BIND_FUNC(js_NativeUtilsJSBind_static_func)

bool js_register_ns_NativeUtilsJSBind(se::Object* global)
{
    // 保证 namespace 对象存在
    se::Value nsVal;
    if (!global->getProperty("ns", &nsVal))
    {
        // 不存在则创建一个 JS 对象，相当于 var ns = {};
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        
        // 将 ns 对象挂载到 global 对象中，名称为 ns
        global->setProperty("ns", nsVal);
    }
    se::Object* ns = nsVal.toObject();
    
    // 创建一个 Class 对象，开发者无需考虑 Class 对象的释放，其交由 ScriptEngine 内部自动处理
    auto cls = se::Class::create("NativeUtilsJSBind", ns, nullptr, _SE(js_NativeUtilsJSBind_constructor)); // 如果无构造函数，最后一个参数可传入 nullptr，则这个类在 JS 中无法被 new NativeUtilsJSBind()出来
    
    // 为这个 Class 对象定义成员函数、属性、静态函数、析构函数
    cls->defineFunction("startAudioDecibel", _SE(js_NativeUtilsJSBind_startAudioDecibel));
    cls->defineFunction("stopAudioRecord", _SE(js_NativeUtilsJSBind_stopAudioRecord));
    cls->defineFunction("audioUpdate", _SE(js_NativeUtilsJSBind_audioUpdate));
    cls->defineFunction("liveCamera", _SE(js_NativeUtilsJSBind_liveCamera));
    cls->defineFunction("stopCamera", _SE(js_NativeUtilsJSBind_stopCamera));
    cls->defineFunction("cameraUpdate", _SE(js_NativeUtilsJSBind_cameraUpdate));
    cls->defineFunction("openNativeCalendar", _SE(js_NativeUtilsJSBind_openNativeCalendar));
    cls->defineFunction("closeNativeCalendar", _SE(js_NativeUtilsJSBind_closeNativeCalendar));
    cls->defineFunction("getUDID", _SE(js_NativeUtilsJSBind_getUDID));
    cls->defineFunction("getVersion", _SE(js_NativeUtilsJSBind_getVersion));
    cls->defineFunction("getWechatInstalledStatus", _SE(js_NativeUtilsJSBind_getWechatInstalledStatus));
    //    cls->defineFunction("openGalleryCB", _SE(js_NativeUtilsJSBind_openGalleryCB));
    //    cls->defineProperty("xxx", _SE(js_NativeUtilsJSBind_get_xxx), _SE(js_NativeUtilsJSBind_set_xxx));
    
    cls->defineFunction("setNumberCallback", _SE(js_NativeUtilsJSBind_setNumberCallback));
    cls->defineFunction("setStringCallback", _SE(js_NativeUtilsJSBind_setStringCallback));
    cls->defineFunction("setBoolCallback", _SE(js_NativeUtilsJSBind_setBoolCallback));
    cls->defineFunction("setCameraCallback", _SE(js_NativeUtilsJSBind_setCameraCallback));
    
    cls->defineFinalizeFunction(_SE(js_NativeUtilsJSBind_finalize));
    
    // 注册类型到 JS VirtualMachine 的操作
    cls->install();
    
    // JSBClassType 为 Cocos 引擎绑定层封装的类型注册的辅助函数，此函数不属于 ScriptEngine 这层
    JSBClassType::registerClass<ns::NativeUtilsJSBind>(cls);
    
    // 保存注册的结果，便于其他地方使用，比如类继承
    __jsb_ns_NativeUtilsJSBind_proto = cls->getProto();
    __jsb_ns_NativeUtilsJSBind_class = cls;
    
    // 为每个此 Class 实例化出来的对象附加一个属性
    __jsb_ns_NativeUtilsJSBind_proto->setProperty("yyy", se::Value("helloyyy"));
    
    // 注册静态成员变量和静态成员函数
    se::Value ctorVal;
    if (ns->getProperty("NativeUtilsJSBind", &ctorVal) && ctorVal.isObject()) {
        ctorVal.toObject()->setProperty("static_val", se::Value(200));
        ctorVal.toObject()->defineFunction("static_func", _SE(js_NativeUtilsJSBind_static_func));
    }
    
    // 清空异常
    se::ScriptEngine::getInstance()->clearException();
    return true;
}

void liveAudioDecibelCB(float audioDecibel) {
    staticAudioDecibel = audioDecibel;
//    if (_numberCB) {
//        _numberCB(audioDecibel);
//    }
}

void updateCalendarData(std::string datestring) {
    if (_stringCB) {
        _stringCB(datestring);
    }
}



void updateCameraData(uint8_t* pData,int width, int height, long len){
    //    if(hasRender){
    //        free(pData);
    //    }
    if(!isCollectting){
        free(pData);
    }
    std::lock_guard<std::mutex> lck(m_vqMtx);
    while(m_cameraQueue.size()>CAMERA_CACHE_FRAME) {
        printf("队列长度超过了，移除部分元素");
        CameraData cd = std::move(m_cameraQueue.front());
        CC_SAFE_DELETE_ARRAY(cd.pData);
//        CC_SAFE_DELETE_ARRAY(cd.pData);
        m_cameraQueue.pop();
    }
    CameraData cd;
    cd.pData = pData;
    cd.width=width;
    cd.height=height;
    cd.length = len;
    
    
    m_cameraQueue.push(std::move(cd));
    
    //    if(cameraData!=nullptr){
    //        free(cameraData);
    //        cameraData=nullptr;
    //    }
    //    cameraData = pData;
    //    if(_cameraCB){
    //        printf("88888888888888888888888888888888888\n");
    //        _cameraCB(pData,width,height,len);
    //    }
}

