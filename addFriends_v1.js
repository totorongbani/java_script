javascript:
delayInput=prompt("�� �� ������ �۾��Ͻðڽ��ϱ�?","10");
workInput=prompt("�� ���� �۾��Ͻðڽ��ϱ�? (�ִ� 1000��)","200");
workdelay=parseInt(delayInput) * 1000;
worklength=parseInt(workInput);
delay=0;w=0;addCnt=0;
loading=document.createElement("div");
loading.setAttribute("id","Info_Bar");
loading.setAttribute("style","position:fixed; bottom:0; left:0; width:100%; background:#3b5998; width:100%; color:white; font-size:16px; z-index:1000; padding:12px; text-align:center;");
loading.innerHTML="����Ʈ Ȯ�� ��";
document.body.appendChild(loading);

// �ѱ� ���� ���� üũ
function nameCheck (checkName) {
   var languageCheck = /[��-��|��-��|��-�R]/;
   if (languageCheck.test(checkName)) {
      return true;
   } else {
      return false;
   }
}

function more(){
	if(document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length<=worklength){
		document.getElementById('globalContainer').getElementsByClassName('uiMorePagerPrimary')[0].click();
		document.getElementById('Info_Bar').innerHTML=document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length+'�� Ȯ��';
		setTimeout(function(){more();},250);
	}else{
		objx=document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.friendBrowserListUnit');
		go_friend();
	}
}

function go_friend() {
	if(w<=worklength) {
		objx[w].focus();
		var withFriend = objx[w].querySelector('._7ebh');
		if (withFriend == null) {  //�Բ� �ƴ� ģ�� üũ
		   w++;
			document.getElementById('Info_Bar').innerHTML=w+'���� �õ� (�Բ� �ƴ� ģ���� ����)';
			setTimeout(function(){go_friend();},1000);
		} else {
         var friendName = objx[w].querySelector('.friendBrowserNameTitle').getElementsByTagName('a')[0].getAttribute('title'); // ģ�� �̸� ���ϱ�
         if(!nameCheck(friendName)) {   // �ѱ� ģ�� üũ
            w++;
            document.getElementById('Info_Bar').innerHTML=w+'���� �õ� ('+friendName+'�� �ѱ����� �ƴ�)';
     			setTimeout(function(){go_friend();},1000);
         } else {
     			obj = objx[w].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)');
     			if (obj.length==0) { // �̹� ģ���� ��� üũ
     			   w++;
     				document.getElementById('Info_Bar').innerHTML=w+'���� �õ� (�̹� ģ����)';
     				setTimeout(function(){go_friend();},1000);
     			} else {
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
     				document.getElementById('Info_Bar').innerHTML=friendName+'�� ģ���߰�, '+w+'�� �õ� / '+addCnt+'�� ģ����û. ('+delay/1000+'�� �� �����۾� ����)';
     				setTimeout(function() {
     					chk_inner=document.body.innerHTML;
     					if(chk_inner.indexOf('���̴� ����')!=-1){
     						document.getElementById('Info_Bar').style.background='#983b3b';
     						document.getElementById('Info_Bar').innerHTML='���� �������� �۾��ߴ�';
     					}else if(chk_inner.indexOf('�� ����� ����')!=-1||chk_inner.indexOf('going too fast')!=-1){
     						document.getElementById('Info_Bar').style.background='#983b3b';
     						document.getElementById('Info_Bar').innerHTML='�Ͻ��� ��� �������� �۾��ߴ�';
     					}else if(chk_inner.indexOf('sent 1,000 friend requests')!=-1||chk_inner.indexOf('ģ�� ��û�� 1,000�� �ֽ��ϴ�')!=-1){
     						document.getElementById('Info_Bar').style.background='#afaf00';
     						document.getElementById('Info_Bar').innerHTML='ģ�� ��û 1,000�� ������';
     					}else if(chk_inner.indexOf('ģ�� �߰� �ѵ� 5,000�� ����')!=-1){
     						document.getElementById('Info_Bar').style.background='#3b983b';
     						document.getElementById('Info_Bar').innerHTML='5,000���� �ϼ�';
     					}else{
     						go_friend();
     					}
     				}, delay);
     			}  // �̹� ģ���� ��� üũ
   		}  // �ѱ� ģ�� üũ
   	}  //�Բ� �ƴ� ģ�� üũ
	}else{
		document.getElementById('Info_Bar').innerHTML=w+'���� ģ����û �õ� �Ϸ� ('+addCnt+'���� ģ����û��.)';
	}
}
more();