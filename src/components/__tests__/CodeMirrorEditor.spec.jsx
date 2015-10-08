import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils'
import { expect } from 'chai';

import CodeMirrorEditor from '../CodeMirrorEditor';

describe(__filename, function () {

  context('render in normal mode', ()=> {

    let codeMirrorEditor;

    beforeEach(()=> {
      codeMirrorEditor = TestUtils.renderIntoDocument(
        <CodeMirrorEditor codeText='let a;'/>
      )
    });

    it('should initial a code mirror editor', function () {

      expect(codeMirrorEditor._editor).to.exist;
      expect(codeMirrorEditor.refs.editor).to.exist;

    });

  });

  context('render in mobile', ()=> {

    let codeMirrorEditor;

    beforeEach(()=> {
      codeMirrorEditor = TestUtils.renderIntoDocument(
        <CodeMirrorEditor codeText='let a;'
                          isMobile/>
      );
    });

    it('should not initial a code mirror editor', function () {

      expect(codeMirrorEditor._editor).to.not.exist;
      expect(codeMirrorEditor.refs.editor).to.not.exist;

    });

  });
});

