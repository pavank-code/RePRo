const R="prompt_enhancer_config",b={provider:"gemini",geminiApiKey:"",openrouterApiKey:"",geminiModel:"gemini-2.0-flash",openrouterModel:"meta-llama/llama-4-maverick:free"};async function le(){return new Promise(e=>{if(typeof chrome<"u"&&chrome.storage)chrome.storage.local.get([R],t=>{e({...b,...t[R]})});else{const t=localStorage.getItem(R);e(t?{...b,...JSON.parse(t)}:b)}})}async function qe(e){const n={...await le(),...e};return new Promise(o=>{typeof chrome<"u"&&chrome.storage?chrome.storage.local.set({[R]:n},()=>{o()}):(localStorage.setItem(R,JSON.stringify(n)),o())})}var P;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(P||(P={}));/**
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
 */var G;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(G||(G={}));var U;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(U||(U={}));/**
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
 */const F=["user","model","function","system"];var k;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(k||(k={}));var H;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(H||(H={}));var Y;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(Y||(Y={}));var j;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(j||(j={}));var v;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(v||(v={}));var $;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})($||($={}));var q;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(q||(q={}));var K;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(K||(K={}));/**
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
 */class E extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class O extends E{constructor(t,n){super(t),this.response=n}}class Z extends E{constructor(t,n,o,s){super(t),this.status=n,this.statusText=o,this.errorDetails=s}}class C extends E{}/**
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
 */const de="https://generativelanguage.googleapis.com",ue="v1beta",fe="0.21.0",he="genai-js";var _;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(_||(_={}));class ge{constructor(t,n,o,s,i){this.model=t,this.task=n,this.apiKey=o,this.stream=s,this.requestOptions=i}toString(){var t,n;const o=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||ue;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||de}/${o}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function pe(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${he}/${fe}`),t.join(" ")}async function Ee(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",pe(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(s){throw new C(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${s.message}`)}for(const[s,i]of o.entries()){if(s==="x-goog-api-key")throw new C(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new C(`Header name ${s} can only be set using the apiClient field`);n.append(s,i)}}return n}async function me(e,t,n,o,s,i){const r=new ge(e,t,n,o,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},Re(i)),{method:"POST",headers:await Ee(r),body:s})}}async function S(e,t,n,o,s,i={},r=fetch){const{url:a,fetchOptions:c}=await me(e,t,n,o,s,i);return Ce(a,c,r)}async function Ce(e,t,n=fetch){let o;try{o=await n(e,t)}catch(s){_e(s,e)}return o.ok||await Oe(o,e),o}function _e(e,t){let n=e;throw e instanceof Z||e instanceof C||(n=new E(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function Oe(e,t){let n="",o;try{const s=await e.json();n=s.error.message,s.error.details&&(n+=` ${JSON.stringify(s.error.details)}`,o=s.error.details)}catch{}throw new Z(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,o)}function Re(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
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
 */function L(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new O(`${m(e)}`,e);return ve(e)}else if(e.promptFeedback)throw new O(`Text not available. ${m(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new O(`${m(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),B(e)[0]}else if(e.promptFeedback)throw new O(`Function call not available. ${m(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new O(`${m(e)}`,e);return B(e)}else if(e.promptFeedback)throw new O(`Function call not available. ${m(e)}`,e)},e}function ve(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.text&&i.push(r.text),r.executableCode&&i.push("\n```"+r.executableCode.language+`
`+r.executableCode.code+"\n```\n"),r.codeExecutionResult&&i.push("\n```\n"+r.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function B(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)r.functionCall&&i.push(r.functionCall);if(i.length>0)return i}const ye=[v.RECITATION,v.SAFETY,v.LANGUAGE];function I(e){return!!e.finishReason&&ye.includes(e.finishReason)}function m(e){var t,n,o;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const i=e.candidates[0];I(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}function y(e){return this instanceof y?(this.v=e,this):new y(e)}function Te(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),s,i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(d){o[d]&&(s[d]=function(l){return new Promise(function(f,h){i.push([d,l,f,h])>1||a(d,l)})})}function a(d,l){try{c(o[d](l))}catch(f){p(i[0][3],f)}}function c(d){d.value instanceof y?Promise.resolve(d.value.v).then(u,g):p(i[0][2],d)}function u(d){a("next",d)}function g(d){a("throw",d)}function p(d,l){d(l),i.shift(),i.length&&a(i[0][0],i[0][1])}}/**
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
 */const V=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Se(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=Ne(t),[o,s]=n.tee();return{stream:Ie(o),response:Ae(s)}}async function Ae(e){const t=[],n=e.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return L(we(t));t.push(s)}}function Ie(e){return Te(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:s}=yield y(n.read());if(s)break;yield yield y(L(o))}})}function Ne(e){const t=e.getReader();return new ReadableStream({start(o){let s="";return i();function i(){return t.read().then(({value:r,done:a})=>{if(a){if(s.trim()){o.error(new E("Failed to parse stream"));return}o.close();return}s+=r;let c=s.match(V),u;for(;c;){try{u=JSON.parse(c[1])}catch{o.error(new E(`Error parsing JSON response: "${c[1]}"`));return}o.enqueue(u),s=s.substring(c[0].length),c=s.match(V)}return i()})}}})}function we(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const o of e){if(o.candidates)for(const s of o.candidates){const i=s.index;if(n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:s.index}),n.candidates[i].citationMetadata=s.citationMetadata,n.candidates[i].groundingMetadata=s.groundingMetadata,n.candidates[i].finishReason=s.finishReason,n.candidates[i].finishMessage=s.finishMessage,n.candidates[i].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[i].content||(n.candidates[i].content={role:s.content.role||"user",parts:[]});const r={};for(const a of s.content.parts)a.text&&(r.text=a.text),a.functionCall&&(r.functionCall=a.functionCall),a.executableCode&&(r.executableCode=a.executableCode),a.codeExecutionResult&&(r.codeExecutionResult=a.codeExecutionResult),Object.keys(r).length===0&&(r.text=""),n.candidates[i].content.parts.push(r)}}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}/**
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
 */async function ee(e,t,n,o){const s=await S(t,_.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o);return Se(s)}async function te(e,t,n,o){const i=await(await S(t,_.GENERATE_CONTENT,e,!1,JSON.stringify(n),o)).json();return{response:L(i)}}/**
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
 */function ne(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function T(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Me(t)}function Me(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,s=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new E("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new E("No content is provided for sending chat message.");return o?t:n}function be(e,t){var n;let o={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const s=e.generateContentRequest!=null;if(e.contents){if(s)throw new C("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{const i=T(e);o.contents=[i]}return{generateContentRequest:o}}function J(e){let t;return e.contents?t=e:t={contents:[T(e)]},e.systemInstruction&&(t.systemInstruction=ne(e.systemInstruction)),t}function De(e){return typeof e=="string"||Array.isArray(e)?{content:T(e)}:e}/**
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
 */const X=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Le={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function xe(e){let t=!1;for(const n of e){const{role:o,parts:s}=n;if(!t&&o!=="user")throw new E(`First content should be with role 'user', got ${o}`);if(!F.includes(o))throw new E(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify(F)}`);if(!Array.isArray(s))throw new E("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new E("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of s)for(const c of X)c in a&&(i[c]+=1);const r=Le[o];for(const a of X)if(!r.includes(a)&&i[a]>0)throw new E(`Content with role '${o}' can't contain '${a}' part`);t=!0}}/**
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
 */const W="SILENT_ERROR";class Pe{constructor(t,n,o,s={}){this.model=n,this.params=o,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o!=null&&o.history&&(xe(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var o,s,i,r,a,c;await this._sendPromise;const u=T(t),g={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,u]},p=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>te(this._apiKey,this.model,g,p)).then(l=>{var f;if(l.response.candidates&&l.response.candidates.length>0){this._history.push(u);const h=Object.assign({parts:[],role:"model"},(f=l.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(h)}else{const h=m(l.response);h&&console.warn(`sendMessage() was unsuccessful. ${h}. Inspect response object for details.`)}d=l}),await this._sendPromise,d}async sendMessageStream(t,n={}){var o,s,i,r,a,c;await this._sendPromise;const u=T(t),g={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,u]},p=Object.assign(Object.assign({},this._requestOptions),n),d=ee(this._apiKey,this.model,g,p);return this._sendPromise=this._sendPromise.then(()=>d).catch(l=>{throw new Error(W)}).then(l=>l.response).then(l=>{if(l.candidates&&l.candidates.length>0){this._history.push(u);const f=Object.assign({},l.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=m(l);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(l=>{l.message!==W&&console.error(l)}),d}}/**
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
 */async function Ge(e,t,n,o){return(await S(t,_.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
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
 */async function Ue(e,t,n,o){return(await S(t,_.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function Fe(e,t,n,o){const s=n.requests.map(r=>Object.assign(Object.assign({},r),{model:t}));return(await S(t,_.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}/**
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
 */class Q{constructor(t,n,o={}){this.apiKey=t,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ne(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var o;const s=J(t),i=Object.assign(Object.assign({},this._requestOptions),n);return te(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}async generateContentStream(t,n={}){var o;const s=J(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ee(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}startChat(t){var n;return new Pe(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const o=be(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),n);return Ge(this.apiKey,this.model,o,s)}async embedContent(t,n={}){const o=De(t),s=Object.assign(Object.assign({},this._requestOptions),n);return Ue(this.apiKey,this.model,o,s)}async batchEmbedContents(t,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return Fe(this.apiKey,this.model,t,o)}}/**
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
 */class ke{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new E("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Q(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,o){if(!t.name)throw new C("Cached content must contain a `name` field.");if(!t.model)throw new C("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const r of s)if(n!=null&&n[r]&&t[r]&&(n==null?void 0:n[r])!==t[r]){if(r==="model"){const a=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,c=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(a===c)continue}throw new C(`Different value for "${r}" specified in modelParams (${n[r]}) and cachedContent (${t[r]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new Q(this.apiKey,i,o)}}const oe=`You are an elite Prompt Architect AI. Your job is to transform ANY raw user prompt into the most powerful, clear, and effective prompt possible.

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
If not, refine until all checks pass.`;function se(e){return`Enhance the following prompt:

---USER_PROMPT_START---
${e}
---USER_PROMPT_END---

First detect the prompt TYPE (text, code, image, video, data, agent).
Then apply appropriate enhancement techniques for that type.
Return the optimized prompt in the specified format.`}function Ke(e){const t=e.match(/---ENHANCED_PROMPT_START---\s*([\s\S]*?)\s*---ENHANCED_PROMPT_END---/),n=t?t[1].trim():e.trim(),o=e.match(/---TECHNIQUES_START---\s*([\s\S]*?)\s*---TECHNIQUES_END---/);let s=[];if(o)s=o[1].split(",").map(a=>a.trim()).filter(a=>a.length>0);else{const a=e.toLowerCase();(a.includes("step-by-step")||a.includes("think through"))&&s.push("Chain-of-Thought"),a.includes("you are")&&a.includes("expert")&&s.push("Role Prompting"),(a.includes("example")||a.includes("for instance"))&&s.push("Few-Shot"),(a.includes("<context>")||a.includes("<task>"))&&s.push("XML Prompting"),(a.includes('"task"')||a.includes('"parameters"'))&&s.push("JSON Prompting"),(a.includes("8k")||a.includes("photorealistic")||a.includes("cinematic"))&&s.push("Image Optimization"),(a.includes("camera movement")||a.includes("slow motion")||a.includes("tracking shot"))&&s.push("Video Optimization"),s.length===0&&s.push("Zero-Shot Clarity")}const i=e.match(/---PROMPT_TYPE_START---\s*([\s\S]*?)\s*---PROMPT_TYPE_END---/),r=i?i[1].trim().toUpperCase():void 0;return{enhancedPrompt:n,techniques:s,promptType:r}}const D={flash:"gemini-2.0-flash",flashLite:"gemini-2.0-flash-lite"};function He(e){const t=e.message||"";if(t.includes("429")||t.includes("quota")||t.includes("rate")){const n=t.match(/retry in (\d+)/i);return{isRateLimit:!0,retryAfter:n?parseInt(n[1],10):60}}return{isRateLimit:!1}}async function Be(e,t,n=D.flash,o){const s=new ke(e),i=[n,D.flash,D.flashLite].filter((a,c,u)=>u.indexOf(a)===c);let r=null;for(const a of i)try{const c=s.getGenerativeModel({model:a,systemInstruction:oe}),u=se(t);if(o){const g=await c.generateContentStream(u);let p="";for await(const d of g.stream){const l=d.text();p+=l,o(p)}return p}else return(await c.generateContent(u)).response.text()}catch(c){r=c;const{isRateLimit:u,retryAfter:g}=He(r);if(u)throw new Error(`Gemini API rate limit exceeded. Try again in ${g} seconds, or switch to OpenRouter in Settings (it has free models too!)`);console.warn(`Model ${a} failed, trying next...`,c);continue}throw r||new Error("All models failed")}const Ve=[{value:"gemini-2.0-flash",label:"Gemini 2.0 Flash (Recommended)"},{value:"gemini-2.0-flash-lite",label:"Gemini 2.0 Flash Lite (Faster)"},{value:"gemini-2.0-pro-exp",label:"Gemini 2.0 Pro (Powerful)"}],Ye="https://openrouter.ai/api/v1/chat/completions",z=["meta-llama/llama-4-maverick:free","deepseek/deepseek-chat-v3-0324:free","mistralai/mistral-small-3.1-24b-instruct:free","google/gemini-2.5-pro-exp-03-25:free","nvidia/llama-3.1-nemotron-nano-8b-v1:free","qwen/qwen2.5-vl-3b-instruct:free"];async function Je(e,t,n=z[0],o){var a,c,u,g,p,d,l;const s=se(t),i=[n,...z.filter(f=>f!==n)];let r=null;for(const f of i)try{const h=await fetch(Ye,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","HTTP-Referer":"chrome-extension://prompt-enhancer","X-Title":"Prompt Enhancer"},body:JSON.stringify({model:f,messages:[{role:"system",content:oe},{role:"user",content:s}],stream:!!o})});if(!h.ok){const A=((a=(await h.json().catch(()=>({}))).error)==null?void 0:a.message)||`Status ${h.status}`;console.warn(`Model ${f} failed: ${A}`),r=new Error(A);continue}if(o&&h.body){const N=h.body.getReader(),A=new TextDecoder;let w="";for(;;){const{done:ie,value:ae}=await N.read();if(ie)break;const re=A.decode(ae).split(`
`).filter(M=>M.startsWith("data: "));for(const M of re){const x=M.slice(6);if(x!=="[DONE]")try{const ce=((g=(u=(c=JSON.parse(x).choices)==null?void 0:c[0])==null?void 0:u.delta)==null?void 0:g.content)||"";w+=ce,o(w)}catch{}}}return w}else return((l=(d=(p=(await h.json()).choices)==null?void 0:p[0])==null?void 0:d.message)==null?void 0:l.content)||""}catch(h){r=h,console.warn(`Model ${f} failed:`,h);continue}throw r||new Error("All OpenRouter models failed. Please check your API key.")}const Xe=[{value:"meta-llama/llama-4-maverick:free",label:"Llama 4 Maverick (Free) ⭐"},{value:"deepseek/deepseek-chat-v3-0324:free",label:"DeepSeek Chat V3 (Free)"},{value:"mistralai/mistral-small-3.1-24b-instruct:free",label:"Mistral Small 3.1 (Free)"},{value:"google/gemini-2.5-pro-exp-03-25:free",label:"Gemini 2.5 Pro (Free)"},{value:"nvidia/llama-3.1-nemotron-nano-8b-v1:free",label:"Nemotron Nano 8B (Free)"},{value:"qwen/qwen2.5-vl-3b-instruct:free",label:"Qwen 2.5 VL (Free)"}];export{Ve as G,Xe as O,Je as a,Be as e,le as g,Ke as p,qe as s};
