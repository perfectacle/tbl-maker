describe('TemplateTable 클래스 - 테이블 정보를 갖고 HTML 태그를 만드는 클래스', () => {
  let objTBLCfg, html;

  it('테이블을 새로 만들 때 샘플 데이터를 만드는 경우', () => {
    objTBLCfg = {
      caption: '',
      headRow: false,
      headCol: false,
      data   : []
    };
    TemplateTable.generateData(objTBLCfg, 3, 3);

    expect(objTBLCfg.data).toEqual([
      ['sample1', 'sample2', 'sample3'],
      ['sample4', 'sample5', 'sample6'],
      ['sample7', 'sample8', 'sample9']
    ]);
  });

  describe('병합된 셀이 없는 경우', () => {
    beforeEach(() => {
      objTBLCfg = {
        caption: '',
        headRow: false,
        headCol: false,
        data   : [
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5', 'sample6', 'sample7'],
          ['sample8', 'sample9', 'sample10', 'sample11', 'sample12', 'sample13', 'sample14'],
          ['sample15', 'sample16', 'sample17', 'sample18', 'sample19', 'sample20', 'sample21'],
          ['sample22', 'sample23', 'sample24', 'sample25', 'sample26', 'sample27', 'sample28'],
          ['sample29', 'sample30', 'sample31', 'sample32', 'sample33', 'sample34', 'sample35'],
          ['sample36', 'sample37', 'sample38', 'sample39', 'sample40', 'sample41', 'sample42'],
          ['sample43', 'sample44', 'sample45', 'sample46', 'sample47', 'sample48', 'sample49']
        ]
      };
    });

    describe('제목 행과 열이 설정되지 않은 경우', () => {
      it('캡션에 값이 없는 경우', () => {
        TemplateTable.generateTemplate(objTBLCfg);
        html = TemplateTable.getTemplate();

        expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
      <td data-idx-row="0" data-idx-col="5">sample6</td>
      <td data-idx-row="0" data-idx-col="6">sample7</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample8</td>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample15</td>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample22</td>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample29</td>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <td data-idx-row="5" data-idx-col="0">sample36</td>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <td data-idx-row="6" data-idx-col="0">sample43</td>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
        );
      });

      it('캡션에 값이 있는 경우', () => {
        objTBLCfg.caption = 'test';
        TemplateTable.generateTemplate(objTBLCfg);
        html = TemplateTable.getTemplate();

        expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
      <td data-idx-row="0" data-idx-col="5">sample6</td>
      <td data-idx-row="0" data-idx-col="6">sample7</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample8</td>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample15</td>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample22</td>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample29</td>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <td data-idx-row="5" data-idx-col="0">sample36</td>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <td data-idx-row="6" data-idx-col="0">sample43</td>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
        );
      });
    });

    describe('제목 행 또는 열이 설정된 경우', () => {
      describe('제목 행만 설정된 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          objTBLCfg.headRow = true;
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
      <th scope="col" data-idx-row="0" data-idx-col="5">sample6</th>
      <th scope="col" data-idx-row="0" data-idx-col="6">sample7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample8</td>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample15</td>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample22</td>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample29</td>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <td data-idx-row="5" data-idx-col="0">sample36</td>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <td data-idx-row="6" data-idx-col="0">sample43</td>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.headRow = true;
          objTBLCfg.caption = 'test';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
      <th scope="col" data-idx-row="0" data-idx-col="5">sample6</th>
      <th scope="col" data-idx-row="0" data-idx-col="6">sample7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample8</td>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample15</td>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample22</td>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample29</td>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <td data-idx-row="5" data-idx-col="0">sample36</td>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <td data-idx-row="6" data-idx-col="0">sample43</td>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });
      });

      describe('제목 열만 설정된 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          objTBLCfg.headCol = true;
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
      <td data-idx-row="0" data-idx-col="5">sample6</td>
      <td data-idx-row="0" data-idx-col="6">sample7</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample8</th>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample15</th>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample22</th>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample29</th>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="5" data-idx-col="0">sample36</th>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="6" data-idx-col="0">sample43</th>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.headCol = true;
          objTBLCfg.caption = 'test';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
      <td data-idx-row="0" data-idx-col="5">sample6</td>
      <td data-idx-row="0" data-idx-col="6">sample7</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample8</th>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample15</th>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample22</th>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample29</th>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="5" data-idx-col="0">sample36</th>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="6" data-idx-col="0">sample43</th>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });
      });

      describe('제목 행과 열 모두 설정된 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          objTBLCfg.headRow = true;
          objTBLCfg.headCol = true;
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
      <th scope="col" data-idx-row="0" data-idx-col="5">sample6</th>
      <th scope="col" data-idx-row="0" data-idx-col="6">sample7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample8</th>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample15</th>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample22</th>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample29</th>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="5" data-idx-col="0">sample36</th>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="6" data-idx-col="0">sample43</th>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.headRow = true;
          objTBLCfg.headCol = true;
          objTBLCfg.caption = 'test';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
      <th scope="col" data-idx-row="0" data-idx-col="5">sample6</th>
      <th scope="col" data-idx-row="0" data-idx-col="6">sample7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample8</th>
      <td data-idx-row="1" data-idx-col="1">sample9</td>
      <td data-idx-row="1" data-idx-col="2">sample10</td>
      <td data-idx-row="1" data-idx-col="3">sample11</td>
      <td data-idx-row="1" data-idx-col="4">sample12</td>
      <td data-idx-row="1" data-idx-col="5">sample13</td>
      <td data-idx-row="1" data-idx-col="6">sample14</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample15</th>
      <td data-idx-row="2" data-idx-col="1">sample16</td>
      <td data-idx-row="2" data-idx-col="2">sample17</td>
      <td data-idx-row="2" data-idx-col="3">sample18</td>
      <td data-idx-row="2" data-idx-col="4">sample19</td>
      <td data-idx-row="2" data-idx-col="5">sample20</td>
      <td data-idx-row="2" data-idx-col="6">sample21</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample22</th>
      <td data-idx-row="3" data-idx-col="1">sample23</td>
      <td data-idx-row="3" data-idx-col="2">sample24</td>
      <td data-idx-row="3" data-idx-col="3">sample25</td>
      <td data-idx-row="3" data-idx-col="4">sample26</td>
      <td data-idx-row="3" data-idx-col="5">sample27</td>
      <td data-idx-row="3" data-idx-col="6">sample28</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample29</th>
      <td data-idx-row="4" data-idx-col="1">sample30</td>
      <td data-idx-row="4" data-idx-col="2">sample31</td>
      <td data-idx-row="4" data-idx-col="3">sample32</td>
      <td data-idx-row="4" data-idx-col="4">sample33</td>
      <td data-idx-row="4" data-idx-col="5">sample34</td>
      <td data-idx-row="4" data-idx-col="6">sample35</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="5" data-idx-col="0">sample36</th>
      <td data-idx-row="5" data-idx-col="1">sample37</td>
      <td data-idx-row="5" data-idx-col="2">sample38</td>
      <td data-idx-row="5" data-idx-col="3">sample39</td>
      <td data-idx-row="5" data-idx-col="4">sample40</td>
      <td data-idx-row="5" data-idx-col="5">sample41</td>
      <td data-idx-row="5" data-idx-col="6">sample42</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="6" data-idx-col="0">sample43</th>
      <td data-idx-row="6" data-idx-col="1">sample44</td>
      <td data-idx-row="6" data-idx-col="2">sample45</td>
      <td data-idx-row="6" data-idx-col="3">sample46</td>
      <td data-idx-row="6" data-idx-col="4">sample47</td>
      <td data-idx-row="6" data-idx-col="5">sample48</td>
      <td data-idx-row="6" data-idx-col="6">sample49</td>
    </tr>
  </tbody>
</table>`
          );
        });
      });
    });
  });

  describe('병합된 셀이 있는 경우', () => {
    beforeEach(() => {
      objTBLCfg = {
        caption: '',
        headRow: false,
        headCol: false,
        data   : []
      };
    });

    describe('병합된 행만 있는 경우', () => {
      beforeEach(() => {
        objTBLCfg.data = [
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5'],
          ['sample6', 'sample7', 'sample8', 'sample9', 'sample10'],
          ['sample11', 'sample12', '%sample13:2,0%', 'sample14', 'sample15'],
          ['sample16', 'sample17', '%collapsedCell%', 'sample19', 'sample20'],
          ['sample21', 'sample22', 'sample23', 'sample24', 'sample25']
        ];
      });
      describe('제목 행과 열이 설정되지 않은 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.caption = 'test';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
        });
      });

      describe('제목 행 또는 열이 설정된 경우', () => {
        describe('제목 행만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headRow = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 열만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headCol = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headCol = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 행과 열 모두 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headCol = true;
            objTBLCfg.headRow = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headCol = true;
            objTBLCfg.headRow = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2" rowspan="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });
      });
    });

    describe('병합된 열만 있는 경우', () => {
      beforeEach(() => {
        objTBLCfg.data = [
          ['%sample1:0,3%', '%collapsedCell%', '%collapsedCell%', 'sample4', 'sample5'],
          ['sample6', 'sample7', 'sample8', 'sample9', 'sample10'],
          ['sample11', 'sample12', 'sample13', 'sample14', 'sample15'],
          ['sample16', 'sample17', 'sample18', 'sample19', 'sample20'],
          ['sample21', 'sample22', 'sample23', 'sample24', 'sample25']
        ];
      });

      describe('제목 행과 열이 설정되지 않은 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0" colspan="3">sample1</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.caption = 'test2';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test2</caption>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0" colspan="3">sample1</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
        });
      });

      describe('제목 행 또는 열이 설정된 경우', () => {
        describe('제목 행만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headRow = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0">sample6</td>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <td data-idx-row="2" data-idx-col="0">sample11</td>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <td data-idx-row="3" data-idx-col="0">sample16</td>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <td data-idx-row="4" data-idx-col="0">sample21</td>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 열만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headCol = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headCol = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 행과 열 모두 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.headCol = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.headCol = true;
            objTBLCfg.caption = 'test';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>test</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0" colspan="3">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0">sample6</th>
      <td data-idx-row="1" data-idx-col="1">sample7</td>
      <td data-idx-row="1" data-idx-col="2">sample8</td>
      <td data-idx-row="1" data-idx-col="3">sample9</td>
      <td data-idx-row="1" data-idx-col="4">sample10</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="2" data-idx-col="0">sample11</th>
      <td data-idx-row="2" data-idx-col="1">sample12</td>
      <td data-idx-row="2" data-idx-col="2">sample13</td>
      <td data-idx-row="2" data-idx-col="3">sample14</td>
      <td data-idx-row="2" data-idx-col="4">sample15</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="3" data-idx-col="0">sample16</th>
      <td data-idx-row="3" data-idx-col="1">sample17</td>
      <td data-idx-row="3" data-idx-col="2">sample18</td>
      <td data-idx-row="3" data-idx-col="3">sample19</td>
      <td data-idx-row="3" data-idx-col="4">sample20</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="4" data-idx-col="0">sample21</th>
      <td data-idx-row="4" data-idx-col="1">sample22</td>
      <td data-idx-row="4" data-idx-col="2">sample23</td>
      <td data-idx-row="4" data-idx-col="3">sample24</td>
      <td data-idx-row="4" data-idx-col="4">sample25</td>
    </tr>
  </tbody>
</table>`);
          });
        });
      });
    });

    describe('병합된 행과 열 모두 있는 경우', () => {
      beforeEach(() => {
        objTBLCfg.data = [
          ['sample1', 'sample2', 'sample3', 'sample4', 'sample5'],
          ['%sample6:0,5%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%', '%collapsedCell%']
        ];
      });
      describe('제목 행과 열이 설정되지 않은 경우', () => {
        it('캡션에 값이 없는 경우', () => {
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0" colspan="5">sample6</td>
    </tr>
  </tbody>
</table>`);
        });

        it('캡션에 값이 있는 경우', () => {
          objTBLCfg.caption = 'test';
          TemplateTable.generateTemplate(objTBLCfg);
          html = TemplateTable.getTemplate();

          expect(html).toEqual(
`<table>
  <caption>test</caption>
  <tbody>
    <tr>
      <td data-idx-row="0" data-idx-col="0">sample1</td>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <td data-idx-row="1" data-idx-col="0" colspan="5">sample6</td>
    </tr>
  </tbody>
</table>`);
        });
      });

      describe('제목 행 또는 열이 설정된 경우', () => {
        describe('제목 행만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headRow = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0" colspan="5">sample6</td>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.caption = 'tests';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>tests</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-idx-row="1" data-idx-col="0" colspan="5">sample6</td>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 열만 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headCol = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0" colspan="5">sample6</th>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headCol = true;
            objTBLCfg.caption = 'tt';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>tt</caption>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="0" data-idx-col="0">sample1</th>
      <td data-idx-row="0" data-idx-col="1">sample2</td>
      <td data-idx-row="0" data-idx-col="2">sample3</td>
      <td data-idx-row="0" data-idx-col="3">sample4</td>
      <td data-idx-row="0" data-idx-col="4">sample5</td>
    </tr>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0" colspan="5">sample6</th>
    </tr>
  </tbody>
</table>`);
          });
        });

        describe('제목 행과 열 모두 설정된 경우', () => {
          it('캡션에 값이 없는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.headCol = true;
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0" colspan="5">sample6</th>
    </tr>
  </tbody>
</table>`);
          });

          it('캡션에 값이 있는 경우', () => {
            objTBLCfg.headRow = true;
            objTBLCfg.headCol = true;
            objTBLCfg.caption = 'asdf';
            TemplateTable.generateTemplate(objTBLCfg);
            html = TemplateTable.getTemplate();

            expect(html).toEqual(
`<table>
  <caption>asdf</caption>
  <thead>
    <tr>
      <th scope="col" data-idx-row="0" data-idx-col="0">sample1</th>
      <th scope="col" data-idx-row="0" data-idx-col="1">sample2</th>
      <th scope="col" data-idx-row="0" data-idx-col="2">sample3</th>
      <th scope="col" data-idx-row="0" data-idx-col="3">sample4</th>
      <th scope="col" data-idx-row="0" data-idx-col="4">sample5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" data-idx-row="1" data-idx-col="0" colspan="5">sample6</th>
    </tr>
  </tbody>
</table>`);
          });
        });
      });
    });
  });
});