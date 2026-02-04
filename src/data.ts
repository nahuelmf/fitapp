export const LOGROS_CONFIG = [
    { id: 'l1', titulo: 'Cadete Neón', requisito: 100, icono: '🥉', tipo: 'flexiones' },
    { id: 'l2', titulo: 'Cyborg del Empuje', requisito: 1000, icono: '🥈', tipo: 'flexiones' },
    { id: 'l3', titulo: 'Nómada Digital', requisito: 5000, icono: '🏃‍♂️', tipo: 'pasos' },
    { id: 'l4', titulo: 'Pilar de la Red', requisito: 2000, icono: '🦵', tipo: 'sentadillas' },
    { id: 'l5', titulo: 'Maratonista Binario', requisito: 50000, icono: '⚡', tipo: 'pasos' },
    { id: 'l6', titulo: 'Dios del Acero', requisito: 5000, icono: '👑', tipo: 'flexiones' }
];

export const RUTINAS_DATA = [
    // FUERZA
    { id: '1', titulo: 'Pecho Explosivo', nivel: 'Avanzado', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=cpp1r8hf1vE', ejercicios: [{nombre: 'Diamante', series: 4, reps: '12'}, {nombre: 'Arqueras', series: 3, reps: '8xL'}] },
    { id: '2', titulo: 'Piernas de Acero', nivel: 'Intermedio', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Búlgara', series: 3, reps: '10xL'}] },
    { id: '3', titulo: 'Empuje Básico', nivel: 'Principiante', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=vuMU7-BKIZA', ejercicios: [{nombre: 'Flexiones', series: 3, reps: '10'}] },
    { id: '4', titulo: 'Glúteo Mayor', nivel: 'Intermedio', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Puente Glúteo', series: 4, reps: '20'}] },
    { id: '5', titulo: 'Tríceps en Silla', nivel: 'Principiante', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=cpp1r8hf1vE', ejercicios: [{nombre: 'Fondos', series: 3, reps: '12'}] },
    { id: '6', titulo: 'Pike Pushups', nivel: 'Avanzado', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=cpp1r8hf1vE', ejercicios: [{nombre: 'Pike', series: 3, reps: '8'}] },
    { id: '7', titulo: 'Sentadilla Salto', nivel: 'Avanzado', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Explosivas', series: 4, reps: '15'}] },
    { id: '8', titulo: 'Zancadas Largas', nivel: 'Principiante', categoria: 'Fuerza', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Estocadas', series: 3, reps: '12xL'}] },
    // HIIT
    { id: '9', titulo: 'Burpee Hell', nivel: 'Avanzado', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Burpees', series: 5, reps: '15'}] },
    { id: '10', titulo: 'Mountain Climber', nivel: 'Intermedio', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Escaladores', series: 4, reps: '40s'}] },
    { id: '11', titulo: 'Jumping Jacks', nivel: 'Principiante', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Saltos', series: 4, reps: '1m'}] },
    { id: '12', titulo: 'Tabata Core', nivel: 'Intermedio', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=_gH6nZSX67g', ejercicios: [{nombre: 'V-Ups', series: 8, reps: '20s'}] },
    { id: '13', titulo: 'Sprint en Sitio', nivel: 'Avanzado', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Skipping', series: 5, reps: '30s'}] },
    { id: '14', titulo: 'Plancha Dinámica', nivel: 'Intermedio', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=_gH6nZSX67g', ejercicios: [{nombre: 'Taps Hombro', series: 3, reps: '20'}] },
    { id: '15', titulo: 'Boxeo Aire', nivel: 'Principiante', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Shadow Boxing', series: 3, reps: '2m'}] },
    { id: '16', titulo: 'Rodillas Arriba', nivel: 'Intermedio', categoria: 'HIIT', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'High Knees', series: 4, reps: '30s'}] },
    // YOGA
    { id: '17', titulo: 'Saludo al Sol', nivel: 'Principiante', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=_gH6nZSX67g', ejercicios: [{nombre: 'Flow', series: 5, reps: '---'}] },
    { id: '18', titulo: 'Apertura Cadera', nivel: 'Intermedio', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Paloma', series: 2, reps: '1m x L'}] },
    { id: '19', titulo: 'Flexibilidad Espalda', nivel: 'Principiante', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=_gH6nZSX67g', ejercicios: [{nombre: 'Cobra', series: 3, reps: '30s'}] },
    { id: '20', titulo: 'Equilibrio Cuervo', nivel: 'Avanzado', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Crow Pose', series: 5, reps: 'Máx'}] },
    { id: '21', titulo: 'Postura Guerrero', nivel: 'Principiante', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Warrior II', series: 3, reps: '45s'}] },
    { id: '22', titulo: 'Estiramiento Isquio', nivel: 'Principiante', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=VHzmO9QMeJI', ejercicios: [{nombre: 'Pinza', series: 3, reps: '1m'}] },
    { id: '23', titulo: 'Movilidad Hombro', nivel: 'Intermedio', categoria: 'Yoga', videoUrl: 'https://www.youtube.com/watch?v=cpp1r8hf1vE', ejercicios: [{nombre: 'Rotaciones', series: 3, reps: '15'}] },
    // CARDIO
    { id: '24', titulo: 'Fartlek Run', nivel: 'Avanzado', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Velocidad Var.', series: 1, reps: '20m'}] },
    { id: '25', titulo: 'Bici Resistencia', nivel: 'Intermedio', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Cadencia Fija', series: 1, reps: '45m'}] },
    { id: '26', titulo: 'Caminata Power', nivel: 'Principiante', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Ritmo Alto', series: 1, reps: '30m'}] },
    { id: '27', titulo: 'Escaladores 500', nivel: 'Avanzado', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Pasos', series: 1, reps: '500'}] },
    { id: '28', titulo: 'Bici Sprints', nivel: 'Avanzado', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Sprints', series: 10, reps: '30s'}] },
    { id: '29', titulo: 'Trote Recuperación', nivel: 'Principiante', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Zona 2', series: 1, reps: '40m'}] },
    { id: '30', titulo: 'Circuito Agilidad', nivel: 'Intermedio', categoria: 'Cardio', videoUrl: 'https://www.youtube.com/watch?v=cqoNTr02fRk', ejercicios: [{nombre: 'Laterales', series: 5, reps: '1m'}] }
  ];

  export const translations = {
  es: { tracker: 'TRACKER', cardio: 'CARDIO', routines: 'RUTINAS', badges: 'LOGROS', pushups: 'FLEXIONES', squats: 'SENTADILLAS', finish: 'GUARDAR MISIÓN', steps: 'PASOS', bike: 'BICI', running: 'CORRER', start: 'INICIAR', stop: 'PARAR' },
  en: { tracker: 'TRACKER', cardio: 'CARDIO', routines: 'ROUTINES', badges: 'BADGES', pushups: 'PUSH-UPS', squats: 'SQUATS', finish: 'SAVE MISSION', steps: 'STEPS', bike: 'BIKE', running: 'RUNNING', start: 'START', stop: 'STOP' },
  pt: { tracker: 'TRACKER', cardio: 'CARDIO', routines: 'ROTINAS', badges: 'CONQUISTAS', pushups: 'FLEXÕES', squats: 'AGACHAMENTOS', finish: 'SALVAR MISSÃO', steps: 'PASSOS', bike: 'BIKE', running: 'CORRIDA', start: 'INICIAR', stop: 'PARAR' }
};