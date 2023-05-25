import { Component, inject } from '@angular/core';
import { Storage, uploadString } from '@angular/fire/storage';
import { ref } from 'firebase/storage';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public imageBefore: string | null = null;
  public imageAfter: string | null = null;

  private storage = inject(Storage)

  async uploadImages(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;

    if(!this.imageBefore || !this.imageAfter) return

    try {
      button.disabled = true;
      const result = await uploadString(ref(this.storage, 'before'), this.imageBefore)

    } finally {
      button.disabled = false;
    }

  }
}
