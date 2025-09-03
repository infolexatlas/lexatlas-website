import http from 'node:http';
const host='127.0.0.1', port=process.env.PORT||'3000';
const path='/api/healthz'; const start=Date.now();
const deadline=Date.now()+120000; // 2 min
let tries=0;
function ping(){
  tries++;
  const req=http.request({host,port,path,timeout:2000},res=>{
    if(res.statusCode===200){ console.log(`[PROBE] OK ${host}:${port}${path} in ${Date.now()-start}ms`); process.exit(0); }
    else { console.log(`[PROBE] ${res.statusCode}`); retry(); }
  });
  req.on('error',retry); req.end();
}
function retry(){
  if(Date.now()>deadline){ console.error('[PROBE] timeout'); process.exit(1); }
  setTimeout(ping, 1000);
}
ping();
