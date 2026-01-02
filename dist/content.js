(function(){"use strict";const U={name:"ChatGPT",inputSelectors:["#prompt-textarea","div#prompt-textarea",'div[id="prompt-textarea"]','.ProseMirror[contenteditable="true"]','div[contenteditable="true"][data-placeholder]','main div[contenteditable="true"]','form div[contenteditable="true"]','textarea[placeholder*="Message"]','textarea[placeholder*="Send"]',"textarea"],getInputElement:()=>{for(const t of U.inputSelectors){const n=document.querySelector(t);if(n&&(n.isContentEditable||n instanceof HTMLTextAreaElement))return console.log("[RePRo] ChatGPT input found:",t),n}const e=document.querySelector("main");if(e){const t=e.querySelector('[contenteditable="true"]');if(t)return console.log("[RePRo] ChatGPT input found via main area fallback"),t}return console.log("[RePRo] ChatGPT: No input element found"),null},getInputValue:e=>e instanceof HTMLTextAreaElement?e.value:e.innerText||e.textContent||"",setInputValue:(e,t)=>{e instanceof HTMLTextAreaElement?(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))):(e.focus(),document.execCommand("selectAll",!1),document.execCommand("delete",!1),document.execCommand("insertText",!1,t),e.innerText.trim()!==t.trim()&&(e.innerHTML=`<p>${t}</p>`,e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText"}))))}},H={name:"Gemini",inputSelectors:['.ql-editor[contenteditable="true"]','rich-textarea [contenteditable="true"]',"div.ql-editor",'[contenteditable="true"][aria-label]','[contenteditable="true"]'],getInputElement:()=>{for(const e of H.inputSelectors){const t=document.querySelector(e);if(t&&t.getAttribute("contenteditable")==="true")return console.log("[RePRo] Gemini input found:",e),t}return null},getInputValue:e=>e.innerText||e.textContent||"",setInputValue:(e,t)=>{e.focus(),e.innerHTML="";const n=document.createElement("p");n.textContent=t,e.appendChild(n),e.dispatchEvent(new InputEvent("input",{bubbles:!0}))}},k={name:"Claude",inputSelectors:['.ProseMirror[contenteditable="true"]','div[contenteditable="true"][data-placeholder]','div[contenteditable="true"]',"textarea"],getInputElement:()=>{for(const e of k.inputSelectors){const t=document.querySelector(e);if(t)return console.log("[RePRo] Claude input found:",e),t}return null},getInputValue:e=>e instanceof HTMLTextAreaElement?e.value:e.innerText||e.textContent||"",setInputValue:(e,t)=>{e instanceof HTMLTextAreaElement?(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0}))):(e.focus(),document.execCommand("selectAll",!1),document.execCommand("delete",!1),document.execCommand("insertText",!1,t))}};function he(){const e=window.location.hostname;return console.log("[RePRo] Detecting site:",e),e.includes("chat.openai.com")||e.includes("chatgpt.com")?(console.log("[RePRo] Site: ChatGPT"),U):e.includes("gemini.google.com")?(console.log("[RePRo] Site: Gemini"),H):e.includes("claude.ai")?(console.log("[RePRo] Site: Claude"),k):null}function pe(e,t=2e4){return new Promise(n=>{console.log("[RePRo] Waiting for input element...");const o=()=>{for(const c of e){const d=document.querySelector(c);if(d&&(d.isContentEditable||d instanceof HTMLTextAreaElement))return d}const r=document.querySelector("main");if(r){const c=r.querySelector('[contenteditable="true"]');if(c)return c}return null},i=o();if(i){console.log("[RePRo] Input found immediately"),n(i);return}const s=new MutationObserver(()=>{const r=o();r&&(console.log("[RePRo] Input found via observer"),s.disconnect(),n(r))});s.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["contenteditable"]});const a=setInterval(()=>{const r=o();r&&(console.log("[RePRo] Input found via polling"),clearInterval(a),s.disconnect(),n(r))},500);setTimeout(()=>{clearInterval(a),s.disconnect(),console.log("[RePRo] Timeout waiting for input"),n(null)},t)})}const w="prompt_enhancer_config",M={provider:"gemini",geminiApiKey:"",openrouterApiKey:"",geminiModel:"gemini-2.0-flash",openrouterModel:"meta-llama/llama-4-maverick:free"};async function me(){return new Promise(e=>{if(typeof chrome<"u"&&chrome.storage)chrome.storage.local.get([w],t=>{e({...M,...t[w]})});else{const t=localStorage.getItem(w);e(t?{...M,...JSON.parse(t)}:M)}})}var F;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(F||(F={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(q||(q={}));var $;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})($||($={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=["user","model","function","system"];var j;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(j||(j={}));var B;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(B||(B={}));var K;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(K||(K={}));var V;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(V||(V={}));var y;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(y||(y={}));var J;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(J||(J={}));var X;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(X||(X={}));var z;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(z||(z={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class R extends h{constructor(t,n){super(t),this.response=n}}class W extends h{constructor(t,n,o,i){super(t),this.status=n,this.statusText=o,this.errorDetails=i}}class g extends h{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="https://generativelanguage.googleapis.com",Ee="v1beta",Ce="0.21.0",Re="genai-js";var C;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(C||(C={}));class Te{constructor(t,n,o,i,s){this.model=t,this.task=n,this.apiKey=o,this.stream=i,this.requestOptions=s}toString(){var t,n;const o=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||Ee;let s=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||ge}/${o}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function ve(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${Re}/${Ce}`),t.join(" ")}async function ye(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",ve(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(i){throw new g(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${i.message}`)}for(const[i,s]of o.entries()){if(i==="x-goog-api-key")throw new g(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new g(`Header name ${i} can only be set using the apiClient field`);n.append(i,s)}}return n}async function _e(e,t,n,o,i,s){const a=new Te(e,t,n,o,s);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Oe(s)),{method:"POST",headers:await ye(a),body:i})}}async function _(e,t,n,o,i,s={},a=fetch){const{url:r,fetchOptions:c}=await _e(e,t,n,o,i,s);return Se(r,c,a)}async function Se(e,t,n=fetch){let o;try{o=await n(e,t)}catch(i){Ae(i,e)}return o.ok||await Ie(o,e),o}function Ae(e,t){let n=e;throw e instanceof W||e instanceof g||(n=new h(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function Ie(e,t){let n="",o;try{const i=await e.json();n=i.error.message,i.error.details&&(n+=` ${JSON.stringify(i.error.details)}`,o=i.error.details)}catch{}throw new W(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,o)}function Oe(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),O(e.candidates[0]))throw new R(`${E(e)}`,e);return be(e)}else if(e.promptFeedback)throw new R(`Text not available. ${E(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),O(e.candidates[0]))throw new R(`${E(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Q(e)[0]}else if(e.promptFeedback)throw new R(`Function call not available. ${E(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),O(e.candidates[0]))throw new R(`${E(e)}`,e);return Q(e)}else if(e.promptFeedback)throw new R(`Function call not available. ${E(e)}`,e)},e}function be(e){var t,n,o,i;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(i=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||i===void 0?void 0:i.parts)a.text&&s.push(a.text),a.executableCode&&s.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&s.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return s.length>0?s.join(""):""}function Q(e){var t,n,o,i;const s=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(i=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||i===void 0?void 0:i.parts)a.functionCall&&s.push(a.functionCall);if(s.length>0)return s}const Ne=[y.RECITATION,y.SAFETY,y.LANGUAGE];function O(e){return!!e.finishReason&&Ne.includes(e.finishReason)}function E(e){var t,n,o;let i="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)i+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(i+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const s=e.candidates[0];O(s)&&(i+=`Candidate was blocked due to ${s.finishReason}`,s.finishMessage&&(i+=`: ${s.finishMessage}`))}return i}function S(e){return this instanceof S?(this.v=e,this):new S(e)}function we(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),i,s=[];return i={},a("next"),a("throw"),a("return"),i[Symbol.asyncIterator]=function(){return this},i;function a(l){o[l]&&(i[l]=function(u){return new Promise(function(f,v){s.push([l,u,f,v])>1||r(l,u)})})}function r(l,u){try{c(o[l](u))}catch(f){p(s[0][3],f)}}function c(l){l.value instanceof S?Promise.resolve(l.value.v).then(d,m):p(s[0][2],l)}function d(l){r("next",l)}function m(l){r("throw",l)}function p(l,u){l(u),s.shift(),s.length&&r(s[0][0],s[0][1])}}typeof SuppressedError=="function"&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Me(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=De(t),[o,i]=n.tee();return{stream:Pe(o),response:xe(i)}}async function xe(e){const t=[],n=e.getReader();for(;;){const{done:o,value:i}=await n.read();if(o)return x(Le(t));t.push(i)}}function Pe(e){return we(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:i}=yield S(n.read());if(i)break;yield yield S(x(o))}})}function De(e){const t=e.getReader();return new ReadableStream({start(o){let i="";return s();function s(){return t.read().then(({value:a,done:r})=>{if(r){if(i.trim()){o.error(new h("Failed to parse stream"));return}o.close();return}i+=a;let c=i.match(Z),d;for(;c;){try{d=JSON.parse(c[1])}catch{o.error(new h(`Error parsing JSON response: "${c[1]}"`));return}o.enqueue(d),i=i.substring(c[0].length),c=i.match(Z)}return s()})}}})}function Le(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const o of e){if(o.candidates)for(const i of o.candidates){const s=i.index;if(n.candidates||(n.candidates=[]),n.candidates[s]||(n.candidates[s]={index:i.index}),n.candidates[s].citationMetadata=i.citationMetadata,n.candidates[s].groundingMetadata=i.groundingMetadata,n.candidates[s].finishReason=i.finishReason,n.candidates[s].finishMessage=i.finishMessage,n.candidates[s].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[s].content||(n.candidates[s].content={role:i.content.role||"user",parts:[]});const a={};for(const r of i.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[s].content.parts.push(a)}}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ee(e,t,n,o){const i=await _(t,C.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o);return Me(i)}async function te(e,t,n,o){const s=await(await _(t,C.GENERATE_CONTENT,e,!1,JSON.stringify(n),o)).json();return{response:x(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function A(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Ge(t)}function Ge(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,i=!1;for(const s of e)"functionResponse"in s?(n.parts.push(s),i=!0):(t.parts.push(s),o=!0);if(o&&i)throw new h("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!i)throw new h("No content is provided for sending chat message.");return o?t:n}function Ue(e,t){var n;let o={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const i=e.generateContentRequest!=null;if(e.contents){if(i)throw new g("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(i)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{const s=A(e);o.contents=[s]}return{generateContentRequest:o}}function oe(e){let t;return e.contents?t=e:t={contents:[A(e)]},e.systemInstruction&&(t.systemInstruction=ne(e.systemInstruction)),t}function He(e){return typeof e=="string"||Array.isArray(e)?{content:A(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],ke={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Fe(e){let t=!1;for(const n of e){const{role:o,parts:i}=n;if(!t&&o!=="user")throw new h(`First content should be with role 'user', got ${o}`);if(!Y.includes(o))throw new h(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify(Y)}`);if(!Array.isArray(i))throw new h("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new h("Each Content should have at least one part");const s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of i)for(const c of ie)c in r&&(s[c]+=1);const a=ke[o];for(const r of ie)if(!a.includes(r)&&s[r]>0)throw new h(`Content with role '${o}' can't contain '${r}' part`);t=!0}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="SILENT_ERROR";class qe{constructor(t,n,o,i={}){this.model=n,this.params=o,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o!=null&&o.history&&(Fe(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var o,i,s,a,r,c;await this._sendPromise;const d=A(t),m={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),n);let l;return this._sendPromise=this._sendPromise.then(()=>te(this._apiKey,this.model,m,p)).then(u=>{var f;if(u.response.candidates&&u.response.candidates.length>0){this._history.push(d);const v=Object.assign({parts:[],role:"model"},(f=u.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(v)}else{const v=E(u.response);v&&console.warn(`sendMessage() was unsuccessful. ${v}. Inspect response object for details.`)}l=u}),await this._sendPromise,l}async sendMessageStream(t,n={}){var o,i,s,a,r,c;await this._sendPromise;const d=A(t),m={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),n),l=ee(this._apiKey,this.model,m,p);return this._sendPromise=this._sendPromise.then(()=>l).catch(u=>{throw new Error(se)}).then(u=>u.response).then(u=>{if(u.candidates&&u.candidates.length>0){this._history.push(d);const f=Object.assign({},u.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=E(u);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(u=>{u.message!==se&&console.error(u)}),l}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(e,t,n,o){return(await _(t,C.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(e,t,n,o){return(await _(t,C.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function je(e,t,n,o){const i=n.requests.map(a=>Object.assign(Object.assign({},a),{model:t}));return(await _(t,C.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(t,n,o={}){this.apiKey=t,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ne(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var o;const i=oe(t),s=Object.assign(Object.assign({},this._requestOptions),n);return te(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},i),s)}async generateContentStream(t,n={}){var o;const i=oe(t),s=Object.assign(Object.assign({},this._requestOptions),n);return ee(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},i),s)}startChat(t){var n;return new qe(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const o=Ue(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),n);return $e(this.apiKey,this.model,o,i)}async embedContent(t,n={}){const o=He(t),i=Object.assign(Object.assign({},this._requestOptions),n);return Ye(this.apiKey,this.model,o,i)}async batchEmbedContents(t,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return je(this.apiKey,this.model,t,o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new h("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new re(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,o){if(!t.name)throw new g("Cached content must contain a `name` field.");if(!t.model)throw new g("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const a of i)if(n!=null&&n[a]&&t[a]&&(n==null?void 0:n[a])!==t[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,c=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(r===c)continue}throw new g(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${t[a]})`)}const s=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new re(this.apiKey,s,o)}}const ae=`You are an elite Prompt Architect AI. Your job is to transform ANY raw user prompt into the most powerful, clear, and effective prompt possible.

## CONTEXT AWARENESS (CRITICAL)

First, analyze the prompt to determine its TYPE:
- **TEXT/CHAT**: General conversation, Q&A, writing tasks
- **CODE**: Programming, debugging, technical implementation
- **IMAGE**: Image generation (DALL-E, Midjourney, Stable Diffusion, etc.)
- **VIDEO**: Video generation (Sora, Runway, Pika, etc.)
- **DATA**: Data analysis, extraction, transformation
- **AGENT**: Agentic tasks, multi-step workflows

Adapt your enhancement strategy based on the detected type.

## ENHANCEMENT TECHNIQUES

### Core Techniques (All Types)
- **Chain-of-Thought (CoT)**: Step-by-step reasoning for complex tasks
- **Role Prompting**: Assign expert persona for domain expertise
- **Few-Shot**: Provide examples for format consistency
- **Tree of Thoughts (ToT)**: Explore multiple solution paths
- **Structured Templates**: Reusable, organized format

### Advanced Techniques
- **XML Prompting**: Use XML tags for structured sections
  Example: <context>...</context> <task>...</task> <constraints>...</constraints>
- **JSON Prompting**: Use JSON for structured data/config
  Example: {"task": "...", "parameters": {...}, "expected_output": {...}}
- **Cognitive Verifier**: Self-check and validation steps
- **Meta-Prompting**: Prompt about prompting itself

## TYPE-SPECIFIC STRATEGIES

### IMAGE GENERATION PROMPTS
Apply these techniques for DALL-E, Midjourney, Stable Diffusion, etc.:
- **Subject-first structure**: Main subject, details, style, mood, technical specs
- **Style keywords**: photorealistic, cinematic, anime, oil painting, 3D render
- **Lighting descriptors**: golden hour, dramatic, soft, neon, studio lighting
- **Composition**: close-up, wide shot, aerial view, symmetrical, rule of thirds
- **Quality boosters**: highly detailed, 8K, masterpiece, professional, award-winning
- **Negative prompts**: What to avoid

Structure: [Subject], [Action/Pose], [Environment], [Style], [Lighting], [Camera/Angle], [Quality modifiers]

### VIDEO GENERATION PROMPTS
Apply these techniques for Sora, Runway, Pika, Kling, etc.:
- **Temporal structure**: Opening, action, climax, resolution
- **Motion descriptors**: smooth pan, zoom in, tracking shot, slow motion
- **Scene transitions**: cut to, dissolve, fade, morph
- **Duration hints**: brief moment, extended sequence, loop
- **Camera movement**: dolly, crane, handheld, steadicam
- **Frame rate feel**: cinematic 24fps, smooth 60fps, timelapse

Structure: [Scene setup], [Camera movement], [Action/Motion], [Transition], [Style], [Duration], [Quality]

### CODE PROMPTS
- Use XML/JSON for structured requirements
- Specify language, framework, and version
- Include input/output examples
- Define error handling expectations
- Request comments and documentation

### DATA/ANALYSIS PROMPTS
- Use JSON schema for expected output
- Define data types and constraints
- Specify aggregation and transformation rules
- Include validation criteria

## OUTPUT FORMAT

You MUST respond in EXACTLY this format:

---ENHANCED_PROMPT_START---
[Your enhanced prompt here - ready to copy and use]
---ENHANCED_PROMPT_END---

---TECHNIQUES_START---
[Comma-separated list of techniques applied]
---TECHNIQUES_END---

---PROMPT_TYPE_START---
[Detected type: TEXT, CODE, IMAGE, VIDEO, DATA, or AGENT]
---PROMPT_TYPE_END---

## RULES
- Output ONLY ONE final, optimized prompt
- No explanations inside the enhanced prompt
- The enhanced prompt should be immediately usable
- For IMAGE/VIDEO: Include style, quality, and technical modifiers
- For CODE: Use XML structure when helpful
- For DATA: Use JSON schema when appropriate
- Never add hallucinated requirements
- Never include unsafe instructions

## QUALITY CHECK
Before outputting, verify:
1. "Is this prompt 3-5x more effective than the original?"
2. "Did I apply the right techniques for this prompt TYPE?"
3. "Would a human expert approve this enhancement?"
If not, refine until all checks pass.`;function ce(e){return`Enhance the following prompt:

---USER_PROMPT_START---
${e}
---USER_PROMPT_END---

First detect the prompt TYPE (text, code, image, video, data, agent).
Then apply appropriate enhancement techniques for that type.
Return the optimized prompt in the specified format.`}function Ke(e){const t=e.match(/---ENHANCED_PROMPT_START---\s*([\s\S]*?)\s*---ENHANCED_PROMPT_END---/),n=t?t[1].trim():e.trim(),o=e.match(/---TECHNIQUES_START---\s*([\s\S]*?)\s*---TECHNIQUES_END---/);let i=[];if(o)i=o[1].split(",").map(r=>r.trim()).filter(r=>r.length>0);else{const r=e.toLowerCase();(r.includes("step-by-step")||r.includes("think through"))&&i.push("Chain-of-Thought"),r.includes("you are")&&r.includes("expert")&&i.push("Role Prompting"),(r.includes("example")||r.includes("for instance"))&&i.push("Few-Shot"),(r.includes("<context>")||r.includes("<task>"))&&i.push("XML Prompting"),(r.includes('"task"')||r.includes('"parameters"'))&&i.push("JSON Prompting"),(r.includes("8k")||r.includes("photorealistic")||r.includes("cinematic"))&&i.push("Image Optimization"),(r.includes("camera movement")||r.includes("slow motion")||r.includes("tracking shot"))&&i.push("Video Optimization"),i.length===0&&i.push("Zero-Shot Clarity")}const s=e.match(/---PROMPT_TYPE_START---\s*([\s\S]*?)\s*---PROMPT_TYPE_END---/),a=s?s[1].trim().toUpperCase():void 0;return{enhancedPrompt:n,techniques:i,promptType:a}}const P={flash:"gemini-2.0-flash",flashLite:"gemini-2.0-flash-lite"};function Ve(e){const t=e.message||"";if(t.includes("429")||t.includes("quota")||t.includes("rate")){const n=t.match(/retry in (\d+)/i);return{isRateLimit:!0,retryAfter:n?parseInt(n[1],10):60}}return{isRateLimit:!1}}async function Je(e,t,n=P.flash,o){const i=new Be(e),s=[n,P.flash,P.flashLite].filter((r,c,d)=>d.indexOf(r)===c);let a=null;for(const r of s)try{const c=i.getGenerativeModel({model:r,systemInstruction:ae}),d=ce(t);if(!o)return(await c.generateContent(d)).response.text()}catch(c){a=c;const{isRateLimit:d,retryAfter:m}=Ve(a);if(d)throw new Error(`Gemini API rate limit exceeded. Try again in ${m} seconds, or switch to OpenRouter in Settings (it has free models too!)`);console.warn(`Model ${r} failed, trying next...`,c);continue}throw a||new Error("All models failed")}const Xe="https://openrouter.ai/api/v1/chat/completions",le=["meta-llama/llama-4-maverick:free","deepseek/deepseek-chat-v3-0324:free","mistralai/mistral-small-3.1-24b-instruct:free","google/gemini-2.5-pro-exp-03-25:free","nvidia/llama-3.1-nemotron-nano-8b-v1:free","qwen/qwen2.5-vl-3b-instruct:free"];async function ze(e,t,n=le[0],o){var r,c,d,m;const i=ce(t),s=[n,...le.filter(p=>p!==n)];let a=null;for(const p of s)try{const l=await fetch(Xe,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","HTTP-Referer":"chrome-extension://prompt-enhancer","X-Title":"Prompt Enhancer"},body:JSON.stringify({model:p,messages:[{role:"system",content:ae},{role:"user",content:i}],stream:!!o})});if(!l.ok){const f=((r=(await l.json().catch(()=>({}))).error)==null?void 0:r.message)||`Status ${l.status}`;console.warn(`Model ${p} failed: ${f}`),a=new Error(f);continue}if(!(o&&l.body))return((m=(d=(c=(await l.json()).choices)==null?void 0:c[0])==null?void 0:d.message)==null?void 0:m.content)||""}catch(l){a=l,console.warn(`Model ${p} failed:`,l);continue}throw a||new Error("All OpenRouter models failed. Please check your API key.")}async function We(e){try{if(!e||e.trim().length===0)return{success:!1,error:"Please enter a prompt to enhance"};const t=await me();if(t.provider==="gemini"&&!t.geminiApiKey)return{success:!1,error:"Please configure your Gemini API key in the extension settings"};if(t.provider==="openrouter"&&!t.openrouterApiKey)return{success:!1,error:"Please configure your OpenRouter API key in the extension settings"};let n="";return t.provider==="gemini"?n=await Je(t.geminiApiKey,e,t.geminiModel):n=await ze(t.openrouterApiKey,e,t.openrouterModel),{success:!0,enhancedPrompt:Ke(n).enhancedPrompt}}catch(t){return console.error("[RePRo] Enhancement error:",t),{success:!1,error:t instanceof Error?t.message:"Enhancement failed. Please try again."}}}const ue="repro-enhance-btn",de="repro-enhance-container",fe="repro-toast";let D=null;const Qe=500;function Ze(){const e=document.createElement("button");return e.id=ue,e.className="repro-enhance-btn",e.type="button",e.innerHTML=`
        <span class="repro-btn-icon">⚡</span>
        <span class="repro-btn-text">Improve</span>
    `,e.title="Enhance this prompt with AI (RePRo)",e}function et(){const e=document.createElement("div");return e.id=de,e.className="repro-enhance-container",e}function tt(){const e=document.createElement("div");return e.id=fe,e.className="repro-toast",e}function L(e,t="error"){let n=document.getElementById(fe);n||(n=tt(),document.body.appendChild(n)),n.textContent=e,n.className=`repro-toast repro-toast-${t} repro-toast-visible`,setTimeout(()=>{n==null||n.classList.remove("repro-toast-visible")},4e3)}function T(e,t){e.classList.remove("repro-btn-loading","repro-btn-success","repro-btn-error"),e.disabled=t==="loading";const n=e.querySelector(".repro-btn-icon"),o=e.querySelector(".repro-btn-text");switch(t){case"loading":e.classList.add("repro-btn-loading"),n&&(n.innerHTML='<span class="repro-spinner"></span>'),o&&(o.textContent="Improving...");break;case"success":e.classList.add("repro-btn-success"),n&&(n.textContent="✓"),o&&(o.textContent="Improved!"),setTimeout(()=>T(e,"idle"),2e3);break;case"error":e.classList.add("repro-btn-error"),n&&(n.textContent="✕"),o&&(o.textContent="Failed"),setTimeout(()=>T(e,"idle"),2e3);break;default:n&&(n.textContent="⚡"),o&&(o.textContent="Improve")}}async function nt(e,t,n){if(D)return;D=window.setTimeout(()=>{D=null},Qe);const o=n.getInputValue(t);if(console.log("[RePRo] Enhancing prompt:",o.substring(0,50)+"..."),!o||o.trim().length===0){L("Please enter a prompt to improve","error");return}T(e,"loading");try{const i=await We(o);i.success&&i.enhancedPrompt?(n.setInputValue(t,i.enhancedPrompt),T(e,"success"),t.focus()):(T(e,"error"),L(i.error||"Enhancement failed","error"))}catch(i){T(e,"error"),L(i instanceof Error?i.message:"Enhancement failed","error"),console.error("[RePRo] Error:",i)}}function G(e,t){const n=t.getBoundingClientRect();e.style.cssText=`
        position: fixed !important;
        top: ${n.top-42}px !important;
        left: ${n.left+4}px !important;
        z-index: 2147483647 !important;
        pointer-events: auto !important;
    `,document.body.contains(e)||document.body.appendChild(e)}function ot(e,t){b(),console.log("[RePRo] Initializing button for",t.name);const n=et(),o=Ze();n.appendChild(o),G(n,e),o.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),nt(o,e,t)});const i=()=>{document.body.contains(e)?G(n,e):b()};window.addEventListener("scroll",i,!0),window.addEventListener("resize",i);const s=setInterval(()=>{if(!document.getElementById(ue)){clearInterval(s);return}document.body.contains(e)&&G(n,e)},500);console.log("[RePRo] Button ready for",t.name)}function b(){const e=document.getElementById(de);e&&e.remove()}const I=he();I?(console.log(`[RePRo] Detected ${I.name}, initializing...`),N(),it()):console.log("[RePRo] Site not supported");async function N(){if(!I)return;const e=await pe(I.inputSelectors);e?ot(e,I):(console.log("[RePRo] Could not find input element, will retry..."),setTimeout(N,2e3))}function it(){let e=window.location.href;new MutationObserver(()=>{window.location.href!==e&&(e=window.location.href,console.log("[RePRo] Navigation detected, reinitializing..."),b(),setTimeout(N,1e3))}).observe(document.body,{childList:!0,subtree:!0}),window.addEventListener("popstate",()=>{console.log("[RePRo] Popstate navigation detected"),b(),setTimeout(N,1e3)})}})();
