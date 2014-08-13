define(["require","exports","module","helper/colors"],function(e,t){function r(e,t){if(!e)throw new Error("Module data cannot be null!");this.id=e.code.replace(/[_\s\'\"]/gi,"-"),this.data=e,this.data.color=n.get(),this.status=$.extend({},{visible:!0,allocated:{},onCORS:!1},t)}var n=e("helper/colors");return r.Count=function(e){var t,n=0;for(t in e)e.hasOwnProperty(t)&&(n+=1);return n},r.fn=r.prototype,r.fn.get=function(e){return this.data[e]},r.fn.has=function(e){return!$.isEmptyObject(this.data[e])},r.fn.set=function(e,t){var n,r=e.split("."),i=r.length,s=this.status;for(n=0;n<i-1;n++)s[r[n]]=s[r[n]]||{},s=s[r[n]];s[r[n]]=t,$.publish("module:save")},r.fn.is=function(e){var t,n=e.split("."),r=n.length,i=this.status;for(t=0;t<r-1;t++)i[n[t]]=i[n[t]]||{},i=i[n[t]];return i[n[t]]},r.fn.count=function(e){return r.Count(this.data.lessons[e])},r.fn.isSame=function(e){return typeof e=="object"?this.data.code===e.get("code"):typeof e=="string"?this.data.code===e.toUpperCase():!1},r.fn.allocated=function(e){return this.status.allocated[e]},r.fn.allocate=function(e,t){this.status.allocated[e]=t,$.publish("module:"+this.get("code")+":allocated",[e,t]),$.publish("module:save")},r.fn.toJSON=function(){return{data:this.data,status:this.status}},r.fn.compress=function(){return{id:this.get("code"),visible:this.status.visible,allocated:this.status.allocated}},r});