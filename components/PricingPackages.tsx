'use client';

import React, { useState, useEffect } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  interval: string;
  features?: string[];
}

interface PricingPackagesProps {
  title?: string;
  subtitle?: string;
  userId?: string;
  className?: string;
  onSelectPlan?: (planId: string) => void;
}

export const ClinicPricingPackages: React.FC<PricingPackagesProps> = ({
  title = "Choose Your Plan",
  subtitle = "Select the perfect plan for your healthcare needs",
  userId,
  className = "",
  onSelectPlan
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountAndPlans = async () => {
      try {
        setLoading(true);
        
        let currentAccountId = null;
        
        // Try to get account ID from user session first
        try {
          const userResponse = await fetch('/api/auth/user');
          if (userResponse.ok) {
            const userData = await userResponse.json();
            currentAccountId = userData.stripeAccountId;
            console.log('Got account ID from user session:', currentAccountId);
          }
        } catch (userError) {
          console.log('Failed to get user session, trying get-account API...');
        }
        
        // If no account ID from session, try the get-account API
        if (!currentAccountId) {
          try {
            const accountResponse = await fetch('/api/Stripe/get-account', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId })
            });
            
            if (accountResponse.ok) {
              const accountData = await accountResponse.json();
              currentAccountId = accountData.accountId;
              console.log('Got account ID from get-account API:', currentAccountId);
            }
          } catch (accountError) {
            console.log('Failed to get account from API');
          }
        }
        
        // Fallback to hardcoded for development
        if (!currentAccountId) {
          currentAccountId = 'acct_1Rm8mbP7dZXG9eil';
          console.log('Using fallback account ID:', currentAccountId);
        }
        
        setAccountId(currentAccountId);

        // Now fetch plans with the account ID
        const response = await fetch('/api/Stripe/list_plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountId: currentAccountId })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status}`);
        }

        const data = await response.json();
        console.log('Plans data:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }

        setPlans(data.plans || []);
        
        if (!data.plans || data.plans.length === 0) {
          setError('No pricing plans available. Please create plans in your billing dashboard.');
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err instanceof Error ? err.message : 'Failed to load pricing plans');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountAndPlans();
  }, [userId]);

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);
    
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      // Default Stripe checkout behavior
      try {
        const response = await fetch('/api/Stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            planId, 
            accountId,
            successUrl: window.location.origin + '/success',
            cancelUrl: window.location.href
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { url, error } = await response.json();
        
        if (error) {
          throw new Error(error);
        }

        if (url) {
          window.location.href = url;
        } else {
          throw new Error('No checkout URL received');
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to initiate checkout. Please try again.');
        setSelectedPlan(null);
      }
    }
  };

  if (loading) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 mx-auto w-64"></div>
            <div className="h-4 bg-gray-300 rounded mb-8 mx-auto w-96"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-300 h-96 rounded-xl"></div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-4">Loading pricing plans from Stripe account: acct_1Rm8mbP7dZXG9eil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Unable to Load Pricing Plans
            </div>
            <div className="text-red-700 mb-4">{error}</div>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/dashboard/billing"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Plans in Billing
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <div className="text-yellow-600 text-lg font-semibold mb-2">
              No Pricing Plans Available
            </div>
            <div className="text-yellow-700 mb-4">
              Please create pricing plans in your billing dashboard to display them here.
            </div>
            <a
              href="/dashboard/billing"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Go to Billing Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                index === 1 ? 'ring-2 ring-emerald-500 relative' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-emerald-600">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.interval}</span>
                  </div>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={selectedPlan === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    index === 1
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } ${selectedPlan === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {selectedPlan === plan.id ? 'Processing...' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include secure payment processing and instant booking confirmation
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Stripe • Account: acct_1Rm8mbP7dZXG9eil
          </p>
        </div>
      </div>
    </section>
  );
};