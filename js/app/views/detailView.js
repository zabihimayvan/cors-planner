define(["require","exports","module","hgn!template/moduleDetail"],function(require,exports){function _showModuleDetail(e,module){module?$el.html(template(module.format())):$el.html("<p>Module Details are not found. :(</p>")}var $el=$("#detail"),template=require("hgn!template/moduleDetail");exports.init=function(){$el.on("dblclick","h3",function(){var code=$(this).closest("#module-detail").data("modcode");$.publish("module:add",[code])})},$.subscribe("app:user:new",function(){$el.empty().append("<p>Welcome! Your are using Version "+planner.version+"</p>")}),$.subscribe("app:user:updated",function(){$el.empty().append("<p>Your just updated to Version "+planner.version+"</p>")}),$.subscribe("app:user:uptodate",function(){$el.empty().append("<p>Welcome come back! Version "+planner.version+"</p>")}),$.subscribe("module:detail",_showModuleDetail),$.subscribe(planner.list.previews+":addOne",_showModuleDetail)})