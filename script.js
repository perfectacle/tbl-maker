{
  Node.prototype.insertAfter = function(newNode) { // DOM 바로 뒤에 DOM 추가.
    this.parentNode.insertBefore(newNode, this.nextSibling);
  };

  const body          = document.body,
        frmTBLMaker   = document.querySelector('#frmTBLMaker'),
        chkHeadCols   = document.querySelector('#chkHeadCols'),
        chkHeadRows   = document.querySelector('#chkHeadRows'),
        txtCntCols    = document.querySelector('#txtCntCols'),
        txtCntRows    = document.querySelector('#txtCntRows'),
        txtTBLCaption = document.querySelector('#txtTBLCaption');

  let tblHTML          = '', // table 태그 담을 변수.
      cntClick         = 0, // 클릭과 더블 클릭을 구분하기 위한 변수
      singleClickTimer = 0, // 더블 클릭시 클릭 이벤트 타이머를 죽이기 위한 변수.
      objTBLCfg        = { // 테이블에 관한 설정들을 담고있는 객체
        cntCols   : 0,
        cntRows   : 0,
        caption   : '',
        headCols  : false, // 제목 행 설정 여부
        headRows  : false, // 제목 열 설정 여부
        data      : [], // 실 데이터가 들어감.
        selected  : [], // 병합 여부를 알아내기 위해 선택된 셀의 index를 저장할 배열
        editIdx   : [], // x, y를 수정 중이라고 알려두기 위한 키.
        originData: '' // 셀을 수정하기 이전 상태로 되돌리기 위한 키
      };

  // "1, 2"에서 x, y좌표를 구하는 함수.
  const getPos = (posStr, pos) => pos ? +posStr.split(', ')[1] : +posStr.split(', ')[0];

  const validateForm = (cntCols, cntRows) => { // 폼의 유효성 검사
    // 숫자가 아니거나, 안전한 정수가 아닌 경우
    if(!cntCols || !Number.isSafeInteger(cntCols)){
      alert('줄은 자연수만 입력해주세요.');
      return txtCntCols.focus(); // 함수 조기 종료.
    } else if(!cntRows || !Number.isSafeInteger(cntRows)){
      alert('칸은 자연수만 입력해주세요.');
      return txtCntRows.focus(); // 함수 조기 종료.
    }
    return true;
  };

  const initObjTBLCfgData = objTBLCfg => { // 테이블에 들어가는 실제 데이터 초기화
    for(let i=0; i<objTBLCfg.cntCols; i++) {
      objTBLCfg.data[i] = []; // 행마다 배열을 초기화
      for(let j = 0; j < objTBLCfg.cntRows; j++) {
        objTBLCfg.data[i].push(`sample${objTBLCfg.cntRows * i + j + 1}`); // 열마다 샘플 데이터에 넘버링하여 푸쉬.
      }
    }
  };

  // 함수 내에 중복되는 내용들을 따로 함수로 뺌.
  const createNormalCell = (html, i, j) => { // 일반 데이터를 담을 셀을 만드는 함수
    html += `
      <td data-idx-col="${i}" data-idx-row="${j}">${objTBLCfg.data[i][j]}</td>`;
    if(j == objTBLCfg.cntRows-1) { // 마지막 열인 경우
      if(i != objTBLCfg.cntCols-1) { // 마지막 행이 아닌 경우
        html += `
    </tr>
    <tr>`;
      } else { // 마지막 행인 경우
        html += `
    </tr>
  </tbody>
</table>`;
      }
    }
    return html;
  };

  const createHeaderCol = (html, i, j) => { // 상단 1행을 제목행으로 만드는 함수.
    html += `
      <th scope="col" data-idx-col="${i}" data-idx-row="${j}">${objTBLCfg.data[i][j]}</th>`;
    if(j == objTBLCfg.cntRows-1) { // 마지막 열인 경우
      html += `
    </tr>
  <thead>
  <tbody>
    <tr>`;
    }
    return html;
  };

  const createHeaderRowAndNormalCell = (html, i, j) => { // 좌측 1열을 제목열로 만드는 함수.
    if(!j) { // 첫 번째 열인 경우
      html += `
      <th scope="row" data-idx-col="${i}" data-idx-row="${j}">${objTBLCfg.data[i][j]}</th>`;
    } else { // 나머지 열인 경우
      html = createNormalCell(html, i, j);
    }
    return html;
  };

  const updateTBL = containerTBL => { // 테이블 컨테이너(div)에 실제로 dom을 업데이트하는 함수
    containerTBL.innerHTML = tblHTML + `
      <br />
      <textarea cols="50" rows="20">${tblHTML.replace(/ data-idx-col="\d+" data-idx-row="\d+"/g, '')}</textarea>`;
  };

  const createTBL = objTBLCfg => { // 테이블 정보 객체를 토대로 테이블 만들어내기.
    const containerTBL = document.createElement('div'); // 테이블 태그를 감 쌀 컨테이너
    containerTBL.id    = 'TBL'; // 테이블은 하나만 만들어두려고 ID를 지정.

    tblHTML = // table 태그 템플릿
`<table>${objTBLCfg.caption ? `
  <caption>${objTBLCfg.caption}</caption>` : ''}
  ${objTBLCfg.headCols ? '<thead>': '<tbody>'}
    <tr>`;

    for(let i=0; i<objTBLCfg.cntCols; i++) {
      for(let j=0; j<objTBLCfg.cntRows; j++) {
        if(!(objTBLCfg.headCols || objTBLCfg.headRows)) { // 제목 행과 열을 설정하지 않은 경우
          tblHTML = createNormalCell(tblHTML, i, j); // 모든 셀을 일반 셀로 만들기.
        } else if(objTBLCfg.headCols) { // 제목 행을 설정한 경우
          if(objTBLCfg.headRows) { // 제목 열을 설정한 경우
            if(!i) { // 첫 번째 행인 경우
              tblHTML = createHeaderCol(tblHTML, i, j); // 첫 줄을 제목 행으로 만들기.
            }
            else { // 첫 번째 행이 아닌 경우
              tblHTML = createHeaderRowAndNormalCell(tblHTML, i, j); // 나머지 줄을 제목과 일반 셀로 만들기.

            }
          } else { // 제목 열을 설정하지 않은 경우
            if(!i) { // 첫 번째 행인 경우
              tblHTML = createHeaderCol(tblHTML, i, j); // 첫 줄을 제목 행으로 만들기.
            }
            else { // 첫 번째 행이 아닌 경우
              tblHTML = createNormalCell(tblHTML, i, j); // 나머지 셀을 일반 셀로 만들기.
            }
          }
        } else { // 제목 열을 설정한 경우
          tblHTML = createHeaderRowAndNormalCell(tblHTML, i, j); // 각 줄을 제목과 일반 셀로 만들기.
        }
      }
    }
    updateTBL(containerTBL);
    frmTBLMaker.insertAfter(containerTBL);
  };

  const toggleCellStyle = cell => { // 셀을 눌렀을 때 스타일을 토글
    cell.className = !cell.className ? 'selected' : '';
  };

  const toggleCellArr = (idxCol, idxRow, colspan, rowspan) => { // 선택된 요소를 담은 배열에서 셀을 넣었다 뺏다 하기.
    let isBiggerThenIdx = false; // 현재 고른 셀이 기존에 골랐던 셀들보다 더 아래에 존재하는 행인지 판단하는 flag 변수.
    let i = 0; // 반복문 밖에서 i 값을 쓰기 위함.
    console.log(objTBLCfg.selected[i]);

    for(; i<objTBLCfg.selected.length; i++) {
      // 배열에 요소가 존재한다면 제거하고 함수 조기 종료
      if(objTBLCfg.selected[i].indexOf(idxCol + ', ' + idxRow) !== -1) {
        objTBLCfg.selected[i] = objTBLCfg.selected[i].filter(v => v !== (idxCol + ', ' + idxRow));
        if(!objTBLCfg.selected[i].length) { // 행의 데이터를 모두 삭제해 빈 배열인 경우 배열 자체를 날려버림.
          return objTBLCfg.selected.splice(i--, 1);
        }
        return; // 함수 조기종료
      }

      if(!objTBLCfg.selected[i].length) { // 아무런 값도 없는 초기 상태
        if(colspan) {
          for(let j=0; j<colspan; j++) {
            objTBLCfg.selected[i].push(idxCol + ', ' + idxRow);
          }
          if(rowspan) {
            for(let j = 0; j < colspan; j++) {
              objTBLCfg.selected.push([idxCol + ', ' + idxRow]);
            }
          }
          return;
        } else if(rowspan) {
          for(let j = 0; j < colspan; j++) {
            objTBLCfg.selected.push([idxCol + ', ' + idxRow]);
          }
          return;
        }
        return objTBLCfg.selected[i].push(idxCol + ', ' + idxRow); // 함수 조기 종료.
      } else { // 값이 들어가있으면 오름차순으로 정렬하여 넣어야함.
        const idx = objTBLCfg.selected[i][0].split(', ')[0]; // 현재 비교하는 요소가 테이블의 몇 번째 행인지
        if(idx === idxCol) { // 같은 행에 있는 셀을 고른 경우
          // 배열에 데이터를 넣고 오름차순 정렬 후 함수 조기 종료.
          objTBLCfg.selected[i].push(idxCol + ', ' + idxRow);
          return objTBLCfg.selected[i].sort();
        }

        isBiggerThenIdx = idx < idxCol;
        if(!isBiggerThenIdx) break;
      }
    }

    // 현재 고른 셀이 기존에 골랐던 행들보다 더 아래에 있다면...
    if(isBiggerThenIdx) return objTBLCfg.selected.push([idxCol + ", " + idxRow]);
    // 현재 고른 셀이 기존에 골랐던 행들 가운데 껴있다면...
    objTBLCfg.selected.splice(i, 0, [idxCol + ', ' + idxRow]);
  };

  const isCollapsed = arrSel => { // 셀 병합이 가능한지 여부를 판단.
    let isCollapsedCol = false, // 병합된 셀 1개만 선택됐는지 판단하기 위함.
        isCollapsedRow = false;

    // 하나도 선택이 안 됐으면
    if(!arrSel.length) return false;
    // 1줄만 선택돼있고 1칸만 선택돼있으면
    if(arrSel.length === 1 && arrSel[0].length === 1) return false;
    for(let i=0; i<arrSel.length; i++) {
      // 선택한 영역이 직사각형이 아니면
      if(arrSel[0].length !== arrSel[i].length) return false;
      for(let j=1; j<arrSel[i].length; j++) {
        const idx = [getPos(arrSel[i][j-1], 1), getPos(arrSel[i][j], 1)];

        if(idx[0] === idx[1]) { // 병합된 열인 경우
          isCollapsedCol = true;
          arrSel[i][j] = `${getPos(arrSel[i][j])}, ${++idx[1]}`;
        } else isCollapsedCol = false;

        // 이번 열과 다음 열이 연속적인지 판단.
        if(idx[0]+1 !== idx[1]) return false;
      }

      if(i === arrSel.length-1) break;
      const idx = [getPos(arrSel[i][0], 0), getPos(arrSel[i+1][0], 0)];

      if(idx[0] === idx[1]) { // 병합된 행인 경우
        isCollapsedCol = true;
        continue;
      } else isCollapsedCol = false;

      // 이번행과 다음행이 연속적인지 판단
      if(idx[0]+1 !== idx[1]) return false;
    }
    return !isCollapsedCol && !isCollapsedRow;
  };

  const toggleCell = cell => { // 셀을 눌렀을 때 토글되는 함수
    toggleCellStyle(cell);
    toggleCellArr(cell.getAttribute('data-idx-col'), cell.getAttribute('data-idx-row'), cell.getAttribute('colspan'), cell.getAttribute('rowspan'));
  };

  const collapseCell = arrSel => { // 병합하기
    if(objTBLCfg.originData) { // 수정 중인 데이터가 있는 경우
      // 취소를 누르면 함수 종료
      if(!(confirm('저장되지 않은 정보는 손실됩니다.\n병합 하시겠습니까?'))) return;
      else {
        objTBLCfg.editIdx = [];
        objTBLCfg.originData = '';
      }
    }
    const cntColspan   = arrSel[0].length,
          cntRowspan   = arrSel.length,
          containerTBL = document.querySelector('#TBL');

    if(cntColspan > 1) { // colspan
      let idx    = [getPos(arrSel[0][0], 0), getPos(arrSel[0][0], 1)],
          regExp = new RegExp(`data-idx-col="${idx[0]}" data-idx-row="${idx[1]}"`);

      if(/(colpan="\d")+/.test(tblHTML)) { // 이미 병합을 한 셀에 또 병합을 하는 경우
        alert('a');
        tblHTML = tblHTML.replace(/colspan="\d" /, ''); // 기존에 있던 정보 지움.
      }
      tblHTML = tblHTML.replace(regExp, `colspan="${cntColspan}" data-idx-col="${idx[0]}" data-idx-row="${idx[1]}"`);
      for(let i=0; i<arrSel.length; i++) {
        for(let j=1; j<arrSel[0].length; j++) {
          idx = [getPos(arrSel[i][j], 0), getPos(arrSel[i][j], 1)];
          regExp = new RegExp(`<(td|th) (rowspan="\d" |colspan="\d" )*data-idx-col="${idx[0]}" data-idx-row="${idx[1]}">.*<\/(td|th)>\n +`);
          tblHTML = tblHTML.replace(regExp, '');
        }
      }
    }
    if(cntRowspan > 1) { // rowspan
      let idx    = [getPos(arrSel[0][0], 0), getPos(arrSel[0][0], 1)],
          regExp = new RegExp(`data-idx-col="${idx[0]}" data-idx-row="${idx[1]}"`);

      if(/(rowspan="\d")+/.test(tblHTML)) { // 이미 병합을 한 셀에 또 병합을 하는 경우
        tblHTML = tblHTML.replace(/rowspan="\d" /, ''); // 기존에 있던 정보 지움.
      }
      tblHTML = tblHTML.replace(regExp, `rowspan="${cntRowspan}" data-idx-col="${idx[0]}" data-idx-row="${idx[1]}"`);
      for(let i=1; i<arrSel.length; i++) {
        for(let j=0; j<arrSel[0].length; j++) {
          idx = [getPos(arrSel[i][j], 0), getPos(arrSel[i][j], 1)];
          regExp = new RegExp(`<(td|th) (rowspan="\d" |colspan="\d" )*data-idx-col="${idx[0]}" data-idx-row="${idx[1]}">.*<\/(td|th)>\n +`);
          // 이쁘게 안 나와서 부득이하게 2번 replace
          tblHTML = tblHTML.replace(regExp, '').replace('      </tr>', '    </tr>');
        }
      }
    }
    objTBLCfg.selected = [[]];
    console.log(tblHTML);
    updateTBL(containerTBL);
  };

  const saveCell = (x, y, data) => {
    const regExp       = new RegExp(`data-idx-col="${x}" data-idx-row="${y}">.*<`),
          containerTBL = document.querySelector('#TBL');
    tblHTML = tblHTML.replace(regExp, `data-idx-col="${x}" data-idx-row="${y}">${data}<`);
    updateTBL(containerTBL);
    objTBLCfg.editIdx    = [];
    objTBLCfg.originData = '';
  };

  frmTBLMaker.addEventListener('submit', evt => {
    evt.preventDefault(); // submit의 기본 이벤트 핸들러 제거.
    const TBL                = document.querySelector('#TBL'),
          cntCols            = +txtCntCols.value,
          cntRows            = +txtCntRows.value,
          updatingObjTBLCfg  = { // 수정된 테이블 설정 객체
            cntCols   : cntCols,
            cntRows   : cntRows,
            caption   : txtTBLCaption.value.trim(),
            headCols  : chkHeadCols.checked,
            headRows  : chkHeadRows.checked,
            data      : [],
            selected  : [],
            editIdx   : [],
            originData: ''
          };

    if(!validateForm(cntCols, cntRows)) return; // 유효성 검사를 통과하지 못하면 이벤트 종료.
    if(TBL) { // 생성된 테이블이 있는 경우
      if(confirm('테이블을 새로 생성하시겠습니까?\n기존에 작업하던 결과는 사라집니다.')) {
        // 확인을 누르면 생성됐던 테이블 제거
        TBL.remove();
      } else return; // 취소 버튼을 누르면 함수 조기 종료
    }
    // 테이블 설정 객체 업데이트 후 테이블 생성
    objTBLCfg = updatingObjTBLCfg;
    initObjTBLCfgData(objTBLCfg);
    createTBL(objTBLCfg);
  });

  body.addEventListener('click', e => { // 동적으로 생성된 엘리먼트에 이벤트 리스너 바인딩
    if(e.target.tagName === 'TD' || e.target.tagName === 'TH') { // 셀을 클릭한 경우
      cntClick++;
      if (cntClick === 1) { // 클릭
        singleClickTimer = setTimeout(function() {
          cntClick = 0;
          const TBL         = document.querySelector('table');
          let   btnCollapse = document.querySelector('#btnCollapse');

          toggleCell(e.target);
          if(isCollapsed(objTBLCfg.selected)) { // 병합이 가능하다면
            if(btnCollapse) return; // 버튼이 이미 존재하면 종료.
            // 버튼 생성
            btnCollapse = document.createElement('button');
            btnCollapse.id = 'btnCollapse';
            btnCollapse.innerText = '병합';
            TBL.insertAfter(btnCollapse);
          } else if(!isCollapsed(objTBLCfg.selected) && btnCollapse) { // 병합이 불가능하고, 버튼이 존재한다
            btnCollapse.remove();
          }
        }, 400);
      } else { // 더블 클릭
        clearTimeout(singleClickTimer);
        cntClick = 0;
        objTBLCfg.originData = e.target.innerText;
        objTBLCfg.editIdx.push(e.target.getAttribute('data-idx-col'));
        objTBLCfg.editIdx.push(e.target.getAttribute('data-idx-row'));
        e.target.innerHTML = `<input type="text" value="${e.target.innerText}" />`;
        e.target.childNodes[0].focus();
      }
    }
    if(e.target.id === 'btnCollapse') { // 병합 버튼을 클릭한 경우
      collapseCell(objTBLCfg.selected);
    }
  });

  body.addEventListener('keydown', e => { // 동적으로 생성된 엘리먼트에 이벤트 리스너 바인딩
    const x  = objTBLCfg.editIdx[0],
          y  = objTBLCfg.editIdx[1];
    let   dom, data;
    if(!objTBLCfg.editIdx.length) return; // 수정하고 있는 게 없다면 종료.
    dom = document.querySelector(`[data-idx-col="${x}"][data-idx-row="${y}"]`);
    data = dom.childNodes[0].value;
    if(e.code === 'Enter') saveCell(x, y, data);
    if(e.code === 'Escape') {
      if(confirm('저장하지 않은 정보는 날아갑니다.\n수정을 취소하시겠습니까?')) {
        dom.innerHTML = objTBLCfg.originData;
      }
    }
  });

  // 기본적으로 프로그램이 실행되면 포커스를 주기 위함.
  txtCntCols.focus();
}