(function(){function isLocalStorageNameSupported(){try{return localStorageName in win&&win[localStorageName]}catch(err){return!1}}function isGlobalStorageNameSupported(){try{return globalStorageName in win&&win[globalStorageName]&&win[globalStorageName][win.location.hostname]}catch(err){return!1}}var store={},win=window,doc=win.document,localStorageName="localStorage",globalStorageName="globalStorage",namespace="__storejs__",storage;store.disabled=!1,store.set=function(key,value){},store.get=function(key){},store.remove=function(key){},store.clear=function(){},store.transact=function(key,defaultVal,transactionFn){var val=store.get(key);transactionFn==null&&(transactionFn=defaultVal,defaultVal=null),typeof val=="undefined"&&(val=defaultVal||{}),transactionFn(val),store.set(key,val)},store.getAll=function(){},store.serialize=function(value){return JSON.stringify(value)},store.deserialize=function(value){return typeof value!="string"?undefined:JSON.parse(value)};if(isLocalStorageNameSupported())storage=win[localStorageName],store.set=function(key,val){if(val===undefined)return store.remove(key);storage.setItem(key,store.serialize(val))},store.get=function(key){return store.deserialize(storage.getItem(key))},store.remove=function(key){storage.removeItem(key)},store.clear=function(){storage.clear()},store.getAll=function(){var ret={};for(var i=0;i<storage.length;++i){var key=storage.key(i);ret[key]=store.get(key)}return ret};else if(isGlobalStorageNameSupported())storage=win[globalStorageName][win.location.hostname],store.set=function(key,val){if(val===undefined)return store.remove(key);storage[key]=store.serialize(val)},store.get=function(key){return store.deserialize(storage[key]&&storage[key].value)},store.remove=function(key){delete storage[key]},store.clear=function(){for(var key in storage)delete storage[key]},store.getAll=function(){var ret={};for(var i=0;i<storage.length;++i){var key=storage.key(i);ret[key]=store.get(key)}return ret};else if(doc.documentElement.addBehavior){var storageOwner,storageContainer;try{storageContainer=new ActiveXObject("htmlfile"),storageContainer.open(),storageContainer.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),storageContainer.close(),storageOwner=storageContainer.w.frames[0].document,storage=storageOwner.createElement("div")}catch(e){storage=doc.createElement("div"),storageOwner=doc.body}function withIEStorage(storeFunction){return function(){var args=Array.prototype.slice.call(arguments,0);args.unshift(storage),storageOwner.appendChild(storage),storage.addBehavior("#default#userData"),storage.load(localStorageName);var result=storeFunction.apply(store,args);return storageOwner.removeChild(storage),result}}var forbiddenCharsRegex=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function ieKeyFix(key){return key.replace(forbiddenCharsRegex,"___")}store.set=withIEStorage(function(storage,key,val){key=ieKeyFix(key);if(val===undefined)return store.remove(key);storage.setAttribute(key,store.serialize(val)),storage.save(localStorageName)}),store.get=withIEStorage(function(storage,key){return key=ieKeyFix(key),store.deserialize(storage.getAttribute(key))}),store.remove=withIEStorage(function(storage,key){key=ieKeyFix(key),storage.removeAttribute(key),storage.save(localStorageName)}),store.clear=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes;storage.load(localStorageName);for(var i=0,attr;attr=attributes[i];i++)storage.removeAttribute(attr.name);storage.save(localStorageName)}),store.getAll=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes;storage.load(localStorageName);var ret={};for(var i=0,attr;attr=attributes[i];++i)ret[attr]=store.get(attr);return ret})}try{store.set(namespace,namespace),store.get(namespace)!=namespace&&(store.disabled=!0),store.remove(namespace)}catch(e){store.disabled=!0}store.enabled=!store.disabled,typeof module!="undefined"&&typeof module!="function"?module.exports=store:typeof define=="function"&&define.amd?define([],store):this.store=store})()