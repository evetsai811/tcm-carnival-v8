let gender=null, mode="", current=0, answers=[], stage2Queue=[], stage2Results=[], allStage2Keys=[];
const labels=["完全沒有","有一點","有時候","經常","總是這樣"];
const animalOf={shiRe:"dragon",xuRe:"cat",xuHan:"bunny",tanShiRe:"raccoon",qiXu:"sloth",xueXu:"unicorn",qiYu:"deer",xueYu:"magpie",pingHe:"turtle"};
const animalName={dragon:"小龍",cat:"月光貓",bunny:"兔兔",raccoon:"浣熊",sloth:"樹懶",unicorn:"獨角獸",deer:"小鹿",magpie:"台灣藍鵲",turtle:"烏龜"};
const assetExt={"unicorn-1":"jpeg"};
const typeInfo={
  shiRe:{name:"實熱體質",short:"實熱",tip:"容易怕熱、口乾、上火，適合清淡飲食與規律作息。",advice:["少吃辛辣、燥熱與油炸食物。","注意補充水分，避免熬夜。","若反覆口破、咽喉痛或火氣大，建議諮詢中醫師。"]},
  xuRe:{name:"虛熱體質",short:"虛熱",tip:"容易燥熱、口乾、手足心熱，適合滋潤與充足休息。",advice:["避免熬夜與過度消耗體力。","可選擇溫和伸展、散步與放鬆練習。","飲食以溫和滋潤為原則，少辛辣烤炸。"]},
  xuHan:{name:"虛寒體質",short:"虛寒",tip:"容易怕冷、手腳冷，適合保暖與循序運動。",advice:["注意腹部、腰背與四肢保暖。","少喝冰飲，避免過量生冷食物。","規律活動促進循環，避免久坐不動。"]},
  tanShiRe:{name:"痰濕熱體質",short:"痰濕熱",tip:"容易油膩、口苦、身體沉重，適合清爽飲食與增加活動。",advice:["飲食清淡，少甜食、油炸與重口味。","維持規律運動，避免久坐。","若有痤瘡、口苦或排便黏滯，建議進一步諮詢。"]},
  qiXu:{name:"氣虛體質",short:"氣虛",tip:"容易疲倦、氣短、說話無力，適合慢慢補充元氣。",advice:["避免過勞，安排固定休息時間。","運動以循序漸進為主，不宜突然高強度。","重視早餐與規律作息。"]},
  xueXu:{name:"血虛體質",short:"血虛",tip:"容易面色淡、頭暈、睡眠不佳，適合重視營養與休息。",advice:["維持均衡飲食與足夠睡眠。","避免長期熬夜與過度用眼。","若常頭暈、心悸或疲倦，建議諮詢專業人員。"]},
  qiYu:{name:"氣鬱體質",short:"氣鬱",tip:"容易情緒低落、緊張、嘆氣，適合舒展與情緒照顧。",advice:["安排戶外散步、深呼吸或伸展放鬆。","保持規律生活節奏，減少長期壓力累積。","可多與信任的人分享心情。"]},
  xueYu:{name:"血瘀體質",short:"血瘀",tip:"容易疼痛、瘀斑、膚色暗沉，適合促進循環。",advice:["避免久坐，維持規律活動。","注意身體疼痛、瘀斑與循環狀態。","若疼痛持續或加劇，建議就醫評估。"]},
  pingHe:{name:"平和體質",short:"平和",tip:"整體狀態較平衡，適合維持規律生活。",advice:["維持均衡飲食、規律作息與適度運動。","保持愉快心情，延續目前良好習慣。","定期關心血壓、血糖、血脂等健康指標。"]}
};
const types=[
 {key:"shiRe", qs:[0,1]}, {key:"xuRe", qs:[2,3]}, {key:"xuHan", qs:[4,5]}, {key:"tanShiRe", qs:[6,7]},
 {key:"qiXu", qs:[8,9]}, {key:"xueXu", qs:[10,11]}, {key:"qiYu", qs:[12,13]}, {key:"xueYu", qs:[14,15]}
];
const stage1=[
"您怕熱而耐寒嗎？","您容易上火（常有咽喉痛、舌瘡、口腔潰瘍、口、鼻、唇乾熱感或生瘡癤）嗎？",
"您感到手腳心發熱嗎？","您皮膚或口唇乾嗎？","您手腳發涼嗎？","您感到怕冷、衣服比別人穿得多嗎？",
"您面部或鼻部有油膩感或者油亮發光嗎？","您大便黏滯不爽、有解不盡的感覺嗎？",
"您容易疲乏嗎？","您說話聲音低弱無力嗎？","您的面色蒼白或面色黃而無光澤嗎？",
"您容易頭暈眼花嗎？（特別是下蹲起立時）","您容易精神緊張、焦慮不安嗎？","您無緣無故嘆氣嗎？",
"您身體上有哪裡疼痛嗎？","您面色晦黯或容易出現褐斑嗎？"
];
const stage2={
shiRe:{qs:["您怕熱而耐寒嗎？","您喜歡吃寒涼飲食，或耐受寒涼藥物嗎？","您容易上火（常有咽喉痛、舌瘡、口腔潰瘍、口、鼻、唇乾熱感或生瘡癤）嗎？","您舌體偏紅嗎？","您容易口乾，渴喜冷飲嗎？","您的性慾較強嗎？","您形體強壯結實嗎？","您小便色黃嗎？"]},
xuRe:{qs:["您感到手腳心發熱嗎？","您感覺身體、臉上發熱嗎？","您皮膚或口唇乾嗎？","您口唇的顏色比一般人紅嗎？","您容易便秘或大便乾燥嗎？","您面部兩顴潮紅或偏紅嗎？","您感到眼睛乾澀嗎？","您感到口乾咽燥，總想喝水嗎？"]},
xuHan:{qs:["您手腳發涼嗎？","您的胃脘部、背部或腰膝部怕冷嗎？","您感到怕冷、衣服比別人穿得多嗎？","您比一般人耐受不了寒冷（冬天的寒冷，夏天的冷氣空調、電扇等）嗎？","您比別人容易患感冒嗎？","您吃喝涼的東西會感到不舒服或怕吃喝涼東西嗎？","您受涼或吃喝涼的東西後，容易腹瀉（拉肚子）嗎？"]},
tanShiRe:{qs:["您面部或鼻部有油膩感或者油亮發光嗎？","您容易生痤瘡或瘡癤嗎？","您感到口苦或嘴裡有異味嗎？","您大便黏滯不爽、有解不盡的感覺嗎？","您小便時尿道有發熱感、尿色濃（深）嗎？",{female:"您帶下色黃（白帶顏色發黃）嗎？限女性答", male:"您的陰囊部位潮濕嗎？限男性答"}]},
qiXu:{qs:["您容易疲乏嗎？","您容易氣短（呼吸短促，接不上氣）嗎？","您容易心慌嗎？","您容易頭暈或站起時眩暈嗎？","您比別人容易感冒嗎？","您喜歡安靜、懶得說話嗎？","您說話聲音低弱無力嗎？","您活動量稍大就容易出虛汗嗎？"]},
xueXu:{qs:["您的面色蒼白或面色黃而無光澤嗎？","您容易頭暈眼花嗎？（特別是下蹲起立時）",{female:"您的月經顏色淺淡而經量少嗎？限女性答", male:null},"您感覺肢體容易麻木嗎？","您的口唇顏色淡白嗎？","您的指甲顏色淡白嗎？","您的舌體顏色淡白嗎？","您的睡眠品質不好或容易多夢嗎？"]},
qiYu:{qs:["您感到悶悶不樂、情緒低沉嗎？","您容易精神緊張、焦慮不安嗎？","您多愁善感、感情脆弱嗎？","您容易感到害怕或受到驚嚇嗎？","您脅肋部或乳房脹痛嗎？","您無緣無故嘆氣嗎？","您咽喉部有異物感，且吐之不出、咽之不下嗎？"]},
xueYu:{qs:["您的皮膚在不知不覺中會出現青紫瘀斑（皮下出血）嗎？","您兩顴部有細微紅絲嗎？","您身體上有哪裡疼痛嗎？","您面色晦黯或容易出現褐斑嗎？","您容易有黑眼圈嗎？","您容易忘事（健忘）嗎？","您口唇顏色偏黯嗎？"]},
pingHe:{reverse:[1,2,3,4,6], qs:["您精力充沛嗎？","您容易疲乏嗎？","您說話聲音低弱無力嗎？","您感到悶悶不樂、情緒低沉嗎？","您比一般人耐受不了寒冷（冬天的寒冷，夏天的冷氣空調、電扇等）嗎？","您能適應外界自然和社會環境的變化嗎？","您容易失眠嗎？"]}
};
function safeImgFor(key,pose=1){const animal=animalOf[key]; const base=`${animal}-${pose}`; const ext=assetExt[base] || 'png'; return `assets/${base}.${ext}`;}
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');window.scrollTo(0,0)}
function selectGender(g,el){gender=g;document.querySelectorAll('.choice').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');document.getElementById('genderNext').disabled=false}
function cleanQs(key){return stage2[key].qs.map(q=>typeof q==='string'?q:(q[gender]||null)).filter(Boolean)}
function startStage1(){mode='stage1';current=0;answers=[];stage2Results=[];stage2Queue=[];allStage2Keys=[];renderQ();go('question')}
function startStage2(){mode='stage2';current=0;answers=[];renderQ();go('question')}
function setStepper(n){for(let i=1;i<=5;i++)document.getElementById('s'+i).classList.toggle('active',i<=n)}
function renderQ(){
 let qs,key,title,pose;
 if(mode==='stage1'){
   qs=stage1; key=types[Math.floor(current/2)].key; title='第 1 階段（16 題初步評估）'; pose=(current%4)+1; setStepper(2);
 }else{
   key=stage2Queue[0]; qs=cleanQs(key); title=`第 2 階段（${typeInfo[key].name}）`; pose=(current%4)+1; setStepper(3);
 }
 document.getElementById('qMeta').innerHTML=`${title}<br>第 ${current+1} 題（共 ${qs.length} 題）`;
 document.getElementById('progressBar').style.width=((current+1)/qs.length*100)+'%';
 document.getElementById('qText').innerText=qs[current];
 document.getElementById('qImg').src=safeImgFor(key,pose);
 const box=document.getElementById('scaleBtns'); box.innerHTML='';
 for(let i=1;i<=5;i++){
   const b=document.createElement('button'); b.className='scaleBtn'+(answers[current]===i?' selected':'');
   b.innerHTML=`<span>${i}</span><span class="circle">${answers[current]===i?'✓':''}</span><small>${labels[i-1]}</small>`;
   b.onclick=()=>{answers[current]=i;renderQ()}; box.appendChild(b);
 }
 document.getElementById('nextBtn').innerText=current===qs.length-1?'完成':'下一題';
}
function prevQ(){if(current>0){current--;renderQ()}}
function nextQ(){
 const qs=mode==='stage1'?stage1:cleanQs(stage2Queue[0]);
 if(!answers[current]){alert('請先選擇 1～5 分');return}
 if(current<qs.length-1){current++;renderQ();return}
 if(mode==='stage1')finishStage1(); else finishStage2One();
}
function finishStage1(){
 const scores=types.map(t=>({key:t.key,score:t.qs.reduce((a,i)=>a+answers[i],0)}));
 const eligible=scores.filter(s=>s.score>=5);
 if(eligible.length>0){
   stage2Queue=eligible.map(s=>s.key);
   allStage2Keys=[...stage2Queue];
   document.getElementById('stage1Conclusion').innerHTML=`符合第二階段條件：${stage2Queue.map(k=>typeInfo[k].name).join('、')}<br>接下來將完成 ${stage2Queue.length} 份第二階段問卷。`;
 }else{
   stage2Queue=['pingHe'];
   allStage2Keys=['pingHe'];
   document.getElementById('stage1Conclusion').innerHTML=`第一階段各體質兩題加總皆未達 5 分。<br>接下來將直接進入平和體質問卷。`;
 }
 document.getElementById('scoreTable').innerHTML=`<table class="scoreTable"><tr><th>體質</th><th>初步分數</th><th>第二階段</th></tr>${scores.map(s=>`<tr><td>${typeInfo[s.key].name}</td><td>${s.score} 分</td><td>${s.score>=5?'進入':'不進入'}</td></tr>`).join('')}</table>`;
 setStepper(2);go('stage1Result');
}
function scoreStage2(key,vals){
 const qs=cleanQs(key); let raw=vals.reduce((a,b,i)=>{let v=b; if(stage2[key].reverse && stage2[key].reverse.includes(i)) v=6-b; return a+v},0);
 const score=Math.round(((raw-qs.length)/(qs.length*4))*100);
 let judge;
 if(key==='pingHe') judge=score>=60?'是':(score>=50?'傾向是':'否'); else judge=score>40?'是':(score>=30?'傾向是':'否');
 return {key,name:typeInfo[key].name,score,judge,raw,n:qs.length};
}
function finishStage2One(){
 const key=stage2Queue.shift(); stage2Results.push(scoreStage2(key,answers));
 if(stage2Queue.length>0){answers=[];current=0;renderQ();return}
 const valid=stage2Results.filter(r=>r.key==='pingHe'?r.score>=60:r.score>=30);
 if(valid.length===0 && !stage2Results.some(r=>r.key==='pingHe')){stage2Queue=['pingHe'];allStage2Keys.push('pingHe');answers=[];current=0;renderQ();return}
 const resultList=(valid.length?valid:[...stage2Results].sort((a,b)=>b.score-a.score).slice(0,1)).sort((a,b)=>b.score-a.score);
 showFinal(resultList, stage2Results);
}
function showFinal(results,all){
 const best=results[0]; setStepper(5);
 document.getElementById('finalImg').src=safeImgFor(best.key,1);
 document.getElementById('finalTitle').innerText=typeInfo[best.key].name;
 document.getElementById('finalScore').innerText=best.score+'分';
 document.getElementById('finalJudge').innerText=best.judge;
 document.getElementById('finalAdvice').innerHTML=`<b>${typeInfo[best.key].tip}</b><ul>${typeInfo[best.key].advice.map(a=>`<li>${a}</li>`).join('')}</ul><div class="tiny">本結果為健康促進與衛教參考，非醫療診斷。</div>`;
 document.getElementById('multiResults').innerHTML=results.length>1?`<div class="chips"><span class="chip">您可能有 ${results.length} 種體質傾向</span></div>`+results.map(r=>`<div class="miniResult"><img src="${safeImgFor(r.key,2)}"><div><b>${typeInfo[r.key].name}</b><br><span class="soft">${r.score}分｜${r.judge}</span><br><span class="tiny">${typeInfo[r.key].tip}</span></div></div>`).join(''):'';
 document.getElementById('finalDetails').innerHTML=`<h2>完整分數</h2><table class="scoreTable"><tr><th>體質</th><th>分數</th><th>判定</th></tr>${all.map(r=>`<tr><td>${typeInfo[r.key].name}</td><td>${r.score}分</td><td>${r.judge}</td></tr>`).join('')}</table><p class="small">第二階段計算公式：[(總分－題數)/(題數×4)]×100。平和體質判定門檻為 60 分以上。</p>`;
 go('final');
}
function toggleDetails(){document.getElementById('finalDetails').classList.toggle('hidden')}
function restart(){gender=null;mode='';current=0;answers=[];stage2Queue=[];stage2Results=[];document.querySelectorAll('.choice').forEach(c=>c.classList.remove('selected'));document.getElementById('genderNext').disabled=true;go('home')}
async function loadImage(src){return new Promise((res,rej)=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>res(img);img.onerror=rej;img.src=src;})}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){let line='';const arr=text.split('');for(let i=0;i<arr.length;i++){let test=line+arr[i];if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=arr[i];y+=lineHeight}else line=test}ctx.fillText(line,x,y);return y+lineHeight}
async function saveResult(){
 const title=document.getElementById('finalTitle').innerText, score=document.getElementById('finalScore').innerText, judge=document.getElementById('finalJudge').innerText;
 const imgSrc=document.getElementById('finalImg').src; const img=await loadImage(imgSrc);
 const c=document.createElement('canvas'); c.width=1080; c.height=1600; const ctx=c.getContext('2d');
 ctx.fillStyle='#F7F3EA';ctx.fillRect(0,0,c.width,c.height);
 ctx.fillStyle='#E8F3D7';ctx.beginPath();ctx.arc(920,100,180,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(150,1420,240,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#2F7A44';ctx.font='900 74px Microsoft JhengHei, sans-serif';ctx.textAlign='center';ctx.fillText('中醫體質探索結果',540,105);
 ctx.fillStyle='#6C4A22';ctx.font='800 34px Microsoft JhengHei, sans-serif';ctx.fillText('三義慈濟中醫醫院／健康臺灣深耕計畫',540,158);
 const maxW=620,maxH=520;let r=Math.min(maxW/img.width,maxH/img.height);let w=img.width*r,h=img.height*r;ctx.drawImage(img,(1080-w)/2,210,w,h);
 ctx.fillStyle='#806F5D';ctx.font='700 36px Microsoft JhengHei, sans-serif';ctx.fillText('您的主要體質為',540,820);
 ctx.fillStyle='#2F7A44';ctx.font='900 86px Microsoft JhengHei, sans-serif';ctx.fillText(title,540,920);
 ctx.fillStyle='#FFFDF8';roundRect(ctx,130,980,820,150,36);ctx.fill();ctx.strokeStyle='#E4D8C2';ctx.lineWidth=4;ctx.stroke();
 ctx.fillStyle='#4A3A2A';ctx.font='800 44px Microsoft JhengHei, sans-serif';ctx.fillText('體質分數：'+score,540,1042);ctx.fillText('判定結果：'+judge,540,1112);
 ctx.textAlign='left';ctx.fillStyle='#4A3A2A';ctx.font='700 38px Microsoft JhengHei, sans-serif';let y=1208;const key=Object.keys(typeInfo).find(k=>typeInfo[k].name===title);y=wrapText(ctx,typeInfo[key].tip,150,y,780,54);
 ctx.font='600 30px Microsoft JhengHei, sans-serif';ctx.fillStyle='#806F5D';y+=20;typeInfo[key].advice.forEach(a=>{y=wrapText(ctx,'• '+a,160,y,760,42)});
 ctx.textAlign='center';ctx.fillStyle='#8B7B66';ctx.font='600 26px Microsoft JhengHei, sans-serif';ctx.fillText('本結果為健康促進與衛教參考，非醫療診斷。',540,1515);
 const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download='中醫體質探索結果.png';a.click();
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
