javascript:
delayInput=prompt("¸î ÃÊ ´ÜÀ§·Î ÀÛ¾÷ÇÏ½Ã°Ú½À´Ï±î?","10");
workInput=prompt("¸î ¸í¿¡°Ô ÀÛ¾÷ÇÏ½Ã°Ú½À´Ï±î? (ÃÖ´ë 1000¸í)","200");
workdelay=parseInt(delayInput) * 1000;
worklength=parseInt(workInput);
delay=0;w=0;addCnt=0;
loading=document.createElement("div");
loading.setAttribute("id","Info_Bar");
loading.setAttribute("style","position:fixed; bottom:0; left:0; width:100%; background:#3b5998; width:100%; color:white; font-size:16px; z-index:1000; padding:12px; text-align:center;");
loading.innerHTML="¸®½ºÆ® È®º¸ Áß";
document.body.appendChild(loading);

// ÇÑ±Û Æ÷ÇÔ ¿©ºÎ Ã¼Å©
function nameCheck (checkName) {
   var languageCheck = /[¤¡-¤¾|¤¿-¤Ó|°¡-ÆR]/;
   if (languageCheck.test(checkName)) {
      return true;
   } else {
      return false;
   }
}

function more(){
	if(document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length<=worklength){
		document.getElementById('globalContainer').getElementsByClassName('uiMorePagerPrimary')[0].click();
		document.getElementById('Info_Bar').innerHTML=document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length+'¸í È®º¸';
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
		if (withFriend == null) {  //ÇÔ²² ¾Æ´Â Ä£±¸ Ã¼Å©
		   w++;
			document.getElementById('Info_Bar').innerHTML=w+'¸í¿¡°Ô ½Ãµµ (ÇÔ²² ¾Æ´Â Ä£±¸°¡ ¾øÀ½)';
			setTimeout(function(){go_friend();},1000);
		} else {
         var friendName = objx[w].querySelector('.friendBrowserNameTitle').getElementsByTagName('a')[0].getAttribute('title'); // Ä£±¸ ÀÌ¸§ ±¸ÇÏ±â
         if(!nameCheck(friendName)) {   // ÇÑ±¹ Ä£±¸ Ã¼Å©
            w++;
            document.getElementById('Info_Bar').innerHTML=w+'¸í¿¡°Ô ½Ãµµ ('+friendName+'´Â ÇÑ±¹ÀÎÀÌ ¾Æ´Ô)';
     			setTimeout(function(){go_friend();},1000);
         } else {
     			obj = objx[w].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)');
     			if (obj.length==0) { // ÀÌ¹Ì Ä£±¸ÀÎ »ç¶÷ Ã¼Å©
     			   w++;
     				document.getElementById('Info_Bar').innerHTML=w+'¸í¿¡°Ô ½Ãµµ (ÀÌ¹Ì Ä£±¸ÀÓ)';
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
     				document.getElementById('Info_Bar').innerHTML=friendName+'´Ô Ä£±¸Ãß°¡, '+w+'¸í ½Ãµµ / '+addCnt+'¸í Ä£±¸½ÅÃ». ('+delay/1000+'ÃÊ ÈÄ ´ÙÀ½ÀÛ¾÷ ½ÃÀÛ)';
     				setTimeout(function() {
     					chk_inner=document.body.innerHTML;
     					if(chk_inner.indexOf('º¸ÀÌ´Â »çÁø')!=-1){
     						document.getElementById('Info_Bar').style.background='#983b3b';
     						document.getElementById('Info_Bar').innerHTML='»çÁø ÀÎÁõÀ¸·Î ÀÛ¾÷Áß´Ü';
     					}else if(chk_inner.indexOf('ÀÌ ±â´ÉÀº ÇöÀç')!=-1||chk_inner.indexOf('going too fast')!=-1){
     						document.getElementById('Info_Bar').style.background='#983b3b';
     						document.getElementById('Info_Bar').innerHTML='ÀÏ½ÃÀû ±â´É Â÷´ÜÀ¸·Î ÀÛ¾÷Áß´Ü';
     					}else if(chk_inner.indexOf('sent 1,000 friend requests')!=-1||chk_inner.indexOf('Ä£±¸ ¿äÃ»ÀÌ 1,000°³ ÀÖ½À´Ï´Ù')!=-1){
     						document.getElementById('Info_Bar').style.background='#afaf00';
     						document.getElementById('Info_Bar').innerHTML='Ä£±¸ ¿äÃ» 1,000¸í °¡µæÂü';
     					}else if(chk_inner.indexOf('Ä£±¸ Ãß°¡ ÇÑµµ 5,000¸í¿¡ µµ´Þ')!=-1){
     						document.getElementById('Info_Bar').style.background='#3b983b';
     						document.getElementById('Info_Bar').innerHTML='5,000°èÁ¤ ¿Ï¼º';
     					}else{
     						go_friend();
     					}
     				}, delay);
     			}  // ÀÌ¹Ì Ä£±¸ÀÎ »ç¶÷ Ã¼Å©
   		}  // ÇÑ±¹ Ä£±¸ Ã¼Å©
   	}  //ÇÔ²² ¾Æ´Â Ä£±¸ Ã¼Å©
	}else{
		document.getElementById('Info_Bar').innerHTML=w+'¸í¿¡°Ô Ä£±¸½ÅÃ» ½Ãµµ ¿Ï·á ('+addCnt+'¸í¿¡°Ô Ä£±¸½ÅÃ»ÇÔ.)';
	}
}
more();