webpackJsonp([2,5],[function(t,n){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(){return{maxWidth:window.innerWidth||(document.documentElement||document).clientWidth,maxHeight:window.innerHeight||(document.documentElement||document).clientHeight}}function o(){return"rgb("+Math.ceil(255*Math.random())+", "+Math.ceil(255*Math.random())+", "+Math.ceil(255*Math.random())+")"}var a=function(){function t(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}}();window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;var h=function(){function t(n,e,o){i(this,t),this.canvas=n,this.context=n.getContext("2d");var a=[e,o];this.height=a[0],this.width=a[1];var h=[e,o];n.height=h[0],n.width=h[1],this.context.fillStyle="#f6f6f6",this.context.fillRect(0,0,this.width,this.height)}return a(t,[{key:"drawTriangle",value:function(){var t=Math.random()>5?30*Math.random():30*-Math.random(),n=Math.random()*this.height+(Math.random()>.5?500*Math.random():500*-Math.random()),i=Math.random()*this.width+(Math.random()>.5?500*Math.random():500*-Math.random()),e=Math.random()>.5,a=Math.random()*(Math.random()>.5?this.height:this.width),h=Math.random()*(Math.random()>.5?this.height:this.width),r=Math.random()*(Math.random()>.5?this.height:this.width),c=Math.random()*(Math.random()>.5?this.height:this.width);this.context.beginPath(),e?(this.context.moveTo(n+t,i+t),this.context.lineTo(a+t,h+t),this.context.lineTo(r+t,c+t)):(this.context.moveTo(i+t,n+t),this.context.lineTo(h+t,a+t),this.context.lineTo(c+t,r+t)),this.context.closePath(),this.context.fillStyle="rgba(0, 0, 0, .4)",this.context.fill(),this.context.beginPath(),e?(this.context.moveTo(n,i),this.context.lineTo(a,h),this.context.lineTo(r,c)):(this.context.moveTo(i,n),this.context.lineTo(h,a),this.context.lineTo(c,r)),this.context.closePath(),this.context.fillStyle=o(),this.context.fill()}}]),t}();!function(){var t=document.querySelector("canvas"),n=e(),i=new h(t,n.maxHeight,n.maxWidth);i.drawTriangle(),setInterval(function(){return i.drawTriangle()},350)}()}]);
//# sourceMappingURL=demo-03.js.map