import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  selectedImage: string | null = null;

  @Input() type: 'before' | 'after' = 'before';

  @Output() selectedFile = new EventEmitter<{
    base64: string;
    file: File;
  } | null>();

  previewByType = {
    before: 'https://s3.amazonaws.com/attachments.fieldcontrol.com.br/accounts/12/orders/8cc6163e-df45-43a3-898d-991b24121de2/tasks/aef29e03-1309-4457-9661-9c9d56a7c039/L_jrwVIWa.png',
    after:  'https://s3.amazonaws.com/attachments.fieldcontrol.com.br/accounts/12/orders/8cc6163e-df45-43a3-898d-991b24121de2/tasks/aef29e03-1309-4457-9661-9c9d56a7c039/wDRW5GNmM.png'
  }

  previewImage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.selectedFile.emit({
          base64: this.selectedImage,
          file: file
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = null;
      this.selectedFile.emit(this.selectedImage || null);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('file-input-' + this.type) as HTMLElement;
    fileInput.click();
  }
}
