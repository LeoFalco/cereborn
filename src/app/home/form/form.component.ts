import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public imageBefore: { base64: string, file: File } | null = null;
  public imageAfter: { base64: string, file: File } | null = null;

  private storage = inject(Storage)
  private auth = inject(Auth)


  async uploadImages(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;

    if (!this.auth.currentUser) return

    if (!this.imageBefore || !this.imageAfter) return

    const now = new Date().toISOString().replace('Z', '').replace(/\D/g, '')

    try {
      button.disabled = true;
      if (this.imageBefore) {

        const storageRef = ref(this.storage, `/users/${this.auth.currentUser?.uid}/images/${now}/before/${this.imageBefore.file.name}`)
        await uploadBytes(storageRef, this.imageBefore.file)
        const downloadUrl = await getDownloadURL(storageRef)
        console.log('downloadUrl', downloadUrl)
      }

      if (this.imageAfter) {
        const storageRef = ref(this.storage, `/users/${this.auth.currentUser?.uid}/images/${now}/after/${this.imageAfter.file.name}`)
        await uploadBytes(storageRef, this.imageAfter.file)
        const downloadUrl = await getDownloadURL(storageRef)
        console.log('downloadUrl', downloadUrl)

      }


    } finally {
      button.disabled = false;
    }

  }
}
