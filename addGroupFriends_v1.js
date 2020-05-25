javascript:
delayInput=prompt("몇 초 단위로 작업하시겠습니까?","10");
workInput=prompt("몇 명에게 작업하시겠습니까? (최대 1000명)","1000");
workdelay=parseInt(delayInput) * 1000;
worklength=parseInt(workInput);
delay=0;w=0;addCnt=0;
loading=document.createElement("div");
loading.setAttribute("id","beatz_loading");
loading.setAttribute("style","position:fixed; bottom:0; left:0; width:100%; background:#3b5998; width:100%; color:white; font-size:24px; z-index:1000; padding:12px; text-align:center;");
loading.innerHTML="리스트 확보중";
document.body.appendChild(loading);

function more(){
	if(document.getElementsByClassName('_4_vt')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length<=worklength){
		document.getElementById('globalContainer').getElementsByClassName('uiMorePagerPrimary')[0].click();
		document.getElementById('beatz_loading').innerHTML=document.getElementsByClassName('_4_vt')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length+'명 확보';
		setTimeout(function(){more();},250);
	}else{
		objx=document.getElementsByClassName('_4_vt')[0].querySelectorAll('._5i_q');
		go_fri();
	}
}

function go_fri(){
	if(w<=worklength){
		objx[w].focus();
		var withFriend = objx[w].querySelector('._39g5');
		if (withFriend == null) {
			w++;
			document.getElementById('beatz_loading').innerHTML=w+'명에게 시도 (함께 아는 친구가 없음)';
			setTimeout(function(){go_fri();},1000);
		} else {
			document.getElementById('beatz_loading').innerHTML = withFriend.innerHTML;
			
			obj = objx[w].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)');
			
			if (obj.length==0) {
				w++;
				document.getElementById('beatz_loading').innerHTML=w+'명에게 시도 (이미 친구임)';
				setTimeout(function(){go_fri();},1000);
			} else {
				friendName = obj[0].getAttribute('aria-label');
				obj[0].click();
				obj[0].focus();
				w++;
				addCnt++;
				
				document.body.children[0].classList.remove("_31e");
				
				l=document.getElementsByClassName('_3ixn').length;
				for(i=0;i<l;i++){
					document.getElementsByClassName('_3ixn')[i].style.display='none';
				}
				
				l=document.getElementsByClassName('uiLayer').length;
				for(i=0;i<l;i++){
					document.getElementsByClassName('uiLayer')[i].style.display='none';
				}
				
				delay=workdelay+(Math.floor(Math.random()*5000));
				document.getElementById('beatz_loading').innerHTML=friendName+', '+w+'명 시도/'+addCnt+'명 친구신청. ('+delay/1000+'초 후 다음작업 시작)';
				setTimeout(function(){
					chk_inner=document.body.innerHTML;
					if(chk_inner.indexOf('보이는 사진')!=-1){
						document.getElementById('beatz_loading').style.background='#983b3b';
						document.getElementById('beatz_loading').innerHTML='사진 인증으로 작업중단';
					}else if(chk_inner.indexOf('이 기능은 현재')!=-1||chk_inner.indexOf('going too fast')!=-1){
						document.getElementById('beatz_loading').style.background='#983b3b';
						document.getElementById('beatz_loading').innerHTML='일시적 기능 차단으로 작업중단';
					}else if(chk_inner.indexOf('sent 1,000 friend requests')!=-1||chk_inner.indexOf('친구 요청이 1,000개 있습니다')!=-1){
						document.getElementById('beatz_loading').style.background='#afaf00';
						document.getElementById('beatz_loading').innerHTML='친구 요청 1,000명 가득참';
					}else if(chk_inner.indexOf('친구 추가 한도 5,000명에 도달')!=-1){
						document.getElementById('beatz_loading').style.background='#3b983b';
						document.getElementById('beatz_loading').innerHTML='5,000계정 완성';
					}else{
						go_fri();
					}
				}, delay);
			}
		}
	}else{
		document.getElementById('beatz_loading').innerHTML=w+'명에게 친구신청 시도 완료 ('+addCnt+'명에게 친구신청함.)';
	}
}
more();