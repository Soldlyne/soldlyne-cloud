import { describe, expect, it } from 'vitest'
import { anonymizeAppUrl } from '@/components/cloud/cloud-analytics'
import { isCloudService } from '@/components/cloud/cloud-service'

describe('app.soldlyne.com analytics', () => {
  it('replaces ids, tokens and dynamic segments, and drops the query string', () => {
    expect(anonymizeAppUrl('https://app.soldlyne.com/')).toBe('https://app.soldlyne.com/')
    expect(anonymizeAppUrl('https://app.soldlyne.com/companies/cmutyyuef00lvczzlmw4on5qj?tab=deals')).toBe('https://app.soldlyne.com/companies/[id]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/people?q=jane%40acme.example')).toBe('https://app.soldlyne.com/people')
    expect(anonymizeAppUrl('https://app.soldlyne.com/deals/42#notes')).toBe('https://app.soldlyne.com/deals/[id]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/pipeline/p_7')).toBe('https://app.soldlyne.com/pipeline/[id]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/quotes/q_9/preview')).toBe('https://app.soldlyne.com/quotes/[id]/preview')
    expect(anonymizeAppUrl('https://app.soldlyne.com/q/Zm9vYmFyLXRva2Vu')).toBe('https://app.soldlyne.com/q/[token]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/join/s3cr3t-invite')).toBe('https://app.soldlyne.com/join/[token]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/workspace/w_42')).toBe('https://app.soldlyne.com/workspace/[workspace]')
    expect(anonymizeAppUrl('https://app.soldlyne.com/login?next=%2Fdeals%2F42')).toBe('https://app.soldlyne.com/login')
    expect(anonymizeAppUrl('https://app.soldlyne.com/companies/acme/contacts')).toBe('https://app.soldlyne.com/companies/[id]/[id]')
  })

  it('runs only on the hosted service, never on a copy or a self-hosted instance', () => {
    expect(isCloudService({ VERCEL_GIT_REPO_OWNER: 'Soldlyne', VERCEL_GIT_REPO_SLUG: 'soldlyne-cloud' })).toBe(true)
    expect(isCloudService({ VERCEL_GIT_REPO_OWNER: 'FAKGR0UP', VERCEL_GIT_REPO_SLUG: 'soldlyne-instance' })).toBe(false)
    expect(isCloudService({})).toBe(false)
  })
})
