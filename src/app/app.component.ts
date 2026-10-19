import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  })
export class AppComponent {
  language: 'es' | 'en' = 'es';
  theme: 'light' | 'dark' = 'light';
  chatOpen = false;
  chatInput = '';
  chatMessages: { role: 'assistant' | 'user'; text: string }[] = [];
  @ViewChild('chatMessagesView') private chatMessagesElement?: ElementRef<HTMLDivElement>;
  
  testimonials = [
    { img: 'assets/img/optimized/cc4.jpeg', name: 'Christian Cuero', title: 'Mg. en Traducción e Interpretación, Profesor', review: 'Mi experiencia en la Academia Cross Way Center fue muy positiva. Comencé a estudiar desde los trece años, pasando por todos los niveles hasta los avanzados, lo que me permitió ingresar a la licenciatura en lenguas extranjeras con un buen dominio del inglés. Esto me dio la oportunidad de enfocarme en el francés y otras materias, logrando destacarme en la carrera, incluso ocupando el primer puesto. Además, tuve la suerte de enseñar en la Academia desde los primeros semestres, lo que me permitió aplicar lo aprendido y ganar experiencia. A lo largo de mi formación, también aprendí la importancia de la puntualidad y la responsabilidad. Gracias a la preparación que recibí en Cross Way Center, pude continuar mi desarrollo profesional, trabajar en la universidad y tener buenos ingresos, lo que me permitió cumplir algunos de mis sueños. Fue un gran comienzo para mi vida laboral.' },
    { img: '', name: 'Diana Villagómez', title: 'Administradora de Empresas, vive en USA', review: 'La Academia de Inglés la recomiendo al 💯 ya que ofrece una amplia variedad de cursos para diferentes niveles de habilidad, desde principiantes hasta avanzados. Sus instalaciones están bien equipadas, proporcionando un ambiente cómodo para el aprendizaje. Los instructores son están bien calificados y muestran entusiasmo por la enseñanza, lo que puede ser motivador para los estudiantes.' },
    { img: 'assets/img/optimized/ac.jpeg', name: 'Angela Córdoba', title: 'Profesora, vive en USA', review: 'Mi experiencia en la academia fue muy positiva. Tuve clases interactivas que me permitieron aprender de manera dinámica y entretenida. El enfoque práctico que me brindaron los profesores me ha sido de gran ayuda, ya que pude aplicar los conocimientos adquiridos directamente en mi trabajo diario. Como profesora, aprendí no solo a enseñar de forma efectiva, sino también a comunicarme con fluidez y confianza en el inglés, lo cual fue clave para mi desarrollo profesional. Gracias a la sólida formación que recibí en la academia, ahora vivo en Estados Unidos, donde mi carrera ha avanzado mucho más. Sin duda, la academia fue el punto de partida para todo lo que he logrado.' },
    { img: 'assets/img/optimized/ra.jpeg', name: 'Reinaldo Areiza', title: 'Politólogo', review: 'Cross Way Center ha transformado mi aprendizaje del inglés. Con profesores dedicados y una metodología práctica, cada clase es una experiencia enriquecedora. No solo he mejorado mi nivel, sino que también he ganado confianza para comunicarme en cualquier contexto. ¡Recomiendo Cross Way Center a quienes buscan resultados reales!' },
    { img: 'assets/img/optimized/sh.jpeg', name: 'Santiago Hernández', title: 'Estudiante', review: 'Mi proceso en Cross Way Center fue excepcional de principio a fin, en el transcurso  de los niveles se brindó cada material, herramienta y espacio para el correcto aprendizaje, la calidad de maestros y las temáticas impartidas fueron impecables, cualquier tipo de duda fue resuelta en su momento y la atención que los docentes prestaban a cada proceso de cada estudiante fue muy bueno, ello demostró el compromiso que se tiene con cada individuo.' },
    { img: 'assets/img/optimized/mc.jpeg', name: 'Melissa Cuero', title: 'Ingeniera Civil', review: 'Cross Way Center es la mejor academia de inglés de Tuluá y sus alrededores. Estudié allí cuando tenía 14 años de edad y, 16 años después sigo recomendándola como desde el primer día. Te sientes rodeado de calor humano todo el tiempo, los docentes son de muy alto nivel y prestigio. Me gusta mucho la metodología que utilizan y el acompañamiento durante todo tú proceso. Estoy muy agradecida por todo el aprendizaje que obtuve en ese lugar. Espero que continúe por muchos años más.' },
    { img: 'assets/img/optimized/ah.jpeg', name: 'Andres Hinestroza', title: 'Estudiante', review: 'A mí me gustó estudiar inglés por varias razones. Primero, la enseñanza que ofrecen en la academia es excelente. Los profesores son muy buenos, siempre responden todas las dudas que tenemos, lo cual nos ayuda a comprender mejor el inglés. Además, los ejercicios que realizamos durante las clases son muy útiles, ya que no solo refuerzan nuestros conocimientos, sino que también nos divierten. Sin duda, todo esto contribuye a un aprendizaje más efectivo.' },
  ];

  readonly testimonialsEn = [
    'My experience at Cross Way Center Academy was very positive. I started studying at thirteen and completed every level through the advanced courses, which helped me enter a foreign languages degree with a strong command of English. I was then able to focus on French and other subjects and stand out in my program, even earning first place. I also had the opportunity to teach at the Academy from my first semesters, putting what I learned into practice and gaining experience. During my training I learned the importance of punctuality and responsibility. The preparation I received at Cross Way Center helped me continue my professional development, work at a university, earn a good income, and achieve some of my dreams. It was a great start to my working life.',
    'I recommend this English academy 100%. It offers a wide range of courses for different skill levels, from beginner to advanced. The facilities are well equipped and provide a comfortable learning environment. The instructors are highly qualified and enthusiastic about teaching, which makes the experience motivating.',
    'My experience at the academy was very positive. The interactive classes helped me learn in a dynamic and enjoyable way. The practical approach from the teachers has been very useful because I could apply what I learned directly in my daily work. As a teacher, I learned not only how to teach effectively, but also how to communicate in English with fluency and confidence, which was key to my professional development. Thanks to the solid education I received, I now live in the United States, where my career has advanced considerably. The academy was the starting point for everything I have achieved.',
    'Cross Way Center has transformed the way I learn English. With dedicated teachers and a practical methodology, every class is an enriching experience. I have improved my level and gained the confidence to communicate in any setting. I recommend Cross Way Center to anyone looking for real results.',
    'My journey at Cross Way Center was exceptional from beginning to end. Throughout the levels, we were given the materials, tools, and space needed to learn well. The teachers and course topics were excellent; every question was answered promptly, and teachers gave close attention to each student’s progress. That showed their commitment to every learner.',
    'Cross Way Center is the best English academy in Tuluá and the surrounding area. I studied there at fourteen, and sixteen years later I still recommend it just as I did from the beginning. You feel welcomed at all times, and the teachers are highly skilled and respected. I really like the teaching method and the support throughout the learning process. I am very grateful for everything I learned there and hope the academy continues for many years.',
    'I enjoyed studying English for several reasons. First, the teaching at the academy is excellent. The teachers are very good and always answer our questions, which helps us understand English better. The exercises we do in class are also very useful: they strengthen our knowledge and are fun. All of this contributes to more effective learning.',
  ];

  readonly testimonialTitlesEn = [
    'MA in Translation and Interpreting · Teacher',
    'Business Administrator · Lives in the USA',
    'Teacher · Lives in the USA',
    'Political Scientist',
    'Student',
    'Civil Engineer',
    'Student',
  ];


  faqs = [
    {
      question: '¿Qué niveles de inglés ofrecen?',
      questionEn: 'Which English levels do you offer?',
      answer: 'Ofrecemos un programa de inglés de 12 niveles, desde principiantes hasta avanzados. Cada nivel tiene una duración de 4 semanas en modalidad presencial.',
      answerEn: 'We offer a 12-level English program, from beginner to advanced. Each in-person level lasts four weeks.',
      active: false,
    },
    {
      question: '¿Cuáles son los horarios de las clases?',
      questionEn: 'What are the class schedules?',
      answer: 'Nuestras clases se imparten en horarios diurnos, nocturnos y los fines de semana, para adaptarnos a tus necesidades.',
      answerEn: 'Classes are available during the day, in the evening, and on weekends to fit your schedule.',
      active: false,
    },
    {
      question: '¿Cuál es el costo de los cursos?',
      questionEn: 'How much do the courses cost?',
      answer: 'La matrícula es de $100,000 y cada nivel cuesta $240,000. También ofrecemos clases personalizadas a $35,000 por hora.',
      answerEn: 'Enrollment is COP $100,000 and each level is COP $240,000. Private lessons are also available for COP $35,000 per hour.',
      active: false,
    },
    {
      question: '¿Cómo puedo inscribirme?',
      questionEn: 'How can I enroll?',
      answer: 'Las inscripciones están abiertas todo el año. Puedes inscribirte en nuestra sede ubicada en Calle 34 #20-41, Tuluá, o llamando al 3173798422.',
      answerEn: 'Enrollment is open year-round. Visit us at Calle 34 #20-41 in Tuluá or call +57 317 379 8422.',
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
      const savedLanguage = localStorage.getItem('cwc-language');
      this.language = savedLanguage === 'en' ? 'en' : 'es';
      const savedTheme = localStorage.getItem('cwc-theme');
      this.theme = savedTheme === 'dark' ? 'dark' : 'light';
      document.documentElement.lang = this.language;
      document.documentElement.dataset['theme'] = this.theme;
      this.setLanguage(this.language);
      const savedChoice = localStorage.getItem('cwc-cookie-choice');
      if (savedChoice === 'accepted' || savedChoice === 'rejected') {
        this.cookieChoice = savedChoice;
        if (savedChoice === 'accepted') setTimeout(() => this.loadOptionalServices(), 0);
      }
    } catch {
      this.cookieChoice = null;
    }
  }

  t(es: string, en: string): string {
    return this.language === 'es' ? es : en;
  }

  setLanguage(language: 'es' | 'en'): void {
    this.language = language;
    document.documentElement.lang = language;
    document.title = language === 'es'
      ? 'Cross Way Center | Academia de inglés en Tuluá'
      : 'Cross Way Center | English Academy in Tuluá';
    const description = language === 'es'
      ? 'Aprende inglés en Cross Way Center, academia de idiomas en Tuluá desde 1986. Conoce nuestros cursos, docentes y opciones de matrícula.'
      : 'Learn English at Cross Way Center, an English academy in Tuluá since 1986. Explore our courses, teachers, and enrollment options.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'es' ? 'es_CO' : 'en_US');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', language === 'es'
      ? 'Cross Way Center | Academia de inglés en Tuluá'
      : 'Cross Way Center | English Academy in Tuluá');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    try { localStorage.setItem('cwc-language', language); } catch { /* preference remains active for this visit */ }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset['theme'] = this.theme;
    try { localStorage.setItem('cwc-theme', this.theme); } catch { /* preference remains active for this visit */ }
  }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen && this.chatMessages.length === 0) {
      this.chatMessages = [{
        role: 'assistant',
        text: this.t('¡Hola! Soy el asistente virtual de Cross Way Center. Con 40 años de experiencia enseñando inglés, puedo ayudarte con cursos, horarios, precios y ubicación. ¿Qué te gustaría saber?', 'Hi! I’m the Cross Way Center virtual assistant. Backed by 40 years of English teaching experience, I can help with courses, schedules, prices, and location. What would you like to know?'),
      }];
    }
  }

  sendChatMessage(value = this.chatInput): void {
    const message = value.trim();
    if (!message) return;
    this.chatMessages = [...this.chatMessages, { role: 'user', text: message }];
    this.chatInput = '';
    this.chatMessages = [...this.chatMessages, { role: 'assistant', text: this.chatReply(message) }];
    setTimeout(() => {
      const pane = this.chatMessagesElement?.nativeElement;
      if (pane) pane.scrollTop = pane.scrollHeight;
    });
  }

  private chatReply(message: string): string {
    const query = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (/precio|cost|matric|valor|price/.test(query)) return this.t('La matrícula cuesta $100.000 COP y cada nivel $240.000 COP. Las clases personalizadas cuestan $35.000 COP por hora. Para confirmar tarifas vigentes, escríbenos por WhatsApp.', 'Enrollment is COP $100,000, each level is COP $240,000, and private lessons are COP $35,000 per hour. Message us on WhatsApp to confirm current rates.');
    if (/horar|schedule|when|hora|weekend|fin de semana/.test(query)) return this.t('Tenemos horarios diurnos, nocturnos y de fin de semana. Cuéntanos qué disponibilidad tienes y te ayudaremos a encontrar una opción.', 'We offer daytime, evening, and weekend classes. Tell us when you are available and our team can help find an option.');
    if (/curso|nivel|beginner|princip|avanz|kid|nino/.test(query)) return this.t('Ofrecemos programas para niños y adultos: desde nivel principiante hasta avanzado, organizados en niveles progresivos. Nuestros cursos presenciales se imparten en Tuluá.', 'We offer progressive programs for children and adults, from beginner to advanced levels. Our in-person courses are held in Tuluá.');
    if (/ubic|direccion|address|location|donde|map/.test(query)) return this.t('Estamos en Calle 34 #20-41, barrio Sajonia, Tuluá, Valle del Cauca. Puedes abrir la ubicación en Google Maps desde el pie de página.', 'We are at Calle 34 #20-41, Sajonia, Tuluá, Valle del Cauca. You can open our Google Maps location from the footer.');
    if (/inscrip|enroll|matricul|register/.test(query)) return this.t('Las inscripciones están abiertas durante todo el año. Déjanos tu consulta en el formulario o escríbenos por WhatsApp para conocer los pasos.', 'Enrollment is open year-round. Send us a message through the contact form or WhatsApp to learn how to get started.');
    if (/experiencia|experience|anos|years/.test(query)) return this.t('Cross Way Center enseña inglés en Tuluá desde 1986: 40 años acompañando a estudiantes en su aprendizaje.', 'Cross Way Center has taught English in Tuluá since 1986: 40 years supporting students on their learning journey.');
    return this.t('Puedo orientarte sobre cursos, horarios, precios, inscripciones y ubicación. Para una respuesta personalizada, toca “Hablar con nuestro equipo” y continuaremos por WhatsApp.', 'I can help with courses, schedules, prices, enrollment, and location. For a personal answer, tap “Talk to our team” to continue on WhatsApp.');
  }

  closeChatOnEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.chatOpen = false;
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
      this.errorMessage = this.t('Acepta la política de privacidad para enviar tu consulta.', 'Please accept the privacy policy before sending your message.');
      return;
    }
    if (Date.now() - this.formOpenedAt < 2500) {
      this.errorMessage = this.t('Espera un momento y vuelve a enviar el formulario.', 'Please wait a moment before sending the form.');
      return;
    }

    const now = Date.now();
    try {
      const lastSubmission = Number(localStorage.getItem('cwc-last-contact-submit') || 0);
      if (now - lastSubmission < 30000) {
        this.errorMessage = this.t('Espera 30 segundos antes de enviar otra consulta.', 'Please wait 30 seconds before sending another message.');
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
      this.successMessage = this.t('Tu mensaje se envió correctamente. Gracias por escribirnos.', 'Your message was sent successfully. Thank you for reaching out.');
      this.contactForm = { nombre: '', email: '', asunto: '', mensaje: '', website: '', privacyAccepted: false };
      this.loading = false;
    }).catch(() => {
      this.errorMessage = this.t('No se pudo enviar tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.', 'Your message could not be sent. Please try again or contact us on WhatsApp.');
      this.loading = false;
      try { localStorage.removeItem('cwc-last-contact-submit'); } catch { /* storage may be unavailable */ }
    });
  }
}
