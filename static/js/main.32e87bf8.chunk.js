(this.webpackJsonpttrakk=this.webpackJsonpttrakk||[]).push([[0],{13:function(e,t,n){e.exports=n(22)},19:function(e,t,n){},20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),c=n.n(o),l=(n(18),n(3)),i=n(4),u=n(6),s=n(5),p=n(7),d=(n(19),n(8)),m=function(e,t){return"hours.".concat(e,".").concat(t)};n(20);var f=n(26),h=n(27);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var y,v={getStoredState:function(e){return function(t,n){var a=localStorage.getItem(m(e,t));return a?JSON.parse(a):n}}(y="Forms"),storeState:function(e){return function(t,n){return localStorage.setItem(m(e,t),JSON.stringify(n)),n}}(y)},b=v.getStoredState,O=v.storeState,E=["token","workspaceId","projectId","hours"],j=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={token:b("token",""),workspaceId:b("workspaceId",""),projectId:b("projectId",""),hours:b("hours",34),period:"0",settingsOpen:!1},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.emitOnUpdate(this.state)}},{key:"setFormState",value:function(e){var t=this;this.setState((function(n){return Object.keys(e).filter((function(e){return E.includes(e)})).forEach((function(t){return O(t,e[t])})),t.emitOnUpdate(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{},e)),e}))}},{key:"emitOnUpdate",value:function(e){var t=e.token,n=e.workspaceId,a=e.projectId,r=e.hours,o=e.period;this.props.onUpdate({token:t,workspaceId:n,projectId:a,hours:r,period:o})}},{key:"render",value:function(){var e=this,t=Array.from({length:13},(function(e,t){return(12-t).toString()})),n=this.state,a=n.token,o=n.workspaceId,c=n.projectId,l=n.hours,i=n.period,u=n.settingsOpen;return r.a.createElement("div",{className:"Forms m-3"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"form_period"},"Per\xedodo"),r.a.createElement("select",{className:"custom-select",value:i,onChange:function(t){return e.setFormState({period:t.target.value})}},t.map((function(e){return r.a.createElement("option",{value:e,key:e},Object(f.a)(Object(h.a)(new Date,parseInt(e,10)),"MMMM yyyy"))})))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h2",{className:"mb-0"},r.a.createElement("button",{className:"btn btn-link",type:"button",onClick:function(){return e.setState({settingsOpen:!u})}},"Op\xe7\xf5es"))),r.a.createElement("div",{className:"collapse ".concat(u?"show":"")},r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"form_hours"},"Horas"),r.a.createElement("input",{className:"form-control",id:"form_hours",type:"number",min:1,value:l,onChange:function(t){return e.setFormState({hours:t.target.value})}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"form_token"},"Token"),r.a.createElement("input",{className:"form-control",id:"form_token",type:"text",value:a,onChange:function(t){return e.setFormState({token:t.target.value})}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"form_workspace"},"Workspace ID"),r.a.createElement("input",{className:"form-control",id:"form_workspace",type:"text",value:o,onChange:function(t){return e.setFormState({workspaceId:t.target.value})}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"form_project"},"Project ID"),r.a.createElement("input",{className:"form-control",id:"form_project",type:"text",value:c,onChange:function(t){return e.setFormState({projectId:t.target.value})}}))))))}}]),t}(r.a.Component),k=n(12),S=n(23),w=n(28),x=n(24),I=n(25);function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(n,!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function N(e){var t=e.token,n=e.workspaceId,a=e.projectId,r=e.hours,o=e.period;return function e(t,n,a){var r=new URLSearchParams(M({},a,{page:t})).toString();return window.fetch("https://toggl.com/reports/api/v2/details?".concat(r),{method:"GET",headers:P(n)}).then((function(e){return e.json()})).then((function(r){return(t-1)*r.per_page+r.data.length<r.total_count?e(t+1,n,a).then((function(e){return r.data.concat(e)})):r.data}))}(1,t,function(e){var t=e.workspaceId,n=e.projectId,a=function(e){var t=F(e);return{since:Object(f.a)(Object(x.a)(t),"yyyy-MM-dd"),until:Object(f.a)(Object(I.a)(t),"yyyy-MM-dd")}}(e.period),r=a.since,o=a.until;return{since:r,until:o,workspace_id:t,project_ids:n,user_agent:"kkd-hrs"}}({workspaceId:n,projectId:a,period:o})).then((function(e){var t=60*r*60,n=e.map((function(e){return e.dur/1e3})).reduce((function(e,t){return e+t})),a=F(o),c=Math.round(t/function(e){return Array.from({length:Object(k.a)(e)},(function(e,t){return t+1})).filter((function(t){return!Object(S.a)(new Date(e.getFullYear(),e.getMonth(),t))})).length}(a)),l=function(e){return Array.from({length:Object(k.a)(e)},(function(t,n){return new Date(e.getFullYear(),e.getMonth(),n+1)}))}(a).map((function(t){return{date:t,goal:Object(S.a)(t)?0:c,executed:e.filter((function(e){return Object(w.a)(t,new Date(e.start))})).map((function(e){return e.dur/1e3})).reduce((function(e,t){return e+t}),0)}})),i=l.map((function(e,n){return M({},e,{idealSlope:l.slice(0,n+1).map((function(e){return e.goal})).reduce((function(e,t){return e-t}),t),executedSlope:l.slice(0,n+1).map((function(e){return e.executed})).reduce((function(e,t){return e-t}),t)})}));return{goalInSeconds:t,totalExecutedSeconds:n,dateInMonth:a,dailyGoalSeconds:c,dailyData:l,graphData:i}}))}var P=function(e){return{Authorization:"Basic ".concat(btoa("".concat(e,":api_token")))}};function F(e){return Object(h.a)(new Date,parseInt(e,10))}n(21);var _=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={tooltipOpen:!1,tooltipX:0,tooltipY:0,tooltipDate:new Date,tooltipExecuted:"",tooltipSubtotal:"",tooltipIdeal:""},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.graphData,n=t.goalInSeconds,a=t.totalExecutedSeconds,o=t.dateInMonth,c=t.dailyGoalSeconds,l=(t.dailyData,t.graphData),i=n/3600,u=l.findIndex((function(e){return Object(w.a)(new Date,e.date)})),s=70/l.length,p=-1===u?l.length:u+1;return r.a.createElement("div",{style:{flex:"1",display:"flex",flexDirection:"column"}},r.a.createElement("div",{className:"m-1"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},Object(f.a)(o,"MMMM yyyy")),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("strong",null,"Goal: ")," ",C(n)),r.a.createElement("li",null,r.a.createElement("strong",null,"Executed: ")," ",C(a)),r.a.createElement("li",null,r.a.createElement("strong",null,"Daily goal: ")," ",C(c)),-1!==u&&r.a.createElement("li",null,r.a.createElement("strong",null,"Distance from daily goal: ")," ",C(l[u].executedSlope-l[u].idealSlope)))))),r.a.createElement("div",{style:{flex:"1",display:"none"}},l.map((function(e,t){e.date,e.goal,e.executed;var a=e.idealSlope,o=e.executedSlope,c=a/n,l=o/n;return r.a.createElement("div",{key:t,style:{padding:"3px",height:"100%",display:"flex",flex:"1",flexDirection:"column"}},r.a.createElement("div",{style:{flex:"1",display:"flex",alignItems:"flex-end"}},r.a.createElement("div",{style:{background:"#f00",flex:"1",height:"".concat(100*c,"%")},title:"Ideal: ".concat(C(a)," remaining")}),r.a.createElement("div",{style:{background:"#0f0",flex:"1",height:"".concat(100*l,"%")},title:"Executed: ".concat(C(o)," remaining")})),r.a.createElement("div",{style:{height:"30px",fontWeight:t===u?"bold":"normal"}},t+1,"."))}))),r.a.createElement("div",{style:{flex:"1"}},r.a.createElement("svg",{style:{height:"100%",width:"100%"},version:"1",viewBox:"0 0 70 30",id:"graph"},Array.from({length:i+1},(function(e,t){return t})).map((function(e){return r.a.createElement("path",{strokeWidth:.1,fill:"none",stroke:"#cccccc",d:"M 0 ".concat(29-e/i*28," H 70"),key:e})})),Array.from({length:i+1},(function(e,t){return t})).map((function(e){return r.a.createElement("text",{color:"#cccccc",x:0,y:29.6-e/i*28,key:e,fontSize:.5},e)})),r.a.createElement("path",{className:"ideal",d:l.map((function(e,t){var a=e.idealSlope;return"".concat(0===t?"M":"L"," ").concat(s*t+s/2," ").concat(29-a/n*28)})).join(" ")}),l.map((function(t,a){var o=t.idealSlope;return r.a.createElement("circle",{onMouseOver:function(t){return e.showTooltip(t,a)},onMouseLeave:function(){return e.hideTooltip()},cx:s*a+s/2,cy:29-o/n*28,r:.2,className:"ideal",key:a})})),r.a.createElement("path",{className:"executed",d:l.slice(0,p).map((function(e,t){var a=e.executedSlope;return"".concat(0===t?"M":"L"," ").concat(s*t+s/2," ").concat(29-a/n*28)})).join(" ")}),l.slice(0,p).map((function(t,a){var o=t.executedSlope;return r.a.createElement("circle",{onMouseOver:function(t){return e.showTooltip(t,a)},onMouseLeave:function(){return e.hideTooltip()},cx:s*a+s/2,cy:29-o/n*28,r:.2,className:"executed",key:a})})),Array.from({length:l.length},(function(e,t){return t})).map((function(e){return r.a.createElement("text",{textAnchor:"end",x:s*e+s/2,y:30,key:e,fontSize:.8},e+1,".")}))),r.a.createElement("div",{id:"tooltip",style:{visibility:this.state.tooltipOpen?"visible":"hidden",left:this.state.tooltipX,top:this.state.tooltipY}},r.a.createElement("p",null,r.a.createElement("strong",null,Object(f.a)(this.state.tooltipDate,"dd/MM/yyyy"))),r.a.createElement("p",null,"Executed: ",this.state.tooltipExecuted),r.a.createElement("p",null,"Subtotal: ",this.state.tooltipSubtotal),r.a.createElement("p",null,"Ideal: ",this.state.tooltipIdeal))))}},{key:"showTooltip",value:function(e,t){var n=document.querySelector("#tooltip").getBoundingClientRect(),a=document.body.getBoundingClientRect(),r=e.currentTarget.getBoundingClientRect(),o=r.left,c=r.height,l=r.right,i=r.top,u=l+20;u+n.width>a.right&&(u=o-20-n.width);var s=i+c/2-n.height/2;s+n.height>a.bottom&&(s=a.bottom-n.height-5);var p=this.props.graphData.graphData[t],d=this.props.graphData.goalInSeconds;this.setState({tooltipX:u,tooltipY:s,tooltipOpen:!0,tooltipDate:p.date,tooltipExecuted:C(p.executed),tooltipSubtotal:C(d-p.executedSlope),tooltipIdeal:C(d-p.idealSlope)})}},{key:"hideTooltip",value:function(){this.setState({tooltipOpen:!1})}}]),t}(a.Component);function C(e){return e=Math.floor(e),[Math.floor(e/3600),Math.floor(e/60)%60,e%60].map((function(e){return t="".concat(e),n=2,a=(a=(a="0")||" ").substr(0,1),t.length<n?a.repeat(n-t.length)+t:t;var t,n,a})).join(":")}var A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={graphLoading:!1,graphData:null},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"loadGraph",value:function(e){var t=this;this.setState({graphLoading:!0}),N(e).then((function(e){console.log(e),t.setState({graphLoading:!1,graphData:e})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.graphLoading,a=t.graphData;return r.a.createElement("div",{className:"App"},r.a.createElement(j,{onUpdate:function(t){return e.loadGraph(t)}}),!n&&a&&r.a.createElement(_,{graphData:a}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.32e87bf8.chunk.js.map