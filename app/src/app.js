if (process.env.NODE_ENV !== 'production') { // HTML 핫리로드
  require('./index.html');
}

// 서드파티 먼저 로드
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import TemplateTable from './class/TemplateTable';
import ToggleCell from './class/ToggleCell';
import CollapseCell from './class/CollapseCell';
import ValidateObjTBLCfg from './class/ValidateObjTBLCfg';
import Util from './class/Util';

import './style.css';
import './logo.png';

// DOM 바로 뒤에 DOM 추가.
Node.prototype.insertAfter = function(newNode) {
  this.parentNode.insertBefore(newNode, this.nextSibling);
};

// 정적으로 생성된 DOM들은 미리 변수에 선언.
const body              = document.body,
      chkJSON           = document.querySelector('#chkJSON'),
      chkJSONMode       = document.querySelector('#chkJSONMode'),
      wrapMode          = document.querySelector('#wrapMode'),
      frmJsonMode       = document.querySelector('#frmJsonMode'),
      tblJSON           = document.querySelector('#tblJSON'),
      frmNormalMode     = document.querySelector('#frmNormalMode'),
      frmTBLMakerNromal = document.querySelector('#frmTBLMakerNormal'),
      frmTBLMakerJSON   = document.querySelector('#frmTBLMakerJSON'),
      chkHeadCols       = document.querySelector('#chkHeadCols'),
      chkHeadRows       = document.querySelector('#chkHeadRows'),
      txtCntCols        = document.querySelector('#txtCntCols'),
      txtCntRows        = document.querySelector('#txtCntRows'),
      txtTBLCaption     = document.querySelector('#txtTBLCaption'),
      lnkHelp           = document.querySelector('#lnkHelp');

let arrSelectedCell = [], // 토글을 위해 선택된 셀을 담을 배열
    originData      = '', // 수정 취소 했을 때 원본 데이터
    editIdx         = [], // 현재 수정 중인 인덱스
    html            = '', // 테이블 태그를 담을 변수
    cntClick        = 0, // 클릭과 더블 클릭을 구분하기 위한 변수
    timerClick      = 0, // 더블 클릭시 클릭 이벤트 타이머를 죽이기 위한 변수.
    isJSONMode      = false, // 테이블의 정보를 제이슨 모드와 일반 모드로 나눔.
    objTBLCfg       = {// 테이블에 관련된 정보를 담고있는 객체
      caption: '',
      headRow: false,
      headCol: false,
      data   : []
    };


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

const drawTable = (objTBLCfg, wrapMode) => { // 실제로 테이블을 그리는 함수
  // 태그 템플릿을 만들고 할당
  TemplateTable.generateTemplate(objTBLCfg);
  html = TemplateTable.getTemplate().replace();

  // 테이블을 감싸는 컨테이너 생성.
  const containerTBLInfo     = document.createElement('div'); // 테이블 태그를 감 쌀 컨테이너
  containerTBLInfo.id        = 'containerTBLInfo';
  containerTBLInfo.innerHTML =
`<div id="containerTBL">
  ${html}
  <br />
  <button id="btnCollapse" class="btn btn-primary _hidden">
    <i class="fa fa-compress" aria-hidden="true"></i> 병합
  </button>
</div>
<div id="containerTBLTxt">
  <section>
    <h4>HTML Table 태그</h4>
    <textarea id="htmlTable" cols="50" rows="20" readonly>${html.replace(/ data-idx-row="\d+" data-idx-col="\d+"/g, '')}</textarea>
  </section>
  <section style="margin-left: 10px">
    <h4>Table 태그 정보(JSON 모드에서 사용 가능)</h4>
    <textarea id="json" cols="50" rows="20" readonly>${JSON.stringify(objTBLCfg, null, 2)}</textarea>
  </section>
</div>`;

  wrapMode.insertAfter(containerTBLInfo);
};

const saveCell = (cell, formJSON, htmlTable, y, x, value) => {
  const regExp = Util.getPositiveLookBehindAhead(`data-idx-row="${y}" data-idx-col="${x}".*`, '>.', '<');
  editIdx = [];
  originData = '';
  cell.innerText = value;
  objTBLCfg.data[y][x] = value;
  html = html.replace(regExp.exec(html)[1], `>${value}`);

  formJSON.removeAttribute('readonly');
  formJSON.innerHTML = JSON.stringify(objTBLCfg, null, 2);
  formJSON.setAttribute('readonly', '');
  htmlTable.removeAttribute('readonly');
  htmlTable.innerHTML = html.replace(/ data-idx-row="\d+" data-idx-col="\d+"/g, '');
  htmlTable.setAttribute('readonly', '');
};

const toggleCellStyle = cell => { // 셀을 눌렀을 때 스타일을 토글
  cell.className = !cell.className ? 'selected' : '';
};

chkJSONMode.addEventListener('click', () => {
  if(isJSONMode) { // JSON 입력모드에서 일반 입력모드로
    isJSONMode = false;
    frmJsonMode.className = 'hidden';
    frmNormalMode.className = '';
    txtCntRows.focus();
  } else { // 일반 입력 모드에서 JSON 모드로
    isJSONMode = true;
    frmJsonMode.className = '';
    frmNormalMode.className = 'hidden';
    tblJSON.focus();
  }
  chkJSONMode.checked = false;

  chkJSON.childNodes[1].data = isJSONMode ? ' 일반 입력 모드로 변경' : ' JSON 입력 모드로 변경';
});

frmTBLMakerJSON.addEventListener('submit', evt => {
  evt.preventDefault();
  let containerTBLInfo = document.querySelector('#containerTBLInfo');
  const json = JSON.parse(tblJSON.value);

  if(!ValidateObjTBLCfg.isValidCaption(json.caption)) {
    alert('caption에는 문자열만 입력해주세요!');
    return tblJSON.focus();
  }
  if(!ValidateObjTBLCfg.isValidHeaderCell(json.headRow)) {
    alert('headRow에는 true, false 값만 넣어주세요.');
    return tblJSON.focus();
  }
  if(!ValidateObjTBLCfg.isValidHeaderCell(json.headCol)) {
    alert('headRow에는 true, false 값만 넣어주세요.');
    return tblJSON.focus();
  }
  ValidateObjTBLCfg.validateData(json.data);
  if(!ValidateObjTBLCfg.getObjValidateData().isValid) {
    alert(
`${ValidateObjTBLCfg.getObjValidateData().err}${typeof ValidateObjTBLCfg.getObjValidateData().row === 'number' ? `
${ValidateObjTBLCfg.getObjValidateData().row}행${typeof ValidateObjTBLCfg.getObjValidateData().col === 'number' ? `, ${ValidateObjTBLCfg.getObjValidateData().col}열` : ''}을 참고해주세요.` : ''}`);
    return tblJSON.focus();
  }


  if(containerTBLInfo) { // 생성된 테이블이 있는 경우
    if(confirm('테이블을 새로 생성하시겠습니까?\n기존에 작업하던 결과는 사라집니다.')) {
      // 확인을 누르면 생성됐던 테이블 제거
      containerTBLInfo.remove();
    } else return; // 취소 버튼을 누르면 함수 조기 종료
  }
  objTBLCfg = json;

  // 테이블 그리기
  drawTable(objTBLCfg, wrapMode);
});

frmTBLMakerNromal.addEventListener('submit', evt => {
  evt.preventDefault(); // submit의 기본 이벤트 핸들러 제거.
  const cntCols        = +txtCntCols.value,
        cntRows        = +txtCntRows.value;
  let containerTBLInfo = document.querySelector('#containerTBLInfo');

  if(!validateForm(cntCols, cntRows)) return; // 유효성 검사를 통과하지 못하면 이벤트 종료.
  if(containerTBLInfo) { // 생성된 테이블이 있는 경우
    if(confirm('테이블을 새로 생성하시겠습니까?\n기존에 작업하던 결과는 사라집니다.')) {
      // 확인을 누르면 생성됐던 테이블 제거
      containerTBLInfo.remove();
    } else return; // 취소 버튼을 누르면 함수 조기 종료
  }

  // objTBLCfg에 샘플 데이터로 초기화
  objTBLCfg.caption = txtTBLCaption.value;
  objTBLCfg.headCol = chkHeadRows.checked;
  objTBLCfg.headRow = chkHeadCols.checked;
  arrSelectedCell = [];
  TemplateTable.generateData(objTBLCfg, cntRows, cntCols);

  // 테이블 그리기
  drawTable(objTBLCfg, wrapMode);
});

body.addEventListener('click', e => { // 동적으로 생성된 엘리먼트에 이벤트 리스너 바인딩
  const dom = e.target;
  if(dom.tagName === 'TD' || dom.tagName === 'TH') { // 셀을 클릭한 경우
    cntClick++;
    if(cntClick === 1) { // 클릭
      timerClick = setTimeout(function() {
        cntClick = 0; // 다음 클릭을 위해 클릭 카운트 초기화
        const y           = +dom.getAttribute('data-idx-row'),
              x           = +dom.getAttribute('data-idx-col'),
              rowspan     = +dom.getAttribute('rowspan'),
              colspan     = +dom.getAttribute('colspan'),
              isFirstCell = !arrSelectedCell.length; // 처음에 셀을 선택한 건지 구분

        let btnCollapse = document.querySelector('#btnCollapse'); // 병합하기 버튼

        toggleCellStyle(dom);
        ToggleCell.toggleCell(arrSelectedCell, y, x, rowspan, colspan);

        // 병합된 셀 하나만 골랐을 때는 병합 가능 여부를 체크하면 안 됨.
        if(isFirstCell && arrSelectedCell.length === rowspan) return;
        if(isFirstCell && arrSelectedCell[0].length === colspan) return;

        if(CollapseCell.isRectangle(arrSelectedCell)) { // 병합이 가능하다면
          if(btnCollapse.className.indexOf('_hidden') === -1) return; // 버튼이 이미 보이면 종료.
          btnCollapse.className = btnCollapse.className.replace(/_hidden\s*/, ''); // 버튼 보이기
        } else if(btnCollapse.className.indexOf('_hidden') === -1) { // 병합이 불가능하고, 버튼이 보인다
          btnCollapse.className += ' _hidden'; // 버튼
        }
      }, 400);
    } else {
      clearTimeout(timerClick);
      cntClick = 0;
      originData = e.target.innerText;
      editIdx = [+e.target.getAttribute('data-idx-row'), +e.target.getAttribute('data-idx-col')];
      e.target.innerHTML = `<input type="text" value="${e.target.innerText}" />`;
      e.target.childNodes[0].focus();
    }
  }
  if(e.target.id === 'btnCollapse') { // 병합 버튼을 클릭한 경우
    const colspan          = arrSelectedCell[0].length > 1 ? arrSelectedCell[0].length : 0,
          rowspan          = arrSelectedCell.length > 1 ? arrSelectedCell.length : 0,
          containerTBLInfo = document.querySelector('#containerTBLInfo');
    CollapseCell.collapseCell(objTBLCfg.data, arrSelectedCell, colspan, rowspan);
    // 테이블 지우고 새로 그리기
    containerTBLInfo.remove();
    arrSelectedCell = [];
    drawTable(objTBLCfg, wrapMode);
  }
});

body.addEventListener('keydown', e => { // 동적으로 생성된 엘리먼트에 이벤트 리스너 바인딩
  const y         = editIdx[0],
        x         = editIdx[1],
        cell      = document.querySelector(`[data-idx-col="${x}"][data-idx-row="${y}"]`),
        formJSON  = document.querySelector('#json'),
        htmlTable = document.querySelector('#htmlTable');

  if(!editIdx.length) return; // 수정하고 있는 게 없다면 종료.

  const data = cell.childNodes[0].value;

  if(e.code === 'Enter') saveCell(cell, formJSON, htmlTable, y, x, data);
  if(e.code === 'Escape') {
    if(confirm('저장하지 않은 정보는 날아갑니다.\n수정을 취소하시겠습니까?')) {
      cell.innerHTML = originData;
    }
  }
});

txtCntRows.focus();