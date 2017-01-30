describe('CollapseCell 클래스 - 선택한 셀을 가지고 테이블 데이터에 반영하는 클래스', ()=> {
  let arrSelected, arrTBLData, colspan, rowspan;

  describe('isRectangle(), 배열이 사각형인지, 병합이 가능한지', () => {
    describe('배열의 행과 열의 길이가 다른 경우', () => {
      describe('다중 행, 다중 열인 경우', () => {
        it('열의 길이가 다른 경우', () => {
          arrSelected = [
            [ [2, 2], [2, 3], [2, 4] ],
            [ [3, 2], [3, 3] ],
            [ [4, 2] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
        });

        describe('열의 길이가 같은 경우', () => {
          it('중간에 행이 끊어진 경우', () => {
            arrSelected = [
              [ [2, 2], [2, 3], [2, 4] ],

              [ [4, 2], [4, 3], [4, 4] ]
            ];
            expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
          });

          it('중간에 열이 끊어진 경우', () => {
            arrSelected = [
              [ [2, 2], [2, 3], [2, 4]        ],
              [ [3, 2], [3, 3],        [3, 5] ]
            ];
            expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
          });

          it('행과 열 모두 연속된 경우', () => {
            arrSelected = [
              [ [2, 2], [2, 3], [2, 4] ],
              [ [3, 2], [3, 3], [3, 4] ]
            ];
            expect(CollapseCell.isRectangle(arrSelected)).toBeTruthy();
          });
        });
      });

      describe('다중 행, 하나의 열인 경우', () => {
        it('중간에 행이 끊어진 경우', () => {
          arrSelected = [
            [ [2, 4] ],
            [ [3, 4] ],

            [ [5, 4] ],
            [ [6, 4] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
        });

        it('대각선으로 선택한 경우', () => {
          arrSelected = [
            [ [1, 4]        ],
            [ [2, 4]        ],
            [        [3, 5] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
        });

        it('행이 연속된 경우', () => {
          arrSelected = [
            [ [3, 4] ],
            [ [4, 4] ],
            [ [5, 4] ],
            [ [6, 4] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeTruthy();
        });
      });

      describe('하나의 행, 다중 열인 경우', () => {
        it('중간에 열이 끊어진 경우', () => {
          arrSelected = [
            [ [7, 7], [7, 8],      [7, 10] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
        });

        it('열이 연속된 경우', () => {
          arrSelected = [
            [ [7, 7], [7, 8], [7, 9] ,[7, 10] ]
          ];
          expect(CollapseCell.isRectangle(arrSelected)).toBeTruthy();
        });
      });
    });

    describe('배열의 행과 열의 길이가 같은 경우', () => {
      it('배열에 1x1의 크기만 담겨있는 경우', () => {
        arrSelected = [
          [ [1, 3] ]
        ];
        expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
      });

      it('중간에 행이 끊어진 경우', () => {
        arrSelected = [
          [ [2, 2], [2, 3], [2, 4] ],

          [ [4, 2], [4, 3], [4, 4] ],
          [ [5, 2], [5, 3], [5, 4] ]
        ];
        expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
      });

      it('중간에 열이 끊어진 경우', () => {
        arrSelected = [
          [ [3, 2], [3, 3],         [3, 5] ],
          [ [4, 2], [4, 3], [4, 4]         ],
          [ [5, 2], [5, 3], [5, 4]         ]
        ];
        expect(CollapseCell.isRectangle(arrSelected)).toBeFalsy();
      });

      it('행과 열 모두 연속된 경우', () => {
        arrSelected = [
          [ [3, 2], [3, 3], [3, 4] ],
          [ [4, 2], [4, 3], [4, 4] ],
          [ [5, 2], [5, 3], [5, 4] ]
        ];
        expect(CollapseCell.isRectangle(arrSelected)).toBeTruthy();
      });
    });
  });

  describe('collapseCell(), 선택된 셀을 토대로 실제 테이블 데이터 병합하기', () => {
    describe('아직 병합된 셀이 하나도 없는 경우', () => {
      beforeEach(() => {
        arrTBLData = [ // 5행 6열로 초기화
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
          ['sample7', 'sample8', 'sample9', 'sample10', 'sample11', 'sample12'],
          ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
          ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
          ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
        ];
      });

      it('다중행, 하나의 열만 병합할 경우', () => {
        arrSelected = [
          [ [2, 3] ],
          [ [3, 3] ],
          [ [4, 3] ]
        ];
        colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
        rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
        CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

        expect(arrTBLData).toEqual([
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
          ['sample7', 'sample8', 'sample9', 'sample10', 'sample11', 'sample12'],
          ['sample13', 'sample14', 'sample15', '%sample16:3,0%', 'sample17', 'sample18'],
          ['sample19', 'sample20', 'sample21', '%collapsedCell%', 'sample23', 'sample24'],
          ['sample25', 'sample26', 'sample27', '%collapsedCell%', 'sample29', 'sample30']
        ]);
      });

      it('하나의 행, 다중열만 병합할 경우', () => {
        arrSelected = [
          [ [3, 3], [3, 4], [3, 5] ],
        ];
        colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
        rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
        CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

        expect(arrTBLData).toEqual([
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
          ['sample7', 'sample8', 'sample9', 'sample10', 'sample11', 'sample12'],
          ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
          ['sample19', 'sample20', 'sample21', '%sample22:0,3%', '%collapsedCell%', '%collapsedCell%'],
          ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
        ]);
      });

      it('다중행, 다중열을 병합할 경우', () => {
        arrSelected = [
          [ [2, 3], [2, 4], [2, 5] ],
          [ [3, 3], [3, 4], [3, 5] ],
          [ [4, 3], [4, 4], [4, 5] ]
        ];
        colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
        rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
        CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

        expect(arrTBLData).toEqual([
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
          ['sample7', 'sample8', 'sample9', 'sample10', 'sample11', 'sample12'],
          ['sample13', 'sample14', 'sample15', '%sample16:3,3%', '%collapsedCell%', '%collapsedCell%'],
          ['sample19', 'sample20', 'sample21', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
          ['sample25', 'sample26', 'sample27', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
        ]);
      });
    });

    describe('병합된 셀이 있는 경우', () => {
      describe('기존에 병합한 셀과 겹치지 않는 경우', () => {
        beforeEach(() => {
          arrTBLData = [ // 5행 6열로 초기화
            ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
            ['sample7', 'sample8', '%sample9:2,2%', '%collapsedCell%', 'sample11', 'sample12'],
            ['sample13', 'sample14', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
            ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
            ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
          ];
        });

        it('다중행, 하나의 열만 병합할 경우', () => {
          arrSelected = [
            [ [1, 1] ],
            [ [2, 1] ],
            [ [3, 1] ]
          ];
          colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
          rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
          CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

          expect(arrTBLData).toEqual([
            ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
            ['sample7', '%sample8:3,0%', '%sample9:2,2%', '%collapsedCell%', 'sample11', 'sample12'],
            ['sample13', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
            ['sample19', '%collapsedCell%', 'sample21', 'sample22', 'sample23', 'sample24'],
            ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
          ]);
        });

        it('다중열, 하나의 행만 병합할 경우', () => {
          arrSelected = [
            [ [4, 1], [4, 2], [4, 3] ],
          ];
          colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
          rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
          CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

          expect(arrTBLData).toEqual([
            ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
            ['sample7', 'sample8', '%sample9:2,2%', '%collapsedCell%', 'sample11', 'sample12'],
            ['sample13', 'sample14', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
            ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
            ['sample25', '%sample26:0,3%', '%collapsedCell%', '%collapsedCell%', 'sample29', 'sample30']
          ]);
        });

        it('다중행, 다중열을 병합할 경우', () => {
          arrSelected = [
            [ [0, 0], [0, 1] ],
            [ [1, 0], [1, 1] ]
          ];
          colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
          rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
          CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

          expect(arrTBLData).toEqual([
            ['%sample1:2,2%', '%collapsedCell%', 'sample3', 'sample4', 'sample5', 'sample6'],
            ['%collapsedCell%', '%collapsedCell%', '%sample9:2,2%', '%collapsedCell%', 'sample11', 'sample12'],
            ['sample13', 'sample14', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
            ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
            ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
          ]);
        });
      });
      describe('기존에 병합한 셀과 겹치는 경우', () => {
        describe('기존에 병합했던 셀에서 시작하는 경우', () => {
          it('다중행, 하나의 열만 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:2,0%', 'sample10', 'sample11', 'sample12'],
              ['sample13', 'sample14', '%collapsedCell%', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [1, 2] ],
              [ [2, 2] ],
              [ [3, 2] ]
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

            expect(arrTBLData).toEqual([
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:3,0%', 'sample10', 'sample11', 'sample12'],
              ['sample13', 'sample14', '%collapsedCell%', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', '%collapsedCell%', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ]);
          });

          it('다중열, 하나의 행만 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:0,2%', '%collapsedCell%', 'sample11', 'sample12'],
              ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [1, 2], [1, 3], [1, 4] ]
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

            expect(arrTBLData).toEqual([
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:0,3%', '%collapsedCell%', '%collapsedCell%', 'sample12'],
              ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ]);
          });

          it('다중행, 다중열을 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:3,2%', '%collapsedCell%', 'sample11', 'sample12'],
              ['sample13', 'sample14', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
              ['sample19', 'sample20', '%collapsedCell%', '%collapsedCell%', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [1, 2], [1, 3], [1, 4], [1, 5] ],
              [ [2, 2], [2, 3], [2, 4], [2, 5] ],
              [ [3, 2], [3, 3], [3, 4], [3, 5] ],
              [ [4, 2], [4, 3], [4, 4], [4, 5] ],
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

            expect(arrTBLData).toEqual([
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:4,4%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
              ['sample13', 'sample14', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
              ['sample19', 'sample20', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
              ['sample25', 'sample26', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
            ]);
          });
        });

        describe('기존에 병합했던 셀 이전에 시작하는 경우', () => {
          it('다중행, 하나의 열만 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%sample9:2,0%', 'sample10', 'sample11', 'sample12'],
              ['sample13', 'sample14', '%collapsedCell%', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [0, 2] ],
              [ [1, 2] ],
              [ [2, 2 ] ]
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

            expect(arrTBLData).toEqual([
              ['sample1', 'sample2', '%sample3:3,0%', 'sample4', 'sample5', 'sample6'],
              ['sample7', 'sample8', '%collapsedCell%', 'sample10', 'sample11', 'sample12'],
              ['sample13', 'sample14', '%collapsedCell%', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ]);
          });

          it('다중열, 하나의 행만 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', '%sample8:0,3%', '%collapsedCell%', '%collapsedCell%', 'sample11', 'sample12'],
              ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5] ]
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);

            expect(arrTBLData).toEqual([
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['%sample7:0,6%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
              ['sample13', 'sample14', 'sample15', 'sample16', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ]);
          });

          it('다중행, 다중열을 병합할 경우', () => {
            arrTBLData = [ // 5행 6열로 초기화
              ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6'],
              ['sample7', '%sample8:2,3%', '%collapsedCell%', '%collapsedCell%', 'sample11', 'sample12'],
              ['sample13', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', 'sample17', 'sample18'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ];
            arrSelected = [
              [ [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5] ],
              [ [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5] ],
              [ [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5] ]
            ];
            colspan = arrSelected[0].length > 1 ? arrSelected[0].length : 0;
            rowspan = arrSelected.length > 1 ? arrSelected.length : 0;
            CollapseCell.collapseCell(arrTBLData, arrSelected, colspan, rowspan);
            expect(arrTBLData).toEqual([
              ['%sample1:0,6%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%'],
              ['sample19', 'sample20', 'sample21', 'sample22', 'sample23', 'sample24'],
              ['sample25', 'sample26', 'sample27', 'sample28', 'sample29', 'sample30']
            ]);
          });
        });
      });
    });
  });
});