(function(){"use strict";const U={name:"ChatGPT",inputSelectors:["#prompt-textarea",'div[id="prompt-textarea"]','.ProseMirror[contenteditable="true"]','div[contenteditable="true"][data-placeholder]','div[contenteditable="true"]','textarea[placeholder*="Message"]',"textarea"],getInputElement:()=>{for(const e of U.inputSelectors){const t=document.querySelector(e);if(t)return console.log("[RePRo] Found input element:",e),t}return console.log("[RePRo] No input element found"),null},getInputValue:e=>e instanceof HTMLTextAreaElement?e.value:e.innerText||e.textContent||"",setInputValue:(e,t)=>{if(e instanceof HTMLTextAreaElement)e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}));else{e.innerHTML="";const n=document.createElement("p");n.textContent=t,e.appendChild(n),e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText"})),e.dispatchEvent(new Event("change",{bubbles:!0})),(!e.innerText||e.innerText.trim()!==t.trim())&&(e.innerText=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0})))}},getButtonContainer:e=>{const t=e.closest("form");if(t)return t;let n=e.parentElement;for(let o=0;o<5&&n;o++){if(n.classList.contains("relative")||n.tagName==="FORM"||n.querySelector('button[data-testid="send-button"]'))return n;n=n.parentElement}return e.parentElement}},H={name:"Gemini",inputSelectors:['.ql-editor[contenteditable="true"]','rich-textarea [contenteditable="true"]','div[contenteditable="true"][aria-label*="prompt"]','[contenteditable="true"]',"div[data-placeholder]"],getInputElement:()=>{for(const t of H.inputSelectors){const n=document.querySelector(t);if(n&&n.getAttribute("contenteditable")==="true")return console.log("[RePRo] Found Gemini input:",t),n}const e=document.querySelector('[contenteditable="true"]');return e&&console.log("[RePRo] Found Gemini input via fallback"),e},getInputValue:e=>e.innerText||e.textContent||"",setInputValue:(e,t)=>{e.innerHTML="";const n=document.createElement("p");n.textContent=t,e.appendChild(n),e.dispatchEvent(new InputEvent("input",{bubbles:!0}))},getButtonContainer:e=>{var t;return e.closest(".input-area")||e.closest("form")||((t=e.parentElement)==null?void 0:t.parentElement)||e.parentElement}},F={name:"Claude",inputSelectors:['.ProseMirror[contenteditable="true"]','div[contenteditable="true"][data-placeholder]','div[contenteditable="true"]',"textarea"],getInputElement:()=>{for(const e of F.inputSelectors){const t=document.querySelector(e);if(t)return console.log("[RePRo] Found Claude input:",e),t}return null},getInputValue:e=>e instanceof HTMLTextAreaElement?e.value:e.innerText||e.textContent||"",setInputValue:(e,t)=>{e instanceof HTMLTextAreaElement?(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0}))):(e.innerHTML=`<p>${t}</p>`,e.dispatchEvent(new InputEvent("input",{bubbles:!0})))},getButtonContainer:e=>{var t;return e.closest("fieldset")||e.closest("form")||((t=e.parentElement)==null?void 0:t.parentElement)||e.parentElement}};function he(){const e=window.location.hostname;return console.log("[RePRo] Detecting site:",e),e.includes("chat.openai.com")||e.includes("chatgpt.com")?(console.log("[RePRo] Detected ChatGPT"),U):e.includes("gemini.google.com")?(console.log("[RePRo] Detected Gemini"),H):e.includes("claude.ai")?(console.log("[RePRo] Detected Claude"),F):(console.log("[RePRo] No matching site detected"),null)}function pe(e,t=15e3){return new Promise(n=>{console.log("[RePRo] Waiting for element with selectors:",e);for(const s of e){const i=document.querySelector(s);if(i){console.log("[RePRo] Element found immediately:",s),n(i);return}}const o=new MutationObserver(()=>{for(const s of e){const i=document.querySelector(s);if(i){console.log("[RePRo] Element found via observer:",s),o.disconnect(),n(i);return}}});o.observe(document.body,{childList:!0,subtree:!0}),setTimeout(()=>{console.log("[RePRo] Element wait timeout"),o.disconnect(),n(null)},t)})}const w="prompt_enhancer_config",N={provider:"gemini",geminiApiKey:"",openrouterApiKey:"",geminiModel:"gemini-2.0-flash",openrouterModel:"meta-llama/llama-4-maverick:free"};async function ge(){return new Promise(e=>{if(typeof chrome<"u"&&chrome.storage)chrome.storage.local.get([w],t=>{e({...N,...t[w]})});else{const t=localStorage.getItem(w);e(t?{...N,...JSON.parse(t)}:N)}})}var k;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(k||(k={}));/**
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
 */var $;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})($||($={}));var q;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(q||(q={}));/**
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
 */const B=["user","model","function","system"];var Y;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(Y||(Y={}));var j;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(j||(j={}));var K;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(K||(K={}));var V;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(V||(V={}));var T;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(T||(T={}));var J;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(J||(J={}));var X;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(X||(X={}));var z;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(z||(z={}));/**
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
 */class h extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class R extends h{constructor(t,n){super(t),this.response=n}}class W extends h{constructor(t,n,o,s){super(t),this.status=n,this.statusText=o,this.errorDetails=s}}class m extends h{}/**
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
 */const me="https://generativelanguage.googleapis.com",Ee="v1beta",Ce="0.21.0",Re="genai-js";var C;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(C||(C={}));class ve{constructor(t,n,o,s,i){this.model=t,this.task=n,this.apiKey=o,this.stream=s,this.requestOptions=i}toString(){var t,n;const o=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||Ee;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||me}/${o}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function ye(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${Re}/${Ce}`),t.join(" ")}async function Te(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",ye(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(s){throw new m(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${s.message}`)}for(const[s,i]of o.entries()){if(s==="x-goog-api-key")throw new m(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new m(`Header name ${s} can only be set using the apiClient field`);n.append(s,i)}}return n}async function _e(e,t,n,o,s,i){const r=new ve(e,t,n,o,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},Ae(i)),{method:"POST",headers:await Te(r),body:s})}}async function _(e,t,n,o,s,i={},r=fetch){const{url:a,fetchOptions:c}=await _e(e,t,n,o,s,i);return Ie(a,c,r)}async function Ie(e,t,n=fetch){let o;try{o=await n(e,t)}catch(s){Oe(s,e)}return o.ok||await Se(o,e),o}function Oe(e,t){let n=e;throw e instanceof W||e instanceof m||(n=new h(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function Se(e,t){let n="",o;try{const s=await e.json();n=s.error.message,s.error.details&&(n+=` ${JSON.stringify(s.error.details)}`,o=s.error.details)}catch{}throw new W(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,o)}function Ae(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
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
 */function M(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new R(`${E(e)}`,e);return be(e)}else if(e.promptFeedback)throw new R(`Text not available. ${E(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new R(`${E(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Q(e)[0]}else if(e.promptFeedback)throw new R(`Function call not available. ${E(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),A(e.candidates[0]))throw new R(`${E(e)}`,e);return Q(e)}else if(e.promptFeedback)throw new R(`Function call not available. ${E(e)}`,e)},e}function be(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.text&&i.push(r.text),r.executableCode&&i.push("\n```"+r.executableCode.language+`
`+r.executableCode.code+"\n```\n"),r.codeExecutionResult&&i.push("\n```\n"+r.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function Q(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.functionCall&&i.push(r.functionCall);if(i.length>0)return i}const we=[T.RECITATION,T.SAFETY,T.LANGUAGE];function A(e){return!!e.finishReason&&we.includes(e.finishReason)}function E(e){var t,n,o;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const i=e.candidates[0];A(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}function I(e){return this instanceof I?(this.v=e,this):new I(e)}function Ne(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),s,i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(l){o[l]&&(s[l]=function(u){return new Promise(function(f,y){i.push([l,u,f,y])>1||a(l,u)})})}function a(l,u){try{c(o[l](u))}catch(f){p(i[0][3],f)}}function c(l){l.value instanceof I?Promise.resolve(l.value.v).then(d,g):p(i[0][2],l)}function d(l){a("next",l)}function g(l){a("throw",l)}function p(l,u){l(u),i.shift(),i.length&&a(i[0][0],i[0][1])}}typeof SuppressedError=="function"&&SuppressedError;/**
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
 */const Z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Me(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=De(t),[o,s]=n.tee();return{stream:xe(o),response:Pe(s)}}async function Pe(e){const t=[],n=e.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return M(Le(t));t.push(s)}}function xe(e){return Ne(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:s}=yield I(n.read());if(s)break;yield yield I(M(o))}})}function De(e){const t=e.getReader();return new ReadableStream({start(o){let s="";return i();function i(){return t.read().then(({value:r,done:a})=>{if(a){if(s.trim()){o.error(new h("Failed to parse stream"));return}o.close();return}s+=r;let c=s.match(Z),d;for(;c;){try{d=JSON.parse(c[1])}catch{o.error(new h(`Error parsing JSON response: "${c[1]}"`));return}o.enqueue(d),s=s.substring(c[0].length),c=s.match(Z)}return i()})}}})}function Le(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const o of e){if(o.candidates)for(const s of o.candidates){const i=s.index;if(n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:s.index}),n.candidates[i].citationMetadata=s.citationMetadata,n.candidates[i].groundingMetadata=s.groundingMetadata,n.candidates[i].finishReason=s.finishReason,n.candidates[i].finishMessage=s.finishMessage,n.candidates[i].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[i].content||(n.candidates[i].content={role:s.content.role||"user",parts:[]});const r={};for(const a of s.content.parts)a.text&&(r.text=a.text),a.functionCall&&(r.functionCall=a.functionCall),a.executableCode&&(r.executableCode=a.executableCode),a.codeExecutionResult&&(r.codeExecutionResult=a.codeExecutionResult),Object.keys(r).length===0&&(r.text=""),n.candidates[i].content.parts.push(r)}}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}/**
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
 */async function ee(e,t,n,o){const s=await _(t,C.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o);return Me(s)}async function te(e,t,n,o){const i=await(await _(t,C.GENERATE_CONTENT,e,!1,JSON.stringify(n),o)).json();return{response:M(i)}}/**
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
 */function ne(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function O(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Ge(t)}function Ge(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,s=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new h("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new h("No content is provided for sending chat message.");return o?t:n}function Ue(e,t){var n;let o={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const s=e.generateContentRequest!=null;if(e.contents){if(s)throw new m("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{const i=O(e);o.contents=[i]}return{generateContentRequest:o}}function oe(e){let t;return e.contents?t=e:t={contents:[O(e)]},e.systemInstruction&&(t.systemInstruction=ne(e.systemInstruction)),t}function He(e){return typeof e=="string"||Array.isArray(e)?{content:O(e)}:e}/**
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
 */const se=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Fe={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function ke(e){let t=!1;for(const n of e){const{role:o,parts:s}=n;if(!t&&o!=="user")throw new h(`First content should be with role 'user', got ${o}`);if(!B.includes(o))throw new h(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify(B)}`);if(!Array.isArray(s))throw new h("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new h("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of s)for(const c of se)c in a&&(i[c]+=1);const r=Fe[o];for(const a of se)if(!r.includes(a)&&i[a]>0)throw new h(`Content with role '${o}' can't contain '${a}' part`);t=!0}}/**
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
 */const ie="SILENT_ERROR";class $e{constructor(t,n,o,s={}){this.model=n,this.params=o,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o!=null&&o.history&&(ke(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var o,s,i,r,a,c;await this._sendPromise;const d=O(t),g={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),n);let l;return this._sendPromise=this._sendPromise.then(()=>te(this._apiKey,this.model,g,p)).then(u=>{var f;if(u.response.candidates&&u.response.candidates.length>0){this._history.push(d);const y=Object.assign({parts:[],role:"model"},(f=u.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(y)}else{const y=E(u.response);y&&console.warn(`sendMessage() was unsuccessful. ${y}. Inspect response object for details.`)}l=u}),await this._sendPromise,l}async sendMessageStream(t,n={}){var o,s,i,r,a,c;await this._sendPromise;const d=O(t),g={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,d]},p=Object.assign(Object.assign({},this._requestOptions),n),l=ee(this._apiKey,this.model,g,p);return this._sendPromise=this._sendPromise.then(()=>l).catch(u=>{throw new Error(ie)}).then(u=>u.response).then(u=>{if(u.candidates&&u.candidates.length>0){this._history.push(d);const f=Object.assign({},u.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=E(u);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(u=>{u.message!==ie&&console.error(u)}),l}}/**
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
 */async function qe(e,t,n,o){return(await _(t,C.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
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
 */async function Be(e,t,n,o){return(await _(t,C.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function Ye(e,t,n,o){const s=n.requests.map(r=>Object.assign(Object.assign({},r),{model:t}));return(await _(t,C.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}/**
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
 */class re{constructor(t,n,o={}){this.apiKey=t,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ne(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var o;const s=oe(t),i=Object.assign(Object.assign({},this._requestOptions),n);return te(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}async generateContentStream(t,n={}){var o;const s=oe(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ee(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}startChat(t){var n;return new $e(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const o=Ue(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),n);return qe(this.apiKey,this.model,o,s)}async embedContent(t,n={}){const o=He(t),s=Object.assign(Object.assign({},this._requestOptions),n);return Be(this.apiKey,this.model,o,s)}async batchEmbedContents(t,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return Ye(this.apiKey,this.model,t,o)}}/**
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
 */class je{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new h("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new re(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,o){if(!t.name)throw new m("Cached content must contain a `name` field.");if(!t.model)throw new m("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const r of s)if(n!=null&&n[r]&&t[r]&&(n==null?void 0:n[r])!==t[r]){if(r==="model"){const a=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,c=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(a===c)continue}throw new m(`Different value for "${r}" specified in modelParams (${n[r]}) and cachedContent (${t[r]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new re(this.apiKey,i,o)}}const ae=`You are an elite Prompt Architect AI. Your job is to transform ANY raw user prompt into the most powerful, clear, and effective prompt possible.

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
Return the optimized prompt in the specified format.`}function Ke(e){const t=e.match(/---ENHANCED_PROMPT_START---\s*([\s\S]*?)\s*---ENHANCED_PROMPT_END---/),n=t?t[1].trim():e.trim(),o=e.match(/---TECHNIQUES_START---\s*([\s\S]*?)\s*---TECHNIQUES_END---/);let s=[];if(o)s=o[1].split(",").map(a=>a.trim()).filter(a=>a.length>0);else{const a=e.toLowerCase();(a.includes("step-by-step")||a.includes("think through"))&&s.push("Chain-of-Thought"),a.includes("you are")&&a.includes("expert")&&s.push("Role Prompting"),(a.includes("example")||a.includes("for instance"))&&s.push("Few-Shot"),(a.includes("<context>")||a.includes("<task>"))&&s.push("XML Prompting"),(a.includes('"task"')||a.includes('"parameters"'))&&s.push("JSON Prompting"),(a.includes("8k")||a.includes("photorealistic")||a.includes("cinematic"))&&s.push("Image Optimization"),(a.includes("camera movement")||a.includes("slow motion")||a.includes("tracking shot"))&&s.push("Video Optimization"),s.length===0&&s.push("Zero-Shot Clarity")}const i=e.match(/---PROMPT_TYPE_START---\s*([\s\S]*?)\s*---PROMPT_TYPE_END---/),r=i?i[1].trim().toUpperCase():void 0;return{enhancedPrompt:n,techniques:s,promptType:r}}const P={flash:"gemini-2.0-flash",flashLite:"gemini-2.0-flash-lite"};function Ve(e){const t=e.message||"";if(t.includes("429")||t.includes("quota")||t.includes("rate")){const n=t.match(/retry in (\d+)/i);return{isRateLimit:!0,retryAfter:n?parseInt(n[1],10):60}}return{isRateLimit:!1}}async function Je(e,t,n=P.flash,o){const s=new je(e),i=[n,P.flash,P.flashLite].filter((a,c,d)=>d.indexOf(a)===c);let r=null;for(const a of i)try{const c=s.getGenerativeModel({model:a,systemInstruction:ae}),d=ce(t);if(!o)return(await c.generateContent(d)).response.text()}catch(c){r=c;const{isRateLimit:d,retryAfter:g}=Ve(r);if(d)throw new Error(`Gemini API rate limit exceeded. Try again in ${g} seconds, or switch to OpenRouter in Settings (it has free models too!)`);console.warn(`Model ${a} failed, trying next...`,c);continue}throw r||new Error("All models failed")}const Xe="https://openrouter.ai/api/v1/chat/completions",le=["meta-llama/llama-4-maverick:free","deepseek/deepseek-chat-v3-0324:free","mistralai/mistral-small-3.1-24b-instruct:free","google/gemini-2.5-pro-exp-03-25:free","nvidia/llama-3.1-nemotron-nano-8b-v1:free","qwen/qwen2.5-vl-3b-instruct:free"];async function ze(e,t,n=le[0],o){var a,c,d,g;const s=ce(t),i=[n,...le.filter(p=>p!==n)];let r=null;for(const p of i)try{const l=await fetch(Xe,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","HTTP-Referer":"chrome-extension://prompt-enhancer","X-Title":"Prompt Enhancer"},body:JSON.stringify({model:p,messages:[{role:"system",content:ae},{role:"user",content:s}],stream:!!o})});if(!l.ok){const f=((a=(await l.json().catch(()=>({}))).error)==null?void 0:a.message)||`Status ${l.status}`;console.warn(`Model ${p} failed: ${f}`),r=new Error(f);continue}if(!(o&&l.body))return((g=(d=(c=(await l.json()).choices)==null?void 0:c[0])==null?void 0:d.message)==null?void 0:g.content)||""}catch(l){r=l,console.warn(`Model ${p} failed:`,l);continue}throw r||new Error("All OpenRouter models failed. Please check your API key.")}async function We(e){try{if(!e||e.trim().length===0)return{success:!1,error:"Please enter a prompt to enhance"};const t=await ge();if(t.provider==="gemini"&&!t.geminiApiKey)return{success:!1,error:"Please configure your Gemini API key in the extension settings"};if(t.provider==="openrouter"&&!t.openrouterApiKey)return{success:!1,error:"Please configure your OpenRouter API key in the extension settings"};let n="";return t.provider==="gemini"?n=await Je(t.geminiApiKey,e,t.geminiModel):n=await ze(t.openrouterApiKey,e,t.openrouterModel),{success:!0,enhancedPrompt:Ke(n).enhancedPrompt}}catch(t){return console.error("[RePRo] Enhancement error:",t),{success:!1,error:t instanceof Error?t.message:"Enhancement failed. Please try again."}}}const x="repro-enhance-btn",ue="repro-enhance-container",de="repro-toast";let D=null;const Qe=500;function Ze(){const e=document.createElement("button");return e.id=x,e.className="repro-enhance-btn",e.type="button",e.innerHTML=`
        <span class="repro-btn-icon">⚡</span>
        <span class="repro-btn-text">Improve</span>
    `,e.title="Enhance this prompt with AI",e}function et(){const e=document.createElement("div");return e.id=ue,e.className="repro-enhance-container",e}function tt(){const e=document.createElement("div");return e.id=de,e.className="repro-toast",e}function L(e,t="error"){let n=document.getElementById(de);n||(n=tt(),document.body.appendChild(n)),n.textContent=e,n.className=`repro-toast repro-toast-${t} repro-toast-visible`,setTimeout(()=>{n==null||n.classList.remove("repro-toast-visible")},4e3)}function v(e,t){e.classList.remove("repro-btn-loading","repro-btn-success","repro-btn-error"),e.disabled=t==="loading";const n=e.querySelector(".repro-btn-icon"),o=e.querySelector(".repro-btn-text");switch(t){case"loading":e.classList.add("repro-btn-loading"),n&&(n.innerHTML='<span class="repro-spinner"></span>'),o&&(o.textContent="Improving...");break;case"success":e.classList.add("repro-btn-success"),n&&(n.textContent="✓"),o&&(o.textContent="Improved!"),setTimeout(()=>v(e,"idle"),2e3);break;case"error":e.classList.add("repro-btn-error"),n&&(n.textContent="✕"),o&&(o.textContent="Failed"),setTimeout(()=>v(e,"idle"),2e3);break;default:n&&(n.textContent="⚡"),o&&(o.textContent="Improve")}}async function nt(e,t,n){if(D)return;D=window.setTimeout(()=>{D=null},Qe);const o=n.getInputValue(t);if(console.log("[RePRo] Original prompt:",o),!o||o.trim().length===0){L("Please enter a prompt to improve","error");return}v(e,"loading");try{const s=await We(o);console.log("[RePRo] Enhancement result:",s),s.success&&s.enhancedPrompt?(n.setInputValue(t,s.enhancedPrompt),v(e,"success"),t.focus()):(v(e,"error"),L(s.error||"Enhancement failed","error"))}catch(s){v(e,"error"),L(s instanceof Error?s.message:"Enhancement failed. Please try again.","error"),console.error("[RePRo] Enhancement error:",s)}}function G(e,t){const n=t.getBoundingClientRect();e.style.position="fixed",e.style.top=`${n.top-44}px`,e.style.left=`${n.left}px`,e.style.width=`${n.width}px`,e.style.zIndex="999999",document.body.contains(e)||document.body.appendChild(e),console.log("[RePRo] Button positioned at:",n.top-44,n.left)}function ot(e,t){if(document.getElementById(x)){console.log("[RePRo] Button already exists");return}console.log("[RePRo] Initializing enhance button");const n=et(),o=Ze();n.appendChild(o),G(n,e),o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),nt(o,e,t)});const s=()=>{G(n,e)};window.addEventListener("resize",s),window.addEventListener("scroll",s,!0);const i=setInterval(()=>{document.getElementById(x)?G(n,e):clearInterval(i)},1e3);console.log(`[RePRo] Improve button initialized for ${t.name}`)}function fe(){const e=document.getElementById(ue);e&&(e.remove(),console.log("[RePRo] Button removed"))}const S=he();S?(console.log(`[RePRo] Detected ${S.name}, initializing...`),b(),st()):console.log("[RePRo] Site not supported");async function b(){if(!S)return;const e=await pe(S.inputSelectors);e?ot(e,S):(console.log("[RePRo] Could not find input element, will retry..."),setTimeout(b,2e3))}function st(){let e=window.location.href;new MutationObserver(()=>{window.location.href!==e&&(e=window.location.href,console.log("[RePRo] Navigation detected, reinitializing..."),fe(),setTimeout(b,1e3))}).observe(document.body,{childList:!0,subtree:!0}),window.addEventListener("popstate",()=>{console.log("[RePRo] Popstate navigation detected"),fe(),setTimeout(b,1e3)})}})();
