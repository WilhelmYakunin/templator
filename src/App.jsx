import { Component } from 'react';

import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const App = class App extends Component {
  render() {
    const generateDocument = () => {
      loadFile(
        'https://docxtemplater.com/ang-example.docx',
        function (error, content) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            parser: expressionParser,
          });
          doc.render({
            first_name: 'щщщщщ',
            last_name: 'аывывавыаыв',
            organization: {
              companyName: 'шШШШШШШ',
            },
            phone: '0652455478',
            description: 'New Website',
          });
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }); //Output the document using Data-URI
          saveAs(out, 'putput.docx');
        }
      );
    };

    return (
      <div className="p-2">
        <h1>Test templater</h1>
        <button onClick={generateDocument}>Generate document</button>
      </div>
    );
  }
};

export default App
