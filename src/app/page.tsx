"use client"

import { useState, useRef } from 'react'
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
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SweetHome() {
  const [activeTab, setActiveTab] = useState('home')
  const [language, setLanguage] = useState('pt')
  const [showLanguageSettings, setShowLanguageSettings] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [customBackgrounds, setCustomBackgrounds] = useState({
    home: '',
    pantry: '',
    bills: '',
    extras: '',
    languageSettings: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const receiptInputRef = useRef<HTMLInputElement>(null)

  // Estado do estoque - ZERADO conforme solicitado
  const [pantryItems, setPantryItems] = useState<Array<{
    id: number
    name: string
    quantity: string
    category: string
    status: string
    daysLeft: number
  }>>([])

  // Estado para adicionar novos itens
  const [showAddItemForm, setShowAddItemForm] = useState(false)
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

  // Estado para adicionar nova conta
  const [showAddBillForm, setShowAddBillForm] = useState(false)
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

  // Estado para adicionar novo sonho
  const [showAddDreamForm, setShowAddDreamForm] = useState(false)
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

  // Estado para adicionar novo lembrete
  const [showAddReminderForm, setShowAddReminderForm] = useState(false)
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

  const categories = ['Grãos', 'Laticínios', 'Proteínas', 'Vegetais', 'Frutas', 'Bebidas', 'Limpeza', 'Outros']
  const billCategories = ['Utilidades', 'Telecomunicações', 'Moradia', 'Transporte', 'Alimentação', 'Saúde', 'Educação', 'Lazer', 'Outros']

  // Função para adicionar item ao estoque
  const addPantryItem = () => {
    if (!newItem.name.trim() || !newItem.quantity.trim()) {
      return
    }

    const status = newItem.daysLeft <= 3 ? 'urgent' : newItem.daysLeft <= 7 ? 'low' : 'ok'
    
    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      status,
      daysLeft: newItem.daysLeft
    }

    setPantryItems(prev => [...prev, item])
    setNewItem({ name: '', quantity: '', category: 'Grãos', daysLeft: 30 })
    setShowAddItemForm(false)
  }

  // Função para adicionar nova conta
  const addBill = () => {
    if (!newBill.name.trim() || !newBill.amount.trim() || !newBill.dueDate.trim()) {
      return
    }

    const bill = {
      id: Date.now(),
      name: newBill.name,
      amount: newBill.amount,
      dueDate: newBill.dueDate,
      status: 'pending',
      category: newBill.category
    }

    setBills(prev => [...prev, bill])
    setNewBill({ name: '', amount: '', dueDate: '', category: 'Utilidades' })
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

  // Função para adicionar novo sonho
  const addDream = () => {
    if (!newDream.title.trim() || !newDream.target.trim() || !newDream.saved.trim()) {
      return
    }

    // Calcular progresso baseado no valor salvo vs meta
    const targetValue = parseFloat(newDream.target.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const savedValue = parseFloat(newDream.saved.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const progress = targetValue > 0 ? Math.round((savedValue / targetValue) * 100) : 0

    const dream = {
      id: Date.now(),
      title: newDream.title,
      target: newDream.target,
      saved: newDream.saved,
      progress: Math.min(progress, 100)
    }

    setDreams(prev => [...prev, dream])
    setNewDream({ title: '', target: '', saved: '' })
    setShowAddDreamForm(false)
  }

  // Função para adicionar novo lembrete
  const addReminder = () => {
    if (!newReminder.text.trim() || !newReminder.time.trim()) {
      return
    }

    const reminder = {
      id: Date.now(),
      text: newReminder.text,
      time: newReminder.time,
      urgent: newReminder.urgent
    }

    setReminders(prev => [...prev, reminder])
    setNewReminder({ text: '', time: '', urgent: false })
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
      case 'urgent': return 'Urgente'
      case 'low': return 'Pouco'
      case 'ok': return 'OK'
      case 'paid': return 'Pago'
      case 'pending': return 'Pendente'
      default: return status
    }
  }

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
            <h1 className="text-2xl font-bold">Personalização</h1>
            <p className="text-gray-500">Customize o visual do app</p>
          </div>
        </div>

        {/* Seções do app */}
        <div className="space-y-4">
          {[
            { key: 'home', name: 'Tela Inicial', icon: Home, color: 'from-pink-500 to-purple-600' },
            { key: 'pantry', name: 'Estoque', icon: Package, color: 'from-orange-500 to-red-500' },
            { key: 'bills', name: 'Contas', icon: Receipt, color: 'from-blue-500 to-indigo-600' },
            { key: 'extras', name: 'Extras', icon: Heart, color: 'from-emerald-500 to-teal-600' },
            { key: 'languageSettings', name: 'Config. Idiomas', icon: Globe, color: 'from-purple-500 to-pink-500' }
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
                          ? 'Background personalizado' 
                          : 'Background padrão'
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
                    <span className="text-white text-sm font-medium">Padrão</span>
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
                      Adicione fotos na galeria para personalizar
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
              Ir para Galeria de Fotos
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
          Voltar
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
      {/* Header com saudação */}
      <div className={`rounded-2xl p-6 text-white ${
        customBackgrounds.home 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gradient-to-r from-pink-500 to-purple-600'
      }`}>
        <h1 className="text-2xl font-bold mb-2">Olá, casal! 💕</h1>
        <p className="opacity-90">Bem-vindos ao Sweet Home</p>
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
                <p className="text-sm opacity-90">Estoque</p>
                <p className="text-2xl font-bold">{pantryItems.length}</p>
                <p className="text-xs opacity-75">itens</p>
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
                <p className="text-sm opacity-90">Contas</p>
                <p className="text-2xl font-bold">{bills.filter(b => b.status === 'pending').length}</p>
                <p className="text-xs opacity-75">pendentes</p>
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
            Lembretes de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.length === 0 ? (
            <div className="text-center py-4">
              <Bell className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>
                Nenhum lembrete adicionado ainda
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
            Sonhos do Casal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dreams.length === 0 ? (
              <div className="text-center py-4">
                <Heart className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-400'}`} />
                <p className={`text-sm ${customBackgrounds.home ? 'text-gray-300' : 'text-gray-500'}`}>
                  Nenhum sonho adicionado ainda
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
          <h2 className={`text-2xl font-bold ${customBackgrounds.pantry ? 'text-white' : ''}`}>Estoque</h2>
          <p className={`${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>Gerencie seus mantimentos</p>
        </div>
        <Button 
          className={customBackgrounds.pantry 
            ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
          }
          onClick={() => setShowAddItemForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {/* Formulário para adicionar item */}
      {showAddItemForm && (
        <Card className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${customBackgrounds.pantry ? 'text-white' : ''}`}>
              Adicionar Item
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddItemForm(false)}
                className={customBackgrounds.pantry ? 'text-white hover:bg-white/10' : ''}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                Nome do Item
              </label>
              <Input
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Arroz, Feijão, Leite..."
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                Quantidade
              </label>
              <Input
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="Ex: 2kg, 1L, 12 unid..."
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.pantry ? 'text-white' : ''}`}>
                Categoria
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
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
                Validade (dias)
              </label>
              <Input
                type="number"
                value={newItem.daysLeft}
                onChange={(e) => setNewItem(prev => ({ ...prev, daysLeft: parseInt(e.target.value) || 30 }))}
                min="1"
                className={customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={addPantryItem}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddItemForm(false)}
                className={`flex-1 ${
                  customBackgrounds.pantry 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                    : ''
                }`}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Barra de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Buscar item..." 
          className={`pl-10 ${customBackgrounds.pantry ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}`}
        />
      </div>

      {/* Scanner */}
      <Card className={`text-white border-0 ${
        customBackgrounds.pantry 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gradient-to-r from-cyan-500 to-blue-600'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Scanner de Código</h3>
              <p className="text-sm opacity-90">Adicione itens rapidamente</p>
            </div>
            <Button variant="secondary" size="sm">
              <Scan className="w-4 h-4 mr-2" />
              Escanear
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
              Estoque vazio
            </h3>
            <p className={`text-sm mb-4 ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>
              Adicione seus primeiros itens ao estoque para começar a organizar seus mantimentos.
            </p>
            <Button 
              onClick={() => setShowAddItemForm(true)}
              className={customBackgrounds.pantry 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Item
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
                  <div className="text-right">
                    <Badge variant={item.status === 'urgent' ? 'destructive' : item.status === 'low' ? 'secondary' : 'default'}>
                      {getStatusText(item.status)}
                    </Badge>
                    <p className={`text-xs mt-1 ${customBackgrounds.pantry ? 'text-gray-300' : 'text-gray-500'}`}>{item.daysLeft} dias</p>
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
          <h2 className={`text-2xl font-bold ${customBackgrounds.bills ? 'text-white' : ''}`}>Contas</h2>
          <p className={`${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>Controle suas finanças</p>
        </div>
        <Button 
          className={customBackgrounds.bills 
            ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
          }
          onClick={() => setShowAddBillForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Conta
        </Button>
      </div>

      {/* Formulário para adicionar conta */}
      {showAddBillForm && (
        <Card className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${customBackgrounds.bills ? 'text-white' : ''}`}>
              Adicionar Nova Conta
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddBillForm(false)}
                className={customBackgrounds.bills ? 'text-white hover:bg-white/10' : ''}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                Nome da Conta
              </label>
              <Input
                value={newBill.name}
                onChange={(e) => setNewBill(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Energia, Internet, Água..."
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                Valor
              </label>
              <Input
                value={newBill.amount}
                onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Ex: R$ 150,00"
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                Data de Vencimento
              </label>
              <Input
                value={newBill.dueDate}
                onChange={(e) => setNewBill(prev => ({ ...prev, dueDate: e.target.value }))}
                placeholder="Ex: 15/12"
                className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                Categoria
              </label>
              <select
                value={newBill.category}
                onChange={(e) => setNewBill(prev => ({ ...prev, category: e.target.value }))}
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
                <Check className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddBillForm(false)}
                className={`flex-1 ${
                  customBackgrounds.bills 
                    ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                    : ''
                }`}
              >
                Cancelar
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
                <p className="text-sm opacity-90">Pagas</p>
                <p className="text-xl font-bold">
                  R$ {bills.filter(b => b.status === 'paid').reduce((sum, bill) => {
                    const amount = parseFloat(bill.amount.replace('R$ ', '').replace(',', '.'))
                    return sum + (isNaN(amount) ? 0 : amount)
                  }, 0).toFixed(2).replace('.', ',')}
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
                <p className="text-sm opacity-90">Pendentes</p>
                <p className="text-xl font-bold">
                  R$ {bills.filter(b => b.status === 'pending').reduce((sum, bill) => {
                    const amount = parseFloat(bill.amount.replace('R$ ', '').replace(',', '.'))
                    return sum + (isNaN(amount) ? 0 : amount)
                  }, 0).toFixed(2).replace('.', ',')}
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
              Comprovantes ({receipts.length})
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''}
              onClick={() => setShowAddReceiptForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
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
                  Novo Comprovante
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
                    Nome da Conta
                  </label>
                  <Input
                    value={newReceipt.billName}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, billName: e.target.value }))}
                    placeholder="Ex: Energia"
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    Valor
                  </label>
                  <Input
                    value={newReceipt.amount}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="R$ 150,00"
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    Data
                  </label>
                  <Input
                    type="date"
                    value={newReceipt.date}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, date: e.target.value }))}
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                    Horário
                  </label>
                  <Input
                    type="time"
                    value={newReceipt.time}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, time: e.target.value }))}
                    className={customBackgrounds.bills ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.bills ? 'text-white' : ''}`}>
                  Comprovante
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
                    {newReceipt.receipt ? 'Comprovante Anexado' : 'Anexar Comprovante'}
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
                  Salvar Comprovante
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
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* Lista de comprovantes */}
          {receipts.length === 0 ? (
            <div className="text-center py-6">
              <FileText className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>
                Nenhum comprovante adicionado ainda
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
                        Pago
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
              Nenhuma conta cadastrada
            </h3>
            <p className={`text-sm mb-4 ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>
              Adicione suas primeiras contas para começar a controlar suas finanças.
            </p>
            <Button 
              onClick={() => setShowAddBillForm(true)}
              className={customBackgrounds.bills 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Conta
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
                  <div className="text-right">
                    <p className={`font-bold text-lg ${customBackgrounds.bills ? 'text-white' : ''}`}>{bill.amount}</p>
                    <p className={`text-sm ${customBackgrounds.bills ? 'text-gray-300' : 'text-gray-500'}`}>Vence {bill.dueDate}</p>
                    <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'} className="mt-1">
                      {getStatusText(bill.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

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
      <h2 className={`text-2xl font-bold ${customBackgrounds.extras ? 'text-white' : ''}`}>Extras</h2>
      
      {/* Galeria de Fotos Melhorada */}
      <Card className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border border-white/20' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
            <Image className="w-5 h-5 text-pink-500" />
            Galeria do Casal
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
              Fazer Upload de Fotos
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
              Tirar Foto
            </Button>
          </div>

          {uploadedPhotos.length > 0 && (
            <div className={`mt-4 p-3 rounded-lg ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-green-50'
            }`}>
              <p className={`text-sm font-medium ${
                customBackgrounds.extras ? 'text-white' : 'text-green-700'
              }`}>
                ✨ {uploadedPhotos.length} foto{uploadedPhotos.length > 1 ? 's' : ''} adicionada{uploadedPhotos.length > 1 ? 's' : ''}!
              </p>
              <p className={`text-xs mt-1 ${
                customBackgrounds.extras ? 'text-gray-300' : 'text-green-600'
              }`}>
                Suas fotos podem ser usadas como background em algumas telas do app.
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
            Mural de Sonhos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulário para adicionar sonho */}
          {showAddDreamForm && (
            <div className={`p-4 rounded-lg space-y-4 ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  Novo Sonho
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddDreamForm(false)}
                  className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  Título do Sonho
                </label>
                <Input
                  value={newDream.title}
                  onChange={(e) => setNewDream(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Viagem para Europa, Casa Própria..."
                  className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    Meta (R$)
                  </label>
                  <Input
                    value={newDream.target}
                    onChange={(e) => setNewDream(prev => ({ ...prev, target: e.target.value }))}
                    placeholder="R$ 15.000"
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    Já Economizado (R$)
                  </label>
                  <Input
                    value={newDream.saved}
                    onChange={(e) => setNewDream(prev => ({ ...prev, saved: e.target.value }))}
                    placeholder="R$ 5.250"
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addDream}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Adicionar Sonho
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDreamForm(false)}
                  className={`flex-1 ${
                    customBackgrounds.extras 
                      ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                      : ''
                  }`}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {dreams.length === 0 ? (
            <div className="text-center py-6">
              <Heart className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm mb-4 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-500'}`}>
                Nenhum sonho adicionado ainda
              </p>
              <Button 
                variant="outline" 
                className={`${
                  customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
                }`}
                onClick={() => setShowAddDreamForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Primeiro Sonho
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
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${customBackgrounds.extras ? 'text-gray-300' : ''}`}>
                      <span>Progresso: {dream.progress}%</span>
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
                Novo Sonho
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
            Lembretes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Formulário para adicionar lembrete */}
          {showAddReminderForm && (
            <div className={`p-4 rounded-lg space-y-4 ${
              customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  Novo Lembrete
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddReminderForm(false)}
                  className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                  Lembrete
                </label>
                <Input
                  value={newReminder.text}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Ex: Comprar leite, Pagar conta..."
                  className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-gray-300' : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    Horário
                  </label>
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                    className={customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white' : ''}
                  />
                </div>
                
                <div className="flex items-end">
                  <label className={`flex items-center gap-2 ${customBackgrounds.extras ? 'text-white' : ''}`}>
                    <input
                      type="checkbox"
                      checked={newReminder.urgent}
                      onChange={(e) => setNewReminder(prev => ({ ...prev, urgent: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Urgente</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addReminder}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Adicionar Lembrete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddReminderForm(false)}
                  className={`flex-1 ${
                    customBackgrounds.extras 
                      ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' 
                      : ''
                  }`}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {reminders.length === 0 ? (
            <div className="text-center py-6">
              <Bell className={`w-8 h-8 mx-auto mb-2 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-400'}`} />
              <p className={`text-sm mb-4 ${customBackgrounds.extras ? 'text-gray-300' : 'text-gray-500'}`}>
                Nenhum lembrete adicionado ainda
              </p>
              <Button 
                variant="outline" 
                className={`${
                  customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
                }`}
                onClick={() => setShowAddReminderForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Primeiro Lembrete
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
                  <div className={`w-2 h-2 rounded-full ${reminder.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                </div>
              ))}
              <Button variant="outline" className={`w-full ${
                customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20' : ''
              }`} onClick={() => setShowAddReminderForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Lembrete
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
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>Idioma</span>
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
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>Personalização</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}
              onClick={() => setShowCustomization(true)}
            >
              Customizar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            customBackgrounds.extras ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-orange-500" />
              <span className={`font-medium text-sm ${customBackgrounds.extras ? 'text-white' : ''}`}>Notificações</span>
            </div>
            <Button variant="ghost" size="sm" className={customBackgrounds.extras ? 'text-white hover:bg-white/10' : ''}>
              Ativadas
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
            <TabsContent value="extras">
              <ExtrasTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
          <div className="flex justify-around py-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button
              variant={activeTab === 'pantry' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('pantry')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'pantry' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="text-xs">Estoque</span>
            </Button>
            
            <Button
              variant={activeTab === 'bills' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('bills')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'bills' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Receipt className="w-5 h-5" />
              <span className="text-xs">Contas</span>
            </Button>
            
            <Button
              variant={activeTab === 'extras' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('extras')}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                activeTab === 'extras' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                  : 'text-gray-600'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Extras</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}