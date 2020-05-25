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
      alert("�ɹ�ȣ�� �߸� �Է��ϼ̽��ϴ�.");
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
       alert("���α׷� ��� �Ⱓ�� ����Ǿ����ϴ�. �� ���� �� �̿��� �ּ���.");
      return false;
   } else {
      return true;
   }
}
