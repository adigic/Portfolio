export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent'
export const COOKIE_CONSENT_COOKIE_NAME = 'portfolio_cookie_consent'
export const COOKIE_CONSENT_EVENT = 'cookie-consent-updated'

export type ConsentValue = 'accepted' | 'denied'

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 180

export function writeConsent(value: ConsentValue) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value)
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`
}

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  return stored === 'accepted' || stored === 'denied' ? stored : null
}

export function dispatchConsentUpdated(value: ConsentValue) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent<ConsentValue>(COOKIE_CONSENT_EVENT, {detail: value}))
}