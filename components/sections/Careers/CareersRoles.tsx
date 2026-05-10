'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AnimateIn } from '@/components/ui/animate-in'
import { ReachOutModal } from '@/components/ui/reach-out-modal'
import { useTranslation } from '@/i18n'
import { ArrowRight, Search } from 'lucide-react'
import { JOBS } from '@/data/jobs'

interface RoleData {
  id: string
  department: string
  departmentKey: string
  employmentType: string
  title: string
  location: string
  summary: string
}

type FilterCategory =
  | 'All'
  | 'Engineering'
  | 'Science'
  | 'Product'
  | 'Design'
  | 'Data'
  | 'Marketing'
  | 'Operations'

/**
 * CareersRoles — Open positions with search input + department select filter.
 */
export function CareersRoles() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [reachOutOpen, setReachOutOpen] = useState(false)

  const roles: RoleData[] = useMemo(
    () =>
      JOBS.map((job) => ({
        id: job.id,
        department: t(`joinUsPage.${job.id}.department`),
        departmentKey: job.badge,
        employmentType: t(`joinUsPage.${job.id}.employmentType`),
        title: t(`joinUsPage.${job.id}.title`),
        location: t(`joinUsPage.${job.id}.location`),
        summary: t(`joinUsPage.${job.id}.theRoleDesc`),
      })),
    [t]
  )

  const filtered = useMemo(() => {
    return roles.filter((r) => {
      const matchesDept =
        activeFilter === 'All' ||
        r.departmentKey.toLowerCase() === activeFilter.toLowerCase()
      const matchesSearch =
        search.trim() === '' ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.department.toLowerCase().includes(search.toLowerCase())
      return matchesDept && matchesSearch
    })
  }, [roles, activeFilter, search])

  return (
    <section id="open-roles" className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        {/* Header */}
        <AnimateIn variant="fadeUp">
          <div className="mb-8">
            <h2 className="mb-6 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
              <span className="text-foreground font-bold">
                {t('joinUsPage.openRoles')}
              </span>
            </h2>
            <p className="text-muted-foreground text-center text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t('joinUsPage.openRolesSubtitle')}
            </p>
          </div>
        </AnimateIn>

        {/* Search + department filter row */}
        <AnimateIn variant="fadeUp">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('joinUsPage.searchPlaceholder')}
                className="border-border focus:border-primary text-foreground placeholder:text-muted-foreground w-full rounded-lg border bg-white py-2.5 pr-4 pl-10 text-[14px] transition-colors outline-none"
              />
            </div>

            {/* Department select */}
            <select
              value={activeFilter}
              onChange={(e) =>
                setActiveFilter(e.target.value as FilterCategory)
              }
              aria-label={t('joinUsPage.filterDepartmentLabel')}
              className="border-border focus:border-primary text-foreground cursor-pointer rounded-xl border-2 bg-white px-4 py-2.5 text-[14px] font-medium transition-colors outline-none sm:w-56"
            >
              <option value="All">{t('joinUsPage.allDepartments')}</option>
              <option value="Engineering">
                {t('joinUsPage.filterEngineering')}
              </option>
              <option value="Science">{t('joinUsPage.filterScience')}</option>
              <option value="Product">{t('joinUsPage.filterProduct')}</option>
              <option value="Design">{t('joinUsPage.filterDesign')}</option>
              <option value="Data">{t('joinUsPage.filterData')}</option>
              <option value="Marketing">
                {t('joinUsPage.filterMarketing')}
              </option>
              <option value="Operations">
                {t('joinUsPage.filterOperations')}
              </option>
            </select>
          </div>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-3 py-12 text-center text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t('joinUsPage.noResults')}
            </p>
          )}

          {filtered.map((role) => (
            <div
              key={role.id}
              className="group border-border hover:border-primary/30 flex flex-col gap-3 rounded-2xl border bg-[#FBFBFB] p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Top row: badge + employment type */}
              <div className="flex items-center justify-between gap-2">
                <span className="bg-primary/8 text-primary rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                  {role.department}
                </span>
                <span className="text-muted-foreground text-[12px] font-normal">
                  {role.employmentType}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-foreground text-[16px] leading-snug font-bold">
                {role.title}
              </h3>

              {/* Location */}
              <p className="text-foreground/60 text-[13px] font-normal">
                {role.location}
              </p>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/${locale}/careers/${role.id}`}
                  prefetch={true}
                  className="text-primary flex items-center gap-1 text-[13px] font-semibold transition-all hover:gap-2"
                >
                  {t('joinUsPage.viewDetails')}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <AnimateIn variant="fadeUp">
        <div className="bg-footer-bg w-full px-6 py-16 text-center">
          <p className="text-foreground mb-2 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
            {t('joinUsPage.noOpeningLine1')}
          </p>
          <p className="text-muted-foreground mb-8 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
            {t('joinUsPage.noOpeningLine2')}
          </p>
          <button
            onClick={() => setReachOutOpen(true)}
            className="bg-primary inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-80"
          >
            {t('joinUsPage.noOpeningCta')}
          </button>
        </div>
      </AnimateIn>

      <ReachOutModal
        isOpen={reachOutOpen}
        onClose={() => setReachOutOpen(false)}
      />
    </section>
  )
}
