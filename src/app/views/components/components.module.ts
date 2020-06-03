import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor/editor.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, CKEditorModule, FormsModule],
  exports: [EditorComponent],
})
export class ComponentsModule {}
