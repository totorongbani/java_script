var version = 12;

function encodeNum(inputNum){
   outputNum=(inputNum-101205)*version;
   return outputNum;
}

function decodeNum(inputNum){
   outputNum=inputNum/version+101205;
   return outputNum;
}

function checkPin(pin){
   var numPin=parseInt(pin);
   if (isNaN(numPin)) {
      alert("핀번호를 잘못 입력하셨습니다.");
      return false;
   }
   
   var pinDate = decodeNum(numPin, version).toString().substr(3, 6);
   var pinDay = new Date("20"+pinDate.substr(0,2),parseInt(pinDate.substr(2,2))-1,pinDate.substr(4,2));
   var toDay = new Date();
   var nextMonthDay = new Date();
   nextMonthDay.setTime(pinDay.getTime()+(32*24*60*60*1000));
   
   console.log("pinDate : " + pinDate);
   console.log("pinDay : " + pinDay);
   console.log("nextMonthDay : " + nextMonthDay);
   console.log("pinDay t : " + pinDay.getTime());
   console.log("nextMonthDay t : " + nextMonthDay.getTime());
   
   if(toDay.getTime() > nextMonthDay.getTime()) {
       alert("프로그램 사용 기간이 만료되었습니다. 재 구매 후 이용해 주세요.");
      return false;
   } else {
      return true;
   }
}
