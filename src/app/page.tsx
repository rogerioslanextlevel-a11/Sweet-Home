"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  Package, 
  Receipt, 
  Camera, 
  Heart, 
  Bell, 
  Calendar,
  Plus,
  Search,
  Settings,
  Globe,
  Scan,
  ChevronRight,
  ShoppingCart,
  DollarSign,
  Clock,
  Star,
  Image,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Check,
  ArrowLeft,
  Palette,
  Monitor,
  Smartphone,
  Edit,
  Save,
  LogOut,
  User,
  Lock,
  TrendingUp,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Sistema de traduções
const translations = {
  pt: {
    // Navegação
    home: 'Home',
    pantry: 'Estoque',
    bills: 'Contas',
    analytics: 'Análise',
    extras: 'Extras',
    
    // Saudações e textos principais
    greeting: 'Olá, {name}! 💕',
    welcome: 'Bem-vindos ao Sweet Home',
    
    // Estoque
    pantryTitle: 'Estoque',
    pantrySubtitle: 'Gerencie seus mantimentos',
    addItem: 'Adicionar',
    editItem: 'Editar Item',
    addNewItem: 'Adicionar Item',
    itemName: 'Nome do Item',
    quantity: 'Quantidade',
    category: 'Categoria',
    validity: 'Validade (dias)',
    save: 'Salvar',
    cancel: 'Cancelar',
    searchItem: 'Buscar item...',
    scanCode: 'Scanner de Código',
    scanQuickly: 'Adicione itens rapidamente',
    scan: 'Escanear',
    emptyPantry: 'Estoque vazio',
    emptyPantryDesc: 'Adicione seus primeiros itens ao estoque para começar a organizar seus mantimentos.',
    addFirstItem: 'Adicionar Primeiro Item',
    items: 'itens',
    days: 'dias',
    
    // Scanner
    scannerTitle: 'Scanner de Código',
    scannerSubtitle: 'Escaneie códigos de barras para adicionar itens',
    scannerInstructions: 'Posicione o código de barras dentro da área destacada',
    scannerDetected: 'Código detectado!',
    scannerProcessing: 'Processando...',
    scannerSuccess: 'Item adicionado com sucesso!',
    scannerError: 'Erro ao processar código',
    scannerTryAgain: 'Tentar novamente',
    scannerClose: 'Fechar Scanner',
    scannerManualEntry: 'Entrada Manual',
    scannerManualCode: 'Digite o código manualmente',
    scannerCodePlaceholder: 'Ex: 7891234567890',
    scannerProcessCode: 'Processar Código',
    
    // Status
    urgent: 'Urgente',
    low: 'Pouco',
    ok: 'OK',
    paid: 'Pago',
    pending: 'Pendente',
    
    // Contas
    billsTitle: 'Contas',
    billsSubtitle: 'Controle suas finanças',
    newBill: 'Nova Conta',
    editBill: 'Editar Conta',
    addNewBill: 'Adicionar Nova Conta',
    billName: 'Nome da Conta',
    amount: 'Valor',
    dueDate: 'Data de Vencimento',
    receipts: 'Comprovantes',
    addReceipt: 'Adicionar',
    newReceipt: 'Novo Comprovante',
    date: 'Data',
    time: 'Horário',
    receipt: 'Comprovante',
    attachReceipt: 'Anexar Comprovante',
    receiptAttached: 'Comprovante Anexado',
    saveReceipt: 'Salvar Comprovante',
    noBills: 'Nenhuma conta cadastrada',
    noBillsDesc: 'Adicione suas primeiras contas para começar a controlar suas finanças.',
    addFirstBill: 'Adicionar Primeira Conta',
    noReceipts: 'Nenhum comprovante adicionado ainda',
    due: 'Vence',
    
    // Análise
    analyticsTitle: 'Análise de Gastos',
    analyticsSubtitle: 'Baseado nos seus comprovantes',
    totalSpent: 'Total Gasto',
    monthlyAverage: 'Média Mensal',
    months: 'meses',
    noExpenseData: 'Nenhum dado de gastos',
    noExpenseDataDesc: 'Adicione comprovantes de pagamento na aba "Contas" para ver sua análise de gastos aqui.',
    goToBills: 'Ir para Contas',
    monthlyTrend: 'Tendência Mensal',
    comparisonPrevious: 'Comparação com mês anterior',
    monthlyEvolution: 'Evolução Mensal',
    highestExpense: 'Maior Gasto',
    lowestExpense: 'Menor Gasto',
    maximum: 'Máximo',
    minimum: 'Mínimo',
    expensesByMonth: 'Gastos por Mês',
    insights: 'Insights',
    
    // Extras
    coupleGallery: 'Galeria do Casal',
    uploadPhotos: 'Fazer Upload de Fotos',
    takePhoto: 'Tirar Foto',
    photosAdded: 'foto(s) adicionada(s)!',
    photosCanBeUsed: 'Suas fotos podem ser usadas como background em algumas telas do app.',
    dreamBoard: 'Mural de Sonhos',
    newDream: 'Novo Sonho',
    editDream: 'Editar Sonho',
    dreamTitle: 'Título do Sonho',
    target: 'Meta (R$)',
    saved: 'Já Economizado (R$)',
    saveDream: 'Salvar Sonho',
    addDream: 'Adicionar Sonho',
    noDreams: 'Nenhum sonho adicionado ainda',
    firstDream: 'Primeiro Sonho',
    progress: 'Progresso',
    reminders: 'Lembretes',
    newReminder: 'Novo Lembrete',
    editReminder: 'Editar Lembrete',
    reminder: 'Lembrete',
    urgent: 'Urgente',
    saveReminder: 'Salvar Lembrete',
    addReminder: 'Adicionar Lembrete',
    noReminders: 'Nenhum lembrete adicionado ainda',
    firstReminder: 'Primeiro Lembrete',
    todayReminders: 'Lembretes de Hoje',
    couplesDreams: 'Sonhos do Casal',
    
    // Configurações
    settings: 'Configurações',
    language: 'Idioma',
    customization: 'Personalização',
    customize: 'Customizar',
    account: 'Conta',
    notifications: 'Notificações',
    enabled: 'Ativadas',
    logout: 'Sair',
    
    // Personalização
    personalizationTitle: 'Personalização',
    personalizationSubtitle: 'Customize o visual do app',
    homeScreen: 'Tela Inicial',
    loginScreen: 'Tela de Login',
    analyticsScreen: 'Análise de Gastos',
    languageSettings: 'Config. Idiomas',
    customBackground: 'Background personalizado',
    defaultBackground: 'Background padrão',
    default: 'Padrão',
    addPhotosToGallery: 'Adicione fotos na galeria para personalizar',
    goToGallery: 'Ir para Galeria de Fotos',
    
    // Categorias
    grains: 'Grãos',
    dairy: 'Laticínios',
    proteins: 'Proteínas',
    vegetables: 'Vegetais',
    fruits: 'Frutas',
    beverages: 'Bebidas',
    cleaning: 'Limpeza',
    others: 'Outros',
    
    // Categorias de contas
    utilities: 'Utilidades',
    telecommunications: 'Telecomunicações',
    housing: 'Moradia',
    transport: 'Transporte',
    food: 'Alimentação',
    health: 'Saúde',
    education: 'Educação',
    leisure: 'Lazer',
    
    // Botões e ações
    back: 'Voltar',
    add: 'Adicionar',
    edit: 'Editar',
    delete: 'Deletar',
    confirm: 'Confirmar',
    close: 'Fechar',
    
    // Placeholders
    exampleItems: 'Ex: Arroz, Feijão, Leite...',
    exampleQuantity: 'Ex: 2kg, 1L, 12 unid...',
    exampleBills: 'Ex: Energia, Internet, Água...',
    exampleAmount: 'Ex: R$ 150,00',
    exampleDate: 'Ex: 15/12',
    exampleDream: 'Ex: Viagem para Europa, Casa Própria...',
    exampleTarget: 'R$ 15.000',
    exampleSaved: 'R$ 5.250',
    exampleReminder: 'Ex: Comprar leite, Pagar conta...',
    
    // Insights
    insightReceipts: '📊 Você tem {count} comprovante{plural} registrado{plural}',
    insightMonths: '✨ Dados de {count} mês{plural} disponível{plural}',
    insightAverage: '💡 Sua média mensal é R$ {amount}',
    
    // Outros
    user: 'Usuário',
    couple: 'Casal',
    version: 'v1.0.0',
    customizedBackground: '✨ Background personalizado'
  },
  
  en: {
    // Navigation
    home: 'Home',
    pantry: 'Pantry',
    bills: 'Bills',
    analytics: 'Analytics',
    extras: 'Extras',
    
    // Greetings and main texts
    greeting: 'Hello, {name}! 💕',
    welcome: 'Welcome to Sweet Home',
    
    // Pantry
    pantryTitle: 'Pantry',
    pantrySubtitle: 'Manage your groceries',
    addItem: 'Add',
    editItem: 'Edit Item',
    addNewItem: 'Add Item',
    itemName: 'Item Name',
    quantity: 'Quantity',
    category: 'Category',
    validity: 'Validity (days)',
    save: 'Save',
    cancel: 'Cancel',
    searchItem: 'Search item...',
    scanCode: 'Code Scanner',
    scanQuickly: 'Add items quickly',
    scan: 'Scan',
    emptyPantry: 'Empty pantry',
    emptyPantryDesc: 'Add your first items to the pantry to start organizing your groceries.',
    addFirstItem: 'Add First Item',
    items: 'items',
    days: 'days',
    
    // Scanner
    scannerTitle: 'Code Scanner',
    scannerSubtitle: 'Scan barcodes to add items',
    scannerInstructions: 'Position the barcode within the highlighted area',
    scannerDetected: 'Code detected!',
    scannerProcessing: 'Processing...',
    scannerSuccess: 'Item added successfully!',
    scannerError: 'Error processing code',
    scannerTryAgain: 'Try again',
    scannerClose: 'Close Scanner',
    scannerManualEntry: 'Manual Entry',
    scannerManualCode: 'Enter code manually',
    scannerCodePlaceholder: 'Ex: 7891234567890',
    scannerProcessCode: 'Process Code',
    
    // Status
    urgent: 'Urgent',
    low: 'Low',
    ok: 'OK',
    paid: 'Paid',
    pending: 'Pending',
    
    // Bills
    billsTitle: 'Bills',
    billsSubtitle: 'Control your finances',
    newBill: 'New Bill',
    editBill: 'Edit Bill',
    addNewBill: 'Add New Bill',
    billName: 'Bill Name',
    amount: 'Amount',
    dueDate: 'Due Date',
    receipts: 'Receipts',
    addReceipt: 'Add',
    newReceipt: 'New Receipt',
    date: 'Date',
    time: 'Time',
    receipt: 'Receipt',
    attachReceipt: 'Attach Receipt',
    receiptAttached: 'Receipt Attached',
    saveReceipt: 'Save Receipt',
    noBills: 'No bills registered',
    noBillsDesc: 'Add your first bills to start controlling your finances.',
    addFirstBill: 'Add First Bill',
    noReceipts: 'No receipts added yet',
    due: 'Due',
    
    // Analytics
    analyticsTitle: 'Expense Analysis',
    analyticsSubtitle: 'Based on your receipts',
    totalSpent: 'Total Spent',
    monthlyAverage: 'Monthly Average',
    months: 'months',
    noExpenseData: 'No expense data',
    noExpenseDataDesc: 'Add payment receipts in the "Bills" tab to see your expense analysis here.',
    goToBills: 'Go to Bills',
    monthlyTrend: 'Monthly Trend',
    comparisonPrevious: 'Comparison with previous month',
    monthlyEvolution: 'Monthly Evolution',
    highestExpense: 'Highest Expense',
    lowestExpense: 'Lowest Expense',
    maximum: 'Maximum',
    minimum: 'Minimum',
    expensesByMonth: 'Expenses by Month',
    insights: 'Insights',
    
    // Extras
    coupleGallery: 'Couple\'s Gallery',
    uploadPhotos: 'Upload Photos',
    takePhoto: 'Take Photo',
    photosAdded: 'photo(s) added!',
    photosCanBeUsed: 'Your photos can be used as background in some app screens.',
    dreamBoard: 'Dream Board',
    newDream: 'New Dream',
    editDream: 'Edit Dream',
    dreamTitle: 'Dream Title',
    target: 'Target ($)',
    saved: 'Already Saved ($)',
    saveDream: 'Save Dream',
    addDream: 'Add Dream',
    noDreams: 'No dreams added yet',
    firstDream: 'First Dream',
    progress: 'Progress',
    reminders: 'Reminders',
    newReminder: 'New Reminder',
    editReminder: 'Edit Reminder',
    reminder: 'Reminder',
    urgent: 'Urgent',
    saveReminder: 'Save Reminder',
    addReminder: 'Add Reminder',
    noReminders: 'No reminders added yet',
    firstReminder: 'First Reminder',
    todayReminders: 'Today\'s Reminders',
    couplesDreams: 'Couple\'s Dreams',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    customization: 'Customization',
    customize: 'Customize',
    account: 'Account',
    notifications: 'Notifications',
    enabled: 'Enabled',
    logout: 'Logout',
    
    // Customization
    personalizationTitle: 'Customization',
    personalizationSubtitle: 'Customize the app\'s appearance',
    homeScreen: 'Home Screen',
    loginScreen: 'Login Screen',
    analyticsScreen: 'Expense Analysis',
    languageSettings: 'Language Settings',
    customBackground: 'Custom background',
    defaultBackground: 'Default background',
    default: 'Default',
    addPhotosToGallery: 'Add photos to gallery to customize',
    goToGallery: 'Go to Photo Gallery',
    
    // Categories
    grains: 'Grains',
    dairy: 'Dairy',
    proteins: 'Proteins',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    beverages: 'Beverages',
    cleaning: 'Cleaning',
    others: 'Others',
    
    // Bill categories
    utilities: 'Utilities',
    telecommunications: 'Telecommunications',
    housing: 'Housing',
    transport: 'Transport',
    food: 'Food',
    health: 'Health',
    education: 'Education',
    leisure: 'Leisure',
    
    // Buttons and actions
    back: 'Back',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    
    // Placeholders
    exampleItems: 'Ex: Rice, Beans, Milk...',
    exampleQuantity: 'Ex: 2kg, 1L, 12 units...',
    exampleBills: 'Ex: Electricity, Internet, Water...',
    exampleAmount: 'Ex: $150.00',
    exampleDate: 'Ex: 15/12',
    exampleDream: 'Ex: Trip to Europe, Own House...',
    exampleTarget: '$15,000',
    exampleSaved: '$5,250',
    exampleReminder: 'Ex: Buy milk, Pay bill...',
    
    // Insights
    insightReceipts: '📊 You have {count} receipt{plural} registered',
    insightMonths: '✨ Data from {count} month{plural} available',
    insightAverage: '💡 Your monthly average is ${amount}',
    
    // Others
    user: 'User',
    couple: 'Couple',
    version: 'v1.0.0',
    customizedBackground: '✨ Custom background'
  },
  
  es: {
    // Navegación
    home: 'Inicio',
    pantry: 'Despensa',
    bills: 'Cuentas',
    analytics: 'Análisis',
    extras: 'Extras',
    
    // Saludos y textos principales
    greeting: '¡Hola, {name}! 💕',
    welcome: 'Bienvenidos a Sweet Home',
    
    // Despensa
    pantryTitle: 'Despensa',
    pantrySubtitle: 'Gestiona tus alimentos',
    addItem: 'Agregar',
    editItem: 'Editar Artículo',
    addNewItem: 'Agregar Artículo',
    itemName: 'Nombre del Artículo',
    quantity: 'Cantidad',
    category: 'Categoría',
    validity: 'Validez (días)',
    save: 'Guardar',
    cancel: 'Cancelar',
    searchItem: 'Buscar artículo...',
    scanCode: 'Escáner de Código',
    scanQuickly: 'Agregar artículos rápidamente',
    scan: 'Escanear',
    emptyPantry: 'Despensa vacía',
    emptyPantryDesc: 'Agrega tus primeros artículos a la despensa para comenzar a organizar tus alimentos.',
    addFirstItem: 'Agregar Primer Artículo',
    items: 'artículos',
    days: 'días',
    
    // Scanner
    scannerTitle: 'Escáner de Código',
    scannerSubtitle: 'Escanea códigos de barras para agregar artículos',
    scannerInstructions: 'Posiciona el código de barras dentro del área resaltada',
    scannerDetected: '¡Código detectado!',
    scannerProcessing: 'Procesando...',
    scannerSuccess: '¡Artículo agregado exitosamente!',
    scannerError: 'Error al procesar código',
    scannerTryAgain: 'Intentar de nuevo',
    scannerClose: 'Cerrar Escáner',
    scannerManualEntry: 'Entrada Manual',
    scannerManualCode: 'Ingresa el código manualmente',
    scannerCodePlaceholder: 'Ej: 7891234567890',
    scannerProcessCode: 'Procesar Código',
    
    // Estado
    urgent: 'Urgente',
    low: 'Bajo',
    ok: 'OK',
    paid: 'Pagado',
    pending: 'Pendiente',
    
    // Cuentas
    billsTitle: 'Cuentas',
    billsSubtitle: 'Controla tus finanzas',
    newBill: 'Nueva Cuenta',
    editBill: 'Editar Cuenta',
    addNewBill: 'Agregar Nueva Cuenta',
    billName: 'Nombre de la Cuenta',
    amount: 'Cantidad',
    dueDate: 'Fecha de Vencimiento',
    receipts: 'Recibos',
    addReceipt: 'Agregar',
    newReceipt: 'Nuevo Recibo',
    date: 'Fecha',
    time: 'Hora',
    receipt: 'Recibo',
    attachReceipt: 'Adjuntar Recibo',
    receiptAttached: 'Recibo Adjuntado',
    saveReceipt: 'Guardar Recibo',
    noBills: 'No hay cuentas registradas',
    noBillsDesc: 'Agrega tus primeras cuentas para comenzar a controlar tus finanzas.',
    addFirstBill: 'Agregar Primera Cuenta',
    noReceipts: 'No se han agregado recibos aún',
    due: 'Vence',
    
    // Análisis
    analyticsTitle: 'Análisis de Gastos',
    analyticsSubtitle: 'Basado en tus recibos',
    totalSpent: 'Total Gastado',
    monthlyAverage: 'Promedio Mensual',
    months: 'meses',
    noExpenseData: 'No hay datos de gastos',
    noExpenseDataDesc: 'Agrega recibos de pago en la pestaña "Cuentas" para ver tu análisis de gastos aquí.',
    goToBills: 'Ir a Cuentas',
    monthlyTrend: 'Tendencia Mensual',
    comparisonPrevious: 'Comparación con el mes anterior',
    monthlyEvolution: 'Evolución Mensual',
    highestExpense: 'Mayor Gasto',
    lowestExpense: 'Menor Gasto',
    maximum: 'Máximo',
    minimum: 'Mínimo',
    expensesByMonth: 'Gastos por Mes',
    insights: 'Perspectivas',
    
    // Extras
    coupleGallery: 'Galería de la Pareja',
    uploadPhotos: 'Subir Fotos',
    takePhoto: 'Tomar Foto',
    photosAdded: 'foto(s) agregada(s)!',
    photosCanBeUsed: 'Tus fotos pueden usarse como fondo en algunas pantallas de la aplicación.',
    dreamBoard: 'Tablero de Sueños',
    newDream: 'Nuevo Sueño',
    editDream: 'Editar Sueño',
    dreamTitle: 'Título del Sueño',
    target: 'Meta ($)',
    saved: 'Ya Ahorrado ($)',
    saveDream: 'Guardar Sueño',
    addDream: 'Agregar Sueño',
    noDreams: 'No se han agregado sueños aún',
    firstDream: 'Primer Sueño',
    progress: 'Progreso',
    reminders: 'Recordatorios',
    newReminder: 'Nuevo Recordatorio',
    editReminder: 'Editar Recordatorio',
    reminder: 'Recordatorio',
    urgent: 'Urgente',
    saveReminder: 'Guardar Recordatorio',
    addReminder: 'Agregar Recordatorio',
    noReminders: 'No se han agregado recordatorios aún',
    firstReminder: 'Primer Recordatorio',
    todayReminders: 'Recordatorios de Hoy',
    couplesDreams: 'Sueños de la Pareja',
    
    // Configuraciones
    settings: 'Configuraciones',
    language: 'Idioma',
    customization: 'Personalización',
    customize: 'Personalizar',
    account: 'Cuenta',
    notifications: 'Notificaciones',
    enabled: 'Activadas',
    logout: 'Cerrar Sesión',
    
    // Personalización
    personalizationTitle: 'Personalización',
    personalizationSubtitle: 'Personaliza la apariencia de la aplicación',
    homeScreen: 'Pantalla de Inicio',
    loginScreen: 'Pantalla de Inicio de Sesión',
    analyticsScreen: 'Análisis de Gastos',
    languageSettings: 'Configuración de Idioma',
    customBackground: 'Fondo personalizado',
    defaultBackground: 'Fondo predeterminado',
    default: 'Predeterminado',
    addPhotosToGallery: 'Agrega fotos a la galería para personalizar',
    goToGallery: 'Ir a la Galería de Fotos',
    
    // Categorías
    grains: 'Granos',
    dairy: 'Lácteos',
    proteins: 'Proteínas',
    vegetables: 'Vegetales',
    fruits: 'Frutas',
    beverages: 'Bebidas',
    cleaning: 'Limpieza',
    others: 'Otros',
    
    // Categorías de cuentas
    utilities: 'Servicios Públicos',
    telecommunications: 'Telecomunicaciones',
    housing: 'Vivienda',
    transport: 'Transporte',
    food: 'Alimentación',
    health: 'Salud',
    education: 'Educación',
    leisure: 'Ocio',
    
    // Botones y acciones
    back: 'Atrás',
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    close: 'Cerrar',
    
    // Placeholders
    exampleItems: 'Ej: Arroz, Frijoles, Leche...',
    exampleQuantity: 'Ej: 2kg, 1L, 12 unidades...',
    exampleBills: 'Ej: Electricidad, Internet, Agua...',
    exampleAmount: 'Ej: $150.00',
    exampleDate: 'Ej: 15/12',
    exampleDream: 'Ej: Viaje a Europa, Casa Propia...',
    exampleTarget: '$15,000',
    exampleSaved: '$5,250',
    exampleReminder: 'Ej: Comprar leche, Pagar cuenta...',
    
    // Perspectivas
    insightReceipts: '📊 Tienes {count} recibo{plural} registrado{plural}',
    insightMonths: '✨ Datos de {count} mes{plural} disponible{plural}',
    insightAverage: '💡 Tu promedio mensual es ${amount}',
    
    // Otros
    user: 'Usuario',
    couple: 'Pareja',
    version: 'v1.0.0',
    customizedBackground: '✨ Fondo personalizado'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    pantry: 'Garde-manger',
    bills: 'Factures',
    analytics: 'Analyse',
    extras: 'Extras',
    
    // Salutations et textes principaux
    greeting: 'Bonjour, {name}! 💕',
    welcome: 'Bienvenue à Sweet Home',
    
    // Garde-manger
    pantryTitle: 'Garde-manger',
    pantrySubtitle: 'Gérez vos provisions',
    addItem: 'Ajouter',
    editItem: 'Modifier l\'Article',
    addNewItem: 'Ajouter un Article',
    itemName: 'Nom de l\'Article',
    quantity: 'Quantité',
    category: 'Catégorie',
    validity: 'Validité (jours)',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    searchItem: 'Rechercher un article...',
    scanCode: 'Scanner de Code',
    scanQuickly: 'Ajouter des articles rapidement',
    scan: 'Scanner',
    emptyPantry: 'Garde-manger vide',
    emptyPantryDesc: 'Ajoutez vos premiers articles au garde-manger pour commencer à organiser vos provisions.',
    addFirstItem: 'Ajouter le Premier Article',
    items: 'articles',
    days: 'jours',
    
    // Scanner
    scannerTitle: 'Scanner de Code',
    scannerSubtitle: 'Scannez les codes-barres pour ajouter des articles',
    scannerInstructions: 'Positionnez le code-barres dans la zone surlignée',
    scannerDetected: 'Code détecté!',
    scannerProcessing: 'Traitement...',
    scannerSuccess: 'Article ajouté avec succès!',
    scannerError: 'Erreur lors du traitement du code',
    scannerTryAgain: 'Réessayer',
    scannerClose: 'Fermer le Scanner',
    scannerManualEntry: 'Saisie Manuelle',
    scannerManualCode: 'Entrez le code manuellement',
    scannerCodePlaceholder: 'Ex: 7891234567890',
    scannerProcessCode: 'Traiter le Code',
    
    // Statut
    urgent: 'Urgent',
    low: 'Faible',
    ok: 'OK',
    paid: 'Payé',
    pending: 'En attente',
    
    // Factures
    billsTitle: 'Factures',
    billsSubtitle: 'Contrôlez vos finances',
    newBill: 'Nouvelle Facture',
    editBill: 'Modifier la Facture',
    addNewBill: 'Ajouter une Nouvelle Facture',
    billName: 'Nom de la Facture',
    amount: 'Montant',
    dueDate: 'Date d\'Échéance',
    receipts: 'Reçus',
    addReceipt: 'Ajouter',
    newReceipt: 'Nouveau Reçu',
    date: 'Date',
    time: 'Heure',
    receipt: 'Reçu',
    attachReceipt: 'Joindre un Reçu',
    receiptAttached: 'Reçu Joint',
    saveReceipt: 'Sauvegarder le Reçu',
    noBills: 'Aucune facture enregistrée',
    noBillsDesc: 'Ajoutez vos premières factures pour commencer à contrôler vos finances.',
    addFirstBill: 'Ajouter la Première Facture',
    noReceipts: 'Aucun reçu ajouté encore',
    due: 'Échéance',
    
    // Analyse
    analyticsTitle: 'Analyse des Dépenses',
    analyticsSubtitle: 'Basé sur vos reçus',
    totalSpent: 'Total Dépensé',
    monthlyAverage: 'Moyenne Mensuelle',
    months: 'mois',
    noExpenseData: 'Aucune donnée de dépense',
    noExpenseDataDesc: 'Ajoutez des reçus de paiement dans l\'onglet "Factures" pour voir votre analyse des dépenses ici.',
    goToBills: 'Aller aux Factures',
    monthlyTrend: 'Tendance Mensuelle',
    comparisonPrevious: 'Comparaison avec le mois précédent',
    monthlyEvolution: 'Évolution Mensuelle',
    highestExpense: 'Dépense la Plus Élevée',
    lowestExpense: 'Dépense la Plus Faible',
    maximum: 'Maximum',
    minimum: 'Minimum',
    expensesByMonth: 'Dépenses par Mois',
    insights: 'Aperçus',
    
    // Extras
    coupleGallery: 'Galerie du Couple',
    uploadPhotos: 'Télécharger des Photos',
    takePhoto: 'Prendre une Photo',
    photosAdded: 'photo(s) ajoutée(s)!',
    photosCanBeUsed: 'Vos photos peuvent être utilisées comme arrière-plan dans certains écrans de l\'application.',
    dreamBoard: 'Tableau des Rêves',
    newDream: 'Nouveau Rêve',
    editDream: 'Modifier le Rêve',
    dreamTitle: 'Titre du Rêve',
    target: 'Objectif (€)',
    saved: 'Déjà Économisé (€)',
    saveDream: 'Sauvegarder le Rêve',
    addDream: 'Ajouter un Rêve',
    noDreams: 'Aucun rêve ajouté encore',
    firstDream: 'Premier Rêve',
    progress: 'Progrès',
    reminders: 'Rappels',
    newReminder: 'Nouveau Rappel',
    editReminder: 'Modifier le Rappel',
    reminder: 'Rappel',
    urgent: 'Urgent',
    saveReminder: 'Sauvegarder le Rappel',
    addReminder: 'Ajouter un Rappel',
    noReminders: 'Aucun rappel ajouté encore',
    firstReminder: 'Premier Rappel',
    todayReminders: 'Rappels d\'Aujourd\'hui',
    couplesDreams: 'Rêves du Couple',
    
    // Paramètres
    settings: 'Paramètres',
    language: 'Langue',
    customization: 'Personnalisation',
    customize: 'Personnaliser',
    account: 'Compte',
    notifications: 'Notifications',
    enabled: 'Activées',
    logout: 'Déconnexion',
    
    // Personnalisation
    personalizationTitle: 'Personnalisation',
    personalizationSubtitle: 'Personnalisez l\'apparence de l\'application',
    homeScreen: 'Écran d\'Accueil',
    loginScreen: 'Écran de Connexion',
    analyticsScreen: 'Analyse des Dépenses',
    languageSettings: 'Paramètres de Langue',
    customBackground: 'Arrière-plan personnalisé',
    defaultBackground: 'Arrière-plan par défaut',
    default: 'Par défaut',
    addPhotosToGallery: 'Ajoutez des photos à la galerie pour personnaliser',
    goToGallery: 'Aller à la Galerie de Photos',
    
    // Catégories
    grains: 'Céréales',
    dairy: 'Produits Laitiers',
    proteins: 'Protéines',
    vegetables: 'Légumes',
    fruits: 'Fruits',
    beverages: 'Boissons',
    cleaning: 'Nettoyage',
    others: 'Autres',
    
    // Catégories de factures
    utilities: 'Services Publics',
    telecommunications: 'Télécommunications',
    housing: 'Logement',
    transport: 'Transport',
    food: 'Alimentation',
    health: 'Santé',
    education: 'Éducation',
    leisure: 'Loisirs',
    
    // Boutons et actions
    back: 'Retour',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    close: 'Fermer',
    
    // Placeholders
    exampleItems: 'Ex: Riz, Haricots, Lait...',
    exampleQuantity: 'Ex: 2kg, 1L, 12 unités...',
    exampleBills: 'Ex: Électricité, Internet, Eau...',
    exampleAmount: 'Ex: €150.00',
    exampleDate: 'Ex: 15/12',
    exampleDream: 'Ex: Voyage en Europe, Maison Propre...',
    exampleTarget: '€15,000',
    exampleSaved: '€5,250',
    exampleReminder: 'Ex: Acheter du lait, Payer la facture...',
    
    // Aperçus
    insightReceipts: '📊 Vous avez {count} reçu{plural} enregistré{plural}',
    insightMonths: '✨ Données de {count} mois disponible{plural}',
    insightAverage: '💡 Votre moyenne mensuelle est €{amount}',
    
    // Autres
    user: 'Utilisateur',
    couple: 'Couple',
    version: 'v1.0.0',
    customizedBackground: '✨ Arrière-plan personnalisé'
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    pantry: 'Vorratskammer',
    bills: 'Rechnungen',
    analytics: 'Analyse',
    extras: 'Extras',
    
    // Begrüßungen und Haupttexte
    greeting: 'Hallo, {name}! 💕',
    welcome: 'Willkommen bei Sweet Home',
    
    // Vorratskammer
    pantryTitle: 'Vorratskammer',
    pantrySubtitle: 'Verwalten Sie Ihre Lebensmittel',
    addItem: 'Hinzufügen',
    editItem: 'Artikel Bearbeiten',
    addNewItem: 'Artikel Hinzufügen',
    itemName: 'Artikelname',
    quantity: 'Menge',
    category: 'Kategorie',
    validity: 'Gültigkeit (Tage)',
    save: 'Speichern',
    cancel: 'Abbrechen',
    searchItem: 'Artikel suchen...',
    scanCode: 'Code-Scanner',
    scanQuickly: 'Artikel schnell hinzufügen',
    scan: 'Scannen',
    emptyPantry: 'Leere Vorratskammer',
    emptyPantryDesc: 'Fügen Sie Ihre ersten Artikel zur Vorratskammer hinzu, um Ihre Lebensmittel zu organisieren.',
    addFirstItem: 'Ersten Artikel Hinzufügen',
    items: 'Artikel',
    days: 'Tage',
    
    // Scanner
    scannerTitle: 'Code-Scanner',
    scannerSubtitle: 'Scannen Sie Barcodes, um Artikel hinzuzufügen',
    scannerInstructions: 'Positionieren Sie den Barcode im hervorgehobenen Bereich',
    scannerDetected: 'Code erkannt!',
    scannerProcessing: 'Verarbeitung...',
    scannerSuccess: 'Artikel erfolgreich hinzugefügt!',
    scannerError: 'Fehler beim Verarbeiten des Codes',
    scannerTryAgain: 'Erneut versuchen',
    scannerClose: 'Scanner Schließen',
    scannerManualEntry: 'Manuelle Eingabe',
    scannerManualCode: 'Code manuell eingeben',
    scannerCodePlaceholder: 'Z.B.: 7891234567890',
    scannerProcessCode: 'Code Verarbeiten',
    
    // Status
    urgent: 'Dringend',
    low: 'Niedrig',
    ok: 'OK',
    paid: 'Bezahlt',
    pending: 'Ausstehend',
    
    // Rechnungen
    billsTitle: 'Rechnungen',
    billsSubtitle: 'Kontrollieren Sie Ihre Finanzen',
    newBill: 'Neue Rechnung',
    editBill: 'Rechnung Bearbeiten',
    addNewBill: 'Neue Rechnung Hinzufügen',
    billName: 'Rechnungsname',
    amount: 'Betrag',
    dueDate: 'Fälligkeitsdatum',
    receipts: 'Belege',
    addReceipt: 'Hinzufügen',
    newReceipt: 'Neuer Beleg',
    date: 'Datum',
    time: 'Zeit',
    receipt: 'Beleg',
    attachReceipt: 'Beleg Anhängen',
    receiptAttached: 'Beleg Angehängt',
    saveReceipt: 'Beleg Speichern',
    noBills: 'Keine Rechnungen registriert',
    noBillsDesc: 'Fügen Sie Ihre ersten Rechnungen hinzu, um Ihre Finanzen zu kontrollieren.',
    addFirstBill: 'Erste Rechnung Hinzufügen',
    noReceipts: 'Noch keine Belege hinzugefügt',
    due: 'Fällig',
    
    // Analyse
    analyticsTitle: 'Ausgabenanalyse',
    analyticsSubtitle: 'Basierend auf Ihren Belegen',
    totalSpent: 'Gesamt Ausgegeben',
    monthlyAverage: 'Monatlicher Durchschnitt',
    months: 'Monate',
    noExpenseData: 'Keine Ausgabendaten',
    noExpenseDataDesc: 'Fügen Sie Zahlungsbelege im Tab "Rechnungen" hinzu, um Ihre Ausgabenanalyse hier zu sehen.',
    goToBills: 'Zu Rechnungen Gehen',
    monthlyTrend: 'Monatlicher Trend',
    comparisonPrevious: 'Vergleich mit dem Vormonat',
    monthlyEvolution: 'Monatliche Entwicklung',
    highestExpense: 'Höchste Ausgabe',
    lowestExpense: 'Niedrigste Ausgabe',
    maximum: 'Maximum',
    minimum: 'Minimum',
    expensesByMonth: 'Ausgaben nach Monat',
    insights: 'Einblicke',
    
    // Extras
    coupleGallery: 'Paar-Galerie',
    uploadPhotos: 'Fotos Hochladen',
    takePhoto: 'Foto Aufnehmen',
    photosAdded: 'Foto(s) hinzugefügt!',
    photosCanBeUsed: 'Ihre Fotos können als Hintergrund in einigen App-Bildschirmen verwendet werden.',
    dreamBoard: 'Traum-Board',
    newDream: 'Neuer Traum',
    editDream: 'Traum Bearbeiten',
    dreamTitle: 'Traumtitel',
    target: 'Ziel (€)',
    saved: 'Bereits Gespart (€)',
    saveDream: 'Traum Speichern',
    addDream: 'Traum Hinzufügen',
    noDreams: 'Noch keine Träume hinzugefügt',
    firstDream: 'Erster Traum',
    progress: 'Fortschritt',
    reminders: 'Erinnerungen',
    newReminder: 'Neue Erinnerung',
    editReminder: 'Erinnerung Bearbeiten',
    reminder: 'Erinnerung',
    urgent: 'Dringend',
    saveReminder: 'Erinnerung Speichern',
    addReminder: 'Erinnerung Hinzufügen',
    noReminders: 'Noch keine Erinnerungen hinzugefügt',
    firstReminder: 'Erste Erinnerung',
    todayReminders: 'Heutige Erinnerungen',
    couplesDreams: 'Träume des Paares',
    
    // Einstellungen
    settings: 'Einstellungen',
    language: 'Sprache',
    customization: 'Anpassung',
    customize: 'Anpassen',
    account: 'Konto',
    notifications: 'Benachrichtigungen',
    enabled: 'Aktiviert',
    logout: 'Abmelden',
    
    // Anpassung
    personalizationTitle: 'Anpassung',
    personalizationSubtitle: 'Passen Sie das Aussehen der App an',
    homeScreen: 'Startbildschirm',
    loginScreen: 'Anmeldebildschirm',
    analyticsScreen: 'Ausgabenanalyse',
    languageSettings: 'Spracheinstellungen',
    customBackground: 'Benutzerdefinierter Hintergrund',
    defaultBackground: 'Standard-Hintergrund',
    default: 'Standard',
    addPhotosToGallery: 'Fügen Sie Fotos zur Galerie hinzu, um anzupassen',
    goToGallery: 'Zur Foto-Galerie Gehen',
    
    // Kategorien
    grains: 'Getreide',
    dairy: 'Milchprodukte',
    proteins: 'Proteine',
    vegetables: 'Gemüse',
    fruits: 'Früchte',
    beverages: 'Getränke',
    cleaning: 'Reinigung',
    others: 'Andere',
    
    // Rechnungskategorien
    utilities: 'Versorgungsunternehmen',
    telecommunications: 'Telekommunikation',
    housing: 'Wohnen',
    transport: 'Transport',
    food: 'Lebensmittel',
    health: 'Gesundheit',
    education: 'Bildung',
    leisure: 'Freizeit',
    
    // Schaltflächen und Aktionen
    back: 'Zurück',
    add: 'Hinzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    close: 'Schließen',
    
    // Platzhalter
    exampleItems: 'Z.B.: Reis, Bohnen, Milch...',
    exampleQuantity: 'Z.B.: 2kg, 1L, 12 Stück...',
    exampleBills: 'Z.B.: Strom, Internet, Wasser...',
    exampleAmount: 'Z.B.: €150.00',
    exampleDate: 'Z.B.: 15/12',
    exampleDream: 'Z.B.: Reise nach Europa, Eigenes Haus...',
    exampleTarget: '€15,000',
    exampleSaved: '€5,250',
    exampleReminder: 'Z.B.: Milch kaufen, Rechnung bezahlen...',
    
    // Einblicke
    insightReceipts: '📊 Sie haben {count} Beleg{plural} registriert',
    insightMonths: '✨ Daten von {count} Monat{plural} verfügbar',
    insightAverage: '💡 Ihr monatlicher Durchschnitt ist €{amount}',
    
    // Andere
    user: 'Benutzer',
    couple: 'Paar',
    version: 'v1.0.0',
    customizedBackground: '✨ Benutzerdefinierter Hintergrund'
  },
  
  it: {
    // Navigazione
    home: 'Home',
    pantry: 'Dispensa',
    bills: 'Bollette',
    analytics: 'Analisi',
    extras: 'Extra',
    
    // Saluti e testi principali
    greeting: 'Ciao, {name}! 💕',
    welcome: 'Benvenuti a Sweet Home',
    
    // Dispensa
    pantryTitle: 'Dispensa',
    pantrySubtitle: 'Gestisci i tuoi alimenti',
    addItem: 'Aggiungi',
    editItem: 'Modifica Articolo',
    addNewItem: 'Aggiungi Articolo',
    itemName: 'Nome Articolo',
    quantity: 'Quantità',
    category: 'Categoria',
    validity: 'Validità (giorni)',
    save: 'Salva',
    cancel: 'Annulla',
    searchItem: 'Cerca articolo...',
    scanCode: 'Scanner Codice',
    scanQuickly: 'Aggiungi articoli rapidamente',
    scan: 'Scansiona',
    emptyPantry: 'Dispensa vuota',
    emptyPantryDesc: 'Aggiungi i tuoi primi articoli alla dispensa per iniziare a organizzare i tuoi alimenti.',
    addFirstItem: 'Aggiungi Primo Articolo',
    items: 'articoli',
    days: 'giorni',
    
    // Scanner
    scannerTitle: 'Scanner Codice',
    scannerSubtitle: 'Scansiona codici a barre per aggiungere articoli',
    scannerInstructions: 'Posiziona il codice a barre nell\'area evidenziata',
    scannerDetected: 'Codice rilevato!',
    scannerProcessing: 'Elaborazione...',
    scannerSuccess: 'Articolo aggiunto con successo!',
    scannerError: 'Errore nell\'elaborazione del codice',
    scannerTryAgain: 'Riprova',
    scannerClose: 'Chiudi Scanner',
    scannerManualEntry: 'Inserimento Manuale',
    scannerManualCode: 'Inserisci il codice manualmente',
    scannerCodePlaceholder: 'Es: 7891234567890',
    scannerProcessCode: 'Elabora Codice',
    
    // Stato
    urgent: 'Urgente',
    low: 'Basso',
    ok: 'OK',
    paid: 'Pagato',
    pending: 'In sospeso',
    
    // Bollette
    billsTitle: 'Bollette',
    billsSubtitle: 'Controlla le tue finanze',
    newBill: 'Nuova Bolletta',
    editBill: 'Modifica Bolletta',
    addNewBill: 'Aggiungi Nuova Bolletta',
    billName: 'Nome Bolletta',
    amount: 'Importo',
    dueDate: 'Data di Scadenza',
    receipts: 'Ricevute',
    addReceipt: 'Aggiungi',
    newReceipt: 'Nuova Ricevuta',
    date: 'Data',
    time: 'Ora',
    receipt: 'Ricevuta',
    attachReceipt: 'Allega Ricevuta',
    receiptAttached: 'Ricevuta Allegata',
    saveReceipt: 'Salva Ricevuta',
    noBills: 'Nessuna bolletta registrata',
    noBillsDesc: 'Aggiungi le tue prime bollette per iniziare a controllare le tue finanze.',
    addFirstBill: 'Aggiungi Prima Bolletta',
    noReceipts: 'Nessuna ricevuta aggiunta ancora',
    due: 'Scadenza',
    
    // Analisi
    analyticsTitle: 'Analisi Spese',
    analyticsSubtitle: 'Basato sulle tue ricevute',
    totalSpent: 'Totale Speso',
    monthlyAverage: 'Media Mensile',
    months: 'mesi',
    noExpenseData: 'Nessun dato di spesa',
    noExpenseDataDesc: 'Aggiungi ricevute di pagamento nella scheda "Bollette" per vedere la tua analisi delle spese qui.',
    goToBills: 'Vai alle Bollette',
    monthlyTrend: 'Tendenza Mensile',
    comparisonPrevious: 'Confronto con il mese precedente',
    monthlyEvolution: 'Evoluzione Mensile',
    highestExpense: 'Spesa Più Alta',
    lowestExpense: 'Spesa Più Bassa',
    maximum: 'Massimo',
    minimum: 'Minimo',
    expensesByMonth: 'Spese per Mese',
    insights: 'Approfondimenti',
    
    // Extra
    coupleGallery: 'Galleria della Coppia',
    uploadPhotos: 'Carica Foto',
    takePhoto: 'Scatta Foto',
    photosAdded: 'foto aggiunte!',
    photosCanBeUsed: 'Le tue foto possono essere utilizzate come sfondo in alcune schermate dell\'app.',
    dreamBoard: 'Bacheca dei Sogni',
    newDream: 'Nuovo Sogno',
    editDream: 'Modifica Sogno',
    dreamTitle: 'Titolo del Sogno',
    target: 'Obiettivo (€)',
    saved: 'Già Risparmiato (€)',
    saveDream: 'Salva Sogno',
    addDream: 'Aggiungi Sogno',
    noDreams: 'Nessun sogno aggiunto ancora',
    firstDream: 'Primo Sogno',
    progress: 'Progresso',
    reminders: 'Promemoria',
    newReminder: 'Nuovo Promemoria',
    editReminder: 'Modifica Promemoria',
    reminder: 'Promemoria',
    urgent: 'Urgente',
    saveReminder: 'Salva Promemoria',
    addReminder: 'Aggiungi Promemoria',
    noReminders: 'Nessun promemoria aggiunto ancora',
    firstReminder: 'Primo Promemoria',
    todayReminders: 'Promemoria di Oggi',
    couplesDreams: 'Sogni della Coppia',
    
    // Impostazioni
    settings: 'Impostazioni',
    language: 'Lingua',
    customization: 'Personalizzazione',
    customize: 'Personalizza',
    account: 'Account',
    notifications: 'Notifiche',
    enabled: 'Attivate',
    logout: 'Disconnetti',
    
    // Personalizzazione
    personalizationTitle: 'Personalizzazione',
    personalizationSubtitle: 'Personalizza l\'aspetto dell\'app',
    homeScreen: 'Schermata Home',
    loginScreen: 'Schermata di Login',
    analyticsScreen: 'Analisi Spese',
    languageSettings: 'Impostazioni Lingua',
    customBackground: 'Sfondo personalizzato',
    defaultBackground: 'Sfondo predefinito',
    default: 'Predefinito',
    addPhotosToGallery: 'Aggiungi foto alla galleria per personalizzare',
    goToGallery: 'Vai alla Galleria Foto',
    
    // Categorie
    grains: 'Cereali',
    dairy: 'Latticini',
    proteins: 'Proteine',
    vegetables: 'Verdure',
    fruits: 'Frutta',
    beverages: 'Bevande',
    cleaning: 'Pulizia',
    others: 'Altri',
    
    // Categorie bollette
    utilities: 'Utenze',
    telecommunications: 'Telecomunicazioni',
    housing: 'Abitazione',
    transport: 'Trasporti',
    food: 'Alimentazione',
    health: 'Salute',
    education: 'Istruzione',
    leisure: 'Tempo libero',
    
    // Pulsanti e azioni
    back: 'Indietro',
    add: 'Aggiungi',
    edit: 'Modifica',
    delete: 'Elimina',
    confirm: 'Conferma',
    close: 'Chiudi',
    
    // Placeholder
    exampleItems: 'Es: Riso, Fagioli, Latte...',
    exampleQuantity: 'Es: 2kg, 1L, 12 pezzi...',
    exampleBills: 'Es: Elettricità, Internet, Acqua...',
    exampleAmount: 'Es: €150.00',
    exampleDate: 'Es: 15/12',
    exampleDream: 'Es: Viaggio in Europa, Casa Propria...',
    exampleTarget: '€15,000',
    exampleSaved: '€5,250',
    exampleReminder: 'Es: Comprare latte, Pagare bolletta...',
    
    // Approfondimenti
    insightReceipts: '📊 Hai {count} ricevuta{plural} registrata{plural}',
    insightMonths: '✨ Dati di {count} mese{plural} disponibile{plural}',
    insightAverage: '💡 La tua media mensile è €{amount}',
    
    // Altri
    user: 'Utente',
    couple: 'Coppia',
    version: 'v1.0.0',
    customizedBackground: '✨ Sfondo personalizzato'
  }
}

export default function SweetHome() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{email: string, name: string} | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [activeTab, setActiveTab] = useState('home')
  const [language, setLanguage] = useState('pt')
  const [showLanguageSettings, setShowLanguageSettings] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [customBackgrounds, setCustomBackgrounds] = useState({
    home: '',
    pantry: '',
    bills: '',
    extras: '',
    languageSettings: '',
    login: '',
    analytics: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const receiptInputRef = useRef<HTMLInputElement>(null)

  // Estados do scanner
  const [scannerStatus, setScannerStatus] = useState<'idle' | 'scanning' | 'detected' | 'processing' | 'success' | 'error'>('idle')
  const [scannedCode, setScannedCode] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [showManualEntry, setShowManualEntry] = useState(false)

  // Estados para campos de pesquisa - CORRIGIDO
  const [searchTerm, setSearchTerm] = useState('')

  // Função para obter tradução
  const t = (key: string, params?: {[key: string]: string | number}) => {
    const translation = translations[language as keyof typeof translations]?.[key as keyof typeof translation] || translations.pt[key as keyof typeof translations.pt] || key
    
    if (params) {
      return Object.entries(params).reduce((text, [param, value]) => {
        return text.replace(`{${param}}`, String(value))
      }, translation)
    }
    
    return translation
  }

  // Função para obter plural correto
  const getPlural = (count: number, language: string) => {
    if (language === 'en') {
      return count !== 1 ? 's' : ''
    }
    if (language === 'pt' || language === 'es' || language === 'it') {
      return count !== 1 ? 's' : ''
    }
    if (language === 'fr') {
      return count !== 1 ? 's' : ''
    }
    if (language === 'de') {
      return count !== 1 ? 'e' : ''
    }
    return ''
  }

  // Carregar idioma salvo do localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('sweetHomeLanguage')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Salvar idioma no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('sweetHomeLanguage', language)
  }, [language])

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('sweetHomeUser')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          if (parsedUser.isAuthenticated) {
            setUser(parsedUser)
            setIsAuthenticated(true)
          } else {
            router.push('/login')
          }
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Carregar configurações de background do localStorage
  useEffect(() => {
    const savedBackgrounds = localStorage.getItem('sweetHomeBackgrounds')
    if (savedBackgrounds) {
      try {
        setCustomBackgrounds(JSON.parse(savedBackgrounds))
      } catch (error) {
        console.error('Erro ao carregar backgrounds:', error)
      }
    }
  }, [])

  // Salvar configurações de background no localStorage
  useEffect(() => {
    localStorage.setItem('sweetHomeBackgrounds', JSON.stringify(customBackgrounds))
  }, [customBackgrounds])

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('sweetHomeUser')
    router.push('/login')
  }

  // Estado do estoque - ZERADO conforme solicitado
  const [pantryItems, setPantryItems] = useState<Array<{
    id: number
    name: string
    quantity: string
    category: string
    status: string
    daysLeft: number
  }>>([])

  // Estado para adicionar/editar itens
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Grãos',
    daysLeft: 30
  })

  // Estado das contas - ZERADO conforme solicitado
  const [bills, setBills] = useState<Array<{
    id: number
    name: string
    amount: string
    dueDate: string
    status: string
    category: string
  }>>([])

  // Estado para adicionar/editar conta
  const [showAddBillForm, setShowAddBillForm] = useState(false)
  const [editingBill, setEditingBill] = useState<number | null>(null)
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: 'Utilidades'
  })

  // Estado para comprovantes de pagamento
  const [receipts, setReceipts] = useState<Array<{
    id: number
    billName: string
    amount: string
    date: string
    time: string
    receipt: string
  }>>([])

  // Estado para adicionar comprovante
  const [showAddReceiptForm, setShowAddReceiptForm] = useState(false)
  const [newReceipt, setNewReceipt] = useState({
    billName: '',
    amount: '',
    date: '',
    time: '',
    receipt: ''
  })

  // SONHOS - ZERADO conforme solicitado
  const [dreams, setDreams] = useState<Array<{
    id: number
    title: string
    progress: number
    target: string
    saved: string
  }>>([])

  // Estado para adicionar/editar sonho
  const [showAddDreamForm, setShowAddDreamForm] = useState(false)
  const [editingDream, setEditingDream] = useState<number | null>(null)
  const [newDream, setNewDream] = useState({
    title: '',
    target: '',
    saved: ''
  })

  // LEMBRETES - ZERADO conforme solicitado
  const [reminders, setReminders] = useState<Array<{
    id: number
    text: string
    time: string
    urgent: boolean
  }>>([])

  // Estado para adicionar/editar lembrete
  const [showAddReminderForm, setShowAddReminderForm] = useState(false)
  const [editingReminder, setEditingReminder] = useState<number | null>(null)
  const [newReminder, setNewReminder] = useState({
    text: '',
    time: '',
    urgent: false
  })

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ]

  const categories = [t('grains'), t('dairy'), t('proteins'), t('vegetables'), t('fruits'), t('beverages'), t('cleaning'), t('others')]
  const billCategories = [t('utilities'), t('telecommunications'), t('housing'), t('transport'), t('food'), t('health'), t('education'), t('leisure'), t('others')]

  // Base de dados de produtos simulada
  const productDatabase: { [key: string]: { name: string, category: string, quantity: string } } = {
    '7891234567890': { name: 'Arroz Branco 5kg', category: t('grains'), quantity: '5kg' },
    '7891234567891': { name: 'Feijão Preto 1kg', category: t('grains'), quantity: '1kg' },
    '7891234567892': { name: 'Leite Integral 1L', category: t('dairy'), quantity: '1L' },
    '7891234567893': { name: 'Açúcar Cristal 1kg', category: t('others'), quantity: '1kg' },
    '7891234567894': { name: 'Óleo de Soja 900ml', category: t('others'), quantity: '900ml' },
    '7891234567895': { name: 'Macarrão Espaguete 500g', category: t('grains'), quantity: '500g' },
    '7891234567896': { name: 'Café Torrado 500g', category: t('beverages'), quantity: '500g' },
    '7891234567897': { name: 'Sal Refinado 1kg', category: t('others'), quantity: '1kg' },
    '7891234567898': { name: 'Farinha de Trigo 1kg', category: t('grains'), quantity: '1kg' },
    '7891234567899': { name: 'Detergente Líquido 500ml', category: t('cleaning'), quantity: '500ml' }
  }

  // Função para simular escaneamento
  const simulateScanning = () => {
    setScannerStatus('scanning')
    
    // Simular detecção após 2 segundos
    setTimeout(() => {
      const codes = Object.keys(productDatabase)
      const randomCode = codes[Math.floor(Math.random() * codes.length)]
      setScannedCode(randomCode)
      setScannerStatus('detected')
      
      // Processar automaticamente após 1 segundo
      setTimeout(() => {
        processScannedCode(randomCode)
      }, 1000)
    }, 2000)
  }

  // Função para processar código escaneado
  const processScannedCode = (code: string) => {
    setScannerStatus('processing')
    
    setTimeout(() => {
      const product = productDatabase[code]
      if (product) {
        // Adicionar produto ao estoque
        const status = 'ok' // Produtos escaneados começam com status OK
        const item = {
          id: Date.now(),
          name: product.name,
          quantity: product.quantity,
          category: product.category,
          status,
          daysLeft: 30
        }
        
        setPantryItems(prev => [...prev, item])
        setScannerStatus('success')
        
        // Fechar scanner após 2 segundos
        setTimeout(() => {
          setShowScanner(false)
          setScannerStatus('idle')
          setScannedCode('')
        }, 2000)
      } else {
        setScannerStatus('error')
      }
    }, 1500)
  }

  // Função para processar código manual
  const processManualCode = () => {
    if (!manualCode.trim()) return
    
    processScannedCode(manualCode.trim())
    setManualCode('')
    setShowManualEntry(false)
  }

  // Função para fechar scanner
  const closeScanner = () => {
    setShowScanner(false)
    setScannerStatus('idle')
    setScannedCode('')
    setManualCode('')
    setShowManualEntry(false)
  }

  // Função para iniciar scanner
  const startScanner = () => {
    setShowScanner(true)
    setScannerStatus('idle')
  }

  // Handlers otimizados com useCallback para evitar re-renders
  const handleItemNameChange = useCallback((value: string) => {
    setNewItem(prev => ({ ...prev, name: value }))
  }, [])

  const handleItemQuantityChange = useCallback((value: string) => {
    setNewItem(prev => ({ ...prev, quantity: value }))
  }, [])

  const handleItemCategoryChange = useCallback((value: string) => {
    setNewItem(prev => ({ ...prev, category: value }))
  }, [])

  const handleItemDaysChange = useCallback((value: string) => {
    setNewItem(prev => ({ ...prev, daysLeft: parseInt(value) || 30 }))
  }, [])

  const handleBillNameChange = useCallback((value: string) => {
    setNewBill(prev => ({ ...prev, name: value }))
  }, [])

  const handleBillAmountChange = useCallback((value: string) => {
    setNewBill(prev => ({ ...prev, amount: value }))
  }, [])

  const handleBillDueDateChange = useCallback((value: string) => {
    setNewBill(prev => ({ ...prev, dueDate: value }))
  }, [])

  const handleBillCategoryChange = useCallback((value: string) => {
    setNewBill(prev => ({ ...prev, category: value }))
  }, [])

  const handleReceiptBillNameChange = useCallback((value: string) => {
    setNewReceipt(prev => ({ ...prev, billName: value }))
  }, [])

  const handleReceiptAmountChange = useCallback((value: string) => {
    setNewReceipt(prev => ({ ...prev, amount: value }))
  }, [])

  const handleReceiptDateChange = useCallback((value: string) => {
    setNewReceipt(prev => ({ ...prev, date: value }))
  }, [])

  const handleReceiptTimeChange = useCallback((value: string) => {
    setNewReceipt(prev => ({ ...prev, time: value }))
  }, [])

  const handleDreamTitleChange = useCallback((value: string) => {
    setNewDream(prev => ({ ...prev, title: value }))
  }, [])

  const handleDreamTargetChange = useCallback((value: string) => {
    setNewDream(prev => ({ ...prev, target: value }))
  }, [])

  const handleDreamSavedChange = useCallback((value: string) => {
    setNewDream(prev => ({ ...prev, saved: value }))
  }, [])

  const handleReminderTextChange = useCallback((value: string) => {
    setNewReminder(prev => ({ ...prev, text: value }))
  }, [])

  const handleReminderTimeChange = useCallback((value: string) => {
    setNewReminder(prev => ({ ...prev, time: value }))
  }, [])

  const handleReminderUrgentChange = useCallback((checked: boolean) => {
    setNewReminder(prev => ({ ...prev, urgent: checked }))
  }, [])

  const handleManualCodeChange = useCallback((value: string) => {
    setManualCode(value)
  }, [])

  // Handler para campo de pesquisa - CORRIGIDO
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  // Função para iniciar edição de item do estoque
  const startEditingItem = (item: any) => {
    setEditingItem(item.id)
    setNewItem({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      daysLeft: item.daysLeft
    })
    setShowAddItemForm(true)
  }

  // Função para adicionar/editar item ao estoque
  const addPantryItem = () => {
    if (!newItem.name.trim() || !newItem.quantity.trim()) {
      return
    }

    const status = newItem.daysLeft <= 3 ? 'urgent' : newItem.daysLeft <= 7 ? 'low' : 'ok'
    
    if (editingItem) {
      // Editando item existente
      setPantryItems(prev => prev.map(item => 
        item.id === editingItem 
          ? { ...item, name: newItem.name, quantity: newItem.quantity, category: newItem.category, status, daysLeft: newItem.daysLeft }
          : item
      ))
      setEditingItem(null)
    } else {
      // Adicionando novo item
      const item = {
        id: Date.now(),
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        status,
        daysLeft: newItem.daysLeft
      }
      setPantryItems(prev => [...prev, item])
    }

    setNewItem({ name: '', quantity: '', category: t('grains'), daysLeft: 30 })
    setShowAddItemForm(false)
  }

  // Função para iniciar edição de conta
  const startEditingBill = (bill: any) => {
    setEditingBill(bill.id)
    setNewBill({
      name: bill.name,
      amount: bill.amount,
      dueDate: bill.dueDate,
      category: bill.category
    })
    setShowAddBillForm(true)
  }

  // Função para adicionar/editar nova conta
  const addBill = () => {
    if (!newBill.name.trim() || !newBill.amount.trim() || !newBill.dueDate.trim()) {
      return
    }

    if (editingBill) {
      // Editando conta existente
      setBills(prev => prev.map(bill => 
        bill.id === editingBill 
          ? { ...bill, name: newBill.name, amount: newBill.amount, dueDate: newBill.dueDate, category: newBill.category }
          : bill
      ))
      setEditingBill(null)
    } else {
      // Adicionando nova conta
      const bill = {
        id: Date.now(),
        name: newBill.name,
        amount: newBill.amount,
        dueDate: newBill.dueDate,
        status: 'pending',
        category: newBill.category
      }
      setBills(prev => [...prev, bill])
    }

    setNewBill({ name: '', amount: '', dueDate: '', category: t('utilities') })
    setShowAddBillForm(false)
  }

  // Função para adicionar comprovante
  const addReceipt = () => {
    if (!newReceipt.billName.trim() || !newReceipt.amount.trim() || !newReceipt.date.trim() || !newReceipt.time.trim()) {
      return
    }

    const receipt = {
      id: Date.now(),
      billName: newReceipt.billName,
      amount: newReceipt.amount,
      date: newReceipt.date,
      time: newReceipt.time,
      receipt: newReceipt.receipt
    }

    setReceipts(prev => [...prev, receipt])
    setNewReceipt({ billName: '', amount: '', date: '', time: '', receipt: '' })
    setShowAddReceiptForm(false)
  }

  // Função para iniciar edição de sonho
  const startEditingDream = (dream: any) => {
    setEditingDream(dream.id)
    setNewDream({
      title: dream.title,
      target: dream.target,
      saved: dream.saved
    })
    setShowAddDreamForm(true)
  }

  // Função para adicionar/editar novo sonho
  const addDream = () => {
    if (!newDream.title.trim() || !newDream.target.trim() || !newDream.saved.trim()) {
      return
    }

    // Calcular progresso baseado no valor salvo vs meta
    const targetValue = parseFloat(newDream.target.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const savedValue = parseFloat(newDream.saved.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const progress = targetValue > 0 ? Math.round((savedValue / targetValue) * 100) : 0

    if (editingDream) {
      // Editando sonho existente
      setDreams(prev => prev.map(dream => 
        dream.id === editingDream 
          ? { ...dream, title: newDream.title, target: newDream.target, saved: newDream.saved, progress: Math.min(progress, 100) }
          : dream
      ))
      setEditingDream(null)
    } else {
      // Adicionando novo sonho
      const dream = {
        id: Date.now(),
        title: newDream.title,
        target: newDream.target,
        saved: newDream.saved,
        progress: Math.min(progress, 100)
      }
      setDreams(prev => [...prev, dream])
    }

    setNewDream({ title: '', target: '', saved: '' })
    setShowAddDreamForm(false)
  }

  // Função para iniciar edição de lembrete
  const startEditingReminder = (reminder: any) => {
    setEditingReminder(reminder.id)
    setNewReminder({
      text: reminder.text,
      time: reminder.time,
      urgent: reminder.urgent
    })
    setShowAddReminderForm(true)
  }

  // Função para adicionar/editar novo lembrete
  const addReminder = () => {
    if (!newReminder.text.trim() || !newReminder.time.trim()) {
      return
    }

    if (editingReminder) {
      // Editando lembrete existente
      setReminders(prev => prev.map(reminder => 
        reminder.id === editingReminder 
          ? { ...reminder, text: newReminder.text, time: newReminder.time, urgent: newReminder.urgent }
          : reminder
      ))
      setEditingReminder(null)
    } else {
      // Adicionando novo lembrete
      const reminder = {
        id: Date.now(),
        text: newReminder.text,
        time: newReminder.time,
        urgent: newReminder.urgent
      }
      setReminders(prev => [...prev, reminder])
    }

    setNewReminder({ text: '', time: '', urgent: false })
    setShowAddReminderForm(false)
  }

  // Função para cancelar edição
  const cancelEdit = () => {
    setEditingItem(null)
    setEditingBill(null)
    setEditingDream(null)
    setEditingReminder(null)
    setNewItem({ name: '', quantity: '', category: t('grains'), daysLeft: 30 })
    setNewBill({ name: '', amount: '', dueDate: '', category: t('utilities') })
    setNewDream({ title: '', target: '', saved: '' })
    setNewReminder({ text: '', time: '', urgent: false })
    setShowAddItemForm(false)
    setShowAddBillForm(false)
    setShowAddDreamForm(false)
    setShowAddReminderForm(false)
  }

  // Função para upload de comprovante
  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewReceipt(prev => ({ ...prev, receipt: e.target!.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedPhotos(prev => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const setBackgroundForScreen = (screen: keyof typeof customBackgrounds, photoUrl: string) => {
    setCustomBackgrounds(prev => ({
      ...prev,
      [screen]: photoUrl
    }))
  }

  const removeBackgroundFromScreen = (screen: keyof typeof customBackgrounds) => {
    setCustomBackgrounds(prev => ({
      ...prev,
      [screen]: ''
    }))
  }

  const getBackgroundStyle = (screen: keyof typeof customBackgrounds) => {
    const bgImage = customBackgrounds[screen]
    if (bgImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }
    return {}
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500'
      case 'low': return 'bg-yellow-500'
      case 'ok': return 'bg-green-500'
      case 'paid': return 'bg-green-500'
      case 'pending': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'urgent': return t('urgent')
      case 'low': return t('low')
      case 'ok': return t('ok')
      case 'paid': return t('paid')
      case 'pending': return t('pending')
      default: return status
    }
  }

  // Funções para análise de gastos baseadas em dados reais
  const getMonthlyExpensesFromBills = () => {
    // Agrupar contas pagas por mês
    const monthlyData: { [key: string]: { total: number, categories: string[] } } = {}
    
    // Processar comprovantes (contas pagas)
    receipts.forEach(receipt => {
      if (receipt.date) {
        const date = new Date(receipt.date)
        const monthKey = date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'it' ? 'it-IT' : 'pt-BR', { month: 'short', year: 'numeric' })
        const amount = parseFloat(receipt.amount.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { total: 0, categories: [] }
        }
        
        monthlyData[monthKey].total += amount
        monthlyData[monthKey].categories.push(receipt.billName)
      }
    })

    // Converter para array ordenado por data
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        amount: data.total,
        categories: [...new Set(data.categories)].join(', ') || 'Diversos'
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6) // Últimos 6 meses
  }

  const calculateMonthlyComparison = () => {
    const monthlyExpenses = getMonthlyExpensesFromBills()
    if (monthlyExpenses.length < 2) return { change: 0, trend: 'stable' }
    
    const current = monthlyExpenses[monthlyExpenses.length - 1].amount
    const previous = monthlyExpenses[monthlyExpenses.length - 2].amount
    const change = previous > 0 ? ((current - previous) / previous) * 100 : 0
    
    return {
      change: Math.abs(change),
      trend: change > 5 ? 'up' : change < -5 ? 'down' : 'stable'
    }
  }

  const getTotalExpenses = () => {
    return receipts.reduce((sum, receipt) => {
      const amount = parseFloat(receipt.amount.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0
      return sum + amount
    }, 0)
  }

  const getAverageExpense = () => {
    const monthlyExpenses = getMonthlyExpensesFromBills()
    return monthlyExpenses.length > 0 ? getTotalExpenses() / monthlyExpenses.length : 0
  }

  const getHighestExpenseMonth = () => {
    const monthlyExpenses = getMonthlyExpensesFromBills()
    if (monthlyExpenses.length === 0) return { month: 'N/A', amount: 0 }
    
    return monthlyExpenses.reduce((max, expense) => 
      expense.amount > max.amount ? expense : max, monthlyExpenses[0]
    )
  }

  const getLowestExpenseMonth = () => {
    const monthlyExpenses = getMonthlyExpensesFromBills()
    if (monthlyExpenses.length === 0) return { month: 'N/A', amount: 0 }
    
    return monthlyExpenses.reduce((min, expense) => 
      expense.amount < min.amount ? expense : min, monthlyExpenses[0]
    )
  }

  const getPendingBillsTotal = () => {
    return bills
      .filter(bill => bill.status === 'pending')
      .reduce((sum, bill) => {
        const amount = parseFloat(bill.amount.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0
        return sum + amount
      }, 0)
  }

  const getPaidBillsTotal = () => {
    return bills
      .filter(bill => bill.status === 'paid')
      .reduce((sum, bill) => {
        const amount = parseFloat(bill.amount.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0
        return sum + amount
      }, 0)
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sweet Home</h1>
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  // Se não autenticado, não renderizar nada (redirecionamento já foi feito)
  if (!isAuthenticated) {
    return null
  }

  // Componente do Scanner
  const ScannerModal = () => (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header do Scanner */}
      <div className="flex items-center justify-between p-4 bg-black/50">
        <div>
          <h2 className="text-xl font-bold text-white">{t('scannerTitle')}</h2>
          <p className="text-gray-300 text-sm">{t('scannerSubtitle')}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeScanner}
          className="text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Área de escaneamento */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-full max-w-sm">
          {/* Simulação da câmera */}
          <div className="aspect-square bg-gray-900 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center relative overflow-hidden">
            {/* Área de foco */}
            <div className="w-48 h-32 border-2 border-cyan-400 rounded-lg relative">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
              
              {/* Linha de escaneamento animada */}
              {scannerStatus === 'scanning' && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                </div>
              )}
              
              {/* Código detectado */}
              {scannerStatus === 'detected' && scannedCode && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-green-400 text-xs font-mono">{scannedCode}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ícone da câmera quando idle */}
            {scannerStatus === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-white/30" />
              </div>
            )}
          </div>

          {/* Status e instruções */}
          <div className="mt-6 text-center">
            {scannerStatus === 'idle' && (
              <p className="text-gray-300 text-sm">{t('scannerInstructions')}</p>
            )}
            {scannerStatus === 'scanning' && (
              <p className="text-cyan-400 text-sm font-medium">{t('scannerProcessing')}</p>
            )}
            {scannerStatus === 'detected' && (
              <p className="text-green-400 text-sm font-medium">{t('scannerDetected')}</p>
            )}
            {scannerStatus === 'processing' && (
              <p className="text-yellow-400 text-sm font-medium">{t('scannerProcessing')}</p>
            )}
            {scannerStatus === 'success' && (
              <p className="text-green-400 text-sm font-medium">{t('scannerSuccess')}</p>
            )}
            {scannerStatus === 'error' && (
              <p className="text-red-400 text-sm font-medium">{t('scannerError')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Controles do Scanner */}
      <div className="p-6 space-y-4">
        {/* Botão principal */}
        {scannerStatus === 'idle' && (
          <Button
            onClick={simulateScanning}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3"
          >
            <Scan className="w-5 h-5 mr-2" />
            {t('scan')}
          </Button>
        )}

        {scannerStatus === 'error' && (
          <Button
            onClick={() => setScannerStatus('idle')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
          >
            {t('scannerTryAgain')}
          </Button>
        )}

        {/* Entrada manual */}
        {!showManualEntry ? (
          <Button
            variant="outline"
            onClick={() => setShowManualEntry(true)}
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            {t('scannerManualEntry')}
          </Button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {t('scannerManualCode')}
              </label>
              <Input
                value={manualCode}
                onChange={(e) => handleManualCodeChange(e.target.value)}
                placeholder={t('scannerCodePlaceholder')}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={processManualCode}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!manualCode.trim()}
              >
                {t('scannerProcessCode')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowManualEntry(false)
                  setManualCode('')
                }}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        )}

        {/* Botão fechar */}
        <Button
          variant="ghost"
          onClick={closeScanner}
          className="w-full text-gray-400 hover:text-white hover:bg-white/10"
        >
          {t('scannerClose')}
        </Button>
      </div>
    </div>
  )

  // Página de personalização
  const CustomizationPage = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCustomization(false)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t('personalizationTitle')}</h1>
            <p className="text-gray-500">{t('personalizationSubtitle')}</p>
          </div>
        </div>

        {/* Seções do app */}
        <div className="space-y-4">
          {[
            { key: 'home', name: t('homeScreen'), icon: Home, color: 'from-pink-500 to-purple-600' },
            { key: 'pantry', name: t('pantry'), icon: Package, color: 'from-orange-500 to-red-500' },
            { key: 'bills', name: t('bills'), icon: Receipt, color: 'from-blue-500 to-indigo-600' },
            { key: 'analytics', name: t('analyticsScreen'), icon: BarChart3, color: 'from-cyan-500 to-blue-600' },
            { key: 'extras', name: t('extras'), icon: Heart, color: 'from-emerald-500 to-teal-600' },
            { key: 'languageSettings', name: t('languageSettings'), icon: Globe, color: 'from-purple-500 to-pink-500' },
            { key: 'login', name: t('loginScreen'), icon: Lock, color: 'from-indigo-500 to-purple-600' }
          ].map(section => (
            <Card key={section.key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color}`}>
                      <section.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{section.name}</h3>
                      <p className="text-sm text-gray-500">
                        {customBackgrounds[section.key as keyof typeof customBackgrounds] 
                          ? t('customBackground')
                          : t('defaultBackground')
                        }
                      </p>
                    </div>
                  </div>
                  {customBackgrounds[section.key as keyof typeof customBackgrounds] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBackgroundFromScreen(section.key as keyof typeof customBackgrounds)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Preview do background atual */}
                <div 
                  className="w-full h-20 rounded-lg mb-3 flex items-center justify-center"
                  style={customBackgrounds[section.key as keyof typeof customBackgrounds] 
                    ? {
                        backgroundImage: `url('${customBackgrounds[section.key as keyof typeof customBackgrounds]}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }
                    : { background: `linear-gradient(to right, ${section.color.replace('from-', '').replace(' to-', ', ')})` }
                  }
                >
                  {!customBackgrounds[section.key as keyof typeof customBackgrounds] && (
                    <span className="text-white text-sm font-medium">{t('default')}</span>
                  )}
                </div>

                {/* Grid de fotos para seleção */}
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedPhotos.map((photo, index) => (
                      <button
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
                        onClick={() => setBackgroundForScreen(section.key as keyof typeof customBackgrounds, photo)}
                      >
                        <img 
                          src={photo} 
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {uploadedPhotos.length === 0 && (
                  <div className="text-center py-4">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {t('addPhotosToGallery')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão para ir à galeria */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setShowCustomization(false)
                setActiveTab('extras')
              }}
            >
              <Image className="w-4 h-4 mr-2" />
              {t('goToGallery')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Página de configuração de idiomas
  const LanguageSettingsPage = () => (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{
        ...getBackgroundStyle('languageSettings'),
        backgroundImage: customBackgrounds.languageSettings 
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${customBackgrounds.languageSettings}')`
          : `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1200&fit=crop')`
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sweet Home</h1>
          <p className="text-xl text-gray-300">Select language</p>
        </div>

        {/* Lista de idiomas */}
        <div className="w-full max-w-sm space-y-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              className={`w-full flex items-center justify-between p-4 h-auto bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all ${
                language === lang.code ? 'bg-white/30 border-white/50' : ''
              }`}
              onClick={() => {
                setLanguage(lang.code)
                setTimeout(() => setShowLanguageSettings(false), 500)
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-white font-medium">{lang.name}</span>
              </div>
              {language === lang.code && (
                <Check className="w-5 h-5 text-white" />
              )}
            </Button>
          ))}
        </div>

        {/* Botão voltar */}
        <Button
          variant="ghost"
          className="mt-8 text-white hover:bg-white/10"
          onClick={() => setShowLanguageSettings(false)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Button>
      </div>
    </div>
  )

  const HomeTab = () => (
    <div 
      className="space-y-6 min-h-screen"
      style={customBackgrounds.home ? {
        ...getBackgroundStyle('home'),
        padding: '1.5rem',
        margin: '-1rem',
        marginBottom: '4rem'
      } : {}}
    >
      {/* Header com saudação e perfil do usuário */}
      <div className={`rounded-2xl p-6 text-white ${
        customBackgrounds.home 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gradient-to-r from-pink-500 to-purple-600'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">{t('greeting', { name: user?.name || t('couple') })}</h1>
            <p className="opacity-90">{t('welcome')}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={`text-white border-0 ${
          customBackgrounds.home 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-gradient-to-br from-orange-400 to-red-500'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('pantry')}</p>
                <p className="text-2xl font-bold">{pantryItems.length}</p>
                <p className="text-xs opacity-75">{t('items')}</p>
              </div>
              <Package className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className={`text-white border-0 ${
          customBackgrounds.home 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-gradient-to-br from-blue-400 to-indigo-600'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('bills')}</p>
                <p className="text-2xl font-bold">{bills.filter(b => b.status === 'pending').length}</p>
                <p className="text-xs opacity-75">{t('pending').toLowerCase()}</p>
              </div>
              <Receipt className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lembretes urgentes */}
      <Card className={customBackgrounds.home ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center gap-2 text-lg ${customBackgrounds.home ? 'text-white' : ''}`}>
            <Bell className="w-5 h-5 text-orange-500" />
            {t('todayReminders')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.length === 0 ? (
            <div className="text-center py-4">
              <Bell className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>
                {t('noReminders')}
              </p>
            </div>
          ) : (
            reminders.slice(0, 3).map(reminder => (
              <div key={reminder.id} className={`flex items-center justify-between p-3 rounded-lg ${
                customBackgrounds.home ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${reminder.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className={`font-medium text-sm ${customBackgrounds.home ? 'text-white' : ''}`}>{reminder.text}</p>
                    <p className={`text-xs ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>{reminder.time}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-400'}`} />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Sonhos em destaque */}
      <Card className={customBackgrounds.home ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center gap-2 text-lg ${customBackgrounds.home ? 'text-white' : ''}`}>
            <Heart className="w-5 h-5 text-pink-500" />
            {t('couplesDreams')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dreams.length === 0 ? (
              <div className="text-center py-4">
                <Heart className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-400'}`} />
                <p className={`text-sm ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>
                  {t('noDreams')}
                </p>
              </div>
            ) : (
              dreams.slice(0, 2).map(dream => (
                <div key={dream.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className={`font-medium text-sm ${customBackgrounds.home ? 'text-white' : ''}`}>{dream.title}</p>
                    <p className={`text-xs ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>{dream.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dream.progress}%` }}
                    />
                  </div>
                  <div className={`flex justify-between text-xs ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>
                    <span>{dream.saved}</span>
                    <span>{dream.target}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const PantryTab = () => (
    <div 
      className="space-y-6 min-h-screen"
      style={customBackgrounds.pantry ? {
        ...getBackgroundStyle('pantry'),
        padding: '1.5rem',
        margin: '-1rem',
        marginBottom: '4rem'
      } : {}}
    >
      {/* Header do Pantry */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${customBackgrounds.pantry ? 'text-white' : ''}`}>{t('pantryTitle')}</h2>
          <p className={`${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>{t('pantrySubtitle')}</p>
        </div>
        <Button 
          className={customBackgrounds.pantry 
            ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          }
          onClick={() => setShowAddItemForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('addItem')}
        </Button>
      </div>

      {/* Formulário para adicionar/editar item */}
      {showAddItemForm && (
        <Card className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${customBackgrounds.pantry ? 'text-white' : ''}`}>
              {editingItem ? t('editItem') : t('addNewItem')}
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className={customBackgrounds.pantry ? 'text-white hover:bg-white/10' : ''}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                {t('itemName')}
              </label>
              <Input
                value={newItem.name}
                onChange={(e) => handleItemNameChange(e.target.value)}
                placeholder={t('exampleItems')}
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                {t('quantity')}
              </label>
              <Input
                value={newItem.quantity}
                onChange={(e) => handleItemQuantityChange(e.target.value)}
                placeholder={t('exampleQuantity')}
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                {t('category')}
              </label>
              <select
                value={newItem.category}
                onChange={(e) => handleItemCategoryChange(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  customBackgrounds.pantry 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                {t('validity')}
              </label>
              <Input
                type="number"
                value={newItem.daysLeft}
                onChange={(e) => handleItemDaysChange(e.target.value)}
                min="1"
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={addPantryItem}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {editingItem ? <Save className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                {editingItem ? t('save') : t('add')}
              </Button>
              <Button
                variant="outline"
                onClick={cancelEdit}
                className={`flex-1 ${
                  customBackgrounds.pantry 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                    : ''
                }`}
              >
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Barra de busca - CORRIGIDA */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={t('searchItem')}
          className={`pl-10 ${customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}`}
        />
      </div>

      {/* Scanner - AGORA FUNCIONAL */}
      <Card className={`text-white border-0 ${
        customBackgrounds.pantry 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gradient-to-r from-cyan-500 to-blue-600'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{t('scanCode')}</h3>
              <p className="text-sm opacity-90">{t('scanQuickly')}</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={startScanner}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Scan className="w-4 h-4 mr-2" />
              {t('scan')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de itens */}
      {pantryItems.length === 0 ? (
        <Card className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardContent className="p-8 text-center">
            <Package className={`w-12 h-12 mx-auto mb-4 ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
              {t('emptyPantry')}
            </h3>
            <p className={`text-sm mb-4 ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>
              {t('emptyPantryDesc')}
            </p>
            <Button 
              onClick={() => setShowAddItemForm(true)}
              className={customBackgrounds.pantry 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('addFirstItem')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pantryItems.map(item => (
            <Card key={item.id} className={`hover:shadow-md transition-shadow ${
              customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                    <div>
                      <h3 className={`font-semibold ${customBackgrounds.pantry ? 'text-white' : ''}`}>{item.name}</h3>
                      <p className={`text-sm ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>{item.quantity} • {item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <Badge variant={item.status === 'urgent' ? 'destructive' : item.status === 'low' ? 'secondary' : 'default'}>
                        {getStatusText(item.status)}
                      </Badge>
                      <p className={`text-xs mt-1 ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>{item.daysLeft} {t('days')}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditingItem(item)}
                      className={customBackgrounds.pantry ? 'text-white hover:bg-white/10' : ''}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const BillsTab = () => (
    <div 
      className="space-y-6 min-h-screen"
      style={customBackgrounds.bills ? {
        ...getBackgroundStyle('bills'),
        padding: '1.5rem',
        margin: '-1rem',
        marginBottom: '4rem'
      } : {}}
    >
      {/* Header das Contas */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${customBackgrounds.bills ? 'text-white' : ''}`}>{t('billsTitle')}</h2>
          <p className={`${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>{t('billsSubtitle')}</p>
        </div>
        <Button 
          className={customBackgrounds.bills 
            ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
          }
          onClick={() => setShowAddBillForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('newBill')}
        </Button>
      </div>

      {/* Formulário para adicionar/editar conta */}
      {showAddBillForm && (
        <Card className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${customBackgrounds.bills ? 'text-white' : ''}`}>
              {editingBill ? t('editBill') : t('addNewBill')}
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className={customBackgrounds.bills ? 'text-white hover:bg-white/10' : ''}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                {t('billName')}
              </label>
              <Input
                value={newBill.name}
                onChange={(e) => handleBillNameChange(e.target.value)}
                placeholder={t('exampleBills')}
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                {t('amount')}
              </label>
              <Input
                value={newBill.amount}
                onChange={(e) => handleBillAmountChange(e.target.value)}
                placeholder={t('exampleAmount')}
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                {t('dueDate')}
              </label>
              <Input
                value={newBill.dueDate}
                onChange={(e) => handleBillDueDateChange(e.target.value)}
                placeholder={t('exampleDate')}
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                {t('category')}
              </label>
              <select
                value={newBill.category}
                onChange={(e) => handleBillCategoryChange(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  customBackgrounds.bills 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              >
                {billCategories.map(category => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={addBill}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {editingBill ? <Save className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                {editingBill ? t('save') : t('add')}
              </Button>
              <Button
                variant="outline"
                onClick={cancelEdit}
                className={`flex-1 ${
                  customBackgrounds.bills 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                    : ''
                }`}
              >
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumo financeiro */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={`text-white border-0 ${
          customBackgrounds.bills 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-gradient-to-br from-green-400 to-emerald-600'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('paid')}</p>
                <p className="text-xl font-bold">
                  R$ {getPaidBillsTotal().toFixed(2).replace('.', ',')}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className={`text-white border-0 ${
          customBackgrounds.bills 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-gradient-to-br from-orange-400 to-red-500'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{t('pending')}</p>
                <p className="text-xl font-bold">
                  R$ {getPendingBillsTotal().toFixed(2).replace('.', ',')}
                </p>
              </div>
              <AlertCircle className="w-6 h-6 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biblioteca de comprovantes */}
      <Card className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center justify-between ${customBackgrounds.bills ? 'text-white' : ''}`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              {t('receipts')} ({receipts.length})
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''}
              onClick={() => setShowAddReceiptForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('addReceipt')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulário para adicionar comprovante */}
          {showAddReceiptForm && (
            <div className={`p-4 rounded-lg mb-4 space-y-4 ${
              customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${customBackgrounds.bills ? 'text-white' : ''}`}>
                  {t('newReceipt')}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddReceiptForm(false)}
                  className={customBackgrounds.bills ? 'text-white hover:bg-white/10' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    {t('billName')}
                  </label>
                  <Input
                    value={newReceipt.billName}
                    onChange={(e) => handleReceiptBillNameChange(e.target.value)}
                    placeholder="Ex: Energia"
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    {t('amount')}
                  </label>
                  <Input
                    value={newReceipt.amount}
                    onChange={(e) => handleReceiptAmountChange(e.target.value)}
                    placeholder="R$ 150,00"
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    {t('date')}
                  </label>
                  <Input
                    type="date"
                    value={newReceipt.date}
                    onChange={(e) => handleReceiptDateChange(e.target.value)}
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    {t('time')}
                  </label>
                  <Input
                    type="time"
                    value={newReceipt.time}
                    onChange={(e) => handleReceiptTimeChange(e.target.value)}
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                  {t('receipt')}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => receiptInputRef.current?.click()}
                    className={`flex-1 ${
                      customBackgrounds.bills 
                        ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                        : ''
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {newReceipt.receipt ? t('receiptAttached') : t('attachReceipt')}
                  </Button>
                  <input
                    ref={receiptInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReceiptUpload}
                  />
                </div>
                {newReceipt.receipt && (
                  <div className="mt-2">
                    <img 
                      src={newReceipt.receipt} 
                      alt="Comprovante" 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addReceipt}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t('saveReceipt')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddReceiptForm(false)}
                  className={`flex-1 ${
                    customBackgrounds.bills 
                      ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                      : ''
                  }`}
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {/* Lista de comprovantes */}
          {receipts.length === 0 ? (
            <div className="text-center py-6">
              <FileText className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>
                {t('noReceipts')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {receipts.map(receipt => (
                <div key={receipt.id} className={`p-3 rounded-lg ${
                  customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {receipt.receipt && (
                        <img 
                          src={receipt.receipt} 
                          alt="Comprovante" 
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <h4 className={`font-semibold text-sm ${customBackgrounds.bills ? 'text-white' : ''}`}>
                          {receipt.billName}
                        </h4>
                        <p className={`text-xs ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>
                          {receipt.date} às {receipt.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${customBackgrounds.bills ? 'text-white' : ''}`}>
                        {receipt.amount}
                      </p>
                      <Badge variant="default" className="text-xs">
                        {t('paid')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de contas */}
      {bills.length === 0 ? (
        <Card className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardContent className="p-8 text-center">
            <Receipt className={`w-12 h-12 mx-auto mb-4 ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-400'}`} />
            <h3 className={`text-lg font-semibold mb-2 ${customBackgrounds.bills ? 'text-white' : ''}`}>
              {t('noBills')}
            </h3>
            <p className={`text-sm mb-4 ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>
              {t('noBillsDesc')}
            </p>
            <Button 
              onClick={() => setShowAddBillForm(true)}
              className={customBackgrounds.bills 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('addFirstBill')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {bills.map(bill => (
            <Card key={bill.id} className={`hover:shadow-md transition-shadow ${
              customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(bill.status)}`} />
                    <div>
                      <h3 className={`font-semibold ${customBackgrounds.bills ? 'text-white' : ''}`}>{bill.name}</h3>
                      <p className={`text-sm ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>{bill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className={`font-bold text-lg ${customBackgrounds.bills ? 'text-white' : ''}`}>{bill.amount}</p>
                      <p className={`text-sm ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>{t('due')} {bill.dueDate}</p>
                      <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'} className="mt-1">
                        {getStatusText(bill.status)}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditingBill(bill)}
                      className={customBackgrounds.bills ? 'text-white hover:bg-white/10' : ''}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  // Nova aba de Análise de Gastos - AGORA FUNCIONAL COM DADOS REAIS
  const AnalyticsTab = () => {
    const monthlyExpenses = getMonthlyExpensesFromBills()
    const comparison = calculateMonthlyComparison()
    const totalExpenses = getTotalExpenses()
    const averageExpense = getAverageExpense()
    const highestMonth = getHighestExpenseMonth()
    const lowestMonth = getLowestExpenseMonth()

    return (
      <div 
        className="space-y-6 min-h-screen"
        style={customBackgrounds.analytics ? {
          ...getBackgroundStyle('analytics'),
          padding: '1.5rem',
          margin: '-1rem',
          marginBottom: '4rem'
        } : {}}
      >
        {/* Header */}
        <div>
          <h2 className={`text-2xl font-bold ${customBackgrounds.analytics ? 'text-white' : ''}`}>{t('analyticsTitle')}</h2>
          <p className={`${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-500'}`}>{t('analyticsSubtitle')}</p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-2 gap-4">
          <Card className={`text-white border-0 ${
            customBackgrounds.analytics 
              ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
              : 'bg-gradient-to-br from-cyan-400 to-blue-600'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('totalSpent')}</p>
                  <p className="text-xl font-bold">R$ {totalExpenses.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs opacity-75">{receipts.length} {t('receipts').toLowerCase()}</p>
                </div>
                <DollarSign className="w-6 h-6 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className={`text-white border-0 ${
            customBackgrounds.analytics 
              ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
              : 'bg-gradient-to-br from-purple-400 to-pink-600'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{t('monthlyAverage')}</p>
                  <p className="text-xl font-bold">R$ {averageExpense.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs opacity-75">{monthlyExpenses.length} {t('months')}</p>
                </div>
                <BarChart3 className="w-6 h-6 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estado vazio quando não há dados */}
        {receipts.length === 0 ? (
          <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
            <CardContent className="p-8 text-center">
              <BarChart3 className={`w-12 h-12 mx-auto mb-4 ${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-semibold mb-2 ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                {t('noExpenseData')}
              </h3>
              <p className={`text-sm mb-4 ${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-500'}`}>
                {t('noExpenseDataDesc')}
              </p>
              <Button 
                onClick={() => setActiveTab('bills')}
                className={customBackgrounds.analytics 
                  ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                }
              >
                <Receipt className="w-4 h-4 mr-2" />
                {t('goToBills')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Tendência mensal */}
            {monthlyExpenses.length >= 2 && (
              <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    {t('monthlyTrend')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center justify-between p-4 rounded-lg ${
                    customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
                  }`}>
                    <div>
                      <p className={`font-semibold ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                        {t('comparisonPrevious')}
                      </p>
                      <p className={`text-sm ${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-500'}`}>
                        {monthlyExpenses[monthlyExpenses.length - 2]?.month || 'N/A'} vs {monthlyExpenses[monthlyExpenses.length - 1]?.month || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {comparison.trend === 'up' && <ArrowUp className="w-5 h-5 text-red-500" />}
                      {comparison.trend === 'down' && <ArrowDown className="w-5 h-5 text-green-500" />}
                      {comparison.trend === 'stable' && <Minus className="w-5 h-5 text-gray-500" />}
                      <span className={`font-bold ${
                        comparison.trend === 'up' ? 'text-red-500' : 
                        comparison.trend === 'down' ? 'text-green-500' : 
                        'text-gray-500'
                      }`}>
                        {comparison.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gráfico de barras simples */}
            {monthlyExpenses.length > 0 && (
              <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
                <CardHeader>
                  <CardTitle className={`${customBackgrounds.analytics ? 'text-white' : ''}`}>{t('monthlyEvolution')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyExpenses.map((expense, index) => {
                      const maxAmount = Math.max(...monthlyExpenses.map(e => e.amount))
                      const percentage = maxAmount > 0 ? (expense.amount / maxAmount) * 100 : 0
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                              {expense.month}
                            </span>
                            <span className={`text-sm ${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-500'}`}>
                              R$ {expense.amount.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparações extremas */}
            {monthlyExpenses.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-sm ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                      {t('highestExpense')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className={`text-2xl font-bold text-red-500`}>
                        {highestMonth.month}
                      </p>
                      <p className={`text-lg font-semibold ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                        R$ {highestMonth.amount.toFixed(2).replace('.', ',')}
                      </p>
                      <Badge variant="destructive" className="mt-2">
                        {t('maximum')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-sm ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                      {t('lowestExpense')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className={`text-2xl font-bold text-green-500`}>
                        {lowestMonth.month}
                      </p>
                      <p className={`text-lg font-semibold ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                        R$ {lowestMonth.amount.toFixed(2).replace('.', ',')}
                      </p>
                      <Badge variant="default" className="mt-2 bg-green-600">
                        {t('minimum')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Categorias mais gastas */}
            {monthlyExpenses.length > 0 && (
              <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
                <CardHeader>
                  <CardTitle className={`${customBackgrounds.analytics ? 'text-white' : ''}`}>{t('expensesByMonth')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monthlyExpenses.map((expense, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                          <div>
                            <p className={`font-medium ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                              {expense.month}
                            </p>
                            <p className={`text-sm ${customBackgrounds.analytics ? 'text-gray-300' : 'text-gray-500'}`}>
                              {expense.categories}
                            </p>
                          </div>
                        </div>
                        <p className={`font-bold ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                          R$ {expense.amount.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insights */}
            <Card className={customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${customBackgrounds.analytics ? 'text-white' : ''}`}>
                  <Star className="w-5 h-5 text-yellow-500" />
                  {t('insights')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className={`p-3 rounded-lg ${
                  customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm font-medium ${
                    customBackgrounds.analytics ? 'text-white' : 'text-blue-700'
                  }`}>
                    {t('insightReceipts', { 
                      count: receipts.length, 
                      plural: getPlural(receipts.length, language) 
                    })}
                  </p>
                </div>
                
                {monthlyExpenses.length > 0 && (
                  <div className={`p-3 rounded-lg ${
                    customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm' : 'bg-green-50'
                  }`}>
                    <p className={`text-sm font-medium ${
                      customBackgrounds.analytics ? 'text-white' : 'text-green-700'
                    }`}>
                      {t('insightMonths', { 
                        count: monthlyExpenses.length, 
                        plural: getPlural(monthlyExpenses.length, language) 
                      })}
                    </p>
                  </div>
                )}
                
                {averageExpense > 0 && (
                  <div className={`p-3 rounded-lg ${
                    customBackgrounds.analytics ? 'bg-white/10 backdrop-blur-sm' : 'bg-purple-50'
                  }`}>
                    <p className={`text-sm font-medium ${
                      customBackgrounds.analytics ? 'text-white' : 'text-purple-700'
                    }`}>
                      {t('insightAverage', { amount: averageExpense.toFixed(2).replace('.', ',') })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    )
  }

  const ExtrasTab = () => (
    <div 
      className="space-y-6 min-h-screen"
      style={customBackgrounds.extras ? {
        ...getBackgroundStyle('extras'),
        padding: '1.5rem',
        margin: '-1rem',
        marginBottom: '4rem'
      } : {}}
    >
      <h2 className={`text-2xl font-bold ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('extras')}</h2>
      
      {/* Galeria de Fotos Melhorada */}
      <Card className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
            <Image className="w-5 h-5 text-pink-500" />
            {t('coupleGallery')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Grid de fotos */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
            
            {/* Placeholders para fotos vazias */}
            {Array.from({ length: Math.max(0, 6 - uploadedPhotos.length) }).map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            ))}
          </div>

          {/* Botões de ação */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className={`w-full ${
                customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('uploadPhotos')}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
            
            <Button variant="ghost" className={`w-full text-sm ${
              customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''
            }`}>
              <Camera className="w-4 h-4 mr-2" />
              {t('takePhoto')}
            </Button>
          </div>

          {uploadedPhotos.length > 0 && (
            <div className={`mt-4 p-3 rounded-lg ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-green-50'
            }`}>
              <p className={`text-sm font-medium ${
                customBackgrounds.extras ? 'text-white' : 'text-green-700'
              }`}>
                ✨ {uploadedPhotos.length} {t('photosAdded')}
              </p>
              <p className={`text-xs mt-1 ${
                customBackgrounds.extras ? 'text-gray-300' : 'text-green-600'
              }`}>
                {t('photosCanBeUsed')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mural de Sonhos */}
      <Card className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
            <Heart className="w-5 h-5 text-pink-500" />
            {t('dreamBoard')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulário para adicionar/editar sonho */}
          {showAddDreamForm && (
            <div className={`p-4 rounded-lg space-y-4 ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  {editingDream ? t('editDream') : t('newDream')}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  {t('dreamTitle')}
                </label>
                <Input
                  value={newDream.title}
                  onChange={(e) => handleDreamTitleChange(e.target.value)}
                  placeholder={t('exampleDream')}
                  className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    {t('target')}
                  </label>
                  <Input
                    value={newDream.target}
                    onChange={(e) => handleDreamTargetChange(e.target.value)}
                    placeholder={t('exampleTarget')}
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    {t('saved')}
                  </label>
                  <Input
                    value={newDream.saved}
                    onChange={(e) => handleDreamSavedChange(e.target.value)}
                    placeholder={t('exampleSaved')}
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addDream}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  {editingDream ? <Save className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  {editingDream ? t('saveDream') : t('addDream')}
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  className={`flex-1 ${
                    customBackgrounds.extras 
                      ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                      : ''
                  }`}
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {dreams.length === 0 ? (
            <div className="text-center py-6">
              <Heart className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm mb-4 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-500'}`}>
                {t('noDreams')}
              </p>
              <Button 
                variant="outline" 
                className={`${
                  customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
                }`}
                onClick={() => setShowAddDreamForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('firstDream')}
              </Button>
            </div>
          ) : (
            <>
              {dreams.map(dream => (
                <div key={dream.id} className={`p-4 rounded-lg ${
                  customBackgrounds.extras 
                    ? 'bg-white/10 backdrop-blur-sm' 
                    : 'bg-gradient-to-r from-pink-50 to-purple-50'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`font-semibold ${customBackgrounds.extras ? 'text-white' : ''}`}>{dream.title}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditingDream(dream)}
                        className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${customBackgrounds.extras ? 'text-gray-300' : ''}`}>
                      <span>{t('progress')}: {dream.progress}%</span>
                      <span>{dream.saved} de {dream.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${dream.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className={`w-full ${
                customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
              }`} onClick={() => setShowAddDreamForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t('newDream')}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Lembretes */}
      <Card className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
            <Bell className="w-5 h-5 text-orange-500" />
            {t('reminders')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Formulário para adicionar/editar lembrete */}
          {showAddReminderForm && (
            <div className={`p-4 rounded-lg space-y-4 ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  {editingReminder ? t('editReminder') : t('newReminder')}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  {t('reminder')}
                </label>
                <Input
                  value={newReminder.text}
                  onChange={(e) => handleReminderTextChange(e.target.value)}
                  placeholder={t('exampleReminder')}
                  className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    {t('time')}
                  </label>
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => handleReminderTimeChange(e.target.value)}
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
                
                <div className="flex items-end">
                  <label className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    <input
                      type="checkbox"
                      checked={newReminder.urgent}
                      onChange={(e) => handleReminderUrgentChange(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">{t('urgent')}</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addReminder}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {editingReminder ? <Save className="w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  {editingReminder ? t('saveReminder') : t('addReminder')}
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  className={`flex-1 ${
                    customBackgrounds.extras 
                      ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                      : ''
                  }`}
                >
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {reminders.length === 0 ? (
            <div className="text-center py-6">
              <Bell className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm mb-4 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-500'}`}>
                {t('noReminders')}
              </p>
              <Button 
                variant="outline" 
                className={`${
                  customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
                }`}
                onClick={() => setShowAddReminderForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('firstReminder')}
              </Button>
            </div>
          ) : (
            <>
              {reminders.map(reminder => (
                <div key={reminder.id} className={`flex items-center justify-between p-3 rounded-lg ${
                  customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{reminder.text}</p>
                      <p className={`text-xs ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-500'}`}>{reminder.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${reminder.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditingReminder(reminder)}
                      className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className={`w-full ${
                customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
              }`} onClick={() => setShowAddReminderForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t('newReminder')}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
            <Settings className="w-5 h-5 text-gray-500" />
            {t('settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('language')}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
              onClick={() => setShowLanguageSettings(true)}
            >
              {languages.find(l => l.code === language)?.name || 'Português'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-purple-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('customization')}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
              onClick={() => setShowCustomization(true)}
            >
              {t('customize')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-green-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('account')}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
            >
              {user?.name || t('user')}
            </Button>
          </div>
          
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-orange-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('notifications')}</span>
            </div>
            <Button variant="ghost" size="sm" className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}>
              {t('enabled')}
            </Button>
          </div>

          {/* Botão de logout */}
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-red-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>{t('logout')}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className={`text-red-500 hover:text-red-600 ${customBackgrounds.extras ? 'hover:bg-white/10' : ''}`}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Se estiver na página de personalização, mostrar apenas ela
  if (showCustomization) {
    return <CustomizationPage />
  }

  // Se estiver na página de configuração de idiomas, mostrar apenas ela
  if (showLanguageSettings) {
    return <LanguageSettingsPage />
  }

  // Se estiver no scanner, mostrar apenas ele
  if (showScanner) {
    return <ScannerModal />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container principal mobile-first */}
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Content Area */}
        <div className="p-4 pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="home">
              <HomeTab />
            </TabsContent>
            <TabsContent value="pantry">
              <PantryTab />
            </TabsContent>
            <TabsContent value="bills">
              <BillsTab />
            </TabsContent>
            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
            <TabsContent value="extras">
              <ExtrasTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Navigation - Atualizada com 5 abas */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
          <div className="flex justify-around py-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-xs">{t('home')}</span>
            </Button>
            
            <Button
              variant={activeTab === 'pantry' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('pantry')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'pantry' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Package className="w-4 h-4" />
              <span className="text-xs">{t('pantry')}</span>
            </Button>
            
            <Button
              variant={activeTab === 'bills' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('bills')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'bills' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span className="text-xs">{t('bills')}</span>
            </Button>

            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'analytics' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">{t('analytics')}</span>
            </Button>
            
            <Button
              variant={activeTab === 'extras' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('extras')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 ${
                activeTab === 'extras' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs">{t('extras')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}