import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  })
export class AppComponent {
  
  testimonials = [
    { img: 'assets/img/testimonials/cc4.jpeg', name: 'Christian Cuero', title: 'Mg. en Traducción e Interpretación, Profesor', review: 'Mi experiencia en la Academia Cross Way Center fue muy positiva. Comencé a estudiar desde los trece años, pasando por todos los niveles hasta los avanzados, lo que me permitió ingresar a la licenciatura en lenguas extranjeras con un buen dominio del inglés. Esto me dio la oportunidad de enfocarme en el francés y otras materias, logrando destacarme en la carrera, incluso ocupando el primer puesto. Además, tuve la suerte de enseñar en la Academia desde los primeros semestres, lo que me permitió aplicar lo aprendido y ganar experiencia. A lo largo de mi formación, también aprendí la importancia de la puntualidad y la responsabilidad. Gracias a la preparación que recibí en Cross Way Center, pude continuar mi desarrollo profesional, trabajar en la universidad y tener buenos ingresos, lo que me permitió cumplir algunos de mis sueños. Fue un gran comienzo para mi vida laboral.' },
    { img: 'assets/img/testimonials/dv.jpeg', name: 'Diana Villagómez', title: 'Administradora de Empresas, vive en USA', review: 'La Academia de Inglés la recomiendo al 💯 ya que ofrece una amplia variedad de cursos para diferentes niveles de habilidad, desde principiantes hasta avanzados. Sus instalaciones están bien equipadas, proporcionando un ambiente cómodo para el aprendizaje. Los instructores son están bien calificados y muestran entusiasmo por la enseñanza, lo que puede ser motivador para los estudiantes.' },
    { img: 'assets/img/testimonials/ac.jpeg', name: 'Angela Córdoba', title: 'Profesora, vive en USA', review: 'Mi experiencia en la academia fue muy positiva. Tuve clases interactivas que me permitieron aprender de manera dinámica y entretenida. El enfoque práctico que me brindaron los profesores me ha sido de gran ayuda, ya que pude aplicar los conocimientos adquiridos directamente en mi trabajo diario. Como profesora, aprendí no solo a enseñar de forma efectiva, sino también a comunicarme con fluidez y confianza en el inglés, lo cual fue clave para mi desarrollo profesional. Gracias a la sólida formación que recibí en la academia, ahora vivo en Estados Unidos, donde mi carrera ha avanzado mucho más. Sin duda, la academia fue el punto de partida para todo lo que he logrado.' },
    { img: 'assets/img/testimonials/ra.jpeg', name: 'Reinaldo Areiza', title: 'Politólogo', review: 'Cross Way Center ha transformado mi aprendizaje del inglés. Con profesores dedicados y una metodología práctica, cada clase es una experiencia enriquecedora. No solo he mejorado mi nivel, sino que también he ganado confianza para comunicarme en cualquier contexto. ¡Recomiendo Cross Way Center a quienes buscan resultados reales!' },
    { img: 'assets/img/testimonials/sh.jpeg', name: 'Santiago Hernández', title: 'Estudiante', review: 'Mi proceso en Cross Way Center fue excepcional de principio a fin, en el transcurso  de los niveles se brindó cada material, herramienta y espacio para el correcto aprendizaje, la calidad de maestros y las temáticas impartidas fueron impecables, cualquier tipo de duda fue resuelta en su momento y la atención que los docentes prestaban a cada proceso de cada estudiante fue muy bueno, ello demostró el compromiso que se tiene con cada individuo.' },
    { img: 'assets/img/testimonials/mc.jpeg', name: 'Melissa Cuero', title: 'Ingeniera Civil', review: 'Cross Way Center es la mejor academia de inglés de Tuluá y sus alrededores. Estudié allí cuando tenía 14 años de edad y, 16 años después sigo recomendándola como desde el primer día. Te sientes rodeado de calor humano todo el tiempo, los docentes son de muy alto nivel y prestigio. Me gusta mucho la metodología que utilizan y el acompañamiento durante todo tú proceso. Estoy muy agradecida por todo el aprendizaje que obtuve en ese lugar. Espero que continúe por muchos años más.' },
    { img: 'assets/img/testimonials/ah.jpeg', name: 'Andres Hinestroza', title: 'Estudiante', review: 'A mí me gustó estudiar inglés por varias razones. Primero, la enseñanza que ofrecen en la academia es excelente. Los profesores son muy buenos, siempre responden todas las dudas que tenemos, lo cual nos ayuda a comprender mejor el inglés. Además, los ejercicios que realizamos durante las clases son muy útiles, ya que no solo refuerzan nuestros conocimientos, sino que también nos divierten. Sin duda, todo esto contribuye a un aprendizaje más efectivo.' },
  ];


  faqs = [
    {
      question: '¿Qué niveles de inglés ofrecen?',
      answer: 'Ofrecemos un programa de inglés de 12 niveles, desde principiantes hasta avanzados. Cada nivel tiene una duración de 4 semanas en modalidad presencial.',
      active: false,
    },
    {
      question: '¿Cuáles son los horarios de las clases?',
      answer: 'Nuestras clases se imparten en horarios diurnos, nocturnos y los fines de semana, para adaptarnos a tus necesidades.',
      active: false,
    },
    {
      question: '¿Cuál es el costo de los cursos?',
      answer: 'La matrícula es de $100,000 y cada nivel cuesta $240,000. También ofrecemos clases personalizadas a $35,000 por hora.',
      active: false,
    },
    {
      question: '¿Cómo puedo inscribirme?',
      answer: 'Las inscripciones están abiertas todo el año. Puedes inscribirte en nuestra sede ubicada en Calle 34 #20-41, Tuluá, o llamando al 3173798422.',
      active: false,
    },
  ];
  cookieChoice: 'accepted' | 'rejected' | null = null;
  testimonialExpanded: Record<number, boolean> = {};
  private readonly formOpenedAt = Date.now();

  contactForm = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    website: '',
    privacyAccepted: false,
  };
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor() {
    emailjs.init('2MUowbrWGE4htzLLK');
    try {
      const savedChoice = localStorage.getItem('cwc-cookie-choice');
      if (savedChoice === 'accepted' || savedChoice === 'rejected') {
        this.cookieChoice = savedChoice;
        if (savedChoice === 'accepted') setTimeout(() => this.loadOptionalServices(), 0);
      }
    } catch {
      this.cookieChoice = null;
    }
  }

  toggleFAQ(item: any) {
    item.active = !item.active;
  }

  toggleTestimonial(index: number): void {
    this.testimonialExpanded[index] = !this.testimonialExpanded[index];
  }

  chooseCookies(accepted: boolean): void {
    const choice = accepted ? 'accepted' : 'rejected';
    this.cookieChoice = choice;
    try {
      localStorage.setItem('cwc-cookie-choice', choice);
    } catch {
      // The preference still applies for the current page view.
    }
    if (accepted) this.loadOptionalServices();
    else this.removeOptionalServices();
  }

  private loadOptionalServices(): void {
    const browserWindow = window as any;
    if (!document.getElementById('google-translate-script')) {
      browserWindow.googleTranslateElementInit = () => {
        if (browserWindow.google?.translate?.TranslateElement && document.getElementById('google_translate_element')) {
          new browserWindow.google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
        }
      };
      const translate = document.createElement('script');
      translate.id = 'google-translate-script';
      translate.async = true;
      translate.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(translate);
    }

    const measurementId = environment.googleAnalyticsId;
    if (measurementId && !document.getElementById('cwc-google-analytics')) {
      browserWindow.dataLayer = browserWindow.dataLayer || [];
      browserWindow.gtag = (...args: unknown[]) => browserWindow.dataLayer.push(args);
      browserWindow.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
      browserWindow.gtag('consent', 'update', { analytics_storage: 'granted' });
      browserWindow.gtag('js', new Date());
      browserWindow.gtag('config', measurementId, { anonymize_ip: true });
      const analytics = document.createElement('script');
      analytics.id = 'cwc-google-analytics';
      analytics.async = true;
      analytics.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
      document.head.appendChild(analytics);
    }
  }

  private removeOptionalServices(): void {
    const browserWindow = window as any;
    if (browserWindow.gtag) {
      browserWindow.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
    }
    document.getElementById('cwc-google-analytics')?.remove();
    document.getElementById('google-translate-script')?.remove();
    const translateControl = document.getElementById('google_translate_element');
    if (translateControl) translateControl.replaceChildren();
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0]?.trim();
      if (name === '_ga' || name?.startsWith('_ga_') || name === 'googtrans') {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
      }
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.website.trim()) return;
    if (!this.contactForm.privacyAccepted) {
      this.errorMessage = 'Acepta la política de privacidad para enviar tu consulta.';
      return;
    }
    if (Date.now() - this.formOpenedAt < 2500) {
      this.errorMessage = 'Espera un momento y vuelve a enviar el formulario.';
      return;
    }

    const now = Date.now();
    try {
      const lastSubmission = Number(localStorage.getItem('cwc-last-contact-submit') || 0);
      if (now - lastSubmission < 30000) {
        this.errorMessage = 'Espera 30 segundos antes de enviar otra consulta.';
        return;
      }
      localStorage.setItem('cwc-last-contact-submit', String(now));
    } catch {
      // Continue with the in-page honeypot and completion-time checks.
    }

    this.loading = true;
    emailjs.send('service_xtwmq2k', 'template_cmj5odv', {
      nombre: this.contactForm.nombre.trim(),
      email: this.contactForm.email.trim(),
      asunto: this.contactForm.asunto.trim(),
      mensaje: this.contactForm.mensaje.trim(),
    }).then(() => {
      this.successMessage = 'Tu mensaje se envió correctamente. Gracias por escribirnos.';
      this.contactForm = { nombre: '', email: '', asunto: '', mensaje: '', website: '', privacyAccepted: false };
      this.loading = false;
    }).catch(() => {
      this.errorMessage = 'No se pudo enviar tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.';
      this.loading = false;
      try { localStorage.removeItem('cwc-last-contact-submit'); } catch { /* storage may be unavailable */ }
    });
  }
}
