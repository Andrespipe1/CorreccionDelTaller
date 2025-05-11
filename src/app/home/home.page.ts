import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonToast,IonDatetime } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonToast,IonDatetime]
})
export class HomePage {
  private firestore: Firestore = inject(Firestore);
  private fb = inject(FormBuilder);

  eventForm = this.fb.group({
    nombre: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    sexo: ['', Validators.required],
    location: ['', Validators.required],
    brothers: [0, [Validators.required, Validators.min(1)]],
    topics: [[], Validators.required],
    estudios: [false]
  });

  showSuccessToast = false;

  constructor() {
    addIcons({});
  }

  async submitForm() {
    if (this.eventForm.valid) {
      try {
        const eventData = this.eventForm.value;
        // Convertir la fecha a formato ISO para Firebase
        if (eventData.date) {
          eventData.date = new Date(eventData.date).toISOString();
        }
        
        // Guardar en Firebase
        const docRef = await addDoc(collection(this.firestore, 'users'), eventData);
        console.log('Document written with ID: ', docRef.id);
        
        // Mostrar mensaje de éxito
        this.showSuccessToast = true;
        
        // Resetear el formulario
        this.eventForm.reset();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  }
}