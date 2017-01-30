describe('ValidateObjTBLCfg 클래스 - 테이블 정보의 유효성을 검사', () => {
  let objTBLCfg, objValidateData;
  beforeEach(() => {
    objTBLCfg = {
      caption: '',
      headRow: false,
      headCol: false,
      data   : []
    };
  });

  it('validateCaption() - 캡션에 문자가 아닌 값이 온 경우', () => {
    objTBLCfg.caption = true;
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = 1.1;
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = undefined;
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = null;
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = [1, 2];
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = {name: 'asdf', age: 22};
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(false);
    objTBLCfg.caption = 'caption';
    expect(ValidateObjTBLCfg.isValidCaption(objTBLCfg.caption)).toEqual(true);
  });

  it('validateHeaderCell() - 제목 행과 열에 boolean이 아닌 값이 온 경우', () => {
    objTBLCfg.headRow = 'true';
    objTBLCfg.headCol = 'true';
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = 2;
    objTBLCfg.headCol = 2;
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = null;
    objTBLCfg.headCol = null;
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = undefined;
    objTBLCfg.headCol = undefined;
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = [2, 3];
    objTBLCfg.headCol = [3, 4];
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = {name: 'asdf', age: 33};
    objTBLCfg.headCol = {name: 'qqq', age: 22};
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(false);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(false);
    objTBLCfg.headRow = false;
    objTBLCfg.headCol = true;
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headRow)).toEqual(true);
    expect(ValidateObjTBLCfg.isValidHeaderCell(objTBLCfg.headCol)).toEqual(true);
  });

  describe('validateData() - 배열에 들어가있는 데이터 검사', () => {
    it('data 배열의 각 행의 길이가 다른 경우', () => {
      objTBLCfg.data = [
        ['1', '2'],
        ['2', '3'],
        ['3']
      ];
      ValidateObjTBLCfg.validateData(objTBLCfg.data);
      objValidateData = ValidateObjTBLCfg.getObjValidateData();
      expect(objValidateData.isValid).toEqual(false);
      expect(objValidateData.err).toEqual('각 행의 길이가 다름.');
      expect(objValidateData.row).toEqual(2);
    });

    describe('병합 정보가 맞지 않는 경우', () => {
      describe('다중행, 하나의 열만 병합하려는 경우', () => {
        it('병합하는 행이 부족한 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 행보다 더 적은 행이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(2);
          expect(objValidateData.col).toEqual(2);

          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '%12:2,0%', '%collapsedCell%', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 행보다 더 적은 행이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(3);
          expect(objValidateData.col).toEqual(1);
        });

        it('병합하는 행이 많은 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '12', '%collapsedCell%', '14', '15'],
            ['16', '17', '%collapsedCell%', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 행보다 더 많은 행이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(3);
          expect(objValidateData.col).toEqual(2);

          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '%12:2,0%', '%collapsedCell%', '14', '15'],
            ['16', '%collapsedCell%', '18', '19', '20'],
            ['21', '%collapsedCell%', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 행보다 더 많은 행이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(4);
          expect(objValidateData.col).toEqual(1);
        });

        it('병합하는 행이 딱 맞는 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '12', '%collapsedCell%', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(true);

          objTBLCfg.data = [
            ['1', '2', '%3:3,0%', '4', '5'],
            ['6', '7', '%collapsedCell%', '9', '10'],
            ['11', '%12:2,0%', '%collapsedCell%', '14', '15'],
            ['16', '%collapsedCell%', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(true);
        });
      });

      describe('다중열, 하나의 행만 병합하려는 경우', () => {
        it('병합하는 열이 부족한 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:0,3%', '8', '9', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 열보다 더 적은 열이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(1);
          expect(objValidateData.col).toEqual(2);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '%22:0,4%', '%collapsedCell%', '24', '%collapsedCell%']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 열보다 더 적은 열이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(4);
          expect(objValidateData.col).toEqual(3);
        });

        it('병합하는 열이 많은 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:0,3%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 열보다 더 많은 열이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(1);
          expect(objValidateData.col).toEqual(4);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '%22:0,2%', '%collapsedCell%', '%collapsedCell%', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('병합할 열보다 더 많은 열이 병합돼있습니다.');
          expect(objValidateData.row).toEqual(4);
          expect(objValidateData.col).toEqual(3);
        });

        it('병합하는 열이 딱 맞는 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:0,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(true);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '%22:0,2%', '%collapsedCell%', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(true);
        });
      });

      describe('다중행, 다중열을 병합하려는 경우', () => {
        it('병합하는 셀이 부족한 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '13', '%collapsedCell%', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('해당 셀이 병합되지 않았습니다.');
          expect(objValidateData.row).toEqual(2);
          expect(objValidateData.col).toEqual(2);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '15'],
            ['16', '17', '18', '%19:2,2%', '20'],
            ['21', '22', '23', '%collapsedCell%', '%collapsedCell%']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('해당 셀이 병합되지 않았습니다.');
          expect(objValidateData.row).toEqual(3);
          expect(objValidateData.col).toEqual(4);
        });

        it('병합하는 셀이 많은 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '7', '8', '9', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '%18:2,2%', '%collapsedCell%', '20'],
            ['21', '22', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('해당 셀은 병합 대상이 아닙니다.');
          expect(objValidateData.row).toEqual(4);
          expect(objValidateData.col).toEqual(4);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
            ['16', '17', '%18:2,2%', '%collapsedCell%', '20'],
            ['21', '22', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('해당 셀은 병합 대상이 아닙니다.');
          expect(objValidateData.row).toEqual(2);
          expect(objValidateData.col).toEqual(4);
        });

        it('병합하는 셀이 딱 맞는 경우', () => {
          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '7', '8', '9', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '%18:2,2%', '%collapsedCell%', '20'],
            ['21', '22', '%collapsedCell%', '%collapsedCell%', '25']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(true);

          objTBLCfg.data = [
            ['1', '2', '3', '4', '5'],
            ['6', '%7:2,3%', '%collapsedCell%', '%collapsedCell%', '10'],
            ['11', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '15'],
            ['16', '17', '%18:2,2%', '%collapsedCell%', '20'],
            ['21', '22', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
          ];
          ValidateObjTBLCfg.validateData(objTBLCfg.data);
          objValidateData = ValidateObjTBLCfg.getObjValidateData();
          expect(objValidateData.isValid).toEqual(false);
          expect(objValidateData.err).toEqual('해당 셀은 병합 대상이 아닙니다.');
          expect(objValidateData.row).toEqual(4);
          expect(objValidateData.col).toEqual(4);
        });
      });

    });
  });
});