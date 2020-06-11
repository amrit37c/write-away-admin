import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"],
})
export class EditorComponent implements OnInit {
  public Editor = ClassicEditor;
  toolbar = [
    ["Source", "-", "NewPage", "Preview", "-", "Templates"],
    [
      "Cut",
      "Copy",
      "Paste",
      "PasteText",
      "PasteFromWord",
      "-",
      "Undo",
      "Redo",
      "SelectAll",
    ],
    "/",
    // ["Bold", "Italic", "styles"],
  ];

  tb = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "undo",
      "redo",
      "|",
      "bulletedList",
      "numberedList",
      "link",
      "alignMent",
      // "right",
    ],
  };
  tb1 = {
    toolbarGroups: [
      { name: "document", groups: ["document", "mode", "doctools"] },
      { name: "clipboard", groups: ["clipboard", "undo"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "forms", groups: ["forms"] },
      "/",
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      {
        name: "paragraph",
        groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
      },
      { name: "links", groups: ["links"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "styles", groups: ["styles"] },
      { name: "colors", groups: ["colors"] },
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
  };

  content: any;

  @Input() data;

  @Output() editorContent = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.content = this.data;
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.editorContent.emit(data);
  }
}
