define(["require","exports","module","hgn!template/moduleDetail"],function(e,t){function i(e,t){t?(n.html(r(t.data)),n.data("module",t.get("code"))):n.html("<p>Module's detail is not found. :(</p>")}var n=$("#detail"),r=e("hgn!template/moduleDetail");t.init=function(){},$.subscribe("app:status:new",function(){n.empty().append("<p>Hello! This is CORS Planner :) </p><p>A simple and elegant NUS CORS Timetable builder!</p>"),$("#metro-pivot").data("controller").goToItemByName("Detail")}),$.subscribe("app:status:updated",function(){n.empty().append("<p>CORS Planner just updated to the latest version "+planner.version+"!</p>")}),$.subscribe("app:status:uptodate",function(){n.empty().append("<p>Welcome come back! Your modules are saved in the Modules tab :)</p>")}),$.subscribe("module:detail",i),$.subscribe(planner.list.previews+":addOne",i)});