import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
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
  private auth = inject(Auth)


  async uploadImages(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;

    if (!this.auth.currentUser) return

    if (!this.imageBefore || !this.imageAfter) return

    try {
      button.disabled = true;
      if (this.imageBefore) {
        const result = await uploadString(ref(this.storage, `/users/${this.auth.currentUser?.uid}/before`), this.imageBefore)
        console.log('result', result)
      }

      if (this.imageAfter) {
        const result = await uploadString(ref(this.storage, `/users/${this.auth.currentUser?.uid}/after`), this.imageAfter)
        console.log('result', result)

      }

    } finally {
      button.disabled = false;
    }

  }
}
