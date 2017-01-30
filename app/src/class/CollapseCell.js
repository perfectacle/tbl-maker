import Util from './Util';

export default class CollapseCell {
  static isRectangle(arr) { // 사각형인지(병합이 가능한지) 판단하는 함수
    const cntCols = arr.length;
    let   prevCntRows = arr[0]; // 각 행 별로 열의 갯수를 파악하기 위함.
    if(!prevCntRows) return; // 에러를 방지하고자 값이 없으면 함수 종료.
    prevCntRows = arr[0].length;
    for(let y=0; y<cntCols; y++) {
      const cntRows = arr[y].length;

      // 이전 행과 열의 갯수가 다를 경우
      if(prevCntRows !== arr[y].length) return;

      // 현재 행과 다음 행이 연속되지 않은 경우
      if(y<cntCols-1) {
        if(+arr[y][0][0]+1 !== +arr[y+1][0][0]) return;

        // 대각선으로 선택된 경우
        if(arr[y][0][1] !== arr[y+1][0][1]) return;
      }

      for(let x=0; x<cntRows-1; x++) {
        // 현재 열과 다음 열이 연속되지 않은 경우
        if(+arr[y][x][1]+1 !== +arr[y][x+1][1]) return;
      }
    }

    // 1x1의 배열만 담겨있는 경우
    if(cntCols === 1 && arr[0].length === 1) return;
    return true;
  }

  static collapseCell(arrTBLData, arrSelected, colspan, rowspan) { // 선택된 영역을 토대로 테이블에 들어갈 데이터를 병합
    // colspan, rowspan이 있던 없던 반복문은 한번씩들 타게 해야함.
    for(let y=0; y<(rowspan || 1); y++) {
      for(let x=0; x<(colspan || 1); x++) {
        const yPos = arrSelected[y][x][0],
              xPos = arrSelected[y][x][1];
        if(!y && !x) { // 0, 0에 있는 셀에 colspan과 rowspan을 심어줘야함.
          // 이미 병합된 셀로부터 시작하는 경우를 뽑아내기 위한 정규표현식
          const regExp = Util.getPositiveLookBehindAhead('%', '.', ':\\d+,\\d+');
          if(regExp.exec(arrTBLData[yPos][xPos])) { // 이미 병합된 셀로부터 시작하는 경우
            const data = regExp.exec(arrTBLData[yPos][xPos])[1];
            arrTBLData[yPos][xPos] = `%${data}:${colspan === arrTBLData[0].length ? 0 : rowspan},${colspan}%`;
            continue;
          }
          arrTBLData[yPos][xPos] = `%${arrTBLData[yPos][xPos]}:${colspan === arrTBLData[0].length ? 0 : rowspan},${colspan}%`;
          continue;
        }

        // 나머지 셀은 데이터도 날려버리고 병합.
        arrTBLData[yPos][xPos] = '%collapsedCell%';
      }
    }

    // 한 줄이 모두 병합된 경우에는 데이터를 삭제해줘야함.
    for(let y=0; y<arrTBLData.length; y++) {
      let isCollapsedRow = false;
      for(let x=0; x<arrTBLData[y].length; x++) {
        // 한 줄에 병합되지 않은 셀이 하나라도 존재하면 그 줄은 스킵
        if(arrTBLData[y][x] !== '%collapsedCell%') {
          isCollapsedRow = false;
          break;
        }
        isCollapsedRow = true;
      }
      if(isCollapsedRow) { // 한 줄이 모두 병합됐다면
        arrTBLData.splice(y--, 1);
      }
    }
  }
}