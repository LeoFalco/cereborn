import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Storage, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  private storage = inject(Storage);
  private auth = inject(Auth);

  private beforePlaceholder = 'https://s3.amazonaws.com/attachments.fieldcontrol.com.br/accounts/12/orders/8cc6163e-df45-43a3-898d-991b24121de2/tasks/aef29e03-1309-4457-9661-9c9d56a7c039/L_jrwVIWa.png'
  private afterPlaceholder = 'https://s3.amazonaws.com/attachments.fieldcontrol.com.br/accounts/12/orders/8cc6163e-df45-43a3-898d-991b24121de2/tasks/aef29e03-1309-4457-9661-9c9d56a7c039/wDRW5GNmM.png'

  public imageBefore: { file: File } | null = null;
  public imageAfter: { file: File } | null = null;

  public contentString = ""

  async uploadImages(event: MouseEvent) {
    if (!this.auth.currentUser) return;
    if (!this.imageBefore || !this.imageAfter) return;

    const button = event.target as HTMLButtonElement;
    try {
      button.disabled = true;
      button.innerText = 'Enviando...';

      const now = new Date().toISOString().replace('Z', '').replace(/\D/g, '');

      const beforeDownloadUrl = this.imageBefore
        ? await this.upload({
          file: this.imageBefore.file,
          path: `/users/${this.auth.currentUser?.uid}/images/${now}/before/${this.imageBefore.file.name}`,
        })
        : null;

      const afterDownloadUrl = this.imageAfter
        ? await this.upload({
          file: this.imageAfter.file,
          path: `/users/${this.auth.currentUser?.uid}/images/${now}/after/${this.imageAfter.file.name}`,
        })
        : null;

      this.contentString = stripIndent(`
        <table>
          <thead>
          <!-- Caso tenha alguma nomenclatura diferente da alteração, você pode modificar os textos abaixo para refletir seus dados. Ex: Tela nova -->
            <tr>
              <th colspan="2">Comparação da Entrega</th>
            </tr>
            <tr>
              <th>Antes</th>
              <!-- Antes -->
              <th>Depois</th>
              <!-- Depois -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <!-- Antes -->
                <img src="${beforeDownloadUrl || this.beforePlaceholder}" alt="Antes">
              </td>
              <td align="center">
                <!-- Depois -->
                <img src="${afterDownloadUrl || this.afterPlaceholder}" alt="Depois">
              </td>
            </tr>
          </tbody>
        </table>
      `)

    } finally {
      button.disabled = false;
      button.innerText = 'Enviar Imagens';
    }
  }

  async upload({ file, path }: { file: File; path: string }): Promise<string> {
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async copy(event: MouseEvent){

    const button = event.target as HTMLButtonElement;

    // copy to clipboard
    await navigator.clipboard.writeText(this.contentString);

    button.innerText = 'Copiado!';
    button.disabled = true;

    setTimeout(() => {
      button.innerText = 'Copiar';
      button.disabled = false;
    }, 1000)


  }
}

function stripIndent(template: string) {
  return template.split('\n').map((line) => line.replace('        ', '')).join('\n').trim();
}
