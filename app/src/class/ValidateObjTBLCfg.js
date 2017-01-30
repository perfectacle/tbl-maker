import Util from './Util';

export default class ValidateObjTBLCfg {
  static isValidCaption(caption) {
    return (typeof caption) === 'string';
  }

  static isValidHeaderCell(isSetHeader) {
    return (typeof isSetHeader) === 'boolean';
  }

  static validateData(data) {
    this.objValidateData = { // 다른 함수에서도 쓰려면 this로 선언해줘야함.
      isValid: false,
      err    : '',
      row    : undefined,
      col    : undefined
    };
    // rowspan과 colspan의 정보를 얻어내기 위한 정규표현식
    const regExpRowspan     = Util.getPositiveLookBehindAhead('%.+:', '\\d', ',\\d+%'),
          regExpColspan     = Util.getPositiveLookBehindAhead('%.+:\\d+,', '\\d', '%');


    for(let y=0; y<data.length; y++) {
      if(data[y].length !== data[0].length) { // data 배열의 각 행의 길이가 다른 경우
        this.objValidateData.err = '각 행의 길이가 다름.';
        this.objValidateData.row = y;
        return;
      }

      for(let x=0; x<data[y].length; x++) {
        const rowspan = regExpRowspan.exec(data[y][x]),
              colspan = regExpColspan.exec(data[y][x]);
        if(rowspan && +rowspan[1]) { // 병합할 행이 있는 경우
          if(colspan && +colspan[1]) { // 병합할 열도 있는 경우
            for(let i=0; i<rowspan[1]; i++) {
              for(let j=0; j<colspan[1]; j++) {
                if(!i && !j) continue;
                if(data[y+i][x+j] !== '%collapsedCell%') { // 병합할 셀을 병합하지 않은 경우
                  this.objValidateData.err = '해당 셀이 병합되지 않았습니다.';
                  this.objValidateData.row = y+i;
                  this.objValidateData.col = x+j;
                  return;
                }
              }
              // 병합하면 안 되는 셀을 병합한 경우
              if((+colspan[1]+x !== data[0].length) && data[y+i][+colspan[1] + x] === '%collapsedCell%') {
                this.objValidateData.err = '해당 셀은 병합 대상이 아닙니다.';
                this.objValidateData.row = y+i;
                this.objValidateData.col = +colspan[1] + x;
                return;
              }
            }
          }

          // 병합할 행만 있는 경우
          for(let i=1; i<rowspan[1]; i++) {
            if(data[y+i][x] !== '%collapsedCell%') { // 병합할 셀을 병합하지 않은 경우
              this.objValidateData.err = '병합할 행보다 더 적은 행이 병합돼있습니다.';
              this.objValidateData.row = y+i;
              this.objValidateData.col = x;
              return;
            }
          }
          // 병합하면 안 되는 셀을 병합한 경우
          if((+rowspan[1]+y !== data.length) && (data[+rowspan[1] + y][x] === '%collapsedCell%')) {
            this.objValidateData.err = '병합할 행보다 더 많은 행이 병합돼있습니다.';
            this.objValidateData.row = +rowspan[1] + y;
            this.objValidateData.col = x;
            return;
          }
        } else if(colspan && +colspan[1]) { // 병합할 열만 있는 경우
          for(let i=1; i<colspan[1]; i++) {
            if(data[y][x+i] !== '%collapsedCell%') { // 병합할 셀을 병합하지 않은 경우
              this.objValidateData.err = '병합할 열보다 더 적은 열이 병합돼있습니다.';
              this.objValidateData.row = y;
              this.objValidateData.col = x+i;
              return;
            }
          }
          // 병합하면 안 되는 셀을 병합한 경우
          if((+colspan[1]+x !== data[0].length) && (data[y][+colspan[1] + x] === '%collapsedCell%')) {
            this.objValidateData.err = '병합할 열보다 더 많은 열이 병합돼있습니다.';
            this.objValidateData.row = y;
            this.objValidateData.col = +colspan[1] + x;
            return;
          }
        }

      }
    }
    this.objValidateData.isValid = true; // 모든 유효성 검사를 통과했으니...
  }

  static getObjValidateData() {
    return this.objValidateData;
  }
}