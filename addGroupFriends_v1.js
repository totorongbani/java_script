javascript:
delayInput=prompt("�� �� ������ �۾��Ͻðڽ��ϱ�?","10");
workInput=prompt("�� ���� �۾��Ͻðڽ��ϱ�? (�ִ� 1000��)","1000");
workdelay=parseInt(delayInput) * 1000;
worklength=parseInt(workInput);
delay=0;w=0;addCnt=0;
loading=document.createElement("div");
loading.setAttribute("id","beatz_loading");
loading.setAttribute("style","position:fixed; bottom:0; left:0; width:100%; background:#3b5998; width:100%; color:white; font-size:24px; z-index:1000; padding:12px; text-align:center;");
loading.innerHTML="����Ʈ Ȯ����";
document.body.appendChild(loading);

function more(){
	if(document.getElementsByClassName('_4_vt')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length<=worklength){
		document.getElementById('globalContainer').getElementsByClassName('uiMorePagerPrimary')[0].click();
		document.getElementById('beatz_loading').innerHTML=document.getElementsByClassName('_4_vt')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length+'�� Ȯ��';
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
			document.getElementById('beatz_loading').innerHTML=w+'���� �õ� (�Բ� �ƴ� ģ���� ����)';
			setTimeout(function(){go_fri();},1000);
		} else {
			document.getElementById('beatz_loading').innerHTML = withFriend.innerHTML;
			
			obj = objx[w].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)');
			
			if (obj.length==0) {
				w++;
				document.getElementById('beatz_loading').innerHTML=w+'���� �õ� (�̹� ģ����)';
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
				document.getElementById('beatz_loading').innerHTML=friendName+', '+w+'�� �õ�/'+addCnt+'�� ģ����û. ('+delay/1000+'�� �� �����۾� ����)';
				setTimeout(function(){
					chk_inner=document.body.innerHTML;
					if(chk_inner.indexOf('���̴� ����')!=-1){
						document.getElementById('beatz_loading').style.background='#983b3b';
						document.getElementById('beatz_loading').innerHTML='���� �������� �۾��ߴ�';
					}else if(chk_inner.indexOf('�� ����� ����')!=-1||chk_inner.indexOf('going too fast')!=-1){
						document.getElementById('beatz_loading').style.background='#983b3b';
						document.getElementById('beatz_loading').innerHTML='�Ͻ��� ��� �������� �۾��ߴ�';
					}else if(chk_inner.indexOf('sent 1,000 friend requests')!=-1||chk_inner.indexOf('ģ�� ��û�� 1,000�� �ֽ��ϴ�')!=-1){
						document.getElementById('beatz_loading').style.background='#afaf00';
						document.getElementById('beatz_loading').innerHTML='ģ�� ��û 1,000�� ������';
					}else if(chk_inner.indexOf('ģ�� �߰� �ѵ� 5,000�� ����')!=-1){
						document.getElementById('beatz_loading').style.background='#3b983b';
						document.getElementById('beatz_loading').innerHTML='5,000���� �ϼ�';
					}else{
						go_fri();
					}
				}, delay);
			}
		}
	}else{
		document.getElementById('beatz_loading').innerHTML=w+'���� ģ����û �õ� �Ϸ� ('+addCnt+'���� ģ����û��.)';
	}
}
more();