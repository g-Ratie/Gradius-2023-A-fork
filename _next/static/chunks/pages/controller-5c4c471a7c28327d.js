(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[265],{1319:function(t,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/controller",function(){return o(6289)}])},6289:function(t,e,o){"use strict";o.r(e);var i=o(5893),r=o(24),n=o(7294),s=o(2642),a=o(5371),c=o(8239),p=o(1985),l=o.n(p);let u=()=>{let t=(0,n.useRef)(null);console.log(t);let[e]=(0,r.KO)(a.L),[o,p]=(0,n.useState)(0),[u,d]=(0,n.useState)(null),h=(0,n.useRef)({x:0,y:0}),f=()=>{if(null!==t.current){let e=t.current.offsetWidth;p(e)}};if((0,n.useEffect)(()=>{let t=setInterval(f,100);return()=>{console.log("AAAAAAAAAAAAAAAAAAAAAA"),clearInterval(t)}},[]),!e)return(0,i.jsx)(c.g,{visible:!0});let _=async()=>{console.log("move",h.current)},v=()=>{let t=setInterval(_,50);d(t)},y=()=>{null!==u&&clearInterval(u)},b=t=>{var e,o;let i={x:Math.round(null!==(e=t.x)&&void 0!==e?e:0),y:Math.round(null!==(o=t.y)&&void 0!==o?o:0)};h.current=i};return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:l().container,children:(0,i.jsxs)("div",{className:l().board,children:[(0,i.jsx)("div",{ref:t,className:l().joystick,children:(0,i.jsx)(s.Tj,{size:o,stickSize:o/2,baseColor:"gray",stickColor:"black",baseShape:s.aR.Square,move:b,stop:y,start:v})}),(0,i.jsx)("button",{className:l().shoot})]})})})};e.default=u},1985:function(t){t.exports={container:"controller_container__cQDFp",board:"controller_board__cEojV",joystick:"controller_joystick__Y1wVn",shoot:"controller_shoot__Rrg9w"}},7783:function(t,e,o){"use strict";var i,r,n,s,a,c=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),p=this&&this.__assign||function(){return(p=Object.assign||function(t){for(var e,o=1,i=arguments.length;o<i;o++)for(var r in e=arguments[o])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.Joystick=void 0;var l=o(7294),u=o(7950),d=o(704),h=o(4459);(i=s||(s={})).PointerDown="pointerdown",i.PointerMove="pointermove",i.PointerUp="pointerup",(r=a||(a={}))[r.TopRight=2.35619449]="TopRight",r[r.TopLeft=-2.35619449]="TopLeft",r[r.BottomRight=.785398163]="BottomRight",r[r.BottomLeft=-.785398163]="BottomLeft";var f=function(t){function e(e){var o,i=t.call(this,e)||this;return i._stickRef=l.createRef(),i._baseRef=l.createRef(),i.frameId=null,i._pointerId=null,i._mounted=!1,i._pointerMove=function(t){if(t.preventDefault(),i.state.dragging&&(i.props.followCursor||t.pointerId===i._pointerId)){var e=t.clientX,o=t.clientY,r=e-i._parentRect.left-i._radius,n=o-i._parentRect.top-i._radius,s=i._distance(r,n),a=(0,h.shapeBoundsFactory)(i.props.controlPlaneShape||i.props.baseShape,e,o,r,n,s,i._radius,i._baseSize,i._parentRect);r=a.relativeX,n=a.relativeY;var c=Math.atan2(r,n);i._updatePos({relativeX:r,relativeY:n,distance:i._distanceToPercentile(s),direction:i._getDirection(c),axisX:e-i._parentRect.left,axisY:o-i._parentRect.top})}},i._pointerUp=function(t){if(t.pointerId===i._pointerId){var e={dragging:!1};i.props.sticky||(e.coordinates=void 0),i.frameId=window.requestAnimationFrame(function(){i._mounted&&i.setState(e)}),window.removeEventListener(s.PointerUp,i._pointerUp),window.removeEventListener(s.PointerMove,i._pointerMove),i._pointerId=null,i.props.stop&&i.props.stop({type:"stop",x:i.props.sticky?2*i.state.coordinates.relativeX/i._baseSize:null,y:i.props.sticky?2*i.state.coordinates.relativeY/i._baseSize:null,direction:i.props.sticky?i.state.coordinates.direction:null,distance:i.props.sticky?i.state.coordinates.distance:null})}},i.state={dragging:!1},i._throttleMoveCallback=(o=0,function(t){var e=new Date().getTime();if(!(e-o<(i.props.throttle||0))&&(o=e,i.props.move))return i.props.move(t)}),i}return c(e,t),e.prototype.componentWillUnmount=function(){var t=this;this._mounted=!1,this.props.followCursor&&window.removeEventListener(s.PointerMove,function(e){return t._pointerMove(e)}),null!==this.frameId&&window.cancelAnimationFrame(this.frameId)},e.prototype.componentDidMount=function(){var t=this;this._mounted=!0,this.props.followCursor&&(this._parentRect=this._baseRef.current.getBoundingClientRect(),this.setState({dragging:!0}),window.addEventListener(s.PointerMove,function(e){return t._pointerMove(e)}),this.props.start&&this.props.start({type:"start",x:null,y:null,distance:null,direction:null}))},e.prototype._updatePos=function(t){var e=this;this.frameId=window.requestAnimationFrame(function(){e._mounted&&e.setState({coordinates:t})}),"number"==typeof this.props.minDistance&&t.distance<this.props.minDistance||this._throttleMoveCallback({type:"move",x:2*t.relativeX/this._baseSize,y:-(2*t.relativeY/this._baseSize),direction:t.direction,distance:t.distance})},e.prototype._pointerDown=function(t){this.props.disabled||this.props.followCursor||(this._parentRect=this._baseRef.current.getBoundingClientRect(),this.setState({dragging:!0}),window.addEventListener(s.PointerUp,this._pointerUp),window.addEventListener(s.PointerMove,this._pointerMove),this._pointerId=t.pointerId,this._stickRef.current.setPointerCapture(t.pointerId),this.props.start&&this.props.start({type:"start",x:null,y:null,distance:null,direction:null}))},e.prototype._getDirection=function(t){return t>a.TopRight||t<a.TopLeft?"FORWARD":t<a.TopRight&&t>a.BottomRight?"RIGHT":t<a.BottomLeft?"LEFT":"BACKWARD"},e.prototype._distance=function(t,e){return Math.hypot(t,e)},e.prototype._distanceToPercentile=function(t){var e=t/(this._baseSize/2)*100;return e>100?100:e},e.prototype.getBaseShapeStyle=function(){var t=this.props.baseShape||u.JoystickShape.Circle;return(0,d.shapeFactory)(t,this._baseSize)},e.prototype.getStickShapeStyle=function(){var t=this.props.stickShape||u.JoystickShape.Circle;return(0,d.shapeFactory)(t,this._baseSize)},e.prototype._getBaseStyle=function(){var t=void 0!==this.props.baseColor?this.props.baseColor:"#000033",e="".concat(this._baseSize,"px"),o=p(p({},this.getBaseShapeStyle()),{height:e,width:e,background:t,display:"flex",justifyContent:"center",alignItems:"center"});return this.props.baseImage&&(o.background="url(".concat(this.props.baseImage,")"),o.backgroundSize="100%"),o},e.prototype._getStickStyle=function(){var t=void 0!==this.props.stickColor?this.props.stickColor:"#3D59AB",e=this._stickSize?"".concat(this._stickSize,"px"):"".concat(this._baseSize/1.5,"px"),o=p(p({},this.getStickShapeStyle()),{background:t,cursor:"move",height:e,width:e,border:"none",flexShrink:0,touchAction:"none"});return this.props.stickImage&&(o.background="url(".concat(this.props.stickImage,")"),o.backgroundSize="100%"),this.props.pos&&(o=Object.assign({},o,{position:"absolute",transform:"translate3d(".concat(this.props.pos.x*this._baseSize/2,"px, ").concat(-(this.props.pos.y*this._baseSize)/2,"px, 0)")})),void 0!==this.state.coordinates&&(o=Object.assign({},o,{position:"absolute",transform:"translate3d(".concat(this.state.coordinates.relativeX,"px, ").concat(this.state.coordinates.relativeY,"px, 0)")})),o},e.prototype.render=function(){var t=this;this._baseSize=this.props.size||100,this._stickSize=this.props.stickSize,this._radius=this._baseSize/2;var e=this._getBaseStyle(),o=this._getStickStyle();return l.createElement("div",{"data-testid":"joystick-base",className:this.props.disabled?"joystick-base-disabled":"",ref:this._baseRef,style:e},l.createElement("button",{ref:this._stickRef,disabled:this.props.disabled,onPointerDown:function(e){return t._pointerDown(e)},className:this.props.disabled?"joystick-disabled":"",style:o}))},e}(l.Component);e.Joystick=f},7950:function(t,e){"use strict";var o;Object.defineProperty(e,"__esModule",{value:!0}),e.JoystickShape=void 0,(o=e.JoystickShape||(e.JoystickShape={})).Circle="circle",o.Square="square",o.AxisY="axisY",o.AxisX="axisX"},2642:function(t,e,o){"use strict";e.aR=e.Tj=void 0;var i=o(7783);Object.defineProperty(e,"Tj",{enumerable:!0,get:function(){return i.Joystick}});var r=o(7950);Object.defineProperty(e,"aR",{enumerable:!0,get:function(){return r.JoystickShape}})},4459:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.shapeBoundsFactory=void 0;var i=o(7950);e.shapeBoundsFactory=function(t,e,o,n,s,a,c,p,l){switch(t){case i.JoystickShape.Square:return{relativeX:n=r(e-l.left-p/2,p),relativeY:s=r(o-l.top-p/2,p)};case i.JoystickShape.AxisX:return{relativeX:n=r(e-l.left-p/2,p),relativeY:s=0};case i.JoystickShape.AxisY:return{relativeX:n=0,relativeY:s=r(o-l.top-p/2,p)};default:return a>c&&(n*=c/a,s*=c/a),{relativeX:n,relativeY:s}}};var r=function(t,e){var o=e/2;return t>o?o:t<-o?-1*o:t}},704:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.shapeFactory=void 0;var i=o(7950);e.shapeFactory=function(t,e){switch(t){case i.JoystickShape.Square:return{borderRadius:Math.sqrt(e)};case i.JoystickShape.Circle:default:return{borderRadius:e}}}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=1319)}),_N_E=t.O()}]);