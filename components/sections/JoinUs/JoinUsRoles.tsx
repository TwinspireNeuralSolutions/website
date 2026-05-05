'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import { Search, Clock, MapPin, ArrowRight, Mail } from 'lucide-react'
import { JOBS } from '@/data/jobs'

interface RoleData {
  id: string
  department: string
  employmentType: string
  title: string
  location: string
  summary: string
}

function badgeClass(department: string): string {
  if (department === 'Science' || department === 'Videnskab')
    return 'bg-green-50 text-green-700'
  if (department === 'Engineering') return 'bg-blue-50 text-blue-700'
  return 'bg-primary/10 text-primary'
}

/**
 * JoinUsRoles - Open positions with a clean 2-column card grid and search.
 */
export function JoinUsRoles() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  const [query, setQuery] = useState('')

  const roles: RoleData[] = useMemo(
    () =>
      JOBS.map((job) => ({
        id: job.id,
        department: t(`joinUsPage.${job.id}.department`),
        employmentType: t(`joinUsPage.${job.id}.employmentType`),
        title: t(`joinUsPage.${job.id}.title`),
        location: t(`joinUsPage.${job.id}.location`),
        summary: t(`joinUsPage.${job.id}.theRoleDesc`),
      })),
    [t]
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return roles
    return roles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
    )
  }, [roles, query])

  return (
    <section id="open-roles" className="relative z-10 w-full bg-[#f5f5f7]">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        {/* Header */}
        <AnimateIn variant="fadeUp">
          <div className="mb-8 text-center">
            <h2 className="text-foreground mb-3 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {t('joinUsPage.openRoles')}
            </h2>
            <p className="text-muted-foreground text-[15px] sm:text-[16px]">
              {t('joinUsPage.openRolesSubtitle')}
            </p>
          </div>
        </AnimateIn>

        {/* Search */}
        <AnimateIn variant="fadeUp">
          <div className="mx-auto mb-10 max-w-[440px]">
            <div className="relative">
              <Search
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                aria-hidden
              />
              <input
                type="search"
                placeholder={t('joinUsPage.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-border placeholder:text-muted-foreground focus:ring-primary/30 w-full rounded-lg border bg-white py-2.5 pr-4 pl-10 text-[14px] outline-none focus:ring-2"
                aria-label={t('joinUsPage.searchPlaceholder')}
              />
            </div>
          </div>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-2 py-16 text-center text-[14px]">
              {t('joinUsPage.noResults')}
            </p>
          )}

          {filtered.map((role) => (
            <div
              key={role.id}
              className="border-border flex h-full flex-col gap-3 rounded-xl border bg-white p-6"
            >
              <span
                className={cn(
                  'inline-block self-start rounded-full px-2.5 py-0.5 text-[12px] font-medium',
                  badgeClass(role.department)
                )}
              >
                {role.department}
              </span>

              <h3 className="text-foreground text-[17px] leading-snug font-bold">
                {role.title}
              </h3>

              <p className="text-muted-foreground flex-1 text-[13px] leading-relaxed">
                {role.summary}
              </p>

              <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {role.employmentType}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {role.location}
                </span>
              </div>

              <Link
                href={`/${locale}/careers/${role.id}`}
                prefetch={true}
                className="text-primary mt-1 inline-flex items-center gap-1 self-start text-[14px] font-medium hover:underline"
              >
                {t('joinUsPage.viewDetails')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA - full width, footer colour */}
      <AnimateIn variant="fadeUp">
        <div className="bg-footer-bg w-full px-6 py-16 text-center">
          <p className="text-foreground mb-2 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
            {t('joinUsPage.noOpeningLine1')}
          </p>
          <p className="text-muted-foreground mb-8 text-[16px]">
            {t('joinUsPage.noOpeningLine2')}
          </p>
          <a
            href={`mailto:${t('joinUsPage.contactEmail')}`}
            className="bg-primary inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-80"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {t('joinUsPage.noOpeningCta')}
          </a>
        </div>
      </AnimateIn>
    </section>
  )
}
