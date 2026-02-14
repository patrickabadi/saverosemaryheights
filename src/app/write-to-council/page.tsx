'use client'

import { generateEmail } from '@/app/actions/generate-email'
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, Loader2, Mail, Send, Sparkles, TreePine, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const concerns = [
  { id: 'planning', label: 'NCP Violation', desc: 'The 1996 Neighbourhood Concept Plan designates this land as Institutional/Parkland — not residential. Polygon purchased the land knowing this zoning.', icon: '📋' },
  { id: 'environment', label: 'Environmental Destruction', desc: 'Loss of critical riparian forest bordering the Nicomekl River. Approximately 95% of upland forest would be removed.', icon: '🌲' },
  { id: 'traffic', label: 'Traffic & Road Safety', desc: '152nd Street has a dangerous hill crest with limited sightlines. The proposed T-intersection is inadequate for 300+ new families.', icon: '🚗' },
  { id: 'schools', label: 'School Overcrowding', desc: 'Rosemary Heights Elementary has 7+ portables with no room for expansion. Grandview Heights Secondary is also over capacity.', icon: '🏫' },
  { id: 'density', label: 'Excessive Density', desc: 'The proposal includes 200 townhomes and 175 condos — far beyond what the community infrastructure was designed for.', icon: '🏢' },
  { id: 'wildlife', label: 'Wildlife & Biodiversity', desc: 'Hub J is ranked the 5th most important wildlife corridor in Surrey — a mating and migration hub for owls, eagles, and deer.', icon: '🦅' },
  { id: 'slopes', label: 'Slope & Soil Stability', desc: 'Clay composition soil poses high risk of impacting adjacent structures during heavy construction activity.', icon: '⛰️' },
  { id: 'community', label: 'Community Process', desc: 'The rezoning application is being fast-tracked with minimal meaningful community consultation despite strong opposition.', icon: '🗳️' },
]

const recipients = "mayor@surrey.ca, doug.elford@surrey.ca, ghepner@surrey.ca, harry.bains@surrey.ca, linda.annis@surrey.ca, mandeep.nagra@surrey.ca, mike.bose@surrey.ca, pardeep.kooner@surrey.ca, rob.stutt@surrey.ca, clerks@surrey.ca, planningdevelopment@surrey.ca, RGill@surrey.ca, smlow@surrey.ca, hkamitakahara@surrey.ca, lacavan@surrey.ca, info@polyhomes.com, cho@polyhomes.com, akeller@polyhomes.com, mdutnall@polyhomes.com, saverosemaryheights@gmail.com, newstips@peacearchnews.com, brenda.locke@surrey.ca, elenore.sturko.mla@leg.bc.ca, trevor.halford.mla@leg.bc.ca, ernie.klassen@parl.gc.ca"

export default function WriteToCouncilPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [generatedSubject, setGeneratedSubject] = useState('')
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    tone: 'Professional',
    concerns: [] as string[]
  })

  const handleConcernToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(id)
        ? prev.concerns.filter(c => c !== id)
        : [...prev.concerns, id]
    }))
  }

  const handleGenerate = async () => {
    setStep(3)
    setLoading(true)
    setGeneratedEmail('')
    setGeneratedSubject('')

    const data = new FormData()
    data.append('name', formData.name)
    data.append('address', formData.address)
    data.append('tone', formData.tone)
    data.append('concerns', JSON.stringify(formData.concerns))

    const result = await generateEmail(data)

    if (result.error) {
      alert(result.error)
      setStep(2)
    } else if (result.content) {
      // Extract subject line from generated email
      const lines = result.content.split('\n')
      let subject = 'Opposition to Rezoning of 3660/3690 152nd Street'
      let bodyStart = 0
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.toLowerCase().startsWith('subject:')) {
          subject = line.replace(/^subject:\s*/i, '').trim()
          bodyStart = i + 1
          // Skip blank line after subject
          if (bodyStart < lines.length && lines[bodyStart].trim() === '') bodyStart++
          break
        }
      }
      setGeneratedSubject(subject)
      setGeneratedEmail(lines.slice(bodyStart).join('\n').trim())
    }
    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openInEmailClient = () => {
    const to = recipients
    const subject = encodeURIComponent(generatedSubject)
    const body = encodeURIComponent(generatedEmail)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  const canProceed = () => {
    if (step === 1) return true // details are optional
    if (step === 2) return formData.concerns.length > 0
    return true
  }

  const totalSteps = 4
  const stepLabels = ['Introduction', 'Your Details', 'Concerns', 'Your Letter']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-600 text-white pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            Write to Mayor & Council
          </h1>
          <p className="text-white/80 text-lg">
            Generate a unique, fact-based letter in just a few steps.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <button
                  onClick={() => {
                    // Only allow going back, not forward
                    if (i < step && !loading) setStep(i)
                  }}
                  disabled={i > step || loading}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                    i === step
                      ? 'text-primary-700 dark:text-primary-400'
                      : i < step
                      ? 'text-primary-500 cursor-pointer hover:text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    i < step
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : i === step
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-gray-300 text-gray-400 bg-gray-50'
                  }`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < totalSteps - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${i < step ? 'bg-primary-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* STEP 0: INTRODUCTION */}
        {step === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-3">
                Your Voice Matters
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
                Polygon Homes is applying to rezone the Retreat Centre lands at 3660 and 3690 152nd Street from Institutional/Parkland to high-density residential. This tool helps you write a personalized letter to Surrey&apos;s Mayor and Council opposing this application.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: <Sparkles className="w-5 h-5" />, title: 'AI-Powered', desc: 'Each letter is unique — not a form letter.' },
                { icon: <TreePine className="w-5 h-5" />, title: 'Fact-Based', desc: 'Backed by verified facts from community research.' },
                { icon: <Users className="w-5 h-5" />, title: 'Effective', desc: 'Personalized emails carry far more weight with Council.' },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 mb-2">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-amber-800 text-sm">
                <strong>How it works:</strong> You&apos;ll provide some optional details about yourself, select the issues you care about, and our AI will generate a unique letter. You can then edit it and send it directly from your email client.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 1: YOUR DETAILS */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
              About You
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Adding your name and address makes your letter more credible. Council members take resident voices more seriously when they can verify you live in the community. These details are <strong>optional</strong> but strongly recommended.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="wiz-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Your Name
                </label>
                <input
                  id="wiz-name"
                  type="text"
                  placeholder="e.g. Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="wiz-address" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Your Address
                </label>
                <input
                  id="wiz-address"
                  type="text"
                  placeholder="e.g. 1234 Rosemary Drive, Surrey, BC"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                />
                <p className="text-xs text-gray-400 mt-1">Including your address shows you are a directly affected resident.</p>
              </div>
              <div>
                <label htmlFor="wiz-tone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Tone of Your Letter
                </label>
                <select
                  id="wiz-tone"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition appearance-none cursor-pointer"
                >
                  <option value="Professional">Professional & Firm</option>
                  <option value="Passionate">Passionate & Emotional</option>
                  <option value="Urgent">Urgent & Direct</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-8 gap-4">
              <button
                onClick={() => setStep(0)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
              >
                Next: Select Concerns
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT CONCERNS */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
              What Are Your Concerns?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Select all the issues that matter to you. The more you select, the more comprehensive your letter will be.
            </p>

            <button
              type="button"
              onClick={() => {
                const allIds = concerns.map(c => c.id)
                setFormData(prev => ({
                  ...prev,
                  concerns: prev.concerns.length === allIds.length ? [] : allIds
                }))
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-4 hover:underline"
            >
              {formData.concerns.length === concerns.length ? 'Deselect All' : 'Select All'}
            </button>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {concerns.map(concern => {
                const isSelected = formData.concerns.includes(concern.id)
                return (
                  <button
                    key={concern.id}
                    type="button"
                    onClick={() => handleConcernToggle(concern.id)}
                    className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">{concern.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">{concern.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-600" />}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{concern.desc}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={formData.concerns.length === 0}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Generate My Letter ({formData.concerns.length} selected)
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GENERATED LETTER */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 md:p-10">
            {loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Crafting Your Letter...</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI is writing a unique, fact-based letter based on your selected concerns. This usually takes 10-15 seconds.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                    Your Letter is Ready
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Generated
                  </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                  Review and edit your letter below, then send it with one click. Feel free to personalize it further.
                </p>

                {/* Subject Line */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Subject</label>
                  <input
                    type="text"
                    value={generatedSubject}
                    onChange={(e) => setGeneratedSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                  />
                </div>

                {/* Email Body */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email Body</label>
                  <textarea
                    value={generatedEmail}
                    onChange={(e) => setGeneratedEmail(e.target.value)}
                    rows={18}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition font-serif text-base leading-relaxed resize-y"
                  />
                </div>

                {/* Primary Action — Open in Email Client */}
                <button
                  onClick={openInEmailClient}
                  className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-lg mb-4"
                >
                  <Send className="mr-3 w-5 h-5" />
                  Open in Email App & Send
                </button>

                <p className="text-center text-gray-400 text-xs mb-6">
                  This will open your default email app with the recipients, subject, and body pre-filled.
                </p>

                {/* Secondary Actions */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => copyToClipboard(generatedEmail)}
                    className="py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center text-sm font-medium"
                  >
                    {copied ? (
                      <><CheckCircle2 className="mr-2 w-4 h-4 text-green-600" /> Copied!</>
                    ) : (
                      <><Copy className="mr-2 w-4 h-4" /> Copy Email Text</>
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(recipients)}
                    className="py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center text-sm font-medium"
                  >
                    <Copy className="mr-2 w-4 h-4" /> Copy Recipients
                  </button>
                </div>

                {/* Recipients Display */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Recipients
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-xs break-all leading-relaxed font-mono">
                    {recipients}
                  </p>
                </div>

                {/* Back / Regenerate */}
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center text-sm font-medium"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Concerns
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="px-6 py-2.5 border border-primary-300 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition flex items-center text-sm font-medium"
                  >
                    <Sparkles className="mr-2 w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
