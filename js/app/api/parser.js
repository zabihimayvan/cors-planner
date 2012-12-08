define(["require","exports","module"],function(require,exports){function trim(str){return typeof str=="object"&&(str=JSON.stringify(str)),str?str.replace(trimLeft,"").replace(trimRight,""):""}function isDataValid(data){return data&&data.query&&data.query.results&&data.query.results.table?!0:!1}function moduleIsAvailable(data){return!/currently not available/i.test(JSON.stringify(data))}function setLatestUpdate(data){var result=/Correct as at (\d\d \w{3} \d{4} \d\d:\d\d)\"/.exec(JSON.stringify(data));Module.correctAsAt=result?result[1]:undefined}function setModuleInfo(data){var i=1,k;for(k in details)details.hasOwnProperty(k)&&(Module[k]=details[k](data[i++].td[1]))}function moduleHasLecture(data){return!/No Lecture Class/i.test(JSON.stringify(data))}function setModuleLecture(data){var lect,grp,lects=Module.lectures,i,j,k,dataLen=data.length;for(i=1;i<dataLen;i++)if(data[i].td&&data[i].td.length>=infoLen){lect={},j=0;for(k in info)info.hasOwnProperty(k)&&(lect[k]=info[k](data[i].td[j++]));grp=lect.weekDay+"-"+lect.startTime+"-"+lect.endTime,lects[grp]||(lects[grp]=[]),lects[grp].push(lect)}}function moduleHasTutorial(data){return!/No Tutorial Class or to be announced/i.test(JSON.stringify(data))}function setModuleTutorial(data){var klass,type,grp,tuts=Module.tutorials,labs=Module.labs,i,j,k,dataLen=data.length;for(i=1;i<dataLen;i++)if(data[i].td&&data[i].td.length>=infoLen){klass={},j=0,type=info.type(data[i].td[1]);for(k in info)info.hasOwnProperty(k)&&(klass[k]=info[k](data[i].td[j++]));grp=klass.weekDay+"-"+klass.startTime+"-"+klass.endTime,type==="TUTORIAL"?(tuts[grp]=tuts[grp]||[],tuts[grp].push(klass)):(labs[grp]=labs[grp]||[],labs[grp].push(klass))}}var Module,commFun=function(data){return data.p?data.p:trim(data)},contentFun=function(data){var result=data.content||data.p;return typeof result=="object"?contentFun(result):typeof result=="string"?trim(result):"ERROR: PARSE FAILED"},details={code:function(data){return commFun(data).split(" ")[0]},title:commFun,description:commFun,examinable:commFun,examDate:contentFun,credits:function(data){return parseInt(data.p,10)},prerequisite:commFun,preclusion:commFun,workload:commFun},infoLen=7,info={classNo:commFun,type:commFun,weekType:commFun,weekDay:commFun,startTime:commFun,endTime:commFun,room:contentFun},trimLeft=/^\s+/,trimRight=/(,?)\s+$/;exports.tryParse=function(data){return isDataValid(data)&&moduleIsAvailable(data.query.results.table[1].tr[1])},exports.parse=function(data){if(!isDataValid(data))return null;var result=data.query.results.table;return Module={},Module.url=data.url,moduleIsAvailable(result[1].tr[1])?(Module.isAvailable=!0,setLatestUpdate(result[1].tr[0]),setModuleInfo(result[2].tr),Module.lectures={},Module.tutorials={},Module.labs={},moduleHasLecture(result[3].tr)&&setModuleLecture(result[4].tr),moduleHasTutorial(result[5].tr)&&setModuleTutorial(result[6].tr)):Module.isAvailable=!1,Module}})