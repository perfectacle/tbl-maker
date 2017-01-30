import Util from './Util';

export default class TemplateTable {
  // 초기에 샘플 데이터를 만들어내는 메소드
  static generateData(objTBLCfg, cntRows, cntCols) {
    objTBLCfg.data = []; // 초기화를 시켜주지 않으면 계속 쌓임.
    for(let y=0; y<cntRows; y++) {
      objTBLCfg.data.push([]);
      for(let x=0; x<cntCols; x++) {
        objTBLCfg.data[y].push(`sample${cntCols*y + x + 1}`);
      }
    }
  }

  // 테이블 태그 템플릿을 만들어내는 메소드
  static generateTemplate(objTBLCfg) {
    const cntRows = objTBLCfg.data.length,
          cntCols = objTBLCfg.data[0].length,
          // 병합된 셀 찾기
          regExpCollapsedCell = /<(th |td )(scope="row" |scope="col" )*data-idx-row="\d+" data-idx-col="\d+">%collapsedCell%<\/(th|td)>\n\s+/g,
          // 병합이 시작된 셀에서 바꿀 부분 찾기
          regExpCollapsedStartCell = Util.getPositiveLookBehindAhead('<(th |td )(scope="row" |scope="col" )*data-idx-row="\\d+" data-idx-col="\\d+"', '>%.*:\\d+,\\d+%', '<\/(th|td)>'),
          // 병합이 시작된 셀의 데이터를 뽑아내기
          regExpCollapsedStartCellData = Util.getPositiveLookBehindAhead('<(th |td )(scope="row" |scope="col" )*data-idx-row="\\d+" data-idx-col="\\d+">%', '.', ':\\d+,\\d+%<\/(th|td)>'),
          // 병합할 행의 갯수 구하기
          regExpRowspan = Util.getPositiveLookBehindAhead('<(th |td )(scope="row" |scope="col" )*data-idx-row="\\d+" data-idx-col="\\d+">%.+:', '\\d', ',\\d+%<\/(th|td)>'),
          // 병합할 열의 갯수 구하기
          regExpColspan = Util.getPositiveLookBehindAhead('<(th |td )(scope="row" |scope="col" )*data-idx-row="\\d+" data-idx-col="\\d+">%.+:\\d+,', '\\d', '%<\/(th|td)>');

    this.html = // 템플릿을 담을 변수, 가독성을 위해 일단 캡션까지만 담음
`<table>
${objTBLCfg.caption ? `  <caption>${objTBLCfg.caption}</caption>
` : ''}`;

    this.html += // 가독성을 위해 tbody까지만 담음
`${objTBLCfg.headRow ? '  <thead>' : '  <tbody>'}`;

    if(objTBLCfg.headRow) { // 제목행을 지정한 경우에는 thead까지 처리해줘야함.
      this.html += `
    <tr>`;

      for(let x=0; x<cntCols; x++) {
        this.html += `
      <th scope="col" data-idx-row="${0}" data-idx-col="${x}">${objTBLCfg.data[0][x]}</th>`;
      }

      this.html += `
    </tr>
  </thead>
  <tbody>`;
    }

    for(let y=0; y<cntRows; y++) {
      // 제목행을 지정한 경우 이미 테이블을 만들었으므로 0번째 행은 스킵
      if(objTBLCfg.headRow && !y) continue;
      this.html += `
    <tr>`;

      for(let x=0; x<cntCols; x++) {
        if(objTBLCfg.headCol && !x) { // 제목열을 지정하고 0번째 열인 경우
          this.html += `
      <th scope="row" data-idx-row="${y}" data-idx-col="${x}">${objTBLCfg.data[y][x]}</th>`;
        } else {
          this.html += `
      <td data-idx-row="${y}" data-idx-col="${x}">${objTBLCfg.data[y][x]}</td>`;
        }
      }

      this.html += `
    </tr>`;
    }

    this.html += `
  </tbody>
</table>`;

    // 병합된 셀들 처리
    this.html = this.html.replace(regExpCollapsedCell, ''); // 병합된 열 삭제.
    this.html = this.html.replace(/\s{6}<\/tr>/g, '    </tr>'); // 템플릿을 보기 이쁘게 하기 위함.

    // regExp의 flag에 g를 주면 제대로 된 결과를 얻기 힘들어서 반복문으로 처리
    while(regExpCollapsedStartCell.exec(this.html)) { // rowspan, colspan 처리
      this.html = this.html.replace(regExpCollapsedStartCell.exec(this.html)[3], ` rowspan="${regExpRowspan.exec(this.html)[3]}" colspan="${regExpColspan.exec(this.html)[3]}">${regExpCollapsedStartCellData.exec(this.html)[3]}`);
    }

    // rowspan="0", colspan="0"인 녀석들 치우기
    this.html = this.html.replace(/rowspan="0" /g, '');
    this.html = this.html.replace(/ colspan="0"/g, '');
  }

  static getTemplate() {
    return this.html;
  }
}