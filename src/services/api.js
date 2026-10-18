import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'http://localhost:4000/api',timeout:15000});
api.interceptors.request.use(config=>{config.metadata={start:Date.now()};const token=localStorage.getItem('evidex.token');if(token)config.headers.Authorization=`Bearer ${token}`;return config});
api.interceptors.response.use(r=>{
  const url=String(r.config?.url||'');
  if(/deconstruct|generate-draft|score-suggestions/.test(url)){
    // #region agent log
    fetch('http://127.0.0.1:7676/ingest/e70e87b2-7ab0-43a9-8dce-a651dd7efd6a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'526782'},body:JSON.stringify({sessionId:'526782',runId:'pre-fix',hypothesisId:'B',location:'api.js:response',message:'AI request succeeded',data:{url,status:r.status,durationMs:Date.now()-(r.config?.metadata?.start||Date.now()),source:r.data?.data?.analysis?.source||r.data?.data?.generation?.source||r.data?.data?.suggestion?.source||null,notice:String(r.data?.data?.notice||r.data?.data?.generation?.notice||'').slice(0,160),baseURL:r.config?.baseURL||null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }
  return r.data.data;
},e=>{
  const url=String(e.config?.url||'');
  if(/deconstruct|generate-draft|score-suggestions/.test(url)||e.code==='ECONNABORTED'){
    // #region agent log
    fetch('http://127.0.0.1:7676/ingest/e70e87b2-7ab0-43a9-8dce-a651dd7efd6a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'526782'},body:JSON.stringify({sessionId:'526782',runId:'pre-fix',hypothesisId:'B',location:'api.js:error',message:'AI request failed',data:{url,code:e.code||null,status:e.response?.status||null,durationMs:Date.now()-(e.config?.metadata?.start||Date.now()),timeout:e.config?.timeout||null,msg:String(e.response?.data?.error?.message||e.message||'').slice(0,180),baseURL:e.config?.baseURL||null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }
  return Promise.reject(new Error(e.response?.data?.error?.message||'Could not connect to EVIDEX API. Start the backend and check your connection.'));
});
export default api;
