"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Eye, 
  EyeOff, 
  Heart, 
  Lock, 
  Mail, 
  User,
  ArrowRight,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginBackground, setLoginBackground] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Carregar background personalizado do localStorage
  useEffect(() => {
    const savedBackgrounds = localStorage.getItem('sweetHomeBackgrounds')
    if (savedBackgrounds) {
      try {
        const backgrounds = JSON.parse(savedBackgrounds)
        if (backgrounds.login) {
          setLoginBackground(backgrounds.login)
        }
      } catch (error) {
        console.error('Erro ao carregar background do login:', error)
      }
    }
  }, [])

  // Validação de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validação de senha
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  // Função para validar formulário
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório'
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para fazer login/cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Salvar dados do usuário no localStorage (simulação)
      const userData = {
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('sweetHomeUser', JSON.stringify(userData))

      // Redirecionar para a página principal
      router.push('/')
    } catch (error) {
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para login rápido (demo)
  const handleQuickLogin = async () => {
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = {
      email: 'casal@sweethome.com',
      name: 'Casal Sweet Home',
      isAuthenticated: true,
      loginTime: new Date().toISOString()
    }

    localStorage.setItem('sweetHomeUser', JSON.stringify(userData))
    router.push('/')
  }

  // Estilo do background
  const backgroundStyle = loginBackground 
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${loginBackground}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {}

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={loginBackground 
        ? backgroundStyle
        : { background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #4f46e5 100%)' }
      }
    >
      {/* Background decorativo (apenas se não houver imagem personalizada) */}
      {!loginBackground && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        </div>
      )}

      <div className="w-full max-w-md relative z-10">
        {/* Header com logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sweet Home</h1>
          <p className="text-white/80">Organize sua vida a dois</p>
        </div>

        {/* Card principal */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-white text-xl">
              {isLogin ? 'Entrar na conta' : 'Criar conta'}
            </CardTitle>
            <p className="text-white/70 text-sm">
              {isLogin 
                ? 'Acesse seu Sweet Home' 
                : 'Comece sua jornada juntos'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Nome (apenas no cadastro) */}
              {!isLogin && (
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      type="text"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-300 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Campo Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Campo Senha */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Campo Confirmar Senha (apenas no cadastro) */}
              {!isLogin && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      type="password"
                      placeholder="Confirmar senha"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Erro geral */}
              {errors.general && (
                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Botão principal */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-semibold py-3 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isLogin ? 'Entrando...' : 'Criando conta...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isLogin ? 'Entrar' : 'Criar conta'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">ou</span>
              </div>
            </div>

            {/* Login rápido para demo */}
            <Button
              onClick={handleQuickLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Acesso rápido (Demo)
            </Button>

            {/* Toggle entre login e cadastro */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setErrors({})
                  setFormData({ email: '', password: '', name: '', confirmPassword: '' })
                }}
                className="text-white/80 hover:text-white text-sm underline"
              >
                {isLogin 
                  ? 'Não tem conta? Criar uma nova' 
                  : 'Já tem conta? Fazer login'
                }
              </button>
            </div>

            {/* Esqueceu a senha (apenas no login) */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-white/60 hover:text-white/80 text-xs"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features do app */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Home className="w-4 h-4 text-orange-300" />
            </div>
            <p className="text-white/80 text-xs font-medium">Organize a casa</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-blue-300" />
            </div>
            <p className="text-white/80 text-xs font-medium">Sonhos do casal</p>
          </div>
        </div>

        {/* Versão */}
        <div className="text-center mt-6">
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm border-white/20 text-white/70">
            v1.0.0
          </Badge>
        </div>

        {/* Indicador de personalização */}
        {loginBackground && (
          <div className="text-center mt-4">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white/80">
              ✨ Background personalizado
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}