define(["require","exports","module"],function(e,t){function o(){var e=/#share=(.*)&school=(.*)/ig.exec(decodeURIComponent(location.hash));e&&e.length===3&&(location.hash="",planner.set("school",e[2]),$.publish("module:readFromShare",[e[1].split("&")])),planner.trackEvent("open-from-share",e&&e.length===3)}function u(e,t){var r=s+"#share="+t+"&school="+planner.get("school");$.get(i+encodeURIComponent(r),function(e){var t=e.data.url;n.find("#short-link-url").val(t),n.find(".share-btn").attr("href",n.find(".share-btn").attr("href")+t)}),n.modal("show"),planner.trackEvent("share","bitly")}function a(){n.find(".black.m-btn").on("click",function(){$(this).html("Ctrl + C to copy"),$("#short-link-url").focus()}),$("#short-link-url").on("focus",function(){$(this).select()})}var n=$("#short-link-modal"),r="fe44adc346767b3234c5231a0b8cfb4f12c3ed69",i="https://api-ssl.bitly.com/v3/shorten?access_token="+r+"&longUrl=",s="http://cors.bicrement.com";t.init=function(){o(),a()},$.subscribe("app:share:get",u),$.subscribe("module:calendar",function(){planner.trackEvent("share","calendar")})});