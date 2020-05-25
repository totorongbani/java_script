(function(){
var version = 12;

// 핀 복호화
function decodeNum(inputNum){
   outputNum=inputNum/version+101205;
   return outputNum;
}

// 암호화 된 핀 체크
function checkPin(pin){
   var numPin=parseInt(pin);
   if (isNaN(numPin)) {
      alert("PIN번호를 잘못 입력하셨습니다. 분실하신 경우 판매자에게 문의해 주세요.");
      return 1;
   }
   
   var pinDate = decodeNum(numPin, version).toString().substr(3, 6);
   var pinDay = new Date("20"+pinDate.substr(0,2),parseInt(pinDate.substr(2,2))-1,pinDate.substr(4,2));
   var toDay = new Date();
   var nextMonthDay = new Date();
   nextMonthDay.setTime(pinDay.getTime()+(32*24*60*60*1000));
   
   if(toDay.getTime() < pinDay.getTime() || toDay.getTime() > nextMonthDay.getTime()) {
       alert("프로그램 사용 기간이 만료되었습니다. 재 구매 후 이용해 주세요.");
      return 2;
   } else {
      return 0;
   }
}

var xis = localStorage.getItem('xis');
if (xis == null) {
   var inputPin=prompt("PIN 번호를 입력해 주세요.");
   xis=parseInt(inputPin);
}

var validFlag = checkPin(xis);
if(validFlag == 1) {
   localStorage.removeItem('xis');
   return;
} else if(validFlag == 2) {
   localStorage.removeItem('xis');
   return;
} else {
   localStorage.setItem('xis', xis);
}

// 설정값 입력
var delayInput=prompt("몇 초 간격으로 작업하시겠습니까? (5초 이상 추천)","5");
var workInput=prompt("몇 명에게 작업하시겠습니까? (최대 1000명)","200");
var withFrdInput=prompt("함께 아는 친구가 몇 명 이상인 사람에 작업하시겠습니까? (5명 이상 추천, 최소 2명)","5");
var workdelay=parseInt(delayInput) * 1000;
var worklength=parseInt(workInput);
var withFrNumInput=parseInt(withFrdInput);

// 하단 안내창 생성
bottomBar=document.createElement("div");
bottomBar.setAttribute("id","bottom_Bar");
bottomBar.setAttribute("style","position:fixed; bottom:0; left:0; width:100%; background:#3b5998; width:100%; color:white; font-size:16px; z-index:1000; padding:12px; text-align:center;");
document.body.appendChild(bottomBar);
inforBar=document.createElement("div");
inforBar.setAttribute("id","Info_Bar");
inforBar.innerHTML="리스트 확보 중";
bottomBar.appendChild(inforBar);
separateBar=document.createElement("div");
separateBar.setAttribute("style","color:#1a2947; padding:7px;");
separateBar.innerHTML="--------------------------------------------------</br>";
bottomBar.appendChild(separateBar);
descArea=document.createElement("div");
descArea.setAttribute("style","color:white; font-size:14px; padding:5px; text-align:left;");
var description = "<b># 프로그램 설명</b> </br>";
description = description + "* 설정한 수만큼 요청할 친구를 확보한 뒤, 친구 추가 작업을 시작합니다.</br>";
description = description + "* 알 수도 있는 사람이 설정한 수보다 적으면, 확보한 사람만큼 요청합니다.</br>";
description = description + "* 한글 이름이 아니거나 함께 아는 친구가 설정한 수보다 적으면 스킵합니다.</br>";
description = description + "* 실행 도중 멈추고 싶거나 재실행 하고 싶으면 새로고침 하세요.</br>";
description = description + "* 페이스북의 제재로 인해 중지되었을 경우(붉은 글씨), 안내에 따르시기 바랍니다.</br>";
description = description + "* 기타 문의 및 개선 요청: <b><a href='https://cafe.naver.com/marketingzone'><font color='white'>https://cafe.naver.com/marketingzone</font></a></b>";
descArea.innerHTML=description;
bottomBar.appendChild(descArea);

// 변수 초기화
delay=0;
w=0;
addCnt=0;
totalCnt=0;
beforeCnt=0;
moreCnt=0;
breakFlag=false;

// 한글 포함 여부 체크
function checkKorean (stLanguage) {
   var isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
   if (isKorean.test(stLanguage)) {
      return true;
   } else {
      return false;
   }
}

// 숫자 포함 여부 체크
function checkNumber (stNumber) {
   var isNum = /[0-1]/;
   if (isNum.test(stNumber)) {
      return true;
   } else {
      return false;
   }
}

// 함께 아는 친구가 몇명인지 체크
function checkWithFriend (stWith) {
   if (stWith.indexOf("함께 아는 친구") != -1) {
      var startIdx = stWith.indexOf("구");
      var endIdx = stWith.indexOf("명");
      var withFrNum = stWith.substr(startIdx+2, endIdx - (startIdx+2));
      return parseInt(withFrNum);
   } else {
      return 0;
   }
}

// 더보기 버튼을 클릭하여 원하는만큼 작업할 사람 확보하기
function go_more(){
   totalCnt = document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)').length;
	if(totalCnt<=worklength){
	   if(moreCnt > 10) {
	      moreCnt = 0;
	      if (beforeCnt == totalCnt) {
   	      breakFlag=true;
   	   } else {
   	      beforeCnt = totalCnt;
   	   }
   	}
   	if (breakFlag) {
   	   document.getElementById('Info_Bar').innerHTML='총 확보된 사람 '+totalCnt+'명. 친구 추가 작업을 시작합니다.';
		   objx=document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.friendBrowserListUnit');
		   setTimeout(function(){go_friend();},5000);
   	} else {
   	   moreCnt++;
   	   document.getElementById('globalContainer').getElementsByClassName('uiMorePagerPrimary')[0].click();
   	   document.getElementById('Info_Bar').innerHTML=totalCnt+' / '+worklength+'명 확보';
   	   setTimeout(function(){go_more();},250);
	   }
	}else{
	   if(totalCnt > worklength) { totalCnt = worklength; }
	   document.getElementById('Info_Bar').innerHTML='총 확보된 사람 '+totalCnt+'명. 친구 추가 작업을 시작합니다.';
		objx=document.getElementsByClassName('uiContextualLayerParent')[0].querySelectorAll('.friendBrowserListUnit');
		setTimeout(function(){go_friend();},3000);
	}
}

// 친구 추가 작업하기
function go_friend() {
	if(w<totalCnt) {
      // 1. 한국인 친구 여부 체크
      var friendName = objx[w].querySelector('.friendBrowserNameTitle').getElementsByTagName('a')[0].getAttribute('title'); // 친구 이름 구하기
      if(!checkKorean(friendName)) {
         w++;
         document.getElementById('Info_Bar').innerHTML=w+'명에게 시도 ('+friendName+'는 한국인이 아닐 수 있어 스킵합니다.)';
   		setTimeout(function(){go_friend();},2000);
      } else {
   		// 2. 함께 아는 친구 체크
   		var withFriend = objx[w].querySelector('._7ebi');
   		if (withFriend == null) {
   		   w++;
   			document.getElementById('Info_Bar').innerHTML=w+'명에게 시도 ('+friendName+'는 함께 아는 친구가 없어 스킵합니다.)';
   			setTimeout(function(){go_friend();},2000);
   		} else {
      		// 3. 함께 아는 친구 수 체크
      		var withFrNum=0;
      		var stWithFriend = objx[w].querySelector('._7ebi').getElementsByTagName('a')[0].innerHTML;
      		if (stWithFriend.indexOf("함께 아는 친구") != -1) {
          		withFrNum = checkWithFriend(stWithFriend);
      		} else {
      		   if (objx[w].querySelector('._7ebi').getElementsByTagName('a')[1] != null) {
         		   stWithFriend = objx[w].querySelector('._7ebi').getElementsByTagName('a')[1].innerHTML;
         		   withFrNum = checkWithFriend(stWithFriend);
           		} else {
           		   withFrNum = 0;
           		}
      		}

   		   if (withFrNum < withFrNumInput) {
   		      w++;
   		      document.getElementById('Info_Bar').innerHTML=w+'명에게 시도 ('+friendName+'는 함께 아는 친구가 '+withFrNumInput+'명 미만이라 스킵합니다.)';
   			   setTimeout(function(){go_friend();},2000);
   			} else {
         		// 4. 이미 친구인 사람 체크
         	   obj = objx[w].querySelectorAll('.FriendRequestAdd:not(.hidden_elem)');
         		if (obj.length==0) { 
         		   w++;
         			document.getElementById('Info_Bar').innerHTML=w+'명에게 시도 (이미 친구이기 때문에 스킵합니다.)';
         			setTimeout(function(){go_friend();},2000);
         		} else {
                  // 5. 친구 추가 하기
                  obj[0].focus();
            		obj[0].click();
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
            		
            		delay=workdelay+(Math.floor(Math.random()*2000));
            		document.getElementById('Info_Bar').innerHTML=friendName+'님 친구 추가, '+w+'명 시도 / '+addCnt+'명 친구 신청. ('+delay/1000+'초 후 다음 작업 시작)';
            		setTimeout(function() {
            			chk_inner=document.body.innerHTML;
            			if(chk_inner.indexOf('보이는 사진')!=-1){
            				document.getElementById('Info_Bar').style.color='#FF0000';
            				document.getElementById('Info_Bar').innerHTML='사진 인증 요청으로 작업이 중단되었습니다.</br> 사진 인증 후 기다려보시기 바랍니다.';
            			}else if(chk_inner.indexOf('이 기능은 현재')!=-1||chk_inner.indexOf('going too fast')!=-1){
            				document.getElementById('Info_Bar').style.color='#FF0000';
            				document.getElementById('Info_Bar').innerHTML='일시적 친구 추가 기능 차단으로 작업이 중단되었습니다.</br> 24시간 기다렸다가 시도하시기 바랍니다.';
            			}else if(chk_inner.indexOf('sent 1,000 friend requests')!=-1||chk_inner.indexOf('친구 요청이 1,000개 있습니다')!=-1){
            				document.getElementById('Info_Bar').style.color='#FF0000';
            				document.getElementById('Info_Bar').innerHTML='친구 요청 1,000명이 가득 찼습니다.</br> 일괄 요청한 친구 삭제 프로그램을 이용하여</br> 전송한 친구 요청 리스트를 삭제 후 시도하시기 바랍니다.';
            			}else if(chk_inner.indexOf('친구 추가 한도 5,000명에 도달')!=-1){
            				document.getElementById('Info_Bar').style.color='#FFE400';
            				document.getElementById('Info_Bar').innerHTML='5,000계정이 완성되었습니다.';
            			}else{
            				go_friend();
            			}
            		}, delay);
            	}  // 4. 이미 친구인 사람 체크
         	}  // 3. 함께 아는 친구 수 체크
      	}  // 2. 함께 아는 친구 체크
      }  // 1. 한국인 친구 여부 체크
	}else{
	   document.getElementById('Info_Bar').style.color='#FFE400';
		document.getElementById('Info_Bar').innerHTML=w+'명에게 친구 신청 시도 완료 ('+addCnt+'명에게 친구 신청됨.)';
	}
}

if (isNaN(workdelay) || workdelay <= 0 || isNaN(worklength) || worklength <= 0 || isNaN(withFrNumInput) || withFrNumInput <= 1) {
   alert("잘못된 수를 입력하시거나 취소 하셨습니다. 다시 시도해 주세요.");
   var bottomBar = document.getElementById('bottom_Bar');
   bottomBar.parentNode.removeChild(bottomBar);
} else if (worklength > 1000) {
   worklength = 1000;
   go_more();
} else {
   go_more();
}
})();