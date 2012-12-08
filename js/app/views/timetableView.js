define(["require","exports","module"],function(require,exports){function _render(type,start,end){_type=type||_type,_type==="vertical"?_renderVertical(start,end):_renderHorizontal(start,end)}function _tableHead(){return"<table class='"+_type+" table table-striped table-bordered' "+"data-type='"+_type+"' data-starthour='"+_startHour+"' data-endhour='"+_endHour+"'>"}function _renderHorizontal(start,end){_startHour=start||_startHour,_endHour=end||_endHour;var i,j,k,len,thead=[],tbody=[],table=[_tableHead()];for(i=_startHour,j=0;i<=_endHour;i++,j++)thead[j]="<th colspan='2'>"+(i<10?"0"+i:i)+"</th>";table.push("<thead><tr><th></th>"+thead.join("")+"</tr></thead>");for(i=0,j=0,len=weekDays.length;i<len;i++,j++){tbody[j]="<tr><td class='weekday'>"+weekDays[i]+"</td>";for(k=_startHour;k<=_endHour;k++)tbody[j]+="<td></td><td></td>";tbody[j]+="</tr>"}table.push("<tbody>"+tbody.join(" ")+"</tbody"),$grid.html(table.join(""))}function _renderVertical(start,end){_startHour=start||_startHour,_endHour=end||_endHour;var i,j,k,len,thead=[],tbody=[],table=[_tableHead()];for(i=0,len=weekDays.length;i<len;i++)thead[i]="<th>"+weekDays[i]+"</th>";table.push("<thead><tr><th></th>"+thead.join("")+"</tr></thead>");for(i=_startHour,j=0;i<=_endHour;i++,j++){tbody[j]="<tr><td class='weekday' rowspan='2'>"+(i<10?"0"+i:i)+":00 - "+(i+1<10?"0"+(i+1):i+1)+":00</td>";for(k=0;k<len;k++)tbody[j]+="<td></td>";tbody[j]+="</tr><tr>";for(k=0;k<len;k++)tbody[j]+="<td></td>";tbody[j]+="</tr>"}table.push("<tbody>"+tbody.join(" ")+"</tbody>"),$grid.html(table.join(""))}var _type="horizontal",_tableRender=_renderHorizontal,_startHour=8,_endHour=21,$grid=$("#table-grid"),weekDays=["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];exports.init=_render,exports.render=_render})