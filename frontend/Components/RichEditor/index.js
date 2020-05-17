import React, { Component } from 'react';
import {
  // Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
// import classnames from 'classnames';
import styles from './styles';

import Button from 'Components/Button';
// import BlockStyleControls from './BlockStyleControls';
// import InlineStyleControls from './InlineStyleControls';

import { Editor } from 'react-draft-wysiwyg';
import rdwStyles from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      const contentState = convertFromRaw(JSON.parse(value));
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  onEditorStateChange(editorState) {
    const { onChange } = this.props;
    this.setState({ editorState });

    // trigger on change converting the ContentState to raw object
    onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }
 
  render() {
    const {
      type,
      onSave,
      readOnly,
    } = this.props;

    let saveButtonLabel = '';
    if (type === 'newOpinion') saveButtonLabel = 'Reply';
    if (type === 'newDiscussion') saveButtonLabel = 'Post Discussion';

    let placeholder = '';
    if (type === 'newOpinion') placeholder = 'Your opinion...';
    if (type === 'newDiscussion') placeholder = 'Discussion summary...';
    let editorStyle = readOnly ? styles.rdwEditorMainRO: styles.rdwEditorMainRW
    let showToolbar = readOnly;
console.log("Styles are ", styles)
    return (
      <div>  
        <div>
          <Editor
          readOnly={readOnly}
          toolbarOnFocus={showToolbar}
          editorState={this.state.editorState}
          toolbarClassName={styles.rdwEditorToolbar}  
          wrapperClassName={styles.rdwEditorWrapper}
          editorClassName={editorStyle} 
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            options: ['inline'],
            inline: {
              inDropdown: false,
              className: styles.rdwInlineWrapper,
              dropdownClassName: styles.rdwInlineDropdown,
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
              bold: { className: styles.rdwOptionWrapper },
              italic: { className: styles.rdwOptionWrapper },
              underline: { className: styles.rdwOptionWrapper },
              strikethrough: { className: styles.rdwOptionWrapper },
              monospace: { className: styles.rdwOptionWrapper },
              superscript: { className: styles.rdwOptionWrapper },
              subscript: { className: styles.rdwOptionWrapper },
            },
            blockType: {
              className: styles.rdwBlockWrapper,
              dropdownClassName: styles.rdwBlockDropdown,
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
              className: styles.rdwFontsizeWrapper,
              dropdownClassName: styles.rdwFontsizeDropdown,
            },
            fontFamily: {
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
              className: styles.rdwFontfamilyWrapper,
              dropdownClassName: styles.rdwFontfamilyDropdown,
            },
            list: {
              inDropdown: false,
              className: styles.rdwListWrapper,
              dropdownClassName: styles.rdwListDropdown,
              options: ['unordered', 'ordered', 'indent', 'outdent'],
              unordered: { className: styles.rdwOptionWrapper },
              ordered: { className: styles.rdwOptionWrapper },
              indent: { className: styles.rdwOptionWrapper },
              outdent: { className: styles.rdwOptionWrapper },
            },
            textAlign: {
              inDropdown: false,
              className: styles.rdwTextAlignWrapper,
              dropdownClassName: styles.rdwTextAlignDropdown,
              options: ['left', 'center', 'right', 'justify'],
              left: { className: styles.rdwOptionWrapper },
              center: { className: styles.rdwOptionWrapper },
              right: { className: styles.rdwOptionWrapper },
              justify: { className: styles.rdwOptionWrapper },
            },
          
          }}          
        />
        </div>

        { !readOnly && <Button noUppercase type='primary' fullWidth onClick={onSave}>
          {saveButtonLabel}
        </Button> }
      </div>
    );
  }
}

RichEditor.defaultProps = {
  readOnly: false,
  value: null,
  type: 'newDiscussion',
  onChange: () => { },
  onSave: () => { },
};

RichEditor.propTypes = {
  readOnly: React.PropTypes.bool,
  value: React.PropTypes.any,
  type: React.PropTypes.oneOf(['newDiscussion', 'newOpinion']),
  onChange: React.PropTypes.func,
  onSave: React.PropTypes.func,
};

export default RichEditor;
