import{createApp as z}from"https://unpkg.com/petite-vue@0.4.1?module";import*as U from"https://unpkg.com/@codewars/lambda-calculus";const I=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function f(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(r){if(r.ep)return;r.ep=!0;const o=f(r);fetch(r.href,o)}};I();const Z=function(i){i.defineMode("lambdacalc",function(c,f){const u="variable-2",r="text",o="bracket",l="keyword",b=l,g="text",y="text",E="def",x="atom",A="number",L="text",v="error",C="variable-3",S="text",s="error",h=/[a-zA-Z][a-zA-Z0-9_\-']*/,k=/=/,M=/\(|\)/,O=/[a-zA-Z_][a-zA-Z0-9_\-']*|\./,N=/\d+/;function D(e,n){return e.match(/.*=/,!1)?p(e,n):a(e,n)}function p(e,n){const t=(e.match(h)||[])[0];if(n.f=P,!t||!e.match(/\s*=/,!1))return null;const d=[];return n.defined.includes(t)&&d.push(C),n.defined.push(t),d.push(u),d.join(" ")}function P(e,n){return e.match(k)?(n.f=a,r):null}function a(e,n){return T(e,n)||_(e,n)||B(e,n)||F(e)}function T(e,n){const t=e.eat(M);if(!t)return null;if(t=="("&&e.peek()==")")return e.next(),L;if(t=="(")n.depth.push(e.column()+e.indentation()),n.bound.push([]);else{if(!(n.depth.length&&n.bound.length))return s;n.depth.pop(),n.bound.pop()}return n.f=a,o}function _(e,n){return e.eat("\\")?(n.f=R,l):null}function B(e,n){const t=(e.match(h)||[])[0];return t?n.bound.some(d=>d.includes(t))?y:n.defined.includes(t)?g:v:null}function F(e,n){return(e.match(N)||[])[0]&&(/\s|\)/.test(e.peek())||e.eol())?A:null}function R(e,n){const t=(e.match(O)||[])[0];return t?t==="."?(n.f=a,b):t[0]==="_"?x:(n.bound[n.bound.length-1].push(t),E):null}function w(e,n){return e.match(/[^\s#]*/),s}return{startState:function(){return{f:p,depth:[],defined:[],bound:[[]],debug:!1}},copyState:function(e){return{f:e.f,depth:[...e.depth],defined:[...e.defined],bound:e.bound.map(n=>[...n]),debug:e.debug}},token:function(e,n){if(e.eat(/\t/))return s;if(/[ \n]/.test(e.peek())){e.eatWhile(/[ \n]/);return}if(e.peek()==="#")return e.match(/^#debug/)&&(n.debug=!n.debug),e.skipToEnd(),"comment";e.sol()&&n.depth.length===0&&(n.bound=[[]],n.f=p);const t=n.f(e,n)||(n.debug?null:D(e,n))||w(e);return!n.debug&&t==s?S:t},indent:function(e,n){return e.depth.length?e.depth[e.depth.length-1]+2:0},lineComment:"#"}}),i.defineMIME("text/x-lambdacalc","lambdacalc")};Z(CodeMirror);const m=CodeMirror.fromTextArea(document.getElementById("code"),{mode:"lambdacalc",lineNumbers:!0,matchBrackets:!0,theme:"codewars",specialChars:/\\/,specialCharPlaceholder:()=>{const i=document.createElement("span");return i.setAttribute("cm-text","\\"),i.innerHTML="\u03BB",i}});m.setSize(500,400);const q=i=>i.replace(/\\/g,"\u03BB");z({purity:"Let",purityOptions:["Let","LetRec","PureLC"],verbosity:"Calm",verbosityOptions:["Calm","Concise","Loquacious","Verbose"],numEncoding:"Church",numEncodingOptions:["None","Church","Scott","BinaryScott"],evaluation:"not false",result:"",error:"",evaluate(){this.result="",this.error="";const i=m.getValue(),c=this.evaluation,f=U.compileWith({purity:this.purity,verbosity:this.verbosity,numEncoding:this.numEncoding});try{const{result:u}=f(`${i}

result = ${c}`);this.result=q(u.term+"")}catch(u){this.error=u.message||u.name}}}).mount();
