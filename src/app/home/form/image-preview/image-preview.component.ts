import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

  selectedImage: string | null = null;

  @Output() selectedFile = new EventEmitter<{
    base64: string;
    file: File;
  } | null>();


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
}
