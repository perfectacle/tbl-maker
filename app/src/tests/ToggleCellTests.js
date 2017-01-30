describe('ToggleCell 클래스 - 배열의 y행, x열 좌표를 토대로 데이터를 추가, 삭제, 정렬하는 알고리즘', () => {
  let arr;

  describe('배열에 셀을 삽입하는 경우', () => {
    describe('빈 배열에 셀을 삽입하는 경우', ()=> {
      beforeEach(() => {
        arr = [];
      });

      it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 3);
        expect(arr).toEqual([
          [ [2, 3] ]
        ]);
      });

      it('rowspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 3, 2);
        expect(arr).toEqual([
          [ [2, 3] ],
          [ [3, 3] ]
        ]);
      });

      it('colspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 3, 0, 2);
        expect(arr).toEqual([
          [ [2, 3], [2, 4] ]
        ]);
      });

      it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 3, 2, 2);
        expect(arr).toEqual([
          [ [2, 3], [2, 4] ],
          [ [3, 3], [3, 4] ]
        ]);
      });
    });

    describe('비어있지 않은 배열에 셀을 삽입하는 경우', ()=> {
      beforeEach(() => {
        arr = [
          [ [5, 5], [5, 8] ],
          [ [10, 5], [10, 9] ]
        ];
      });

      describe('기존에 있는 데이터보다 더 아래에 존재하는 줄의 셀을 고른 경우', () => {
        it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
          ToggleCell.toggleCell(arr, 11, 3);
          expect(arr).toEqual([
            [ [5, 5], [5, 8] ],
            [ [10, 5], [10, 9] ],
            [ [11, 3] ]
          ]);
        });

        it('rowspan이 있는 셀을 선택한 경우', () => {
          ToggleCell.toggleCell(arr, 11, 3, 3);
          expect(arr).toEqual([
            [ [5, 5], [5, 8] ],
            [ [10, 5], [10, 9] ],
            [ [11, 3] ],
            [ [12, 3] ],
            [ [13, 3] ]
          ]);
        });

        it('colspan이 있는 셀을 선택한 경우', () => {
          ToggleCell.toggleCell(arr, 11, 3, 0, 3);
          expect(arr).toEqual([
            [ [5, 5], [5, 8] ],
            [ [10, 5], [10, 9] ],
            [ [11, 3] , [11, 4], [11, 5] ]
          ]);
        });

        it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
          ToggleCell.toggleCell(arr, 11, 3, 2, 3);
          expect(arr).toEqual([
            [ [5, 5], [5, 8] ],
            [ [10, 5], [10, 9] ],
            [ [11, 3] , [11, 4], [11, 5] ],
            [ [12, 3] , [12, 4], [12, 5] ]
          ]);
        });
      });

      describe('기존에 있는 데이터보다 더 위에 존재하는 줄의 셀을 고른 경우', () => {
        describe('기존에 있는 데이터와 겹치지 않는 경우', () => {
          it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3);
            expect(arr).toEqual([
              [ [3, 3] ],
              [ [5, 5], [5, 8] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('rowspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3, 2);
            expect(arr).toEqual([
              [ [3, 3] ],
              [ [4, 3] ],
              [ [5, 5], [5, 8] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3, 0, 2);
            expect(arr).toEqual([
              [ [3, 3], [3, 4] ],
              [ [5, 5], [5, 8] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3, 2, 2);
            expect(arr).toEqual([
              [ [3, 3], [3, 4] ],
              [ [4, 3], [4, 4] ],
              [ [5, 5], [5, 8] ],
              [ [10, 5], [10, 9] ]
            ]);
          });
        });

        describe('기존에 있는 데이터와 겹치는 경우', () => {
          it('rowspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3, 9);
            expect(arr).toEqual([
              [ [3, 3] ],
              [ [4, 3] ],
              [ [5, 3], [5, 5], [5, 8] ],
              [ [6, 3] ],
              [ [7, 3] ],
              [ [8, 3] ],
              [ [9, 3] ],
              [ [10, 3], [10, 5], [10, 9] ],
              [ [11, 3] ]
            ]);
          });

          it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 3, 3, 9, 2);
            expect(arr).toEqual([
              [ [3, 3], [3, 4] ],
              [ [4, 3], [4, 4] ],
              [ [5, 3], [5, 4], [5, 5], [5, 8] ],
              [ [6, 3], [6, 4] ],
              [ [7, 3], [7, 4] ],
              [ [8, 3], [8, 4] ],
              [ [9, 3], [9, 4] ],
              [ [10, 3], [10, 4], [10, 5], [10, 9] ],
              [ [11, 3], [11, 4] ]
            ]);
          });
        });
      });

      describe('기존에 있는 데이터보다 사이에 존재하는 줄의 셀을 고른 경우', () => {
        describe('기존에 있는 데이터와 겹치지 않는 경우', () => {
          it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 0);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 0] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('rowspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 0, 2);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 0] ],
              [ [8, 0] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 0, 0, 3);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 0], [7, 1], [7, 2] ],
              [ [10, 5], [10, 9] ]
            ]);
          });

          it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 0, 3, 3);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 0], [7, 1], [7, 2] ],
              [ [8, 0], [8, 1], [8, 2] ],
              [ [9, 0], [9, 1], [9, 2] ],
              [ [10, 5], [10, 9] ]
            ]);
          });
        });

        describe('기존에 있는 데이터와 겹치는 경우', () => {
          it('rowspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 3, 5);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 3] ],
              [ [8, 3] ],
              [ [9, 3] ],
              [ [10, 3], [10, 5], [10, 9] ],
              [ [11, 3] ]
            ]);
          });

          it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
            ToggleCell.toggleCell(arr, 7, 0, 5, 2);
            expect(arr).toEqual([
              [ [5, 5], [5, 8] ],
              [ [7, 0], [7, 1] ],
              [ [8, 0], [8, 1] ],
              [ [9, 0], [9, 1] ],
              [ [10, 0], [10, 1], [10, 5], [10, 9] ],
              [ [11, 0], [11, 1] ]
            ]);
          });
        });
      });
    });
  });

  describe('배열에서 셀을 제거하는 경우', () => {
    describe('삭제 후에도 배열에 데이터가 존재하는 경우', () => {
      beforeEach(() => {
        arr = [
          [ [2, 3], [2, 4], [2, 5] ],
          [ [3, 3], [3, 4], [3, 5] ]
        ];
      });

      it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 4);
        expect(arr).toEqual([
          [ [2, 3], [2, 5] ],
          [ [3, 3], [3, 4], [3, 5] ]
        ]);
      });

      it('rowspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 4, 2);
        expect(arr).toEqual([
          [ [2, 3], [2, 5] ],
          [ [3, 3], [3, 5] ]
        ]);
      });

      it('colspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 4, 0, 2);
        expect(arr).toEqual([
          [ [2, 3] ],
          [ [3, 3], [3, 4], [3, 5] ]
        ]);
      });
      it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
        ToggleCell.toggleCell(arr, 2, 4, 2, 2);
        expect(arr).toEqual([
          [ [2, 3] ],
          [ [3, 3] ]
        ]);
      });
    });

    describe('삭제 후에 배열에 데이터가 들어있지 않는 경우', () => {
      it('rowspan, colspan이 하나도 없는 셀을 선택한 경우', () => {
        arr = [
          [ [2, 3] ]
        ];
        ToggleCell.toggleCell(arr, 2, 3);
        expect(arr).toEqual([]);
      });

      it('rowspan이 있는 셀을 선택한 경우', () => {
        arr = [
          [ [2, 3] ],
          [ [3, 3] ]
        ];
        ToggleCell.toggleCell(arr, 2, 3, 2);
        expect(arr).toEqual([]);
      });

      it('colspan이 있는 셀을 선택한 경우', () => {
        arr = [
          [ [2, 3], [2, 4] ]
        ];
        ToggleCell.toggleCell(arr, 2, 3, 0, 2);
        expect(arr).toEqual([]);
      });
      it('rowspan, colspan이 있는 셀을 선택한 경우', () => {
        arr = [
          [ [2, 3], [2, 4] ],
          [ [3, 3], [3, 4] ]
        ];
        ToggleCell.toggleCell(arr, 2, 3, 2, 2);
        expect(arr).toEqual([]);
      });
    });
  });
});