/*
    배열의 y, x 좌표를 토대로 데이터를 추가, 삭제, 정렬하는 알고리즘.
    y행, x열 순서로 기술하기 때문에 y, x 순서로 적음.
*/
export default class ToggleCell {

  // 배열에 셀이 존재하는지 판단
  static hasCell(arr, y, x) {
    /*
        스코프 내에서 자주 쓰이는 변수이기 때문에
        짧게 선언해도 의미가 명확하고, 쓰기도 편하다.
     */
    const cntCols = arr.length;

    if(!cntCols) return false; // 배열에 아무런 값이 없는 경우
    for(let i = 0; i < cntCols; i++) { // 배열의 행의 갯수만큼
      const cntRows = arr[i].length;

      // 배열의 열의 갯수만큼 반복
      for(let j = 0; j < cntRows; j++) {
        // [2, 3], [3, 2] 때문에 indexOf는 못 쓴다.
        if(arr[i][j][0] === y) {
          if(arr[i][j][1] === x) {
            return true; // 존재하는 경우
          }
        }
      }
    }
    return false; // 존재하지 않는 경우
  }

  // 셀을 선택했을 때 선택된 셀들을 모아놓은 배열에 담기
  static pushCell(arr, yPos, xPos, rowspan, colspan) {
    /*
       배열에 값을 넣기만 하면 끝나는 함수기 때문에 return으로 조기에 함수를 종료시키는 게
       continue나 break 등으로부터 자유로워지기도 하고,
       조건문도 더 간단해지는 것 같다.
     */

    let cntCols      = arr.length,
        isConflicted = false; // 기존의 셀과 겹치는지 구분하기 위한 변수

    // 초기에 빈 배열인 경우
    if(!cntCols) {
      if(rowspan) { // 합칠 행이 있는 경우
        if(colspan) { // 합칠 행과 열이 모두 존재하는 경우
          for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
            arr.push([]);
            for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
              arr[y].push([yPos+y, xPos+x]);
            }
          }
          return;
        }

        // 합칠 행만 있고, 합칠 열은 없는 경우
        for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
          arr.push([]);
          arr[y].push([yPos+y, xPos]);
        }
        return;
      }

      if(colspan) { // 합칠 열만 있고, 합칠 행은 없는 경우
        arr.push([]);
        for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
          arr[0].push([yPos, xPos+x]);
        }
        return;
      }

      // 합칠 행과 열이 모두 없는 경우
      return arr.push([ [yPos, xPos] ]);
    }

    // 비어있지 않은 경우
    // 내가 넣으려는 셀이 기존에 선택했던 셀들보다 아래 존재하는 경우
    if(yPos > arr[cntCols-1][0][0]) {
      if(rowspan) { // 합칠 행이 있는 경우
        if(colspan) { // 합칠 행과 열 모두 존재하는 경우
          for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
            arr.push([]);
            for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
              arr[cntCols].push([yPos+y, xPos+x]);
            }
            cntCols++;
          }
          return;
        }

        // 합칠 열은 없고, 합칠 행만 존재하는 경우
        for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
          arr.push([ [yPos+y, xPos] ]);
        }
        return;
      }

      if(colspan) { // 합칠 행은 없고, 합칠 열만 있는 경우
        arr.push([]);
        for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
          arr[cntCols].push([yPos, xPos+x]);
        }
        return;
      }

      // 합칠 행과 열이 모두 존재하지 않는 경우
      arr.push([ [yPos, xPos] ]);
    }

    // 내가 넣으려는 셀이 기존에 선택했던 셀들보다 위나 가운데에 존재하는 경우
    else {
      if(rowspan) { // 합칠 행이 있는 경우
        if(colspan) { // 합칠 행과 열이 모두 있는 경우
          for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
            for(let i=0; i<cntCols; i++) { // 행의 갯수만큼 반복
              isConflicted = false;
              if(arr[i][0][0] === yPos+y) { // 기존에 있던 행과 겹치는 경우
                isConflicted = true;
                for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
                  arr[i].push([yPos+y, xPos+x]); // 기존에 존재하는 행에 추가.
                }
                break;
              }
            }
            if(!isConflicted) { // 겹치지 않는다면 새로운 행을 추가.
              arr.unshift([]);
              for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
                arr[0].push([yPos+y, xPos+x]);
              }
              cntCols++; // 새로운 배열이 추가되지 않았다면 행의 갯수를 늘리면 안 됨.
            }
          }
          return;
        }

        // 합칠 열은 없고, 합칠 행만 있는 경우
        for(let y=0; y<rowspan; y++) { // 합칠 행만큼 반복
          for(let i=0; i<cntCols; i++) { // 행의 갯수만큼 반복
            isConflicted = false;
            if(arr[i][0][0] === yPos+y) { // 기존에 있던 행과 겹치는 경우
              isConflicted = true;
              arr[i].push([yPos+y, xPos]); // 기존에 존재하는 행에 추가.
              break;
            }
          }
          if(!isConflicted) { // 겹치지 않는다면 새로운 행을 추가.
            arr.unshift([ [yPos+y, xPos]] );
            cntCols++; // 새로운 배열이 추가되지 않았다면 행의 갯수를 늘리면 안 됨.
          }
        }
        return;
      }

      if(colspan) { // 합칠 행은 없고, 합칠 열만 있는 경우
        for(let i=0; i<cntCols; i++) { // 행의 갯수만큼 반복
          if(arr[i][0][0] === yPos) { // 기존에 있던 행과 겹치는 경우
            for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
              arr[i].push([yPos, xPos+x]);
            }
            return;
          }
        }
        arr.unshift([]);
        for(let x=0; x<colspan; x++) { // 합칠 열만큼 반복
          arr[0].push([yPos, xPos+x]);
        }
        return;
      }

      // 행과 열 병합이 하나도 안 된 셀을 선택한 경우
      for(let i=0; i<cntCols; i++) { // 행의 갯수만큼 반복
        // 기존에 있던 행과 겹치는 경우
        if(arr[i][0][0] === yPos) return arr[i].push([yPos, xPos]);
      }
      arr.push([ [yPos, xPos] ]);
    }
  }

  // y, x좌표를 토대로 배열의 데이터 제거
  static shiftCell(arr, yPos, xPos, rowspan, colspan) {
    let cntRows = arr.length;

    if(rowspan) { // 행이 병합된 셀을 선택한 경우
      if(colspan) { // 행과 열이 병합된 셀을 선택한 경우
        for(let i=0; i<rowspan; i++) {
          for(let j=0; j<colspan; j++) {
            for(let y=0; y<cntRows; y++) { // 배열의 행의 갯수만큼
              let cntCols = arr[y].length;
              for(let x=0; x<cntCols; x++) { // 배열의 열의 갯수만큼
                // [2, 3], [3, 2] 때문에 indexOf는 못 쓴다.
                if(arr[y][x][0] === yPos + i) {
                  if(arr[y][x][1] === xPos + j) {
                    // x에서부터 1개 삭제, x를 제외한
                    // (0 ~ x-1), (x+1 ~ length-1)만 남게 됨.
                    arr[y].splice(x--, 1);
                    cntCols;

                    // 현재 행에 데이터가 없다면 삭제하기 전에 열의 갯수는 1일 것임.
                    // 행에 데이터가 없으면 행 자체를 삭제, 아니면 그냥 함수 종료.
                    if(cntCols === 1) {
                      arr.splice(y--, 1);
                      cntRows--;
                    }
                    break;
                  }
                }
              }
            }
          }
        }
        return;
      }

      // 열은 병합되지 않고, 행만 병합된 셀을 선택한 경우
      for(let i=0; i<rowspan; i++) {
        for(let y=0; y<cntRows; y++) { // 배열의 행의 갯수만큼
          let cntCols = arr[y].length;
          for(let x=0; x<cntCols; x++) { // 배열의 열의 갯수만큼
            // [2, 3], [3, 2] 때문에 indexOf는 못 쓴다.
            if(arr[y][x][0] === yPos+i) {
              if(arr[y][x][1] === xPos) {
                // x에서부터 1개 삭제, x를 제외한
                // (0 ~ x-1), (x+1 ~ length-1)만 남게 됨.
                arr[y].splice(x--, 1);
                cntCols;

                // 현재 행에 데이터가 없다면 삭제하기 전에 열의 갯수는 1일 것임.
                // 행에 데이터가 없으면 행 자체를 삭제, 아니면 그냥 함수 종료.
                if(cntCols === 1) {
                  arr.splice(y--, 1);
                  cntRows--;
                }
                break;
              }
            }
          }
        }
      }
      return;
    }

    if(colspan) { // 행은 병합되지 않고, 열이 병합된 셀을 선택한 경우
      for(let i=0; i<colspan; i++) {
        for(let y=0; y<cntRows; y++) { // 배열의 행의 갯수만큼
          let cntCols = arr[y].length;
          for(let x=0; x<cntCols; x++) { // 배열의 열의 갯수만큼
            // [2, 3], [3, 2] 때문에 indexOf는 못 쓴다.
            if(arr[y][x][0] === yPos) {
              if(arr[y][x][1] === xPos+i) {
                // x에서부터 1개 삭제, x를 제외한
                // (0 ~ x-1), (x+1 ~ length-1)만 남게 됨.
                arr[y].splice(x--, 1);
                cntCols;

                // 현재 행에 데이터가 없다면 삭제하기 전에 열의 갯수는 1일 것임.
                // 행에 데이터가 없으면 행 자체를 삭제, 아니면 그냥 함수 종료.
                if(cntCols === 1) {
                  arr.splice(y--, 1);
                  cntRows--;
                }
                break;
              }
            }
          }
        }
      }
      return;
    }

    // 행과 열, 모두 병합되지 않은 단일 셀을 선택한 경우
    for(let y=0; y<cntRows; y++) { // 배열의 행의 갯수만큼
      let cntCols = arr[y].length;

      for(let x=0; x<cntCols; x++) { // 배열의 열의 갯수만큼
        // [2, 3], [3, 2] 때문에 indexOf는 못 쓴다.
        if(arr[y][x][0] === yPos) {
          if(arr[y][x][1] === xPos) {
            // x에서부터 1개 삭제, x를 제외한
            // (0 ~ x-1), (x+1 ~ length-1)만 남게 됨.
            arr[y].splice(x, 1);

            // 현재 행에 데이터가 없다면 삭제하기 전에 열의 갯수는 1일 것임.
            // 행에 데이터가 없으면 행 자체를 삭제, 아니면 그냥 함수 종료.
            return cntCols === 1 ? arr.splice(y, 1) : 0;
          }
        }
      }
    }
  }

  // 행을 정렬
  static sortCols(arr) {
    const cntCols = arr.length;

    if(cntCols === 1) return; // 행이 하나만 있으면 정렬 안해도 됨.

    /*
        y와 y+1 행을 비교하여 오름차순으로 정렬하는 버블 알고리즘.
        따라서 y와 y+1을 비교하는데 y가 배열의 마지막 인덱스까지 가면
        y+1은 마지막 인덱스를 초과했으므로 오류가 남.
        따라서 y는 배열의 마지막 인덱스-1까지 가야함.
     */
    for(let y=0; y<cntCols-1; y++) { // 0~배열의 행의 갯수-1만큼
      for(let i=y+1; i<cntCols; i++) { // 1~배열의 행의 갯수만큼
        if(arr[y][0][0] > arr[i][0][0]) { // 현재 비교하는 행이 아래 있는 열보다 작은 경우
          /*
              [x, y] = [y, x]; 만으로도 스왑이 가능하다.
              let [a, b] = ['b', 'a];
              위 동작은 내부적으로 아래와 같이 동작한다.
              let temp = ['b', 'a']; // temp는 내가 생각한 임의의 변수 이름이니 신경쓰지 않아도 됨.
              let a = temp[0];
              let b = temp[1];
              즉, [x, y] = [y, x];는 아래와 같이 동작할 것이다.
              아마 x나 y가 스코프 내에 존재한다면 다시 선언하지는 않을 것이다.
              let temp = [y, x];
              x = temp[0];
              y = temp[1];
           */
          [arr[y], arr[i]] = [arr[i], arr[y]];
        }
      }
    }
  }

  // 열을 정렬
  static sortRows(arr) {
    const cntCols = arr.length;

    for(let y=0; y<cntCols; y++) { // 배열의 행의 갯수만큼
      const cntRows = arr[y].length;

      if(cntRows === 1) continue; // 열이 하나만 있으면 정렬 안해도 됨.

      /*
          x와 x+1 열을 비교하여 오름차순으로 정렬하는 버블 알고리즘.
          따라서 x와 x+1을 비교하는데 x가 배열의 마지막 인덱스까지 가면
          x+1은 마지막 인덱스를 초과했으므로 오류가 남.
          따라서 x는 배열의 마지막 인덱스-1까지 가야함.
       */
      for(let x=0; x<cntRows-1; x++) { // 0~배열의 열의 갯수-1만큼
        for(let i = x + 1; i < cntRows; i++) { // 1~배열의 열의 갯수만큼
          if(arr[y][x][1] > arr[y][i][1]) { // 현재 비교하는 열이 오른쪽에 있는 열보다 작은 경우
            [arr[y][x][1], arr[y][i][1]] = [arr[y][i][1], arr[y][x][1]]; // 스왑
          }
        }
      }
    }
  }

  // 셀을 선택했을 때 배열에서 추가/삭제/정렬이 이루어져야함.
  static toggleCell(arr, y, x, rowspan, colspan) {
    if(!this.hasCell(arr, y, x)) {
      this.pushCell(arr, y, x, rowspan, colspan);
      this.sortRows(arr);
      this.sortCols(arr);
    }
    else this.shiftCell(arr, y, x, rowspan, colspan);
  }
}