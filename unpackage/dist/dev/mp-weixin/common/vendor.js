(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"haohao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!***************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/apis/family.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.wxvisitDetail = exports.wxvisitTobe = exports.addThird = exports.getUserInfos = exports.addWxvisit = exports.getUser = exports.setUser = exports.getWxVisit = exports.getUserInfo = exports.getOpen = exports.login = void 0;var _http = _interopRequireDefault(__webpack_require__(/*! @/utils/http */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// export default {
// 登录
var login = function login(data) {
  return _http.default.post('/api/user/login', data);
};
// //获取openid
exports.login = login;var getOpen = function getOpen(code) {
  return _http.default.get("/api/wx/third/getOpenid?code=".concat(code));
};
// 获取用户信息
exports.getOpen = getOpen;var getUserInfo = function getUserInfo(openid) {
  return _http.default.get("/api/wx/third/detail/?openid=".concat(openid));
};
// 分页获取用户被拜访记录
exports.getUserInfo = getUserInfo;var getWxVisit = function getWxVisit(obj) {
  return _http.default.get("/api/wx/wxvisit/page", obj);
};
// 修改用户信息
exports.getWxVisit = getWxVisit;var setUser = function setUser(user) {
  return _http.default.post("/api/wx/wxuser", user);
};
// 获取用户信息
exports.setUser = setUser;var getUser = function getUser(id) {
  return _http.default.get("/api/wx/wxuser?id=".concat(id));
};
// 新增访客记录
exports.getUser = getUser;var addWxvisit = function addWxvisit(obj) {
  return _http.default.post("/api/wx/wxvisit", obj);
};
// 通过code查询用户信息
exports.addWxvisit = addWxvisit;var getUserInfos = function getUserInfos(code) {
  return _http.default.get("/api/wx/third/userinfo?code=".concat(code));
};
// 新增用户
exports.getUserInfos = getUserInfos;var addThird = function addThird(obj) {
  return _http.default.post("/api/wx/third", obj);
};
// 獲取拜訪列表
exports.addThird = addThird;var wxvisitTobe = function wxvisitTobe(id) {
  return _http.default.get("/api/wx/wxvisit/tobe/".concat(id));
};
// 查询拜访记录详情
exports.wxvisitTobe = wxvisitTobe;var wxvisitDetail = function wxvisitDetail(id) {
  return _http.default.get("/api/wx/wxvisit/".concat(id));
};

// .}
exports.wxvisitDetail = wxvisitDetail;

/***/ }),

/***/ 12:
/*!**************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/utils/http.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _luchRequest = _interopRequireDefault(__webpack_require__(/*! luch-request */ 13));
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage */ 26));
var _constant = __webpack_require__(/*! @/utils/constant */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //全局配置
//缓存
//接口地址
var http = new _luchRequest.default({ mode: 'history',
  baseURL: _constant.API_BASE_URL,
  custom: {
    loading: true,
    auth: true } });



// 请求拦截器
http.interceptors.request.use(function (config) {
  if (config.custom.loading) {
    uni.showLoading({ mask: true, title: "加载中..." });
  }
  config.header.cookie = _storage.default.getCookie();
  return config;
},
function (error) {
  Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function (response) {
  if (response.config.custom.loading) {
    uni.hideLoading();
  }var
  data = response.data,header = response.header;
  if (header && header['set-cookie']) {
    _storage.default.setCookie(header['set-cookie']);
  }
  if (data && typeof data === "object") {
    if (data.statusCode === 200) {
      return Promise.resolve(data.data);
    } else {
      uni.showToast({
        title: data.message,
        icon: 'none' });

      return Promise.reject(data);
    }
  } else {
    return Promise.reject(data);
  }
},
function (error) {
  console.log("error", error);
  if (error.config.custom.loading) {
    uni.hideLoading();
  }
  if (error.statusCode === "ECONNABORTED") {
    uni.showToast({
      title: "请求超时,请检查网络" });

  }
  return Promise.reject({}); // 返回接口返回的错误信息
});var _default =

http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/luch-request.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 14:
/*!**************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/Request.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 15));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 23));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 24));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 25));
var _utils = __webpack_require__(/*! ../utils */ 18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),

/***/ 15:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/dispatchRequest.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),

/***/ 16:
/*!****************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/adapters/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 17));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 19));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 22));
var _utils = __webpack_require__(/*! ../utils */ 18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [









      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {





      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!******************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/helpers/buildURL.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 18));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 18:
/*!*******************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/utils.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;exports.isUndefined = isUndefined;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),

/***/ 19:
/*!********************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/buildFullPath.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 20));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 195:
/*!******************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/image/lunbotu.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/image/lunbotu.png";

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"haohao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"haohao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"haohao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"haohao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/helpers/isAbsoluteURL.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 21:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/helpers/combineURLs.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 22:
/*!*************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/settle.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),

/***/ 23:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/InterceptorManager.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),

/***/ 24:
/*!******************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/mergeConfig.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 18);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {







  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',



    'formData'];

    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });





  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),

/***/ 247:
/*!****************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/components/xiujun-time-selector/date.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.timeStamp = timeStamp;exports.dateData = dateData;exports.timeData = timeData; //字符串拼接
function strFormat(str) {
  return str < 10 ? "0".concat(str) : str;
}
//时间戳转日期
function timeStamp(time) {
  var dates = new Date(time);
  var year = dates.getFullYear();
  var month = dates.getMonth() + 1;
  var date = dates.getDate();
  var day = dates.getDay();
  var hour = dates.getHours();
  var min = dates.getMinutes();
  var days = ['日', '一', '二', '三', '四', '五', '六'];
  return {
    allDate: "".concat(year, "/").concat(strFormat(month), "/").concat(strFormat(date)), //注:此处ios系统如"-"分割无法显示,只能用"/"分割符
    date: "".concat(strFormat(month), "-").concat(strFormat(date)), //返回的日期 07-01
    day: "\u661F\u671F".concat(days[day]), //返回的礼拜天数  星期一
    hour: strFormat(hour) + ':' + strFormat(min) //返回的时钟 08:00
  };
}
//获取最近7天的日期和礼拜天数
function dateData() {
  var time = [];
  var date = new Date();
  var now = date.getTime(); //获取当前日期的时间戳
  var timeStr = 3600 * 24 * 1000; //一天的时间戳
  for (var i = 0; i < 7; i++) {
    var timeObj = {};
    timeObj.date = timeStamp(now + timeStr * i).date; //保存日期
    timeObj.timeStamp = now + timeStr * i; //保存时间戳
    if (i == 0) {
      timeObj.week = '今天';
    } else if (i == 1) {
      timeObj.week = '明天';
    } else if (i == 2) {
      timeObj.week = '后天';
    } else {
      timeObj.week = timeStamp(now + timeStr * i).day;
    }
    time.push(timeObj);
  }
  return time;
}
//时间数组
function timeData() {var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '08:00';var endTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '18:30';var timeInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  var time = [];
  var date = timeStamp(Date.now()).allDate;
  var startDate = "".concat(date, " ").concat(startTime);
  var endDate = "".concat(date, " ").concat(endTime);
  var startTimeStamp = new Date(startDate).getTime();
  var endTimeStamp = new Date(endDate).getTime();
  var timeStr = 3600 * 1000 * timeInterval;
  console.log(startTimeStamp);
  var count = 0;
  for (var i = startTimeStamp; i <= endTimeStamp; i = i + timeStr) {
    var timeObj = {};
    timeObj.time = timeStamp(i).hour;
    timeObj.disable = 1;
    timeObj.index = count;
    time.push(timeObj);
    count++;
  }
  console.log(JSON.stringify(time));
  return time;
}

/***/ }),

/***/ 25:
/*!***************************************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/node_modules/luch-request/src/lib/core/defaults.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 60000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),

/***/ 26:
/*!*****************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/utils/storage.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var USER_REGISTERED = 'user.registered';
var USER_OPENID = 'user.openid';
var USER_STATUS = 'user.status';
var USER_COOKIE = 'user.cookie';
var USER_INFO = 'user.info';
var ACCESS_INFO = 'access.info';var _default =

{
  setUserInfo: function setUserInfo(userInfo) {
    uni.setStorageSync(USER_INFO, userInfo);
  },
  getUserInfo: function getUserInfo() {
    return uni.getStorageSync(USER_INFO);
  },
  setRegistered: function setRegistered(registered) {
    uni.setStorageSync(USER_REGISTERED, registered);
  },
  getRegistered: function getRegistered() {
    return uni.getStorageSync(USER_REGISTERED);
  },
  setOpenid: function setOpenid(openid) {
    uni.setStorageSync(USER_OPENID, openid);
  },
  getOpenid: function getOpenid() {
    return uni.getStorageSync(USER_OPENID);
  },
  setUserStatus: function setUserStatus(status) {
    uni.setStorageSync(USER_STATUS, status);
  },
  getUserStatus: function getUserStatus() {
    return uni.getStorageSync(USER_STATUS);
  },
  setCookie: function setCookie(cookie) {
    uni.setStorageSync(USER_COOKIE, cookie);
  },
  getCookie: function getCookie() {
    return uni.getStorageSync(USER_COOKIE);
  },
  setAccessInfo: function setAccessInfo(accessInfo) {
    uni.setStorageSync(ACCESS_INFO, accessInfo);
  },
  getAccessInfo: function getAccessInfo() {
    return uni.getStorageSync(ACCESS_INFO);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 27:
/*!******************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/utils/constant.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getWxAuthUrl = getWxAuthUrl;exports.TEST_WEBSOCKET_HOST = exports.API_BASE_URL = exports.HOST = exports.APPID = void 0; // 小程序appId
var APPID = 'wx0fe051b5f96d9d38';
// 微信公众授权URL
exports.APPID = APPID;function getWxAuthUrl() {
  // snsapi_userinfo 非静默授权
  // snsapi_base 静默授权
  return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(APPID, "&redirect_uri=").concat(encodeURIComponent(window.location.origin), "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
}
// 接口HOST
var HOST = '192.168.0.105:8765'; // 开发测试公网
exports.HOST = HOST;
var API_BASE_URL = "http://".concat(HOST);

// SOCKET地址
// export const TEST_WEBSOCKET_HOST = 'localhost';
exports.API_BASE_URL = API_BASE_URL;var TEST_WEBSOCKET_HOST = HOST;exports.TEST_WEBSOCKET_HOST = TEST_WEBSOCKET_HOST;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/pages.json ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 42:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 43);

/***/ }),

/***/ 43:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 44);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 44:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 53:
/*!*****************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/utils/request.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = request;var baseUrl = 'http://192.168.0.105:8765';
function request(url, data) {var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return new Promise(function (reslove, reject) {
    uni.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        token: '' },

      timeout: 5000,
      success: function success(res) {
        reslove(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 62:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/bf1.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 63:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/bf2.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 64:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/jd1.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 65:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/jd2.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 66:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/mw1.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 67:
/*!**************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/mw2.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 68:
/*!*******************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/profile1.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 69:
/*!*******************************************************************************************!*\
  !*** C:/Users/webcode001/Desktop/ly/cloud-eazy-visit-mini/static/img/tabbar/profile2.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map