class Util {
  // '가나다'이라는 문자가 있으면
  // 가 뒤에, 다 앞에 존재하는 문자를 얻기 위한 정규표현식을 얻어내는 함수.
  // getPositiveLookBehindAhead('가 ', '.', '다')
  static getPositiveLookBehindAhead(forward, middleward, backward, flag='') {
    return new RegExp(`${forward}(${middleward}+)(?=${backward})`, flag);
  }
  static a() {
    alert('b');
  }
}