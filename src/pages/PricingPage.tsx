import { Helmet } from 'react-helmet-async'
import { Check, Star, ArrowRight } from 'lucide-react'

const PricingPage = () => {
  const plans = [
    {
      name: 'Single Session',
      price: '5,000',
      period: 'One-time payment',
      description: 'Perfect for trying out our platform',
      features: [
        '1 therapy session (60 minutes)',
        'Choose your therapist',
        'Text, voice, or video',
        'Session notes & resources',
        'Basic support'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      name: 'Starter Pack',
      price: '13,500',
      period: 'Save ₦1,500',
      description: 'Most popular choice for new users',
      features: [
        '3 therapy sessions (60 minutes each)',
        'Choose your therapist',
        'Text, voice, or video',
        'Session notes & resources',
        'Progress tracking',
        'Priority support',
        'Mood tracking tools'
      ],
      popular: true,
      cta: 'Get Started'
    },
    {
      name: 'Monthly Plan',
      price: '32,000',
      period: 'per month',
      description: 'Unlimited access for ongoing support',
      features: [
        'Unlimited therapy sessions',
        'Choose your therapist',
        'Text, voice, or video',
        'Session notes & resources',
        'Progress tracking',
        'Priority support',
        'Mood tracking & insights',
        '24/7 crisis support',
        'Group therapy sessions'
      ],
      popular: false,
      cta: 'Get Started'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Pricing - MentWel</title>
        <meta name="description" content="Choose from flexible therapy plans that fit your mental health journey and budget. Affordable mental health support in Nigeria." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Choose Your <span className="text-gradient-primary">Therapy Plan</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Flexible plans designed to fit your mental health journey and budget. 
                Start with what feels right for you.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-soft border-2 transition-all duration-300 hover:shadow-large hover:-translate-y-1 ${
                    plan.popular 
                      ? 'border-primary-200 ring-2 ring-primary-100' 
                      : 'border-neutral-100 hover:border-primary-100'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        {plan.description}
                      </p>
                      <div className="mb-2">
                        <span className="text-sm text-neutral-500">₦</span>
                        <span className="text-4xl font-bold text-neutral-900">
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-sm">
                        {plan.period}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-primary-600" />
                          </div>
                          <span className="text-neutral-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-glow'
                          : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-16 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-soft border border-neutral-100">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  Not sure which plan is right for you?
                </h3>
                <p className="text-neutral-600 mb-6">
                  Start with a single session to experience our platform, or speak with our support team 
                  to find the perfect plan for your mental health journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-outline">
                    Contact Support
                  </button>
                  <button className="btn-primary">
                    Book Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Have questions about our pricing? We're here to help.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Can I change my plan anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, bank transfers, and mobile money payments including MTN Mobile Money and Airtel Money."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "We offer a free 15-minute consultation with our intake specialists to help you get started and find the right therapist for your needs."
                },
                {
                  question: "What if I'm not satisfied with my session?",
                  answer: "Your satisfaction is our priority. If you're not happy with a session, contact our support team within 24 hours for a full refund or replacement session."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-6">
                  <h4 className="font-semibold text-neutral-900 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default PricingPage