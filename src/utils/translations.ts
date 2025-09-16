export interface Translations {
  // Navigation
  appTitle: string;
  mobileApp: string;
  panicAlert: string;
  authorityDashboard: string;
  light: string;
  dark: string;

  // Mobile App
  travelSafetyId: string;
  touristId: string;
  expires: string;
  safetyScore: string;
  currentArea: string;
  safeZone: string;
  lowRiskArea: string;
  lastUpdate: string;
  emergencyContacts: string;
  localEmergency: string;
  touristHelpline: string;
  embassy: string;
  todaysItinerary: string;
  completed: string;
  current: string;
  emergencyPanicButton: string;
  tapForEmergencyResponse: string;

  // Panic Alert
  emergencyMode: string;
  emergencyAlert: string;
  cancelEmergency: string;
  tapToCancelIfAccidental: string;
  contactingEmergencyServices: string;
  responseTime: string;
  alertCancelled: string;
  cancellationNotified: string;
  alertSentToServices: string;
  locationSharedWithResponders: string;
  nearestPatrolDispatched: string;
  emergencyContactNotified: string;
  yourLocation: string;
  locationTrackingActive: string;
  emergencyResponseTeam: string;
  unitId: string;
  eta: string;
  officer: string;
  safetyInstructions: string;
  stayAtCurrentLocation: string;
  keepPhoneChargedAccessible: string;
  watchForEmergencyVehicles: string;
  dontLeaveAreaUntilSafe: string;

  // Authority Dashboard
  touristSafetyCommandCenter: string;
  realTimeMonitoringResponse: string;
  lastUpdated: string;
  refresh: string;
  activeTourists: string;
  fromYesterday: string;
  activeAlerts: string;
  highPriority: string;
  averageSafetyScore: string;
  goodOverallSafety: string;
  responseTimeAvg: string;
  last24HoursAverage: string;
  liveTouristClusters: string;
  filter: string;
  view: string;
  tourists: string;
  safety: string;
  activeAlertsAndIncidents: string;
  searchAlerts: string;
  viewDetails: string;
  contact: string;
  aiAnomalyDetection: string;
  unusualCrowdDensity: string;
  weatherWarning: string;
  rainPossibleIn2Hours: string;
  patternAnalysis: string;
  higherIncidentRateNearMetro: string;
  touristDetails: string;
  status: string;
  emergency: string;
  location: string;
  lastContact: string;
  minutesAgo: string;
  trackLocation: string;
  contactTourist: string;

  // Risk levels
  low: string;
  medium: string;
  high: string;
  
  // Alert types
  panic: string;
  aiAnomaly: string;
  geoFence: string;
  
  // Status
  active: string;
  investigating: string;
  resolved: string;

  // Locations
  indiaGate: string;
  redFort: string;
  connaught: string;
  chandniChowk: string;
  lotusTemple: string;
  newDelhi: string;
  delhi: string;
  constructionArea: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation
    appTitle: "Smart Tourist Safety System",
    mobileApp: "Mobile App",
    panicAlert: "Panic Alert",
    authorityDashboard: "Authority Dashboard",
    light: "Light",
    dark: "Dark",

    // Mobile App
    travelSafetyId: "Travel Safety ID",
    touristId: "Tourist ID",
    expires: "Expires",
    safetyScore: "Safety Score",
    currentArea: "Current Area: Safe Zone",
    safeZone: "Safe Zone",
    lowRiskArea: "Low Risk Area",
    lastUpdate: "Last Update",
    emergencyContacts: "Emergency Contacts",
    localEmergency: "Local Emergency",
    touristHelpline: "Tourist Helpline",
    embassy: "Embassy",
    todaysItinerary: "Today's Itinerary",
    completed: "Completed",
    current: "Current",
    emergencyPanicButton: "Emergency Panic Button",
    tapForEmergencyResponse: "Tap for immediate emergency response",

    // Panic Alert
    emergencyMode: "Emergency Mode",
    emergencyAlert: "Emergency Alert",
    cancelEmergency: "Cancel Emergency",
    tapToCancelIfAccidental: "Tap cancel if this was triggered accidentally",
    contactingEmergencyServices: "Contacting Emergency Services",
    responseTime: "Response Time",
    alertCancelled: "Alert Cancelled",
    cancellationNotified: "Emergency services have been notified of cancellation.",
    alertSentToServices: "Alert sent to emergency services",
    locationSharedWithResponders: "Location shared with responders",
    nearestPatrolDispatched: "Nearest patrol unit dispatched",
    emergencyContactNotified: "Emergency contact notified",
    yourLocation: "Your Location",
    locationTrackingActive: "📍 Location tracking active",
    emergencyResponseTeam: "Emergency Response Team",
    unitId: "Unit ID",
    eta: "ETA",
    officer: "Officer",
    safetyInstructions: "Safety Instructions",
    stayAtCurrentLocation: "• Stay at your current location",
    keepPhoneChargedAccessible: "• Keep your phone charged and accessible",
    watchForEmergencyVehicles: "• Watch for emergency vehicles",
    dontLeaveAreaUntilSafe: "• Don't leave the area until cleared as safe",

    // Authority Dashboard
    touristSafetyCommandCenter: "Tourist Safety Command Center",
    realTimeMonitoringResponse: "Real-time monitoring and incident response",
    lastUpdated: "Last Updated",
    refresh: "Refresh",
    activeTourists: "Active Tourists",
    fromYesterday: "+12% from yesterday",
    activeAlerts: "Active Alerts",
    highPriority: "2 high priority",
    averageSafetyScore: "Average Safety Score",
    goodOverallSafety: "Good overall safety",
    responseTimeAvg: "Response Time",
    last24HoursAverage: "Last 24 hours average",
    liveTouristClusters: "Live Tourist Clusters",
    filter: "Filter",
    view: "View",
    tourists: "tourists",
    safety: "Safety",
    activeAlertsAndIncidents: "Active Alerts and Incidents",
    searchAlerts: "Search alerts...",
    viewDetails: "View Details",
    contact: "Contact",
    aiAnomalyDetection: "AI Anomaly Detection",
    unusualCrowdDensity: "Unusual crowd density detected at Chandni Chowk (construction area)",
    weatherWarning: "Weather warning: Rain possible in 2 hours - tourist safety advisory sent",
    patternAnalysis: "Pattern analysis: Higher incident rate near metro stations",
    touristDetails: "Tourist Details",
    status: "Status",
    emergency: "Emergency",
    location: "Location",
    lastContact: "Last Contact",
    minutesAgo: "minutes ago",
    trackLocation: "Track Location",
    contactTourist: "Contact Tourist",

    // Risk levels
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
    
    // Alert types
    panic: "PANIC",
    aiAnomaly: "AI ANOMALY",
    geoFence: "GEO FENCE",
    
    // Status
    active: "ACTIVE",
    investigating: "INVESTIGATING",
    resolved: "RESOLVED",

    // Locations
    indiaGate: "India Gate",
    redFort: "Red Fort",
    connaught: "Connaught Place",
    chandniChowk: "Chandni Chowk",
    lotusTemple: "Lotus Temple",
    newDelhi: "New Delhi",
    delhi: "Delhi",
    constructionArea: "Construction"
  },
  hi: {
    // Navigation
    appTitle: "स्मार्ट पर्यटक सुरक्षा प्रणाली",
    mobileApp: "मोबाइल ऐप",
    panicAlert: "पैनिक अलर्ट",
    authorityDashboard: "प्राधिकरण डैशबोर्ड",
    light: "लाइट",
    dark: "डार्क",

    // Mobile App
    travelSafetyId: "यात्रा सुरक्षा ID",
    touristId: "पर्यटक ID",
    expires: "समाप्ति",
    safetyScore: "सुरक्षा स्कोर",
    currentArea: "वर्तमान क्षेत्र: सुरक्षित क्षेत्र",
    safeZone: "सुरक्षित क्षेत्र",
    lowRiskArea: "कम जोखिम क्षेत्र",
    lastUpdate: "अंतिम अपडेट",
    emergencyContacts: "आपातकालीन संपर्क",
    localEmergency: "स्थानीय आपातकाल",
    touristHelpline: "पर्यटक हेल्पलाइन",
    embassy: "दूतावास",
    todaysItinerary: "आज का कार्यक्रम",
    completed: "पूर्ण",
    current: "वर्तमान",
    emergencyPanicButton: "आपातकालीन पैनिक बटन",
    tapForEmergencyResponse: "तत्काल आपातकालीन प्रतिक्रिया के लिए टैप करें",

    // Panic Alert
    emergencyMode: "आपातकालीन मोड",
    emergencyAlert: "आपातकालीन अलर्ट",
    cancelEmergency: "आपातकाल रद्द करें",
    tapToCancelIfAccidental: "यदि यह गलती से ट्रिगर हुआ है तो रद्द करें पर टैप करें",
    contactingEmergencyServices: "आपातकालीन सेवाओं से संपर्क",
    responseTime: "प्रतिक्रिया समय",
    alertCancelled: "अलर्ट रद्द",
    cancellationNotified: "आपातकालीन सेवाओं को रद्दीकरण की सूचना दे दी गई है।",
    alertSentToServices: "आपातकालीन सेवाओं को अलर्ट भेजा गया",
    locationSharedWithResponders: "प्रतिक्रियाकर्ताओं के साथ स्थान साझा किया गया",
    nearestPatrolDispatched: "निकटतम गश्ती दल भेजा गया",
    emergencyContactNotified: "आपातकालीन संपर्क को सूचित किया गया",
    yourLocation: "आपका स्थान",
    locationTrackingActive: "📍 स्थान ट्रैकिंग सक्रिय",
    emergencyResponseTeam: "आपातकालीन प्रतिक्रिया टीम",
    unitId: "यूनिट ID",
    eta: "ETA",
    officer: "अधिकारी",
    safetyInstructions: "सुरक्षित रहने के निर्देश",
    stayAtCurrentLocation: "• अपने वर्तमान स्थान पर रहें",
    keepPhoneChargedAccessible: "• अपना फोन चार्ज और पहुंच में रखें",
    watchForEmergencyVehicles: "• आपातकालीन वाहनों की तलाश करें",
    dontLeaveAreaUntilSafe: "• असुरक्षित न होने तक क्षेत्र न छोड़ें",

    // Authority Dashboard
    touristSafetyCommandCenter: "पर्यटक सुरक्षा कमांड सेंटर",
    realTimeMonitoringResponse: "रियल-टाइम निगरानी और घटना प्रतिक्रिया",
    lastUpdated: "अंतिम अपडेट",
    refresh: "रिफ्रेश",
    activeTourists: "सक्रिय पर्यटक",
    fromYesterday: "कल से +12%",
    activeAlerts: "सक्रिय अलर्ट",
    highPriority: "2 उच्च प्राथमिकता",
    averageSafetyScore: "औसत सुरक्षा स्कोर",
    goodOverallSafety: "अच्छी समग्र सुरक्षा",
    responseTimeAvg: "प्रतिक्रिया समय",
    last24HoursAverage: "पिछले 24 घंटे का औसत",
    liveTouristClusters: "लाइव पर्यटक समूह",
    filter: "फिल्टर",
    view: "देखें",
    tourists: "पर्यटक",
    safety: "सुरक्षा",
    activeAlertsAndIncidents: "सक्रिय अलर्ट और घटनाएं",
    searchAlerts: "अलर्ट खोजें...",
    viewDetails: "विवरण देखें",
    contact: "संपर्क",
    aiAnomalyDetection: "AI विसंगति का पता लगाना",
    unusualCrowdDensity: "चांदनी चौक में असामान्य भीड़ घनत्व का पता चला (निर्माण क्षेत्र)",
    weatherWarning: "मौसम चेतावनी: 2 घंटे में बारिश की संभावना - पर्यटक सुरक्षा सलाह भेजी गई",
    patternAnalysis: "पैटर्न विश्लेषण: मेट्रो स्टेशनों के पास अधिक घटना दर",
    touristDetails: "पर्यटक विवरण",
    status: "स्थिति",
    emergency: "आपातकाल",
    location: "स्थान",
    lastContact: "अंतिम संपर्क",
    minutesAgo: "मिनट पहले",
    trackLocation: "स्थान ट्रैक करें",
    contactTourist: "पर्यटक से संपर्क करें",

    // Risk levels
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    
    // Alert types
    panic: "पैनिक",
    aiAnomaly: "AI विसंगति",
    geoFence: "जियो फेंस",
    
    // Status
    active: "सक्रिय",
    investigating: "जांच",
    resolved: "हल",

    // Locations
    indiaGate: "इंडिया गेट",
    redFort: "लाल किला",
    connaught: "कनॉट प्लेस",
    chandniChowk: "चांदनी चौक",
    lotusTemple: "लोटस टेम्पल",
    newDelhi: "नई दिल्ली",
    delhi: "दिल्ली",
    constructionArea: "निर्माण"
  },
  es: {
    // Navigation
    appTitle: "Sistema Inteligente de Seguridad Turística",
    mobileApp: "Aplicación Móvil",
    panicAlert: "Alerta de Pánico",
    authorityDashboard: "Panel de Autoridades",
    light: "Claro",
    dark: "Oscuro",

    // Mobile App
    travelSafetyId: "ID de Seguridad de Viaje",
    touristId: "ID de Turista",
    expires: "Expira",
    safetyScore: "Puntuación de Seguridad",
    currentArea: "Área Actual: Zona Segura",
    safeZone: "Zona Segura",
    lowRiskArea: "Área de Bajo Riesgo",
    lastUpdate: "Última Actualización",
    emergencyContacts: "Contactos de Emergencia",
    localEmergency: "Emergencia Local",
    touristHelpline: "Línea de Ayuda Turística",
    embassy: "Embajada",
    todaysItinerary: "Itinerario de Hoy",
    completed: "Completado",
    current: "Actual",
    emergencyPanicButton: "Botón de Pánico de Emergencia",
    tapForEmergencyResponse: "Toca para respuesta de emergencia inmediata",

    // Panic Alert
    emergencyMode: "Modo de Emergencia",
    emergencyAlert: "Alerta de Emergencia",
    cancelEmergency: "Cancelar Emergencia",
    tapToCancelIfAccidental: "Toca cancelar si esto fue activado accidentalmente",
    contactingEmergencyServices: "Contactando Servicios de Emergencia",
    responseTime: "Tiempo de Respuesta",
    alertCancelled: "Alerta Cancelada",
    cancellationNotified: "Los servicios de emergencia han sido notificados de la cancelación.",
    alertSentToServices: "Alerta enviada a servicios de emergencia",
    locationSharedWithResponders: "Ubicación compartida con respondedores",
    nearestPatrolDispatched: "Unidad de patrulla más cercana despachada",
    emergencyContactNotified: "Contacto de emergencia notificado",
    yourLocation: "Tu Ubicación",
    locationTrackingActive: "📍 Seguimiento de ubicación activo",
    emergencyResponseTeam: "Equipo de Respuesta de Emergencia",
    unitId: "ID de Unidad",
    eta: "Tiempo Estimado",
    officer: "Oficial",
    safetyInstructions: "Instrucciones de Seguridad",
    stayAtCurrentLocation: "• Permanece en tu ubicación actual",
    keepPhoneChargedAccessible: "• Mantén tu teléfono cargado y accesible",
    watchForEmergencyVehicles: "• Busca vehículos de emergencia",
    dontLeaveAreaUntilSafe: "• No abandones el área hasta que sea seguro",

    // Authority Dashboard
    touristSafetyCommandCenter: "Centro de Comando de Seguridad Turística",
    realTimeMonitoringResponse: "Monitoreo en tiempo real y respuesta a incidentes",
    lastUpdated: "Última Actualización",
    refresh: "Actualizar",
    activeTourists: "Turistas Activos",
    fromYesterday: "+12% desde ayer",
    activeAlerts: "Alertas Activas",
    highPriority: "2 alta prioridad",
    averageSafetyScore: "Puntuación Promedio de Seguridad",
    goodOverallSafety: "Buena seguridad general",
    responseTimeAvg: "Tiempo de Respuesta",
    last24HoursAverage: "Promedio de las últimas 24 horas",
    liveTouristClusters: "Grupos de Turistas en Vivo",
    filter: "Filtrar",
    view: "Ver",
    tourists: "turistas",
    safety: "Seguridad",
    activeAlertsAndIncidents: "Alertas e Incidentes Activos",
    searchAlerts: "Buscar alertas...",
    viewDetails: "Ver Detalles",
    contact: "Contactar",
    aiAnomalyDetection: "Detección de Anomalías IA",
    unusualCrowdDensity: "Densidad de multitud inusual detectada en Chandni Chowk (área de construcción)",
    weatherWarning: "Advertencia meteorológica: Posible lluvia en 2 horas - aviso de seguridad turística enviado",
    patternAnalysis: "Análisis de patrones: Mayor tasa de incidentes cerca de estaciones de metro",
    touristDetails: "Detalles del Turista",
    status: "Estado",
    emergency: "Emergencia",
    location: "Ubicación",
    lastContact: "Último Contacto",
    minutesAgo: "minutos atrás",
    trackLocation: "Rastrear Ubicación",
    contactTourist: "Contactar Turista",

    // Risk levels
    low: "BAJO",
    medium: "MEDIO",
    high: "ALTO",
    
    // Alert types
    panic: "PÁNICO",
    aiAnomaly: "ANOMALÍA IA",
    geoFence: "GEO CERCA",
    
    // Status
    active: "ACTIVO",
    investigating: "INVESTIGANDO",
    resolved: "RESUELTO",

    // Locations
    indiaGate: "Puerta de la India",
    redFort: "Fuerte Rojo",
    connaught: "Plaza Connaught",
    chandniChowk: "Chandni Chowk",
    lotusTemple: "Templo del Loto",
    newDelhi: "Nueva Delhi",
    delhi: "Delhi",
    constructionArea: "Construcción"
  }
};

export const getTranslation = (language: string): Translations => {
  return translations[language] || translations.en;
};